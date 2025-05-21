import { v, ConvexError } from "convex/values";
import { internalMutation, query, QueryCtx, MutationCtx } from "./_generated/server";

export async function getUser(
  ctx: QueryCtx | MutationCtx,
  clerkId: string | null
) {
  if (!clerkId) {
    return null;
  }

  // Query for user based on clerkId
  return await ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("clerkId"), clerkId))
    .unique();
}

// Helper to verify a user exists
export async function validateUser(
  ctx: QueryCtx | MutationCtx, 
  clerkId: string | null
) {
  const user = await getUser(ctx, clerkId);
  if (!user) {
    throw new ConvexError("User not found");
  }
  return user;
}

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
  },
  async handler(ctx, args) {
    // Check if user already exists
    const existingUser = await getUser(ctx, args.clerkId);
    if (existingUser) {
      return existingUser._id;
    }

    // Create new user
    return await ctx.db.insert("users", {
      clerkId: args.clerkId,
      name: args.name,
      email: args.email,
      createdAt: Date.now(),
    });
  },
});

export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    const user = await getUser(ctx, args.clerkId);
    if (user) {
      // Delete the user document
      await ctx.db.delete(user._id);
    }
  },
});

export const getUserProfile = query({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    return await getUser(ctx, args.clerkId);
  },
});
