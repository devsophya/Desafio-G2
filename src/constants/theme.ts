/**
 * Tema baseado na identidade visual da G2
 * Paleta de cores derivada do azul principal #1BA3C4
 */

export const G2_COLORS = {
  // Azul principal da G2
  primary: "#1BA3C4",
  primaryDark: "#148FA8",
  primaryLight: "#4BB8D1",
  primaryLighter: "#7BCBDE",
  primaryLightest: "#B5E0EB",

  // Tons complementares
  secondary: "#2C5282",
  secondaryLight: "#4A90B8",

  // Status colors harmonizadas com o azul G2
  success: "#10B981",
  successLight: "#D1FAE5",
  successDark: "#047857",

  error: "#EF4444",
  errorLight: "#FEE2E2",
  errorDark: "#DC2626",

  warning: "#F59E0B",
  warningLight: "#FEF3C7",
  warningDark: "#D97706",

  info: "#1BA3C4", // Usando o azul G2 como cor de info
  infoLight: "#E0F2FE",
  infoDark: "#0369A1",

  // Neutros
  gray: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
  },

  // Cores especiais
  white: "#FFFFFF",
  black: "#000000",

  // Gradientes
  gradients: {
    primary: "linear-gradient(135deg, #1BA3C4 0%, #4BB8D1 100%)",
    secondary: "linear-gradient(135deg, #2C5282 0%, #4A90B8 100%)",
    background: "linear-gradient(135deg, #F8FAFC 0%, #E0F2FE 100%)",
    backgroundDark: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
  },
} as const;

export const THEME_CONFIG = {
  light: {
    primary: G2_COLORS.primary,
    primaryDark: G2_COLORS.primaryDark,
    primaryLight: G2_COLORS.primaryLight,
    secondary: G2_COLORS.secondary,

    background: G2_COLORS.white,
    backgroundSecondary: G2_COLORS.gray[50],
    backgroundTertiary: G2_COLORS.gray[100],

    surface: G2_COLORS.white,
    surfaceElevated: G2_COLORS.white,

    text: G2_COLORS.gray[900],
    textSecondary: G2_COLORS.gray[600],
    textTertiary: G2_COLORS.gray[500],
    textInverse: G2_COLORS.white,

    border: G2_COLORS.gray[200],
    borderLight: G2_COLORS.gray[100],
    borderDark: G2_COLORS.gray[300],

    success: G2_COLORS.success,
    successLight: G2_COLORS.successLight,
    error: G2_COLORS.error,
    errorLight: G2_COLORS.errorLight,
    warning: G2_COLORS.warning,
    warningLight: G2_COLORS.warningLight,
    info: G2_COLORS.info,
    infoLight: G2_COLORS.infoLight,

    shadow: "rgba(15, 23, 42, 0.1)",
    shadowMd: "rgba(15, 23, 42, 0.15)",
    shadowLg: "rgba(15, 23, 42, 0.2)",
  },

  dark: {
    primary: G2_COLORS.primaryLight,
    primaryDark: G2_COLORS.primary,
    primaryLight: G2_COLORS.primaryLighter,
    secondary: G2_COLORS.secondaryLight,

    background: G2_COLORS.gray[900],
    backgroundSecondary: G2_COLORS.gray[800],
    backgroundTertiary: G2_COLORS.gray[700],

    surface: G2_COLORS.gray[800],
    surfaceElevated: G2_COLORS.gray[700],

    text: G2_COLORS.gray[50],
    textSecondary: G2_COLORS.gray[300],
    textTertiary: G2_COLORS.gray[400],
    textInverse: G2_COLORS.gray[900],

    border: G2_COLORS.gray[600],
    borderLight: G2_COLORS.gray[700],
    borderDark: G2_COLORS.gray[500],

    success: G2_COLORS.success,
    successLight: "rgba(16, 185, 129, 0.1)",
    error: G2_COLORS.error,
    errorLight: "rgba(239, 68, 68, 0.1)",
    warning: G2_COLORS.warning,
    warningLight: "rgba(245, 158, 11, 0.1)",
    info: G2_COLORS.primaryLight,
    infoLight: "rgba(27, 163, 196, 0.1)",

    shadow: "rgba(0, 0, 0, 0.3)",
    shadowMd: "rgba(0, 0, 0, 0.4)",
    shadowLg: "rgba(0, 0, 0, 0.5)",
  },
} as const;

export type ThemeMode = "light" | "dark";
export type ThemeColors = typeof THEME_CONFIG.light;
