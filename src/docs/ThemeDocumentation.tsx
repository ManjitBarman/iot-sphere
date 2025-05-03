
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ThemeDocumentation() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">zsee IoT Theme Documentation</h1>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="usage">Usage Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The zsee IoT theme is designed for IoT dashboards and monitoring applications.
                It uses a clean, modern design language with a focus on readability and usability.
              </p>
              <p>
                The theme is built on Tailwind CSS and includes custom variables for colors,
                spacing, typography, and component styles.
              </p>
              <h3 className="text-xl font-medium mt-4">Key Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Light and dark mode support</li>
                <li>IoT-specific color palette</li>
                <li>Custom component styles</li>
                <li>Responsive design</li>
                <li>Custom animations and transitions</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">The theme includes the following color variables:</p>
              
              <h3 className="font-medium text-lg mb-2">Light Theme Colors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="h-10 bg-background border rounded-md mb-1"></div>
                  <p className="text-sm">--background: 210 40% 98%</p>
                </div>
                <div>
                  <div className="h-10 bg-foreground border rounded-md mb-1"></div>
                  <p className="text-sm">--foreground: 222.2 84% 4.9%</p>
                </div>
                <div>
                  <div className="h-10 bg-card border rounded-md mb-1"></div>
                  <p className="text-sm">--card: 0 0% 100%</p>
                </div>
                <div>
                  <div className="h-10 bg-primary border rounded-md mb-1"></div>
                  <p className="text-sm">--primary: 214 100% 50%</p>
                </div>
                <div>
                  <div className="h-10 bg-secondary border rounded-md mb-1"></div>
                  <p className="text-sm">--secondary: 210 80% 50%</p>
                </div>
                <div>
                  <div className="h-10 bg-muted border rounded-md mb-1"></div>
                  <p className="text-sm">--muted: 210 40% 96.1%</p>
                </div>
                <div>
                  <div className="h-10 bg-accent border rounded-md mb-1"></div>
                  <p className="text-sm">--accent: 174 100% 42%</p>
                </div>
                <div>
                  <div className="h-10 bg-destructive border rounded-md mb-1"></div>
                  <p className="text-sm">--destructive: 0 84.2% 60.2%</p>
                </div>
              </div>

              <h3 className="font-medium text-lg mb-2">Dark Theme Colors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 dark">
                <div>
                  <div className="h-10 bg-background border rounded-md mb-1"></div>
                  <p className="text-sm">--background: 222.2 84% 4.9%</p>
                </div>
                <div>
                  <div className="h-10 bg-foreground border rounded-md mb-1"></div>
                  <p className="text-sm">--foreground: 210 40% 98%</p>
                </div>
                <div>
                  <div className="h-10 bg-card border rounded-md mb-1"></div>
                  <p className="text-sm">--card: 222.2 84% 4.9%</p>
                </div>
                <div>
                  <div className="h-10 bg-primary border rounded-md mb-1"></div>
                  <p className="text-sm">--primary: 214 100% 50%</p>
                </div>
                <div>
                  <div className="h-10 bg-secondary border rounded-md mb-1"></div>
                  <p className="text-sm">--secondary: 210 80% 50%</p>
                </div>
                <div>
                  <div className="h-10 bg-muted border rounded-md mb-1"></div>
                  <p className="text-sm">--muted: 217.2 32.6% 17.5%</p>
                </div>
                <div>
                  <div className="h-10 bg-accent border rounded-md mb-1"></div>
                  <p className="text-sm">--accent: 174 100% 42%</p>
                </div>
                <div>
                  <div className="h-10 bg-destructive border rounded-md mb-1"></div>
                  <p className="text-sm">--destructive: 0 62.8% 30.6%</p>
                </div>
              </div>

              <h3 className="font-medium text-lg mb-2">IoT-specific Colors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="h-10 bg-[#0070f3] rounded-md mb-1"></div>
                  <p className="text-sm">iot-primary: #0070f3</p>
                </div>
                <div>
                  <div className="h-10 bg-[#00a2ff] rounded-md mb-1"></div>
                  <p className="text-sm">iot-secondary: #00a2ff</p>
                </div>
                <div>
                  <div className="h-10 bg-[#00d5bd] rounded-md mb-1"></div>
                  <p className="text-sm">iot-accent: #00d5bd</p>
                </div>
                <div>
                  <div className="h-10 bg-[#111827] rounded-md mb-1"></div>
                  <p className="text-sm">iot-dark: #111827</p>
                </div>
                <div>
                  <div className="h-10 bg-[#f3f4f6] rounded-md mb-1"></div>
                  <p className="text-sm">iot-light: #f3f4f6</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-medium text-lg mb-2">Font Settings</h3>
              <p>
                The theme uses the default system font stack from Tailwind CSS.
              </p>
              <div className="space-y-4 mt-4">
                <div>
                  <h1 className="text-4xl font-bold">Heading 1</h1>
                  <p className="text-sm text-muted-foreground">text-4xl font-bold</p>
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Heading 2</h2>
                  <p className="text-sm text-muted-foreground">text-3xl font-bold</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Heading 3</h3>
                  <p className="text-sm text-muted-foreground">text-2xl font-bold</p>
                </div>
                <div>
                  <h4 className="text-xl font-medium">Heading 4</h4>
                  <p className="text-sm text-muted-foreground">text-xl font-medium</p>
                </div>
                <div>
                  <p className="text-base">Body text</p>
                  <p className="text-sm text-muted-foreground">text-base</p>
                </div>
                <div>
                  <p className="text-sm">Small text</p>
                  <p className="text-sm text-muted-foreground">text-sm</p>
                </div>
                <div>
                  <p className="text-xs">Extra small text</p>
                  <p className="text-sm text-muted-foreground">text-xs</p>
                </div>
              </div>
              
              <h3 className="font-medium text-lg mt-6 mb-2">Special Text Classes</h3>
              <div className="space-y-4">
                <div>
                  <p className="gradient-text text-2xl font-bold">Gradient Text</p>
                  <p className="text-sm text-muted-foreground">class: gradient-text</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Component Styles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-2">Cards</h3>
                <div className="widget-card p-4">
                  <p>Standard Widget Card</p>
                  <p className="text-sm text-muted-foreground">class: widget-card</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Animations</h3>
                <div className="space-y-2">
                  <div className="data-pulse p-4 bg-card rounded-md">
                    Data Pulse Animation
                    <p className="text-sm text-muted-foreground">class: data-pulse</p>
                  </div>
                  <div className="animate-pulse-slow p-4 bg-card rounded-md">
                    Slow Pulse Animation
                    <p className="text-sm text-muted-foreground">class: animate-pulse-slow</p>
                  </div>
                  <div className="animate-float p-4 bg-card rounded-md">
                    Float Animation
                    <p className="text-sm text-muted-foreground">class: animate-float</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Layouts</h3>
                <div className="widget-grid min-h-[200px] border rounded-md p-2">
                  <div className="p-2 border rounded bg-muted/20">Grid Item 1</div>
                  <div className="p-2 border rounded bg-muted/20">Grid Item 2</div>
                  <div className="p-2 border rounded bg-muted/20">Grid Item 3</div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">class: widget-grid</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>How to Use This Theme</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium text-lg mb-2">Step 1: Copy the CSS Variables</h3>
              <p className="mb-4">
                Add the following CSS variables to your project's CSS file:
              </p>
              <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
{`@layer base {
  :root {
    --background: 210 40% 98%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 214 100% 50%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 80% 50%;
    --secondary-foreground: 210 40% 98%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 174 100% 42%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 214 100% 50%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 214 100% 50%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 210 80% 50%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 174 100% 42%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 214 100% 50%;
  }
}`}
              </pre>

              <h3 className="font-medium text-lg mt-6 mb-2">Step 2: Copy the Base Styles</h3>
              <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
{`@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  .gradient-text {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-iot-primary via-iot-secondary to-iot-accent;
  }

  .section {
    @apply py-16 md:py-24;
  }
}`}
              </pre>

              <h3 className="font-medium text-lg mt-6 mb-2">Step 3: Copy the Animation Styles</h3>
              <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
{`.hero-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230070f3' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
}

.blur-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  z-index: -1;
  opacity: 0.5;
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
    background-position: 0% 50%;
  }
  50% {
    opacity: 0.8;
    background-position: 100% 50%;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 8s infinite;
}

/* Dashboard specific styles */
.widget-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.widget-card {
  @apply bg-card border rounded-lg shadow-sm overflow-hidden transition-all duration-200;
}

.widget-card:hover {
  @apply shadow-md;
}

.widget-card.dragging {
  @apply opacity-70 border-dashed border-2 border-primary;
}

.edit-mode .widget-card {
  @apply cursor-move border-dashed border-2;
}

/* IoT specific elements */
.data-pulse {
  @apply relative;
}

.data-pulse::after {
  content: '';
  @apply absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 208, 56, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 208, 56, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 208, 56, 0);
  }
}`}
              </pre>

              <h3 className="font-medium text-lg mt-6 mb-2">Step 4: Update Tailwind Config</h3>
              <p>Add the following to your tailwind.config.js or tailwind.config.ts file:</p>
              <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
{`import type { Config } from "tailwindcss";

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
          primary: '#0070f3',
          secondary: '#00a2ff',
          accent: '#00d5bd',
          dark: '#111827',
          light: '#f3f4f6',
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
} satisfies Config;`}
              </pre>

              <h3 className="font-medium text-lg mt-6 mb-2">Step 5: Setup Theme Provider</h3>
              <p>
                Copy the ThemeProvider component for light/dark mode functionality:
              </p>
              <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
{`import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
