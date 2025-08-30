import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { ThemeProvider } from '../contexts/ThemeContext';

const meta = {
  title: 'UI/ThemeToggle',
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente para alternar entre temas claro e escuro da aplicação.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do toggle'
    },
    showLabel: {
      control: 'boolean',
      description: 'Mostrar texto do modo atual'
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado'
    }
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    showLabel: false
  }
};

export const WithLabel: Story = {
  args: {
    size: 'md',
    showLabel: true
  }
};

export const Small: Story = {
  args: {
    size: 'sm',
    showLabel: false
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    showLabel: true
  }
};

export const Disabled: Story = {
  args: {
    size: 'md',
    showLabel: true,
    disabled: true
  }
};
