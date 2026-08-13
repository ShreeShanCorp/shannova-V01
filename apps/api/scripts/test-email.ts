import "dotenv/config";
import { sendOtpEmail, sendNotificationEmail } from "../src/lib/email.js";

async function runTest() {
  const targetEmail = process.argv[2] || process.env.EMAIL_USER || "shannovaotpsender@gmail.com";
  console.log(`\n📧 Testing Shan Nova Email Sender to: ${targetEmail}`);
  console.log(`Sender: ${process.env.EMAIL_USER}`);

  // Test 1: Send 6-Digit OTP
  const sampleOtp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`\n1. Sending Test OTP: ${sampleOtp}...`);
  const otpSent = await sendOtpEmail(targetEmail, sampleOtp, "Test User");

  if (otpSent) {
    console.log("✅ OTP Email delivered successfully!");
  } else {
    console.error("❌ Failed to deliver OTP email. Check your EMAIL_USER and EMAIL_PASS in .env");
  }

  // Test 2: Send Live Class Notification Email
  console.log("\n2. Sending Test Notification Email...");
  const notifSent = await sendNotificationEmail(
    targetEmail,
    "Live Masterclass Reminder: PostgreSQL & ACID Transactions",
    "Upcoming Live Masterclass Today at 2:00 PM UTC",
    "Your instructor Sarah Jenkins will be hosting a 70% hands-on practical session covering PostgreSQL indexing, query optimization, and transaction isolation.",
    "http://localhost:5173/student",
    "Join Live Class"
  );

  if (notifSent) {
    console.log("✅ Notification Email delivered successfully!\n");
  } else {
    console.error("❌ Failed to deliver Notification email.\n");
  }
}

runTest();
