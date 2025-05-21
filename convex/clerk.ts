import { Webhook } from "svix"; 
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

// CLERK_WEBHOOK_SECRET is expected to be set in Convex dashboard environment variables

// Define a more specific type for Clerk webhook events if possible
// For now, using 'any' to resolve immediate TypeScript errors
type ClerkWebhookEventData = {
  id?: string;
  email_addresses?: { email_address: string }[];
  first_name?: string | null;
  last_name?: string | null;
  // Add other relevant fields from Clerk's event data structure
};

type ClerkWebhookEvent = {
  data: ClerkWebhookEventData;
  object: string;
  type: string;
};

export default httpAction(async (ctx, request) => {
  // Use the environment variable directly. svix will handle if it's missing/invalid during verification.
  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");
  const payload = await request.text();

  // Convert Headers to a plain object for svix
  const headerMap: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headerMap[key] = value;
  });

  let event: ClerkWebhookEvent; 
  try {
    event = webhook.verify(payload, headerMap) as ClerkWebhookEvent; 
  } catch (err: any) {
    console.error("Webhook verification failed:", err.message);
    return new Response("Webhook verification failed", { status: 400 });
  }

  const eventType = event.type;

  console.log(`Received webhook event: ${eventType}`, event.data);

  try {
    switch (eventType) {
      case "user.created":
        if (!event.data.id || !event.data.email_addresses || event.data.email_addresses.length === 0) {
          console.error("User created event missing id or email address", event.data);
          return new Response("Missing id or email address for user.created event", { status: 400 });
        }
        await ctx.runMutation(api.users.createClerkUser, {
          clerkId: event.data.id!,
          email: event.data.email_addresses[0].email_address,
          name: `${event.data.first_name || ""} ${event.data.last_name || ""}`.trim() || "Anonymous User",
        });
        console.log(`User ${event.data.id} created successfully.`);
        break;
      case "user.updated":
        console.log(`User ${event.data.id} updated.`);
        // Example: Update user's email or name if they changed
        // await ctx.runMutation(api.users.updateClerkUser, { clerkId: event.data.id, ... }); // Ensure updateClerkUser exists and is public if used
        break;
      case "user.deleted":
        if (!event.data.id) {
            console.error("User deleted event missing id", event.data);
            return new Response("Missing id for user.deleted event", { status: 400 });
        }
        await ctx.runMutation(api.users.deleteClerkUser, {
          clerkId: event.data.id!,
        });
        console.log(`User ${event.data.id} deleted successfully.`);
        break;
      default:
        console.log(`Unhandled webhook event type: ${eventType}`);
    }
  } catch (error: any) {
    console.error("Error processing webhook event:", error.message);
    return new Response(`Error processing webhook: ${error.message}`, { status: 500 });
  }

  return new Response("Webhook processed successfully", { status: 200 });
});
