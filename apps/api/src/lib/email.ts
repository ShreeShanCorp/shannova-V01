import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER || "shannovaotpsender@gmail.com";
const EMAIL_PASS = process.env.EMAIL_PASS || "anrb jwsc hjve dcco";
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

/**
 * Core sendMail helper
 */
export async function sendMail(to: string, subject: string, text: string, html?: string): Promise<boolean> {
  try {
    const info = await transporter.sendMail({
      from: `"Shan Nova LMS" <${EMAIL_USER}>`,
      to,
      subject,
      text,
      html: html || text,
    });
    console.log(`[Shan Nova Mail] Sent to ${to} | Subject: "${subject}" | ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`[Shan Nova Mail Error] Failed to send to ${to}:`, error);
    return false;
  }
}

/**
 * 1. Send Login / Verification OTP
 */
export async function sendOtpEmail(toEmail: string, otp: string, userName?: string): Promise<boolean> {
  const subject = `Your Shan Nova Verification Code: ${otp}`;
  const text = `Hello ${userName || "Learner"},\n\nYour Shan Nova login OTP is: ${otp}\n\nValid for 10 minutes.`;

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px;">
        <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e2e8f0;">
          <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 24px; font-weight: 900; color: #4f46e5;">🚀 Shan Nova LMS</div>
            <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">From Campus to Career</div>
          </div>
          <div style="font-size: 16px; color: #0f172a; font-weight: 700; margin-bottom: 8px;">Hello ${userName || "Learner"},</div>
          <div style="font-size: 13px; color: #475569; line-height: 1.6; margin-bottom: 20px;">
            Use the following one-time verification code to sign in to your Shan Nova portal:
          </div>
          <div style="background: linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%); border: 2px dashed #6366f1; border-radius: 12px; padding: 18px; text-align: center; margin: 20px 0;">
            <div style="font-family: monospace; font-size: 36px; font-weight: 900; color: #4338ca; letter-spacing: 8px;">${otp}</div>
            <div style="font-size: 11px; color: #64748b; margin-top: 6px;">⏱️ Expires in 10 minutes</div>
          </div>
          <div style="font-size: 12px; color: #94a3b8; line-height: 1.5;">If you did not request this code, you can safely ignore this email.</div>
          <div style="margin-top: 28px; border-top: 1px solid #f1f5f9; padding-top: 14px; text-align: center; font-size: 11px; color: #94a3b8;">
            © 2026 Shan Nova LMS • 90-Day Full-Stack Web Development Program
          </div>
        </div>
      </body>
    </html>
  `;

  return sendMail(toEmail, subject, text, html);
}

/**
 * 2. Send Welcome Onboarding Email (Upon Registration)
 */
export async function sendWelcomeEmail(toEmail: string, name: string, role: string): Promise<boolean> {
  const subject = `Welcome to Shan Nova LMS, ${name}! 🚀`;
  const portalUrl = role === "ADMIN" ? "http://localhost:5173/admin" : role === "INSTRUCTOR" ? "http://localhost:5173/instructor" : "http://localhost:5173/student";
  const text = `Welcome to Shan Nova, ${name}!\nYour account has been created with the ${role} role.\nAccess your portal at: ${portalUrl}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px;">
        <div style="max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e2e8f0;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="font-size: 24px; font-weight: 900; color: #4f46e5;">🚀 Welcome to Shan Nova!</div>
            <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">From Campus to Career</div>
          </div>
          <div style="font-size: 16px; color: #0f172a; font-weight: 700; margin-bottom: 12px;">Hi ${name},</div>
          <div style="font-size: 13px; color: #475569; line-height: 1.6; margin-bottom: 20px;">
            Your account has been successfully created with the <strong>${role}</strong> role. You now have full access to the 90-Day Full-Stack PERN Engineering platform.
          </div>
          <div style="background: #f8fafc; border-left: 4px solid #4f46e5; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
            <div style="font-size: 13px; font-weight: 700; color: #1e293b;">⚡ What to expect:</div>
            <ul style="margin: 8px 0 0 0; padding-left: 20px; font-size: 12px; color: #475569; line-height: 1.6;">
              <li><strong>30% Theory:</strong> Deep architectural concepts & mentor notes.</li>
              <li><strong>70% Practical Lab:</strong> Live in-browser Monaco IDE coding drills.</li>
              <li><strong>Daily Assessments:</strong> 5 MCQs + speed drills.</li>
              <li><strong>10 Weekend Projects:</strong> Real-world portfolio deliverables.</li>
            </ul>
          </div>
          <div style="text-align: center; margin: 28px 0;">
            <a href="${portalUrl}" style="background: #4f46e5; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 13px; font-weight: 700; border-radius: 10px; display: inline-block;">
              Launch ${role} Portal →
            </a>
          </div>
          <div style="border-top: 1px solid #f1f5f9; padding-top: 14px; text-align: center; font-size: 11px; color: #94a3b8;">
            © 2026 Shan Nova LMS • From Campus to Career
          </div>
        </div>
      </body>
    </html>
  `;

  return sendMail(toEmail, subject, text, html);
}

/**
 * 2b. Send Sign-In / Login Alert Notification Email
 */
export async function sendSignInNotificationEmail(toEmail: string, name: string, role: string): Promise<boolean> {
  const subject = `🔐 Security Alert: New Sign-In to your Shan Nova Account`;
  const portalUrl = role === "ADMIN" ? "http://localhost:5173/admin" : role === "INSTRUCTOR" ? "http://localhost:5173/instructor" : "http://localhost:5173/student";
  const loginTime = new Date().toUTCString();
  const text = `Hello ${name},\n\nA successful sign-in to your Shan Nova account (${role}) occurred on ${loginTime}.\nAccess your portal at: ${portalUrl}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px;">
        <div style="max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e2e8f0;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="font-size: 24px; font-weight: 900; color: #4f46e5;">🚀 Shan Nova LMS</div>
            <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">From Campus to Career</div>
          </div>
          
          <div style="font-size: 18px; color: #0f172a; font-weight: 800; margin-bottom: 12px;">
            🔐 New Sign-In Detected
          </div>

          <div style="font-size: 13px; color: #475569; line-height: 1.6; margin-bottom: 20px;">
            Hi <strong>${name}</strong>, your Shan Nova account was just accessed with the <strong>${role}</strong> role.
          </div>

          <div style="background: #f8fafc; border-left: 4px solid #10b981; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
            <div style="font-size: 12px; color: #64748b;"><strong>Activity Summary:</strong></div>
            <div style="font-size: 13px; color: #1e293b; margin-top: 4px;">• <strong>Account Role:</strong> ${role}</div>
            <div style="font-size: 13px; color: #1e293b; margin-top: 4px;">• <strong>Timestamp:</strong> ${loginTime}</div>
            <div style="font-size: 13px; color: #1e293b; margin-top: 4px;">• <strong>Status:</strong> Authenticated Successfully</div>
          </div>

          <div style="text-align: center; margin: 24px 0;">
            <a href="${portalUrl}" style="background: #4f46e5; color: #ffffff; text-decoration: none; padding: 12px 24px; font-size: 13px; font-weight: 700; border-radius: 8px; display: inline-block;">
              Open ${role} Portal →
            </a>
          </div>

          <div style="font-size: 11px; color: #94a3b8; line-height: 1.5; text-align: center;">
            If you did not initiate this sign-in, please reset your password immediately.
          </div>

          <div style="margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 14px; text-align: center; font-size: 11px; color: #94a3b8;">
            © 2026 Shan Nova LMS • From Campus to Career
          </div>
        </div>
      </body>
    </html>
  `;

  return sendMail(toEmail, subject, text, html);
}

/**
 * 2c. Send Admin Platform Alert (Alerts Administrator of new registrations/logins)
 */
export async function sendAdminAlertEmail(eventType: "REGISTRATION" | "SIGN_IN", userEmail: string, userName: string, role: string): Promise<boolean> {
  const adminEmail = process.env.EMAIL_USER || "shannovaotpsender@gmail.com";
  const subject = eventType === "REGISTRATION" 
    ? `🔔 Admin Alert: New User Registered (${userName} - ${role})`
    : `🔔 Admin Alert: User Sign-In (${userName} - ${role})`;
  
  const timestamp = new Date().toUTCString();
  const text = `Admin Alert: A user has ${eventType === "REGISTRATION" ? "registered a new account" : "signed in"}.\n\nName: ${userName}\nEmail: ${userEmail}\nRole: ${role}\nTime: ${timestamp}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px;">
        <div style="max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e2e8f0;">
          <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 22px; font-weight: 900; color: #4f46e5;">🛡️ Shan Nova Admin Console Alert</div>
            <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Real-Time Platform Activity</div>
          </div>
          
          <div style="font-size: 16px; color: #0f172a; font-weight: 800; margin-bottom: 12px;">
            ${eventType === "REGISTRATION" ? "✨ New Student/Faculty Registration" : "🔑 User Login Event"}
          </div>

          <div style="background: #f8fafc; border-left: 4px solid #6366f1; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <div style="font-size: 13px; color: #1e293b; line-height: 1.6;">
              <div>• <strong>User Name:</strong> ${userName}</div>
              <div>• <strong>Email:</strong> ${userEmail}</div>
              <div>• <strong>Assigned Role:</strong> ${role}</div>
              <div>• <strong>Timestamp:</strong> ${timestamp}</div>
            </div>
          </div>

          <div style="text-align: center;">
            <a href="http://localhost:5173/admin" style="background: #4f46e5; color: #ffffff; text-decoration: none; padding: 12px 24px; font-size: 13px; font-weight: 700; border-radius: 8px; display: inline-block;">
              Open Admin Console →
            </a>
          </div>

          <div style="margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 14px; text-align: center; font-size: 11px; color: #94a3b8;">
            © 2026 Shan Nova LMS Platform Notification
          </div>
        </div>
      </body>
    </html>
  `;

  return sendMail(adminEmail, subject, text, html);
}

/**
 * 3. Send Live Class Scheduled Notification
 */
export async function sendClassScheduledEmail(
  toEmail: string,
  className: string,
  instructorName: string,
  startTime: string,
  meetingUrl: string
): Promise<boolean> {
  const subject = `📅 Live Masterclass Scheduled: ${className}`;
  const text = `A new live masterclass "${className}" has been scheduled by ${instructorName} for ${startTime}.\nJoin here: ${meetingUrl}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px;">
        <div style="max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e2e8f0;">
          <div style="font-size: 20px; font-weight: 900; color: #4f46e5; margin-bottom: 16px;">🎥 Live Masterclass Alert</div>
          <div style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">${className}</div>
          <div style="font-size: 13px; color: #475569; margin-bottom: 20px;">
            Instructor <strong>${instructorName}</strong> has scheduled a live hands-on workshop.
          </div>
          <div style="background: #f8fafc; padding: 16px; border-radius: 10px; border-left: 4px solid #10b981; margin-bottom: 24px;">
            <div style="font-size: 12px; color: #64748b;">📅 Scheduled Time:</div>
            <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-top: 4px;">${startTime}</div>
          </div>
          <div style="text-align: center;">
            <a href="${meetingUrl}" style="background: #10b981; color: #ffffff; text-decoration: none; padding: 12px 24px; font-size: 13px; font-weight: 700; border-radius: 8px; display: inline-block;">
              Join Live Room →
            </a>
          </div>
          <div style="margin-top: 28px; border-top: 1px solid #f1f5f9; padding-top: 14px; text-align: center; font-size: 11px; color: #94a3b8;">
            © 2026 Shan Nova LMS • From Campus to Career
          </div>
        </div>
      </body>
    </html>
  `;

  return sendMail(toEmail, subject, text, html);
}

/**
 * 4. Send Student Enrollment Confirmation
 */
export async function sendEnrollmentEmail(
  toEmail: string,
  studentName: string,
  cohortName: string,
  curriculumName: string
): Promise<boolean> {
  const subject = `🎓 You are Enrolled in ${cohortName}!`;
  const text = `Congratulations ${studentName}! You are officially enrolled in ${cohortName} (${curriculumName}).`;

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px;">
        <div style="max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e2e8f0;">
          <div style="font-size: 22px; font-weight: 900; color: #4f46e5; margin-bottom: 16px;">🎓 Enrollment Confirmed!</div>
          <div style="font-size: 14px; color: #0f172a; font-weight: 600; margin-bottom: 12px;">Hi ${studentName},</div>
          <div style="font-size: 13px; color: #475569; line-height: 1.6; margin-bottom: 20px;">
            You have been enrolled in <strong>${cohortName}</strong> covering <strong>${curriculumName}</strong>.
          </div>
          <div style="text-align: center; margin: 24px 0;">
            <a href="http://localhost:5173/student/curriculum" style="background: #4f46e5; color: #ffffff; text-decoration: none; padding: 12px 24px; font-size: 13px; font-weight: 700; border-radius: 8px; display: inline-block;">
              View 90-Day Learning Lab →
            </a>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendMail(toEmail, subject, text, html);
}

/**
 * 5. Send Submission Graded Feedback
 */
export async function sendSubmissionGradedEmail(
  toEmail: string,
  studentName: string,
  taskTitle: string,
  grade: number,
  feedback?: string
): Promise<boolean> {
  const subject = `📝 Grade & Feedback Published: ${taskTitle} (${grade}/100)`;
  const text = `Hi ${studentName},\nYour submission for "${taskTitle}" was graded: ${grade}/100.\nFeedback: ${feedback || "No comments."}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px;">
        <div style="max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e2e8f0;">
          <div style="font-size: 20px; font-weight: 900; color: #4f46e5; margin-bottom: 16px;">📝 Submission Graded</div>
          <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 6px;">${taskTitle}</div>
          <div style="font-size: 28px; font-weight: 900; color: #10b981; margin: 12px 0;">Score: ${grade} / 100</div>
          ${feedback ? `<div style="background: #f8fafc; padding: 14px; border-radius: 8px; font-size: 13px; color: #334155; line-height: 1.5; border-left: 4px solid #6366f1;"><strong>Instructor Feedback:</strong><br/>${feedback}</div>` : ""}
          <div style="text-align: center; margin-top: 24px;">
            <a href="http://localhost:5173/student/tasks" style="background: #4f46e5; color: #ffffff; text-decoration: none; padding: 12px 24px; font-size: 13px; font-weight: 700; border-radius: 8px; display: inline-block;">
              View in Portal →
            </a>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendMail(toEmail, subject, text, html);
}

/**
 * 6. Send Password Reset Email
 */
export async function sendPasswordResetEmail(toEmail: string, resetToken: string, userName?: string): Promise<boolean> {
  const subject = `🔑 Password Reset Request - Shan Nova LMS`;
  const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}&email=${encodeURIComponent(toEmail)}`;
  const text = `Hello ${userName || "User"},\nTo reset your password, visit: ${resetUrl}\nLink expires in 15 minutes.`;

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px;">
        <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e2e8f0;">
          <div style="font-size: 22px; font-weight: 900; color: #4f46e5; margin-bottom: 16px;">🔑 Reset Your Password</div>
          <div style="font-size: 13px; color: #475569; line-height: 1.6; margin-bottom: 24px;">
            We received a request to reset your password for your Shan Nova account. Click the button below to set a new password:
          </div>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${resetUrl}" style="background: #4f46e5; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 13px; font-weight: 700; border-radius: 10px; display: inline-block;">
              Reset Password →
            </a>
          </div>
          <div style="font-size: 11px; color: #94a3b8; margin-top: 24px; text-align: center;">⏱️ Link expires in 15 minutes.</div>
        </div>
      </body>
    </html>
  `;

  return sendMail(toEmail, subject, text, html);
}

/**
 * 7. Send Rich Notification Email
 */
export async function sendNotificationEmail(
  toEmail: string,
  subject: string,
  title: string,
  message: string,
  actionUrl?: string,
  actionText?: string
): Promise<boolean> {
  const text = `${title}\n\n${message}\n\n${actionUrl ? `Link: ${actionUrl}` : ""}`;
  const html = `
    <div style="font-family: sans-serif; padding: 20px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; max-width: 500px; margin: 0 auto;">
      <h2 style="color: #4f46e5; margin: 0 0 12px 0;">${title}</h2>
      <p style="color: #334155; line-height: 1.5;">${message}</p>
      ${actionUrl ? `<a href="${actionUrl}" style="display:inline-block; background:#4f46e5; color:#fff; padding:10px 20px; border-radius:8px; text-decoration:none; font-weight:bold; margin-top:12px;">${actionText || "View Details"}</a>` : ""}
    </div>
  `;
  return sendMail(toEmail, subject, text, html);
}
