
/**
 * zsee IoT Theme - Chakra UI Export
 * 
 * This file exports all theme colors in a format compatible with Chakra UI.
 * Use this file to maintain consistent branding across projects using Chakra UI.
 */

import { iotColors, cssVariables } from './ThemeExport';

/**
 * Theme colors formatted for Chakra UI
 */
export const chakraColors = {
  // Brand colors
  brand: {
    primary: iotColors.primary, // #0070f3
    secondary: iotColors.secondary, // #00a2ff
    accent: iotColors.accent, // #00d5bd
    dark: iotColors.dark, // #111827
    light: iotColors.light, // #f3f4f6
  },
  
  // Semantic colors for actions
  action: {
    submit: iotColors.primary, // #0070f3
    delete: "hsl(0, 84.2%, 60.2%)", // from destructive
    warning: "#f59e0b", // amber color
    info: iotColors.secondary, // #00a2ff
    success: iotColors.accent, // #00d5bd
  },
  
  // UI Component colors mapping
  components: {
    // Button colors
    button: {
      primary: iotColors.primary,
      secondary: iotColors.secondary,
      accent: iotColors.accent,
      danger: "hsl(0, 84.2%, 60.2%)",
      ghost: "transparent",
    },
    
    // Card colors
    card: {
      bg: "hsl(0, 0%, 100%)", // light mode card
      bgDark: "hsl(222.2, 84%, 4.9%)", // dark mode card
      border: "hsl(214.3, 31.8%, 91.4%)", // light mode border
      borderDark: "hsl(217.2, 32.6%, 17.5%)", // dark mode border
    },
    
    // Form elements
    form: {
      input: "hsl(214.3, 31.8%, 91.4%)",
      focus: iotColors.primary,
      placeholder: "hsl(215.4, 16.3%, 46.9%)",
    },
    
    // Table colors
    table: {
      header: "hsl(210, 40%, 96.1%)",
      headerDark: "hsl(217.2, 32.6%, 17.5%)",
      row: "hsl(0, 0%, 100%)",
      rowDark: "hsl(222.2, 84%, 4.9%)",
      rowAlt: "hsl(210, 40%, 98%)",
      rowAltDark: "hsl(223, 47%, 11%)",
      border: "hsl(214.3, 31.8%, 91.4%)",
    },
    
    // Navigation colors
    nav: {
      bg: "white",
      bgDark: "hsl(222.2, 84%, 4.9%)",
      active: iotColors.primary,
      hover: "hsl(210, 40%, 96.1%)",
      hoverDark: "hsl(217.2, 32.6%, 17.5%)",
    },
    
    // Toast/alert colors
    toast: {
      info: iotColors.secondary,
      success: iotColors.accent,
      warning: "#f59e0b",
      error: "hsl(0, 84.2%, 60.2%)",
    },
    
    // Icon colors
    icon: {
      primary: iotColors.primary,
      secondary: iotColors.secondary,
      accent: iotColors.accent,
      muted: "hsl(215.4, 16.3%, 46.9%)",
      danger: "hsl(0, 84.2%, 60.2%)",
    },
  },
  
  // Base semantic colors (light theme)
  light: {
    text: {
      primary: "hsl(222.2, 84%, 4.9%)",
      secondary: "hsl(215.4, 16.3%, 46.9%)",
      accent: iotColors.primary,
    },
    background: {
      primary: "hsl(210, 40%, 98%)",
      secondary: "hsl(210, 40%, 96.1%)",
    },
    border: "hsl(214.3, 31.8%, 91.4%)",
  },
  
  // Base semantic colors (dark theme)
  dark: {
    text: {
      primary: "hsl(210, 40%, 98%)",
      secondary: "hsl(215, 20.2%, 65.1%)",
      accent: iotColors.primary,
    },
    background: {
      primary: "hsl(222.2, 84%, 4.9%)",
      secondary: "hsl(217.2, 32.6%, 17.5%)",
    },
    border: "hsl(217.2, 32.6%, 17.5%)",
  },
};

/**
 * Creates a complete Chakra UI theme object with the zsee IoT colors
 * 
 * Usage example:
 * 
 * import { ChakraProvider, extendTheme } from "@chakra-ui/react";
 * import { createChakraTheme } from "./path/to/ChakraThemeExport";
 * 
 * const theme = extendTheme(createChakraTheme());
 * 
 * function App() {
 *   return (
 *     <ChakraProvider theme={theme}>
 *       <YourApp />
 *     </ChakraProvider>
 *   );
 * }
 */
