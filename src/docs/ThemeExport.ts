
/**
 * zsee IoT Theme Export
 * 
 * This file contains all the theme-related variables and configurations
 * for easy export to other projects.
 */

/**
 * CSS Variables for Light and Dark Mode
 */
export const cssVariables = {
  light: {
    background: "210 40% 98%",
    foreground: "222.2 84% 4.9%",
    card: "0 0% 100%",
    cardForeground: "222.2 84% 4.9%",
    popover: "0 0% 100%",
    popoverForeground: "222.2 84% 4.9%",
    primary: "214 100% 50%",
    primaryForeground: "210 40% 98%",
    secondary: "210 80% 50%",
    secondaryForeground: "210 40% 98%",
    muted: "210 40% 96.1%",
    mutedForeground: "215.4 16.3% 46.9%",
    accent: "174 100% 42%",
    accentForeground: "222.2 47.4% 11.2%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "210 40% 98%",
    border: "214.3 31.8% 91.4%",
    input: "214.3 31.8% 91.4%",
    ring: "214 100% 50%",
    radius: "0.5rem",
  },
  dark: {
    background: "222.2 84% 4.9%",
    foreground: "210 40% 98%",
    card: "222.2 84% 4.9%",
    cardForeground: "210 40% 98%",
    popover: "222.2 84% 4.9%",
    popoverForeground: "210 40% 98%",
    primary: "214 100% 50%",
    primaryForeground: "222.2 47.4% 11.2%",
    secondary: "210 80% 50%",
    secondaryForeground: "210 40% 98%",
    muted: "217.2 32.6% 17.5%",
    mutedForeground: "215 20.2% 65.1%",
    accent: "174 100% 42%",
    accentForeground: "210 40% 98%",
    destructive: "0 62.8% 30.6%",
    destructiveForeground: "210 40% 98%",
    border: "217.2 32.6% 17.5%",
    input: "217.2 32.6% 17.5%",
    ring: "214 100% 50%",
  }
};

/**
 * IoT-specific colors
 */
export const iotColors = {
  primary: "#0070f3",
  secondary: "#00a2ff",
  accent: "#00d5bd",
  dark: "#111827",
  light: "#f3f4f6",
};

/**
 * Animations
 */
export const animations = {
  keyframes: {
    accordionDown: {
      from: { height: "0" },
      to: { height: "var(--radix-accordion-content-height)" },
    },
    accordionUp: {
      from: { height: "var(--radix-accordion-content-height)" },
      to: { height: "0" },
    },
    pulseSlow: {
      "0%, 100%": { opacity: "1" },
      "50%": { opacity: "0.8" },
    },
    float: {
      "0%, 100%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-10px)" },
    },
    pulse: {
      "0%": {
        transform: "scale(0.95)",
        boxShadow: "0 0 0 0 rgba(0, 208, 56, 0.7)",
      },
      "70%": {
        transform: "scale(1)",
        boxShadow: "0 0 0 10px rgba(0, 208, 56, 0)",
      },
      "100%": {
        transform: "scale(0.95)",
        boxShadow: "0 0 0 0 rgba(0, 208, 56, 0)",
      },
    },
  },
  animation: {
    accordionDown: "accordion-down 0.2s ease-out",
    accordionUp: "accordion-up 0.2s ease-out",
    pulseSlow: "pulse-slow 3s ease-in-out infinite",
    float: "float 6s ease-in-out infinite",
  },
};

/**
 * Generates CSS variables for the theme
 */
export const generateCssVariables = () => {
  return `
    :root {
      --background: ${cssVariables.light.background};
      --foreground: ${cssVariables.light.foreground};

      --card: ${cssVariables.light.card};
      --card-foreground: ${cssVariables.light.cardForeground};

      --popover: ${cssVariables.light.popover};
      --popover-foreground: ${cssVariables.light.popoverForeground};

      --primary: ${cssVariables.light.primary};
      --primary-foreground: ${cssVariables.light.primaryForeground};

      --secondary: ${cssVariables.light.secondary};
      --secondary-foreground: ${cssVariables.light.secondaryForeground};

      --muted: ${cssVariables.light.muted};
      --muted-foreground: ${cssVariables.light.mutedForeground};

      --accent: ${cssVariables.light.accent};
      --accent-foreground: ${cssVariables.light.accentForeground};

      --destructive: ${cssVariables.light.destructive};
      --destructive-foreground: ${cssVariables.light.destructiveForeground};

      --border: ${cssVariables.light.border};
      --input: ${cssVariables.light.input};
      --ring: ${cssVariables.light.ring};

      --radius: ${cssVariables.light.radius};
    }

    .dark {
      --background: ${cssVariables.dark.background};
      --foreground: ${cssVariables.dark.foreground};

      --card: ${cssVariables.dark.card};
      --card-foreground: ${cssVariables.dark.cardForeground};

      --popover: ${cssVariables.dark.popover};
      --popover-foreground: ${cssVariables.dark.popoverForeground};

      --primary: ${cssVariables.dark.primary};
      --primary-foreground: ${cssVariables.dark.primaryForeground};

      --secondary: ${cssVariables.dark.secondary};
      --secondary-foreground: ${cssVariables.dark.secondaryForeground};

      --muted: ${cssVariables.dark.muted};
      --muted-foreground: ${cssVariables.dark.mutedForeground};

      --accent: ${cssVariables.dark.accent};
      --accent-foreground: ${cssVariables.dark.accentForeground};

      --destructive: ${cssVariables.dark.destructive};
      --destructive-foreground: ${cssVariables.dark.destructiveForeground};

      --border: ${cssVariables.dark.border};
      --input: ${cssVariables.dark.input};
      --ring: ${cssVariables.dark.ring};
    }
  `;
};

/**
 * Generates the tailwind.config.ts content for the theme
 */
export const generateTailwindConfig = () => {
  return `
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        // IoT Platform colors
        iot: {
          primary: '${iotColors.primary}',
          secondary: '${iotColors.secondary}',
          accent: '${iotColors.accent}',
          dark: '${iotColors.dark}',
          light: '${iotColors.light}',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
  `;
};
