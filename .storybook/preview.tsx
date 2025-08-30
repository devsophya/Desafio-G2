import type { Preview } from "@storybook/react-vite";
import React from "react";
import { ThemeProvider } from "../src/contexts/ThemeContext";
import { NotificationProvider } from "../src/contexts/NotificationContext";

// Importar estilos globais
import "../src/styles/variables.css";
import "../src/styles/base.css";
import "../src/styles/app.css";

// Decorator global para providers
const withProviders = (Story: any) => (
  <ThemeProvider defaultTheme="light">
    <NotificationProvider>
      <div style={{ padding: "1rem", minHeight: "200px" }}>
        <Story />
      </div>
    </NotificationProvider>
  </ThemeProvider>
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#1a202c",
        },
      ],
    },
    a11y: {
      test: "todo",
    },
    docs: {
      story: {
        inline: true,
      },
    },
  },
  decorators: [withProviders],
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light Mode" },
          { value: "dark", title: "Dark Mode" },
        ],
        showName: true,
      },
    },
  },
};

export default preview;