export const createChakraTheme = () => {
  return {
    colors: chakraColors,
    config: {
      initialColorMode: "light",
      useSystemColorMode: false,
    },
    styles: {
      global: (props: any) => ({
        body: {
          bg: props.colorMode === "dark" 
            ? chakraColors.dark.background.primary 
            : chakraColors.light.background.primary,
          color: props.colorMode === "dark"
            ? chakraColors.dark.text.primary
            : chakraColors.light.text.primary,
        },
      }),
    },
    components: {
      Button: {
        baseStyle: {
          fontWeight: "semibold",
          borderRadius: "md",
        },
        variants: {
          solid: (props: any) => ({
            bg: props.colorMode === "dark" 
              ? chakraColors.components.button.primary
              : chakraColors.components.button.primary,
            color: "white",
            _hover: {
              bg: "blue.600",
              _disabled: {
                bg: "blue.300",
              },
            },
          }),
          outline: (props: any) => ({
            bg: "transparent",
            border: "1px solid",
            borderColor: chakraColors.components.button.primary,
            color: props.colorMode === "dark" 
              ? chakraColors.components.button.primary
              : chakraColors.components.button.primary,
            _hover: {
              bg: props.colorMode === "dark" 
                ? "whiteAlpha.200"
                : "blue.50",
            },
          }),
          danger: {
            bg: chakraColors.components.button.danger,
            color: "white",
            _hover: {
              bg: "red.600",
              _disabled: {
                bg: "red.300",
              },
            },
          },
          ghost: (props: any) => ({
            color: props.colorMode === "dark"
              ? "whiteAlpha.900"
              : "gray.800",
            _hover: {
              bg: props.colorMode === "dark"
                ? "whiteAlpha.200"
                : "gray.100",
            },
          }),
        },
        defaultProps: {
          variant: "solid",
          size: "md",
        },
      },
      Card: {
        baseStyle: (props: any) => ({
          container: {
            bg: props.colorMode === "dark" 
              ? chakraColors.components.card.bgDark
              : chakraColors.components.card.bg,
            borderColor: props.colorMode === "dark"
              ? chakraColors.components.card.borderDark
              : chakraColors.components.card.border,
          },
        }),
      },
    },
  };
};

/**
 * Sample usage for Chakra UI global theme object
 */
export const ChakraUIUsageGuide = `
// 1. Import necessary Chakra UI components
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createChakraTheme } from "./path/to/ChakraThemeExport";

// 2. Create extended theme with zsee IoT colors
const theme = extendTheme(createChakraTheme());

// 3. Use the theme in your app
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

// 4. Access theme colors in components
// Example with styled component:
import { Button, Box } from "@chakra-ui/react";

function MyComponent() {
  return (
    <>
      <Button colorScheme="brand">Brand Button</Button>
      <Box bg="brand.primary" color="white" p={4}>
        This box uses the brand primary color
      </Box>
    </>
  );
}
`;

/**
 * Color tokens reference for each UI element and component
 */
export const componentColorReference = {
  buttons: {
    primary: chakraColors.components.button.primary,
    secondary: chakraColors.components.button.secondary,
    accent: chakraColors.components.button.accent,
    danger: chakraColors.components.button.danger,
    ghost: chakraColors.components.button.ghost,
  },
  cards: {
    background: chakraColors.components.card.bg,
    backgroundDark: chakraColors.components.card.bgDark,
    border: chakraColors.components.card.border,
    borderDark: chakraColors.components.card.borderDark,
  },
  forms: {
    input: chakraColors.components.form.input,
    focus: chakraColors.components.form.focus,
    placeholder: chakraColors.components.form.placeholder,
  },
  tables: {
    header: chakraColors.components.table.header,
    headerDark: chakraColors.components.table.headerDark,
    row: chakraColors.components.table.row,
    rowDark: chakraColors.components.table.rowDark,
    rowAlt: chakraColors.components.table.rowAlt,
    rowAltDark: chakraColors.components.table.rowAltDark,
    border: chakraColors.components.table.border,
  },
  navigation: {
    background: chakraColors.components.nav.bg,
    backgroundDark: chakraColors.components.nav.bgDark,
    active: chakraColors.components.nav.active,
    hover: chakraColors.components.nav.hover,
    hoverDark: chakraColors.components.nav.hoverDark,
  },
  toast: {
    info: chakraColors.components.toast.info,
    success: chakraColors.components.toast.success,
    warning: chakraColors.components.toast.warning,
    error: chakraColors.components.toast.error,
  },
  icons: {
    primary: chakraColors.components.icon.primary,
    secondary: chakraColors.components.icon.secondary,
    accent: chakraColors.components.icon.accent,
    muted: chakraColors.components.icon.muted,
    danger: chakraColors.components.icon.danger,
  },
};
