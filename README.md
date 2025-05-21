# Vibe Coding - AI-Powered App Creator 💻✨

Vibe Coding is a mobile application built with React Native and Expo that helps developers create apps faster with AI assistance. This platform allows users to browse app templates, chat with AI for coding help, and manage their projects all in one place.

![Vibe Coding App](https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbW1lcmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60)

## Features

- **Template Gallery**: Browse and select from various app templates
- **AI Chat Interface**: Get coding assistance from AI models
- **Project Management**: Create, organize, and track your app projects
- **Code Editor**: Edit your code with syntax highlighting
- **Multiple AI Models**: Access different GitHub AI models for various tasks
- **System Prompts**: Use specialized prompts for UI design, state management, and more

## Tech Stack

- React Native & Expo
- TypeScript
- Expo Router for navigation
- Reanimated for animations
- Gradient UI components
- Haptic feedback

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. Open the app on your preferred platform:
   - iOS simulator
   - Android emulator
   - Expo Go on your physical device

## Project Structure

```
/app
  /(tabs)         # Main tab navigation
    index.tsx     # Home screen with templates and projects
    explore.tsx   # AI tools and chat interface
    projects/     # Project management screen
  /project        # Project detail screens
  /new-project    # Project creation screen
/components
  /Chat           # AI chat interface components
  /Templates      # Template card components
  /ui             # Reusable UI components
/constants        # Colors, mock data, and system prompts
```

## Main Screens

### Home
The home screen displays recent projects and popular templates. Users can quickly create a new project or continue working on existing ones.

### AI Tools
The AI Tools tab provides access to different GitHub AI models and system prompts. Users can chat with AI to get coding assistance and app development guidance.

### Projects
The Projects tab allows users to view, filter, and manage their app projects. Progress tracking and quick actions are available for each project.

### Project Detail
The project detail screen shows information about the selected project, including components, deployment options, and settings.

### Code Editor
The code editor provides a mobile-friendly way to edit code with syntax highlighting, line numbers, and AI assistance.

## Customization

You can customize the app by:

1. Adding new templates in `constants/MockData.ts`
2. Creating new system prompts in `constants/SystemPrompt.ts`
3. Modifying the UI components in the `components/ui` directory

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
