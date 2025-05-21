/**
 * Vibrant color palette for the Vibe Coding app.
 * These colors define the vibrant, energetic feel of the app in both light and dark modes.
 */

// Primary colors
const primaryLight = '#5D3FD3'; // Vibrant purple
const primaryDark = '#9D68FE';  // Lighter purple for dark mode

// Secondary colors
const secondaryLight = '#FF5757'; // Energetic red
const secondaryDark = '#FF7B7B';  // Lighter red for dark mode

// Accent colors
const accentLight = '#00D8FF'; // Bright cyan
const accentDark = '#61EDFF';  // Lighter cyan for dark mode

// Additional colors for UI elements
const successLight = '#05CE91'; // Green for success states
const successDark = '#06F1AB';  // Lighter green for dark mode

export const Colors = {
  light: {
    text: '#2D2D2D',
    background: '#FFFFFF',
    cardBackground: '#F9F9F9',
    tint: primaryLight,
    secondary: secondaryLight,
    accent: accentLight,
    success: successLight,
    icon: '#687076',
    tabIconDefault: '#A8A8A8',
    tabIconSelected: primaryLight,
    divider: '#E9E9E9',
    inputBackground: '#F5F5F5',
    placeholderText: '#AAAAAA',
    buttonText: '#FFFFFF',
  },
  dark: {
    text: '#ECEDEE',
    background: '#121212',
    cardBackground: '#1E1E1E',
    tint: primaryDark,
    secondary: secondaryDark,
    accent: accentDark,
    success: successDark,
    icon: '#9BA1A6',
    tabIconDefault: '#888888',
    tabIconSelected: primaryDark,
    divider: '#2C2C2C',
    inputBackground: '#252525',
    placeholderText: '#777777',
    buttonText: '#FFFFFF',
  },
};
