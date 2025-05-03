
/**
 * zsee IoT Chakra UI Theme
 * 
 * This file provides a complete Chakra UI theme configuration including
 * colors, component styles, and variants for both light and dark modes.
 * 
 * Usage:
 * 1. Import this file into your Chakra UI project
 * 2. Use with ChakraProvider's theme prop:
 *    <ChakraProvider theme={zseeTheme}>...</ChakraProvider>
 */

// Base Colors
const colors = {
  iot: {
    primary: '#0070f3',
    secondary: '#00a2ff',
    accent: '#00d5bd',
    dark: '#111827',
    light: '#f3f4f6',
  },
  action: {
    submit: '#0070f3',
    delete: "hsl(0, 84.2%, 60.2%)", // destructive red
    warning: "#f59e0b", // amber color
    info: "#00a2ff", // secondary blue
    success: "#00d5bd", // accent teal
  }
};

// Component-specific colors
const componentColors = {
  // Button colors
  button: {
    primary: colors.iot.primary,
    secondary: colors.iot.secondary,
    accent: colors.iot.accent,
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
    focus: colors.iot.primary,
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
    active: colors.iot.primary,
    hover: "hsl(210, 40%, 96.1%)",
    hoverDark: "hsl(217.2, 32.6%, 17.5%)",
  },
    
  // Toast/alert colors
  toast: {
    info: colors.iot.secondary,
    success: colors.iot.accent,
    warning: "#f59e0b",
    error: "hsl(0, 84.2%, 60.2%)",
  },
    
  // Icon colors
  icon: {
    primary: colors.iot.primary,
    secondary: colors.iot.secondary,
    accent: colors.iot.accent,
    muted: "hsl(215.4, 16.3%, 46.9%)",
    danger: "hsl(0, 84.2%, 60.2%)",
  },
};

// Semantic colors for light/dark modes
const semanticColors = {
  light: {
    text: {
      primary: "hsl(222.2, 84%, 4.9%)",
      secondary: "hsl(215.4, 16.3%, 46.9%)",
      accent: colors.iot.primary,
    },
    background: {
      primary: "hsl(210, 40%, 98%)",
      secondary: "hsl(210, 40%, 96.1%)",
    },
    border: "hsl(214.3, 31.8%, 91.4%)",
  },
  dark: {
    text: {
      primary: "hsl(210, 40%, 98%)",
      secondary: "hsl(215, 20.2%, 65.1%)",
      accent: colors.iot.primary,
    },
    background: {
      primary: "hsl(222.2, 84%, 4.9%)",
      secondary: "hsl(217.2, 32.6%, 17.5%)",
    },
    border: "hsl(217.2, 32.6%, 17.5%)",
  },
};

// Font configuration
const fonts = {
  body: 'Inter, system-ui, sans-serif',
  heading: 'Inter, system-ui, sans-serif',
  mono: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace',
};

// Combine all colors for the theme
const themeColors = {
  brand: {
    primary: colors.iot.primary,
    secondary: colors.iot.secondary,
    accent: colors.iot.accent,
    dark: colors.iot.dark,
    light: colors.iot.light,
  },
  ...colors.action,
  ...componentColors,
  ...semanticColors,
};

// Button component theme
const Button = {
  baseStyle: {
    fontWeight: "semibold",
    borderRadius: "md",
  },
  variants: {
    solid: (props) => ({
      bg: props.colorMode === "dark" 
        ? themeColors.brand.primary
        : themeColors.brand.primary,
      color: "white",
      _hover: {
        bg: "blue.600",
        _disabled: {
          bg: "blue.300",
        },
      },
    }),
    outline: (props) => ({
      bg: "transparent",
      border: "1px solid",
      borderColor: themeColors.brand.primary,
      color: props.colorMode === "dark" 
        ? themeColors.brand.primary
        : themeColors.brand.primary,
      _hover: {
        bg: props.colorMode === "dark" 
          ? "whiteAlpha.200"
          : "blue.50",
      },
    }),
    danger: {
      bg: themeColors.button.danger,
      color: "white",
      _hover: {
        bg: "red.600",
        _disabled: {
          bg: "red.300",
        },
      },
    },
    ghost: (props) => ({
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
};

// Card component theme
const Card = {
  baseStyle: (props) => ({
    container: {
      bg: props.colorMode === "dark" 
        ? componentColors.card.bgDark
        : componentColors.card.bg,
      borderColor: props.colorMode === "dark"
        ? componentColors.card.borderDark
        : componentColors.card.border,
    },
  }),
};

// Input component theme
const Input = {
  baseStyle: (props) => ({
    field: {
      borderColor: props.colorMode === "dark"
        ? semanticColors.dark.border
        : semanticColors.light.border,
      _focus: {
        borderColor: themeColors.brand.primary,
        boxShadow: `0 0 0 1px ${themeColors.brand.primary}`,
      },
    },
  }),
};

// Table component theme
const Table = {
  baseStyle: (props) => ({
    th: {
      bg: props.colorMode === "dark"
        ? componentColors.table.headerDark
        : componentColors.table.header,
    },
    tr: {
      _odd: {
        bg: props.colorMode === "dark"
          ? componentColors.table.rowDark
          : componentColors.table.row,
      },
      _even: {
        bg: props.colorMode === "dark"
          ? componentColors.table.rowAltDark
          : componentColors.table.rowAlt,
      },
    },
  }),
};

// Complete Chakra UI theme object
const zseeTheme = {
  colors: themeColors,
  fonts,
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" 
          ? semanticColors.dark.background.primary 
          : semanticColors.light.background.primary,
        color: props.colorMode === "dark"
          ? semanticColors.dark.text.primary
          : semanticColors.light.text.primary,
      },
    }),
  },
  components: {
    Button,
    Card,
    Input,
    Table,
  },
};

export default zseeTheme;
