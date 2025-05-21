import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new user from Clerk webhook data
export const createClerkUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
  },
  async handler(ctx, args) {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();
      
    if (existingUser) {
      return existingUser._id;
    }
    
    // Create new user record
    return await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      name: args.name,
      createdAt: Date.now(),
    });
  },
});

// Delete a user based on Clerk ID
export const deleteClerkUser = mutation({
  args: {
    clerkId: v.string(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();
      
    if (user) {
      await ctx.db.delete(user._id);
      return { success: true };
    }
    
    return { success: false, message: "User not found" };
  },
});

// Get a user by Clerk ID
export const getUserByClerkId = query({
  args: {
    clerkId: v.string(),
  },
  async handler(ctx, args) {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();
  },
});
