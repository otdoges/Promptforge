import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  // Users table to store user information with Clerk user ID
  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    createdAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  // Projects table to store user's project data
  projects: defineTable({
    name: v.string(),
    description: v.string(),
    template: v.object({
      id: v.string(),
      name: v.string(),
      category: v.string(),
    }),
    progress: v.number(),
    createdAt: v.number(),
    lastEdited: v.number(),
    userId: v.string(), // Reference to users table
  }).index("by_user", ["userId"])
    .index("by_creation_time", ["createdAt"]),
});
