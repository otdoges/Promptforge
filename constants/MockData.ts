import { Template } from '@/components/Templates/TemplateCard';

export const TEMPLATES: Template[] = [
  {
    id: '1',
    name: 'E-Commerce App',
    description: 'A complete mobile shopping experience with product listings, cart, and checkout.',
    imageUri: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbW1lcmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    tags: ['Shopping', 'Payments', 'Products'],
    category: 'Commerce',
  },
  {
    id: '2',
    name: 'Social Media Feed',
    description: 'Create a social platform with posts, comments, likes, and user profiles.',
    imageUri: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c29jaWFsJTIwbWVkaWF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    tags: ['Social', 'Feed', 'Profiles'],
    category: 'Social',
  },
  {
    id: '3',
    name: 'Task Manager',
    description: 'Organize your work with tasks, projects, reminders, and progress tracking.',
    imageUri: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFzayUyMG1hbmFnZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    tags: ['Productivity', 'Tasks', 'Projects'],
    category: 'Productivity',
  },
  {
    id: '4',
    name: 'Weather App',
    description: 'Check current conditions and forecasts with beautiful visualizations.',
    imageUri: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    tags: ['Weather', 'Forecast', 'Map'],
    category: 'Utility',
  },
  {
    id: '5',
    name: 'Fitness Tracker',
    description: 'Monitor workouts, set goals, and track your progress over time.',
    imageUri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zml0bmVzcyUyMHRyYWNrZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    tags: ['Health', 'Fitness', 'Tracking'],
    category: 'Health',
  },
  {
    id: '6',
    name: 'Chat Messenger',
    description: 'Connect with friends and colleagues through instant messaging.',
    imageUri: 'https://images.unsplash.com/photo-1611746869696-b7e8716eda3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhdCUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    tags: ['Chat', 'Messaging', 'Social'],
    category: 'Communication',
  },
  {
    id: '7',
    name: 'Photo Gallery',
    description: 'Organize, edit, and share your photos with friends and family.',
    imageUri: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FsbGVyeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    tags: ['Photos', 'Gallery', 'Sharing'],
    category: 'Media',
  },
  {
    id: '8',
    name: 'Restaurant Finder',
    description: 'Discover new places to eat with reviews, menus, and reservations.',
    imageUri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    tags: ['Food', 'Reviews', 'Maps'],
    category: 'Food & Drink',
  },
];

export const SYSTEM_PROMPTS = [
  {
    id: '1',
    name: 'General App Builder',
    content: 'You are an expert app developer specializing in React Native and Expo. Your task is to help create mobile applications based on user requirements. Provide detailed guidance on component structure, styling, and functionality. When generating code, ensure it is well-documented, follows best practices, and is optimized for mobile performance.',
  },
  {
    id: '2',
    name: 'UI/UX Expert',
    content: 'You are a UI/UX specialist for mobile app design. Help users create beautiful, intuitive interfaces for their applications. Provide advice on layout, color schemes, typography, and interaction design. When suggesting designs, consider accessibility, usability, and current design trends while maintaining a unique and appealing aesthetic.',
  },
  {
    id: '3',
    name: 'State Management Coach',
    content: 'You are an expert in state management for React Native applications. Help users implement efficient state management solutions using tools like Redux, Context API, or MobX. Provide guidance on structuring application state, handling side effects, and ensuring performant state updates across the application.',
  },
  {
    id: '4',
    name: 'API Integration Helper',
    content: 'You are specialized in connecting mobile apps to backend services and APIs. Help users implement data fetching, authentication, and real-time updates in their apps. Provide guidance on RESTful and GraphQL APIs, handling loading and error states, and efficiently caching data for optimal user experience.',
  },
  {
    id: '5',
    name: 'Animation Specialist',
    content: 'You are an animation and interaction specialist for mobile apps. Help users create fluid, engaging animations that enhance the user experience without compromising performance. Provide code examples using libraries like React Native Reanimated and guidance on implementing gestures, transitions, and micro-interactions.',
  },
];

export const PROJECTS = [
  {
    id: '1',
    name: 'My Shopping App',
    description: 'E-commerce platform with product listings and cart',
    lastEdited: new Date('2025-05-18T14:30:00'),
    template: TEMPLATES[0],
    progress: 65,
  },
  {
    id: '2',
    name: 'TaskMaster Pro',
    description: 'Personal task manager with projects and reminders',
    lastEdited: new Date('2025-05-19T10:15:00'),
    template: TEMPLATES[2],
    progress: 30,
  },
];
