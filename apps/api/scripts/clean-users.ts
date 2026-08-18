import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function cleanUserData() {
  console.log("Cleaning all user accounts and dependent user records...");

  try {
    // 1. Delete dependent user activity records
    await prisma.submission.deleteMany({});
    await prisma.attendance.deleteMany({});
    await prisma.testAttempt.deleteMany({});
    await prisma.interviewFeedback.deleteMany({});
    await prisma.interviewSlot.deleteMany({});
    await prisma.project.deleteMany({});
    await prisma.message.deleteMany({});
    await prisma.notification.deleteMany({});
    await prisma.topicProgress.deleteMany({});
    await prisma.enrollment.deleteMany({});
    await prisma.class.deleteMany({}); // Delete old scheduled classes referencing old instructors

    // 2. Delete all user accounts
    const deletedUsers = await prisma.user.deleteMany({});

    console.log(`✅ Successfully deleted ${deletedUsers.count} user accounts.`);
    console.log("Database is clean and ready for fresh user sign-ups!");
  } catch (error) {
    console.error("❌ Error cleaning user data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanUserData();
