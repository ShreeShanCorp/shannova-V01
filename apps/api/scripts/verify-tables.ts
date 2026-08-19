import { prisma } from "../src/lib/prisma.js";

async function verifyAllTables() {
  console.log("Checking all 23 database models/tables...\n");
  const models = [
    { name: "User", fn: () => prisma.user.count() },
    { name: "Cohort", fn: () => prisma.cohort.count() },
    { name: "Enrollment", fn: () => prisma.enrollment.count() },
    { name: "Curriculum", fn: () => prisma.curriculum.count() },
    { name: "Module", fn: () => prisma.module.count() },
    { name: "Week", fn: () => prisma.week.count() },
    { name: "Topic", fn: () => prisma.topic.count() },
    { name: "TopicProgress", fn: () => prisma.topicProgress.count() },
    { name: "Resource", fn: () => prisma.resource.count() },
    { name: "Class", fn: () => prisma.class.count() },
    { name: "Attendance", fn: () => prisma.attendance.count() },
    { name: "Task", fn: () => prisma.task.count() },
    { name: "Submission", fn: () => prisma.submission.count() },
    { name: "MockTest", fn: () => prisma.mockTest.count() },
    { name: "Question", fn: () => prisma.question.count() },
    { name: "TestAttempt", fn: () => prisma.testAttempt.count() },
    { name: "InterviewSlot", fn: () => prisma.interviewSlot.count() },
    { name: "InterviewFeedback", fn: () => prisma.interviewFeedback.count() },
    { name: "Project", fn: () => prisma.project.count() },
    { name: "Milestone", fn: () => prisma.milestone.count() },
    { name: "ChatThread", fn: () => prisma.chatThread.count() },
    { name: "Message", fn: () => prisma.message.count() },
    { name: "Notification", fn: () => prisma.notification.count() },
  ];

  let successCount = 0;
  for (const { name, fn } of models) {
    try {
      const count = await fn();
      console.log(`  ✅ ${name.padEnd(20)}: ${count} rows`);
      successCount++;
    } catch (err: any) {
      console.log(`  ❌ ${name.padEnd(20)}: ERROR - ${err.message?.split("\n")[0]}`);
    }
  }

  console.log(`\nResult: ${successCount}/${models.length} tables verified & synchronized successfully.`);
  await prisma.$disconnect();
}

verifyAllTables();
