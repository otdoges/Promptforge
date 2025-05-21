import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "./_generated/api";

// Hook to get the current user from Clerk ID
export function useGetUser(clerkId: string | null) {
  return useQuery(api.auth.getUserProfile, { clerkId: clerkId || "" });
}

// Hook to create a project
export function useCreateProject() {
  return useMutation(api.projects.createProject);
}

// Hook to get user's projects
export function useGetProjects(clerkId: string) {
  return useQuery(api.projects.getUserProjects, { clerkId });
}

// Hook to update a project
export function useUpdateProject() {
  return useMutation(api.projects.updateProject);
}

// Hook to delete a project
export function useDeleteProject() {
  return useMutation(api.projects.deleteProject);
}
