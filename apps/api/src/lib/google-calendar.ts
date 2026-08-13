import { randomUUID } from "node:crypto";
import { google } from "googleapis";

interface CreateMeetEventInput {
  summary: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  attendeeEmails: string[];
}

interface CreateMeetEventResult {
  eventId: string;
  meetUrl: string | null;
}

function getOAuthClient() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) return null;

  const client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
  client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
  return client;
}

/** Returns null (not an error) when Google Calendar isn't configured yet — callers
 * should still create the Class record with meetingUrl left null in that case. */
export async function createMeetEvent(input: CreateMeetEventInput): Promise<CreateMeetEventResult | null> {
  const auth = getOAuthClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!auth || !calendarId) return null;

  const calendar = google.calendar({ version: "v3", auth });

  const { data } = await calendar.events.insert({
    calendarId,
    conferenceDataVersion: 1,
    requestBody: {
      summary: input.summary,
      description: input.description,
      start: { dateTime: input.startTime.toISOString() },
      end: { dateTime: input.endTime.toISOString() },
      attendees: input.attendeeEmails.map((email) => ({ email })),
      conferenceData: {
        createRequest: {
          requestId: randomUUID(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
  });

  return {
    eventId: data.id ?? "",
    meetUrl: data.hangoutLink ?? null,
  };
}

export async function deleteMeetEvent(eventId: string): Promise<void> {
  const auth = getOAuthClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!auth || !calendarId || !eventId) return;

  const calendar = google.calendar({ version: "v3", auth });
  await calendar.events.delete({ calendarId, eventId }).catch(() => {
    // Best-effort cleanup; a missing/already-deleted event isn't worth failing the request over.
  });
}

export function isGoogleCalendarConfigured(): boolean {
  return getOAuthClient() !== null && Boolean(process.env.GOOGLE_CALENDAR_ID);
}
