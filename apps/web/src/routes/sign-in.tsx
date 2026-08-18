import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Rocket, 
  GraduationCap, 
  UserCheck, 
  ShieldCheck, 
  Mail, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  KeyRound, 
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { useUiStore } from "@/stores/ui-store";
import type { Role } from "@/types/api";
import { httpClient } from "@/lib/api-client";

export const Route = createFileRoute("/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const { setActiveRole } = useUiStore();
  
  const [selectedRole, setSelectedRole] = useState<Role>("STUDENT");
  const [authMode, setAuthMode] = useState<"presets" | "email" | "otp">("presets");
  const [email, setEmail] = useState("student@shannova.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const presets = [
    {
      role: "STUDENT" as Role,
      title: "Student Account",
      email: "student@shannova.com",
      description: "Access Curriculum, Coding Labs, Daily Assessments & Projects",
      icon: GraduationCap,
      targetUrl: "/student",
    },
    {
      role: "INSTRUCTOR" as Role,
      title: "Instructor Workspace",
      email: "instructor@shannova.com",
      description: "Schedule live classes, grade student submissions, track attendance",
      icon: UserCheck,
      targetUrl: "/instructor",
    },
    {
      role: "ADMIN" as Role,
      title: "Admin Console",
      email: "admin@shannova.com",
      description: "Manage cohorts, curriculum modules, and database health",
      icon: ShieldCheck,
      targetUrl: "/admin",
    },
  ];

  const handleRolePresetLogin = async (preset: typeof presets[0]) => {
    setLoading(true);
    setMessage(null);
    try {
      // Call backend API login endpoint
      const res = await httpClient.post("/auth/login", {
        email: preset.email,
        role: preset.role,
      });

      if (res.data?.data?.token) {
        localStorage.setItem("shannova_token", res.data.data.token);
        localStorage.setItem("kickstart_token", res.data.data.token);
      }

      setActiveRole(preset.role);
      navigate({ to: preset.targetUrl as any });
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.response?.data?.error?.message || "Account not found. Please sign up at /sign-up first.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await httpClient.post("/auth/login", {
        email,
        password,
        role: selectedRole,
      });

      if (res.data?.data?.token) {
        localStorage.setItem("shannova_token", res.data.data.token);
        localStorage.setItem("kickstart_token", res.data.data.token);
      }

      setActiveRole(selectedRole);
      const target = selectedRole === "ADMIN" ? "/admin" : selectedRole === "INSTRUCTOR" ? "/instructor" : "/student";
      navigate({ to: target as any });
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.error?.message || "Invalid credentials." });
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!email) {
      setMessage({ type: "error", text: "Please enter an email address." });
      return;
    }
    setLoading(true);
    setMessage(null);

    try {
      const res = await httpClient.post("/auth/send-otp", { email });
      setOtpSent(true);
      setMessage({
        type: "success",
        text: res.data?.data?.message || "Verification code sent to your email address.",
      });
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.error?.message || "Failed to send OTP." });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await httpClient.post("/auth/verify-otp", { email, otp: otpCode });
      if (res.data?.data?.token) {
        localStorage.setItem("shannova_token", res.data.data.token);
        localStorage.setItem("kickstart_token", res.data.data.token);
      }
      setActiveRole(selectedRole);
      const target = selectedRole === "ADMIN" ? "/admin" : selectedRole === "INSTRUCTOR" ? "/instructor" : "/student";
      navigate({ to: target as any });
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.error?.message || "Invalid or expired OTP." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafbfc] px-4 py-12 dark:bg-[#090d16]">
      {/* Background Glow */}
      <div className="pointer-events-none fixed top-1/4 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/10 blur-3xl" />

      <div className="w-full max-w-xl rounded-3xl border border-slate-200/80 bg-white p-8 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900">
        
        {/* Back Key Link to Landing Page */}
        <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/60 dark:hover:text-indigo-400"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Landing Page</span>
          </Link>
          <span className="text-[11px] font-semibold text-slate-400">Shan Nova Portal</span>
        </div>

        {/* Brand Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 shadow-md shadow-indigo-500/25">
              <Rocket className="size-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-xl font-black tracking-tight text-slate-900 dark:text-white">Shan Nova</div>
              <div className="text-[10px] font-bold text-indigo-600 uppercase dark:text-indigo-400">From Campus to Career</div>
            </div>
          </Link>
          <h1 className="mt-4 text-2xl font-black text-slate-900 dark:text-white">Sign in to your portal</h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Choose your account role or sign in with your email.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-6 flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => { setAuthMode("presets"); setMessage(null); }}
            className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition ${
              authMode === "presets"
                ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            ⚡ 1-Click Role Login
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode("email"); setMessage(null); }}
            className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition ${
              authMode === "email"
                ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            🔑 Password
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode("otp"); setMessage(null); }}
            className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition ${
              authMode === "otp"
                ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            📧 Email OTP
          </button>
        </div>

        {message && (
          <div className={`mt-4 flex items-center gap-2 rounded-xl p-3 text-xs font-semibold ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
              : "bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800"
          }`}>
            {message.type === "success" ? <CheckCircle2 className="size-4 shrink-0" /> : <AlertCircle className="size-4 shrink-0" />}
            <span>{message.text}</span>
          </div>
        )}

        {/* 1. 1-CLICK ROLE PRESETS */}
        {authMode === "presets" && (
          <div className="mt-6 space-y-3">
            {presets.map((preset) => {
              const Icon = preset.icon;
              return (
                <button
                  key={preset.role}
                  type="button"
                  onClick={() => handleRolePresetLogin(preset)}
                  disabled={loading}
                  className="group flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-left shadow-sm transition-all hover:border-indigo-500 hover:bg-indigo-50/40 dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-indigo-500 dark:hover:bg-indigo-950/30"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white dark:bg-slate-800 dark:text-indigo-400 dark:group-hover:bg-indigo-600 dark:group-hover:text-white">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{preset.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{preset.description}</div>
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600" />
                </button>
              );
            })}
          </div>
        )}

        {/* 2. EMAIL & PASSWORD LOGIN */}
        {authMode === "email" && (
          <form onSubmit={handleEmailPasswordLogin} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Select Interface Role</label>
              <div className="mt-1.5 grid grid-cols-3 gap-2">
                {(["STUDENT", "INSTRUCTOR", "ADMIN"] as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setSelectedRole(r);
                      setEmail(r === "ADMIN" ? "admin@shannova.com" : r === "INSTRUCTOR" ? "instructor@shannova.com" : "student@shannova.com");
                    }}
                    className={`rounded-xl border py-2 text-xs font-bold capitalize transition ${
                      selectedRole === r
                        ? "border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {r.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
              <div className="relative mt-1">
                <Mail className="absolute top-2.5 left-3 size-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-3 pl-9 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute top-2.5 left-3 size-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-10 pl-9 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-2.5 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/25 transition hover:scale-105"
            >
              {loading ? "Signing in..." : `Sign in as ${selectedRole}`}
            </button>
          </form>
        )}

        {/* 3. EMAIL OTP LOGIN */}
        {authMode === "otp" && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Select Interface Role</label>
              <div className="mt-1.5 grid grid-cols-3 gap-2">
                {(["STUDENT", "INSTRUCTOR", "ADMIN"] as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setSelectedRole(r);
                      setEmail(r === "ADMIN" ? "admin@shannova.com" : r === "INSTRUCTOR" ? "instructor@shannova.com" : "student@shannova.com");
                    }}
                    className={`rounded-xl border py-2 text-xs font-bold capitalize transition ${
                      selectedRole === r
                        ? "border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {r.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
              <div className="relative mt-1">
                <Mail className="absolute top-2.5 left-3 size-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-3 pl-9 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-indigo-500"
              >
                {loading ? "Sending verification code..." : "Send Verification Code"}
              </button>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Enter 6-Digit OTP</label>
                  <div className="relative mt-1">
                    <KeyRound className="absolute top-2.5 left-3 size-4 text-slate-400" />
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="123456"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-3 pl-9 text-center font-mono text-base font-bold tracking-widest text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/25 transition hover:scale-105"
                >
                  {loading ? "Verifying..." : "Verify & Launch Portal"}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Footer Link to Sign Up */}
        <div className="mt-8 border-t border-slate-100 pt-4 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
          Don't have an account?{" "}
          <Link to="/sign-up" className="font-bold text-indigo-600 hover:underline dark:text-indigo-400">
            Create an Account →
          </Link>
        </div>

      </div>
    </div>
  );
}
