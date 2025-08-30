import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../components/ui/Card";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de cartão para agrupar conteúdo com diferentes variantes e estilos.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "elevated", "outlined", "ghost"],
      description: "Variante visual do card",
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "Padding interno do card",
    },
    interactive: {
      control: "boolean",
      description: "Card interativo (hover effects)",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3>Título do Card</h3>
        <p>Este é o conteúdo do card padrão com padding médio.</p>
      </div>
    ),
    variant: "default",
    padding: "md",
  },
};

export const Elevated: Story = {
  args: {
    children: (
      <div>
        <h3>Card Elevado</h3>
        <p>Card com sombra para criar sensação de elevação.</p>
      </div>
    ),
    variant: "elevated",
    padding: "md",
  },
};

export const Outlined: Story = {
  args: {
    children: (
      <div>
        <h3>Card com Borda</h3>
        <p>Card com borda mais destacada.</p>
      </div>
    ),
    variant: "outlined",
    padding: "md",
  },
};

export const Interactive: Story = {
  args: {
    children: (
      <div>
        <h3>Card Interativo</h3>
        <p>Passe o mouse para ver o efeito hover.</p>
      </div>
    ),
    variant: "elevated",
    padding: "md",
    interactive: true,
  },
};

export const InfoCard: Story = {
  args: {
    children: (
      <div>
        <h3>💡 Sobre o CPF</h3>
        <p>
          <strong>Formato:</strong> XXX.XXX.XXX-XX
        </p>
        <ul>
          <li>Deve conter exatamente 11 dígitos</li>
          <li>Não pode ter todos os dígitos iguais</li>
          <li>Os dois últimos dígitos são verificadores</li>
        </ul>
      </div>
    ),
    variant: "outlined",
    padding: "lg",
  },
};
