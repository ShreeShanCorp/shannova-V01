import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { useState, useRef, useEffect } from "react";
import { useUiStore } from "@/stores/ui-store";
import { useCurrentUser } from "@/hooks/use-current-user";
import type { Role } from "@/types/api";
import { 
  Rocket, 
  GraduationCap, 
  ShieldCheck, 
  UserCheck, 
  Moon, 
  Sun,
  LayoutDashboard,
  BookOpen,
  FileCode,
  Calendar,
  Layers,
  FileCheck2,
  Database,
  ChevronDown,
  User,
  LogOut,
  FolderGit2,
  Sparkles
} from "lucide-react";

type LinkToProp = ComponentProps<typeof Link>["to"];

interface AppNavItem {
  to: LinkToProp;
  label: string;
  exact?: boolean;
}

export function AppNav({ items }: { items?: AppNavItem[] }) {
  const { activeRole, setActiveRole, theme, setTheme } = useUiStore();
  const { data: dbUser } = useCurrentUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouterState();
  const navigate = useNavigate();
  const currentPath = router.location.pathname;

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = dbUser ? `${dbUser.firstName || ""} ${dbUser.lastName || ""}`.trim() || dbUser.email : null;
  const displayEmail = dbUser?.email;

  const roles: { role: Role; label: string; email: string; icon: React.ElementType }[] = [
    { role: "STUDENT", label: "Student", email: "student@shannova.com", icon: GraduationCap },
    { role: "INSTRUCTOR", label: "Instructor", email: "instructor@shannova.com", icon: UserCheck },
    { role: "ADMIN", label: "Admin", email: "admin@shannova.com", icon: ShieldCheck },
  ];

  const currentRoleInfo = roles.find((r) => r.role === activeRole) || roles[0];

  // Role-specific isolated navigation links
  const studentNav: AppNavItem[] = [
    { to: "/student", label: "Dashboard", exact: true },
    { to: "/student/curriculum", label: "Curriculum" },
    { to: "/student/tasks", label: "Drills & Tasks" },
  ];

  const instructorNav: AppNavItem[] = [
    { to: "/instructor", label: "Dashboard", exact: true },
    { to: "/instructor/classes", label: "Live Classes" },
    { to: "/instructor/tasks", label: "Grading Queue" },
  ];

  const adminNav: AppNavItem[] = [
    { to: "/admin", label: "Dashboard", exact: true },
    { to: "/admin/cohorts", label: "Cohorts" },
    { to: "/admin/curriculum", label: "Curriculum Builder" },
  ];

  let roleNav: AppNavItem[] = [];
  if (currentPath.startsWith("/student")) {
    roleNav = studentNav;
  } else if (currentPath.startsWith("/instructor")) {
    roleNav = instructorNav;
  } else if (currentPath.startsWith("/admin")) {
    roleNav = adminNav;
  } else if (items && items.length > 0) {
    roleNav = items;
  }

  const handleSignOut = () => {
    localStorage.removeItem("shannova_token");
    localStorage.removeItem("kickstart_token");
    setDropdownOpen(false);
    navigate({ to: "/sign-in" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl transition-all dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="size-5" />
            </div>
            <div>
              <div className="text-base font-black tracking-tight text-slate-900 dark:text-white">
                Shan<span className="text-indigo-600 dark:text-indigo-400">Nova</span>
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                LMS Platform
              </div>
            </div>
          </Link>

          {/* Dynamic Role Badges */}
          {activeRole && (
            <span className="hidden items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50/80 px-2.5 py-1 text-[11px] font-bold text-indigo-700 sm:inline-flex dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300">
              <span className="size-1.5 rounded-full bg-indigo-600 animate-pulse" />
              {activeRole} MODE
            </span>
          )}
        </div>

        {/* Dynamic Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {roleNav.map((item) => (
            <Link
              key={typeof item.to === "string" ? item.to : item.label}
              to={item.to}
              activeOptions={item.exact ? { exact: true } : undefined}
              className="rounded-lg px-3.5 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 data-[status=active]:bg-indigo-50 data-[status=active]:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white dark:data-[status=active]:bg-indigo-950/60 dark:data-[status=active]:text-indigo-400"
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Tools & Account Menu */}
        <div className="flex items-center gap-3">
          
          {/* Direct Authentication Actions */}
          {!dbUser && (
            <Link
              to="/sign-in"
              className="rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-xs font-bold text-indigo-700 transition hover:bg-indigo-100 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300"
            >
              Sign In
            </Link>
          )}

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4" />}
          </button>

          {/* Account Profile & Mode Switcher Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 pr-2.5 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
              <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs">
                {(displayName ? displayName.charAt(0) : activeRole.charAt(0)).toUpperCase()}
              </div>
              <div className="hidden text-left sm:block">
                <div className="text-[11px] font-bold text-slate-900 dark:text-white truncate max-w-[140px]">
                  {displayName || `${currentRoleInfo?.label || "User"}`}
                </div>
                <div className="text-[9px] text-slate-400 truncate max-w-[140px]">
                  {displayEmail || "Account Portal"}
                </div>
              </div>
              <ChevronDown className="size-3.5 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {displayName || "Registered User"}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {displayEmail || "Signed In"}
                  </div>
                </div>

                <div className="mt-1 space-y-1">
                  <div className="px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Active Portal
                  </div>
                  {roles.map(({ role, label, icon: Icon }) => (
                    <Link
                      key={role}
                      to={role === "ADMIN" ? "/admin" : role === "INSTRUCTOR" ? "/instructor" : "/student"}
                      onClick={() => {
                        setActiveRole(role);
                        setDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition ${
                        activeRole === role
                          ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="size-4" />
                        <div>
                          <div>{label}</div>
                        </div>
                      </div>
                      {activeRole === role && (
                        <span className="size-1.5 rounded-full bg-indigo-600" />
                      )}
                    </Link>
                  ))}
                </div>

                <div className="mt-2 border-t border-slate-100 pt-1 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 dark:hover:bg-rose-950/30"
                  >
                    <LogOut className="size-3.5" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
