import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/api/users";
import { useUiStore } from "@/stores/ui-store";

export function useCurrentUser() {
  const activeRole = useUiStore((state) => state.activeRole);

  return useQuery({
    queryKey: ["users", "me", activeRole],
    queryFn: fetchCurrentUser,
    staleTime: 5000,
    retry: 1,
  });
}
