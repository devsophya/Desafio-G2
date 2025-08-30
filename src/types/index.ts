// Tipos principais do sistema
export type DocumentType = "cpf" | "cnpj";

// Interface para dados de documento
export interface DocumentData {
  type: DocumentType;
  value: string;
  isValid: boolean;
  formattedValue: string;
}

// Interface para validação
export interface ValidationResult {
  isValid: boolean;
  message: string;
  formattedValue: string;
}

// Interface para componente de entrada
export interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  type: DocumentType;
  onChange: (value: string) => void;
  onValidation: (result: ValidationResult) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  "aria-describedby"?: string;
}

// Interface para card informativo
export interface InfoCardProps {
  type: DocumentType;
  className?: string;
}

// Interface para formulário
export interface FormData {
  selectedType: DocumentType;
  document: DocumentData;
}

// Interface para tema/cores
export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  light: string;
  dark: string;
}

// Interface para eventos de acessibilidade
export interface AccessibilityEvent {
  target: HTMLElement;
  type: "focus" | "blur" | "keydown" | "click";
  key?: string;
}
