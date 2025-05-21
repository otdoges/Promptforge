import { Webhook } from "svix";
import { v } from "convex/values";
import { action, mutation } from "./_generated/server";

export const handleClerkWebhook = action({
  args: {
    headers: v.any(),
    payload: v.string(),
    webhookSecret: v.string(),
  },
  async handler(ctx, args) {
    const { payload, headers, webhookSecret } = args;

    // Verify the webhook signature
    const wh = new Webhook(webhookSecret);
    let evt: any;
    
    try {
      evt = wh.verify(payload, headers as Record<string, string>);
    } catch (err) {
      console.error("Webhook verification failed", err);
      return { status: 400, body: "Webhook verification failed" };
    }

    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name } = evt.data;
      const email = email_addresses && email_addresses[0]?.email_address;
      const name = [first_name, last_name].filter(Boolean).join(" ");

      // Store the user data in your database
      await ctx.runMutation(createClerkUser, {
        clerkId: id,
        email: email || "",
        name: name || "Anonymous User",
      });
    }

    if (eventType === "user.deleted") {
      // Delete the user from your database
      await ctx.runMutation(deleteClerkUser, {
        clerkId: id
      });

    }

    return { status: 200, body: "Webhook processed" };
  },
});
