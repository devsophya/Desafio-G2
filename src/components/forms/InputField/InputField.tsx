import React, { useId, useState, useEffect } from "react";
import { Input } from "../../ui/Input";
import { ValidationService } from "../../../services/validationService";
import type { DocumentType, ValidationResult } from "../../../types";
import { announceToScreenReader } from "../../../utils/accessibility";
import "./InputField.css";

export interface InputFieldProps {
  label: string;
  type: DocumentType;
  value: string;
  onChange: (value: string) => void;
  onValidation: (result: ValidationResult) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  error?: string;
  "data-testid"?: string;
}

/**
 * Componente molecular InputField
 * Combina Input com label, validação e feedback visual
 */
export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  onValidation,
  placeholder,
  required = false,
  disabled = false,
  helperText,
  error,
  "data-testid": testId,
}) => {
  const inputId = useId();
  const helperId = useId();
  const errorId = useId();

  const [internalValue, setInternalValue] = useState(value);
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: false,
    message: "",
    formattedValue: "",
  });
  const [hasBeenBlurred, setHasBeenBlurred] = useState(false);

  // Sincroniza valor interno com prop externa
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Valida quando valor muda
  useEffect(() => {
    if (internalValue) {
      const result = ValidationService.validateDocument(internalValue, type);
      setValidationResult(result);
      onValidation(result);
    } else {
      const emptyResult = {
        isValid: false,
        message: required ? `${type.toUpperCase()} é obrigatório` : "",
        formattedValue: "",
      };
      setValidationResult(emptyResult);
      onValidation(emptyResult);
    }
  }, [internalValue, type, required, onValidation]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const maskedValue = ValidationService.applyMask(rawValue, type);

    setInternalValue(maskedValue);
    onChange(maskedValue);
  };

  const handleBlur = () => {
    setHasBeenBlurred(true);

    // Anuncia resultado da validação para leitores de tela
    if (validationResult.message) {
      announceToScreenReader(validationResult.message);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Permite apenas números e teclas de controle
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
    ];

    if (allowedKeys.includes(event.key)) {
      return;
    }

    // Permite Ctrl+A, Ctrl+C, Ctrl+V, etc.
    if (event.ctrlKey || event.metaKey) {
      return;
    }

    // Permite apenas números
    if (!/\d/.test(event.key)) {
      event.preventDefault();
    }
  };

  const showError =
    hasBeenBlurred &&
    (error || (!validationResult.isValid && validationResult.message));
  const showSuccess =
    hasBeenBlurred && !error && validationResult.isValid && internalValue;

  const inputVariant = showError
    ? "error"
    : showSuccess
    ? "success"
    : "default";
  const maxLength = type === "cpf" ? 14 : 18; // Com formatação

  return (
    <div className="input-field">
      <label htmlFor={inputId} className="input-field__label">
        {label}
        {required && (
          <span className="input-field__required" aria-label="obrigatório">
            *
          </span>
        )}
      </label>

      <div className="input-field__wrapper">
        <Input
          id={inputId}
          value={internalValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          variant={inputVariant}
          fullWidth
          maxLength={maxLength}
          autoComplete="off"
          aria-describedby={`${helperId} ${errorId}`}
          aria-invalid={showError ? "true" : "false"}
          data-testid={testId}
        />

        {/* Indicador visual de status */}
        <div className="input-field__status" aria-hidden="true">
          {showSuccess && (
            <svg
              className="input-field__icon input-field__icon--success"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}

          {showError && (
            <svg
              className="input-field__icon input-field__icon--error"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Texto de ajuda */}
      {helperText && !showError && (
        <p id={helperId} className="input-field__helper">
          {helperText}
        </p>
      )}

      {/* Mensagem de erro */}
      {showError && (
        <p
          id={errorId}
          className="input-field__error"
          role="alert"
          aria-live="polite"
        >
          {error || validationResult.message}
        </p>
      )}

      {/* Mensagem de sucesso */}
      {showSuccess && (
        <p className="input-field__success" role="status" aria-live="polite">
          {validationResult.message}
        </p>
      )}
    </div>
  );
};
