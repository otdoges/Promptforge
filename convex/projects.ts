import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";
import { validateUser } from "./auth";

export const createProject = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    template: v.object({
      id: v.string(),
      name: v.string(),
      category: v.string(),
    }),
    clerkId: v.string(),
  },
  async handler(ctx, args) {
    // Validate user exists first
    const user = await validateUser(ctx, args.clerkId);

    // Create new project
    return await ctx.db.insert("projects", {
      name: args.name,
      description: args.description,
      template: args.template,
      progress: 0,
      createdAt: Date.now(),
      lastEdited: Date.now(),
      userId: user._id,
    });
  },
});

export const getUserProjects = query({
  args: {
    clerkId: v.string(),
  },
  async handler(ctx, args) {
    // Validate user exists
    const user = await validateUser(ctx, args.clerkId);

    // Get all projects for the user
    return await ctx.db
      .query("projects")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();
  },
});

export const updateProject = mutation({
  args: {
    projectId: v.id("projects"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    progress: v.optional(v.number()),
    clerkId: v.string(),
  },
  async handler(ctx, args) {
    // Validate user exists
    const user = await validateUser(ctx, args.clerkId);

    // Get the project
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new ConvexError("Project not found");
    }

    // Verify project belongs to this user
    if (project.userId !== user._id) {
      throw new ConvexError("Unauthorized: This project doesn't belong to you");
    }

    // Update fields that were provided
    const updates: any = {
      lastEdited: Date.now(),
    };

    if (args.name !== undefined) updates.name = args.name;
    if (args.description !== undefined) updates.description = args.description;
    if (args.progress !== undefined) updates.progress = args.progress;

    // Update the project
    await ctx.db.patch(args.projectId, updates);
    return args.projectId;
  },
});

export const deleteProject = mutation({
  args: {
    projectId: v.id("projects"),
    clerkId: v.string(),
  },
  async handler(ctx, args) {
    // Validate user exists
    const user = await validateUser(ctx, args.clerkId);

    // Get the project
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new ConvexError("Project not found");
    }

    // Verify project belongs to this user
    if (project.userId !== user._id) {
      throw new ConvexError("Unauthorized: This project doesn't belong to you");
    }

    // Delete the project
    await ctx.db.delete(args.projectId);
    return args.projectId;
  },
});
