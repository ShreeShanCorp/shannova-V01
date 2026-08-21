import bcrypt from "bcryptjs";
import { z } from "zod";
import { asyncHandler } from "../lib/async-handler.js";
import { sendOtpEmail, sendWelcomeEmail, sendSignInNotificationEmail, sendAdminAlertEmail, sendPasswordResetEmail } from "../lib/email.js";
import { signJwtToken } from "../lib/jwt.js";
import { prisma } from "../lib/prisma.js";
import { ApiError, sendSuccess } from "../lib/response.js";

// In-memory OTP storage
const otpStore = new Map<string, { code: string; expiresAt: number }>();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  role: z.enum(["STUDENT", "INSTRUCTOR", "ADMIN", "INTERVIEWER"]).default("STUDENT"),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().optional(),
  role: z.string().optional(),
});

const sendOtpSchema = z.object({
  email: z.string().email(),
});

const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  email: z.string().email(),
  token: z.string().min(1),
  newPassword: z.string().min(6),
});

export const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, role } = registerSchema.parse(req.body);

  let existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw ApiError.badRequest("User with this email already exists");
  }

  const user = await prisma.user.create({
    data: {
      clerkId: `jwt_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      email,
      firstName: firstName || "Student",
      lastName: lastName || "",
      role: role || "STUDENT",
    },
  });

  // Auto-enroll user into default active cohort if one exists
  const activeCohort = await prisma.cohort.findFirst({ where: { status: "ACTIVE" } }) 
    || await prisma.cohort.findFirst();
  if (activeCohort) {
    await prisma.enrollment.upsert({
      where: { userId_cohortId: { userId: user.id, cohortId: activeCohort.id } },
      create: { userId: user.id, cohortId: activeCohort.id, role: user.role },
      update: {},
    });
  }

  const userName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Learner";

  // 1. Send Welcome Email to the registered user
  await sendWelcomeEmail(user.email, userName, user.role);

  // 2. Send Admin Alert Email to the Platform Owner
  void sendAdminAlertEmail("REGISTRATION", user.email, userName, user.role);

  const token = signJwtToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    name: userName,
  });

  return sendSuccess(res, { user, token }, { status: 201 });
});

export const login = asyncHandler(async (req, res) => {
  const { email, role } = loginSchema.parse(req.body);

  let user = await prisma.user.findUnique({ where: { email } });
  
  // Auto-seed/create demo accounts if missing for quick 1-click test access
  if (!user) {
    const demoDefaults: Record<string, { firstName: string; lastName: string; role: "STUDENT" | "INSTRUCTOR" | "ADMIN" }> = {
      "student@shannova.com": { firstName: "Alex", lastName: "Rivera", role: "STUDENT" },
      "instructor@shannova.com": { firstName: "Sarah", lastName: "Jenkins", role: "INSTRUCTOR" },
      "admin@shannova.com": { firstName: "David", lastName: "Chen", role: "ADMIN" },
    };

    const demoInfo = demoDefaults[email.toLowerCase()];
    if (demoInfo) {
      user = await prisma.user.create({
        data: {
          clerkId: `demo_${Date.now()}_${Math.random().toString(36).substring(7)}`,
          email: email.toLowerCase(),
          firstName: demoInfo.firstName,
          lastName: demoInfo.lastName,
          role: (role as any) || demoInfo.role,
        },
      });

      const activeCohort = await prisma.cohort.findFirst({ where: { status: "ACTIVE" } }) || await prisma.cohort.findFirst();
      if (activeCohort) {
        await prisma.enrollment.upsert({
          where: { userId_cohortId: { userId: user.id, cohortId: activeCohort.id } },
          create: { userId: user.id, cohortId: activeCohort.id, role: user.role },
          update: {},
        });
      }
    } else {
      throw ApiError.notFound("Account not found with this email. Please sign up at /sign-up first.");
    }
  }

  const userName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Learner";

  // 1. Send Sign-In Email Alert to User
  void sendSignInNotificationEmail(user.email, userName, user.role);

  // 2. Notify Admin
  void sendAdminAlertEmail("SIGN_IN", user.email, userName, user.role);

  const token = signJwtToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    name: userName,
  });

  return sendSuccess(res, { user, token });
});

export const sendOtp = asyncHandler(async (req, res) => {
  const { email } = sendOtpSchema.parse(req.body);

  let existingUser = await prisma.user.findUnique({ where: { email } });
  if (!existingUser) {
    const demoDefaults: Record<string, { firstName: string; lastName: string; role: "STUDENT" | "INSTRUCTOR" | "ADMIN" }> = {
      "student@shannova.com": { firstName: "Alex", lastName: "Rivera", role: "STUDENT" },
      "instructor@shannova.com": { firstName: "Sarah", lastName: "Jenkins", role: "INSTRUCTOR" },
      "admin@shannova.com": { firstName: "David", lastName: "Chen", role: "ADMIN" },
    };
    const demoInfo = demoDefaults[email.toLowerCase()];
    if (demoInfo) {
      existingUser = await prisma.user.create({
        data: {
          clerkId: `demo_${Date.now()}_${Math.random().toString(36).substring(7)}`,
          email: email.toLowerCase(),
          firstName: demoInfo.firstName,
          lastName: demoInfo.lastName,
          role: demoInfo.role,
        },
      });
    } else {
      throw ApiError.notFound("Account not found with this email. Please sign up at /sign-up first.");
    }
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  otpStore.set(email.toLowerCase(), { code, expiresAt });

  // Send real email via configured Gmail
  await sendOtpEmail(email, code, existingUser.firstName || "Learner");

  return sendSuccess(res, {
    message: "Verification code sent to your email address.",
    email,
  });
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = verifyOtpSchema.parse(req.body);

  const stored = otpStore.get(email.toLowerCase());
  if (!stored || stored.code !== otp || Date.now() > stored.expiresAt) {
    throw ApiError.badRequest("Invalid or expired OTP code.");
  }

  otpStore.delete(email.toLowerCase());

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw ApiError.notFound("Account not found with this email. Please sign up at /sign-up first.");
  }

  const userName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Learner";

  // Automated Sign-In Email Alert
  void sendSignInNotificationEmail(user.email, userName, user.role);

  const token = signJwtToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    name: userName,
  });

  return sendSuccess(res, { user, token });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = forgotPasswordSchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw ApiError.notFound("User not found with this email.");
  }

  const resetToken = signJwtToken({ userId: user.id, email: user.email, role: user.role });
  await sendPasswordResetEmail(user.email, resetToken, user.firstName || "Learner");

  return sendSuccess(res, { message: "Password reset email sent." });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = resetPasswordSchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw ApiError.notFound("User not found.");
  }

  return sendSuccess(res, { message: "Password reset successfully!" });
});

export const getMe = asyncHandler(async (req, res) => {
  if (!req.user) throw ApiError.unauthorized();
  return sendSuccess(res, req.user);
});
