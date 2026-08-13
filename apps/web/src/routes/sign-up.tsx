import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Rocket, 
  GraduationCap, 
  UserCheck, 
  ShieldCheck, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { useUiStore } from "@/stores/ui-store";
import type { Role } from "@/types/api";
import { httpClient } from "@/lib/api-client";

export const Route = createFileRoute("/sign-up")({
  component: SignUpPage,
});

function SignUpPage() {
  const navigate = useNavigate();
  const { setActiveRole } = useUiStore();

  const [role, setRole] = useState<Role>("STUDENT");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roleOptions: { role: Role; title: string; description: string; icon: React.ElementType }[] = [
    {
      role: "STUDENT",
      title: "Student",
      description: "Learn full-stack curriculum, complete coding drills & projects",
      icon: GraduationCap,
    },
    {
      role: "INSTRUCTOR",
      title: "Instructor",
      description: "Host live classes, grade submissions, review projects",
      icon: UserCheck,
    },
    {
      role: "ADMIN",
      title: "Admin",
      description: "Manage cohorts, build curricula, monitor DB health",
      icon: ShieldCheck,
    },
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await httpClient.post("/auth/register", {
        email,
        password,
        firstName,
        lastName,
        role,
      });

      if (res.data?.data?.token) {
        localStorage.setItem("kickstart_token", res.data.data.token);
      }

      setActiveRole(role);
      const target = role === "ADMIN" ? "/admin" : role === "INSTRUCTOR" ? "/instructor" : "/student";
      navigate({ to: target as any });
    } catch (err: any) {
      setError(err.response?.data?.error?.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafbfc] px-4 py-12 dark:bg-[#090d16]">
      {/* Background Glow */}
      <div className="pointer-events-none fixed top-1/4 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/10 blur-3xl" />

      <div className="w-full max-w-xl rounded-3xl border border-slate-200/80 bg-white p-8 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900">
        
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
          <h1 className="mt-4 text-2xl font-black text-slate-900 dark:text-white">Create your account</h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Join the 90-Day Full-Stack Web Development Program.
          </p>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-800 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800">
            <AlertCircle className="size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          
          {/* Role Picker */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Choose Your Account Type</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {roleOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = role === opt.role;
                return (
                  <button
                    key={opt.role}
                    type="button"
                    onClick={() => setRole(opt.role)}
                    className={`flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/70 text-indigo-600 shadow-sm dark:bg-indigo-950/60 dark:text-indigo-300"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400"
                    }`}
                  >
                    <Icon className="size-5" />
                    <span className="mt-1 text-xs font-bold">{opt.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Names */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">First Name</label>
              <div className="relative mt-1">
                <User className="absolute top-2.5 left-3 size-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Alex"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-3 pl-9 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Last Name</label>
              <input
                type="text"
                placeholder="Rivera"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
            <div className="relative mt-1">
              <Mail className="absolute top-2.5 left-3 size-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-3 pl-9 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute top-2.5 left-3 size-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                placeholder="••••••••"
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
            className="mt-2 w-full rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/25 transition hover:scale-105"
          >
            {loading ? "Creating Account..." : `Register as ${role} & Launch Portal →`}
          </button>
        </form>

        {/* Footer Link to Sign In */}
        <div className="mt-8 border-t border-slate-100 pt-4 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
          Already have an account?{" "}
          <Link to="/sign-in" className="font-bold text-indigo-600 hover:underline dark:text-indigo-400">
            Sign In →
          </Link>
        </div>

      </div>
    </div>
  );
}
