import type { Prisma } from "@prisma/client";

/** Shared include tree for fetching a full Curriculum -> Module -> Week -> Topic -> Resource hierarchy. */
export const curriculumTreeInclude = {
  modules: {
    orderBy: { order: "asc" },
    include: {
      weeks: {
        orderBy: { order: "asc" },
        include: {
          topics: {
            orderBy: { order: "asc" },
            include: {
              resources: { orderBy: { order: "asc" } },
            },
          },
        },
      },
    },
  },
} satisfies Prisma.CurriculumInclude;
