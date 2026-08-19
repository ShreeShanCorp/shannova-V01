import { prisma } from "../src/lib/prisma.js";

async function main() {
  console.log("Testing connection to PostgreSQL...");
  try {
    const userCount = await prisma.user.count();
    const cohortCount = await prisma.cohort.count();
    const curriculumCount = await prisma.curriculum.count();
    const taskCount = await prisma.task.count();

    console.log("✅ Database Connected Successfully!");
    console.log(`- Users in DB: ${userCount}`);
    console.log(`- Cohorts in DB: ${cohortCount}`);
    console.log(`- Curricula in DB: ${curriculumCount}`);
    console.log(`- Tasks in DB: ${taskCount}`);
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
