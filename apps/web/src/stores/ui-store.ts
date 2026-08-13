import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Role } from "@/types/api";

interface UiState {
  sidebarCollapsed: boolean;
  theme: "light" | "dark";
  activeRole: Role;
  toggleSidebar: () => void;
  setTheme: (theme: "light" | "dark") => void;
  setActiveRole: (role: Role) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      theme: "light",
      activeRole: "STUDENT",
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setTheme: (theme) => {
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        set({ theme });
      },
      setActiveRole: (activeRole) => set({ activeRole }),
    }),
    { name: "shannova-ui" },
  ),
);
