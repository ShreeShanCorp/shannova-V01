/**
 * Guarded stub: real FCM delivery needs a device-token registration flow (browser push
 * permission + storing tokens per user) that doesn't exist in this app yet — that's its
 * own epic. This no-ops with a clear log until that infra lands, so callers can wire the
 * call site now without it silently pretending to work.
 */
export async function sendPushNotification(_userIds: string[], _payload: { title: string; body: string }) {
  const configured = Boolean(process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL);
  if (!configured) {
    console.log("[fcm] skipped: Firebase not configured (FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL unset)");
    return;
  }

  console.log("[fcm] skipped: no device tokens are stored for any user yet");
}
