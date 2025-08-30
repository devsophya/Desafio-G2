import type { Meta, StoryObj } from "@storybook/react";
import { NotificationItem } from "../components/ui/NotificationItem";
import { NotificationProvider } from "../contexts/NotificationContext";

const meta = {
  title: "UI/NotificationItem",
  component: NotificationItem,
  decorators: [
    (Story) => (
      <NotificationProvider>
        <div style={{ maxWidth: "400px" }}>
          <Story />
        </div>
      </NotificationProvider>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de item de notificação com diferentes tipos e fechamento automático.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    notification: {
      control: "object",
      description: "Objeto da notificação",
    },
  },
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    notification: {
      id: "1",
      type: "success",
      title: "CPF cadastrado com sucesso!",
      message: "Documento: 123.456.789-09",
      duration: 5000,
    },
  },
};

export const Error: Story = {
  args: {
    notification: {
      id: "2",
      type: "error",
      title: "Documento inválido",
      message: "Por favor, verifique os dados inseridos e tente novamente.",
      duration: 7000,
    },
  },
};

export const Warning: Story = {
  args: {
    notification: {
      id: "3",
      type: "warning",
      title: "Atenção",
      message: "Verifique se o documento está correto antes de continuar.",
      duration: 5000,
    },
  },
};

export const Info: Story = {
  args: {
    notification: {
      id: "4",
      type: "info",
      title: "Informação",
      message: "Este é um exemplo de notificação informativa.",
      duration: 5000,
    },
  },
};

export const Persistent: Story = {
  args: {
    notification: {
      id: "5",
      type: "error",
      title: "Erro crítico",
      message: "Esta notificação não fecha automaticamente.",
      persistent: true,
    },
  },
};

export const WithoutMessage: Story = {
  args: {
    notification: {
      id: "6",
      type: "success",
      title: "Operação concluída",
      duration: 3000,
    },
  },
};
