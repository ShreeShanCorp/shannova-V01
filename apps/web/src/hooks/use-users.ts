import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/api/users";

/** ADMIN only. */
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers({ pageSize: 200 }),
  });
}
