import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../components/ui/Input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de entrada de dados com suporte a diferentes tipos e estados.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel"],
      description: "Tipo do input",
    },
    placeholder: {
      control: "text",
      description: "Texto de placeholder",
    },
    disabled: {
      control: "boolean",
      description: "Estado desabilitado",
    },
    error: {
      control: "boolean",
      description: "Estado de erro",
    },
    success: {
      control: "boolean",
      description: "Estado de sucesso",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Digite algo...",
    type: "text",
  },
};

export const WithValue: Story = {
  args: {
    value: "Valor preenchido",
    placeholder: "Digite algo...",
    type: "text",
  },
};

export const Error: Story = {
  args: {
    placeholder: "Campo com erro",
    error: true,
    type: "text",
  },
};

export const Success: Story = {
  args: {
    placeholder: "Campo válido",
    success: true,
    type: "text",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Campo desabilitado",
    disabled: true,
    type: "text",
  },
};

export const CPFFormat: Story = {
  args: {
    placeholder: "000.000.000-00",
    type: "text",
    maxLength: 14,
  },
};

export const CNPJFormat: Story = {
  args: {
    placeholder: "00.000.000/0000-00",
    type: "text",
    maxLength: 18,
  },
};
