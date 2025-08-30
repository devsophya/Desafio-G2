import React, { useState, useCallback } from "react";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { InputField } from "../InputField";
import { InfoCard } from "../../ui/InfoCard";
import type { DocumentType, ValidationResult, FormData } from "../../../types";
import { announceToScreenReader } from "../../../utils/accessibility";
import "./DocumentForm.css";

export interface DocumentFormProps {
  onSubmit?: (data: FormData) => void;
  onSuccess?: () => void;
  initialType?: DocumentType;
  className?: string;
  "data-testid"?: string;
}

/**
 * Componente organismo DocumentForm
 * Formulário completo para cadastro de CPF ou CNPJ
 */
export const DocumentForm: React.FC<DocumentFormProps> = ({
  onSubmit,
  onSuccess,
  initialType = "cpf",
  className = "",
  "data-testid": testId,
}) => {
  const [selectedType, setSelectedType] = useState<DocumentType>(initialType);
  const [documentValue, setDocumentValue] = useState("");
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: false,
    message: "",
    formattedValue: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleTypeChange = useCallback((type: DocumentType) => {
    setSelectedType(type);
    setDocumentValue("");
    setValidationResult({
      isValid: false,
      message: "",
      formattedValue: "",
    });
    setHasSubmitted(false);

    announceToScreenReader(`Tipo alterado para ${type.toUpperCase()}`);
  }, []);

  const handleDocumentChange = useCallback((value: string) => {
    setDocumentValue(value);
    setHasSubmitted(false);
  }, []);

  const handleValidation = useCallback((result: ValidationResult) => {
    setValidationResult(result);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validationResult.isValid) {
      announceToScreenReader("Por favor, corrija os erros antes de enviar");
      return;
    }

    setIsSubmitting(true);
    setHasSubmitted(false);

    try {
      const formData: FormData = {
        selectedType,
        document: {
          type: selectedType,
          value: documentValue,
          isValid: validationResult.isValid,
          formattedValue: validationResult.formattedValue,
        },
      };

      // Simula delay de envio
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSubmit?.(formData);
      setHasSubmitted(true);

      announceToScreenReader(
        `${selectedType.toUpperCase()} cadastrado com sucesso!`
      );

      // Reset automático após sucesso
      resetFormAfterSuccess();
    } catch {
      announceToScreenReader("Erro ao cadastrar documento. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setDocumentValue("");
    setValidationResult({
      isValid: false,
      message: "",
      formattedValue: "",
    });
    setHasSubmitted(false);
    announceToScreenReader("Formulário limpo");
  };

  const resetFormAfterSuccess = () => {
    setTimeout(() => {
      setDocumentValue("");
      setValidationResult({
        isValid: false,
        message: "",
        formattedValue: "",
      });
      setHasSubmitted(false);
      onSuccess?.();
    }, 2000); // Aguarda 2 segundos para mostrar o sucesso
  };

  const canSubmit = validationResult.isValid && !isSubmitting;

  return (
    <div className={`document-form ${className}`} data-testid={testId}>
      <Card variant="elevated" padding="lg" className="document-form__main">
        <div className="document-form__header">
          <h1 className="document-form__title">Cadastro de Documentos</h1>
          <p className="document-form__subtitle">
            Cadastre seu CPF ou CNPJ com validação em tempo real
          </p>
        </div>

        <form onSubmit={handleSubmit} className="document-form__form">
          {/* Seletor de tipo */}
          <fieldset className="document-form__type-selector">
            <legend className="document-form__legend">Tipo de documento</legend>
            <div className="document-form__radio-group" role="radiogroup">
              <label className="document-form__radio">
                <input
                  type="radio"
                  name="documentType"
                  value="cpf"
                  checked={selectedType === "cpf"}
                  onChange={() => handleTypeChange("cpf")}
                  disabled={isSubmitting}
                  aria-describedby="cpf-description"
                />
                <span className="document-form__radio-label">
                  <span className="document-form__radio-title">CPF</span>
                  <span
                    id="cpf-description"
                    className="document-form__radio-desc"
                  >
                    Cadastro de Pessoa Física
                  </span>
                </span>
              </label>

              <label className="document-form__radio">
                <input
                  type="radio"
                  name="documentType"
                  value="cnpj"
                  checked={selectedType === "cnpj"}
                  onChange={() => handleTypeChange("cnpj")}
                  disabled={isSubmitting}
                  aria-describedby="cnpj-description"
                />
                <span className="document-form__radio-label">
                  <span className="document-form__radio-title">CNPJ</span>
                  <span
                    id="cnpj-description"
                    className="document-form__radio-desc"
                  >
                    Cadastro Nacional da Pessoa Jurídica
                  </span>
                </span>
              </label>
            </div>
          </fieldset>

          {/* Campo de entrada */}
          <div className="document-form__input-section">
            <InputField
              label={`Número do ${selectedType.toUpperCase()}`}
              type={selectedType}
              value={documentValue}
              onChange={handleDocumentChange}
              onValidation={handleValidation}
              placeholder={
                selectedType === "cpf" ? "000.000.000-00" : "00.000.000/0000-00"
              }
              required
              disabled={isSubmitting}
              helperText={`Digite o ${selectedType.toUpperCase()} ${
                selectedType === "cpf" ? "sem" : "com ou sem"
              } pontuação`}
              data-testid="document-input"
            />
          </div>

          {/* Botões */}
          <div className="document-form__actions">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isSubmitting || (!documentValue && !hasSubmitted)}
              data-testid="reset-button"
            >
              Limpar
            </Button>

            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              disabled={!canSubmit}
              data-testid="submit-button"
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </div>

          {/* Mensagem de sucesso */}
          {hasSubmitted && (
            <div
              className="document-form__success"
              role="status"
              aria-live="polite"
            >
              <div className="document-form__success-icon" aria-hidden="true">
                ✅
              </div>
              <div className="document-form__success-content">
                <h3 className="document-form__success-title">
                  Documento cadastrado com sucesso!
                </h3>
                <p className="document-form__success-message">
                  {selectedType.toUpperCase()}:{" "}
                  {validationResult.formattedValue}
                </p>
              </div>
            </div>
          )}
        </form>
      </Card>

      {/* Card informativo */}
      <div className="document-form__info">
        <InfoCard
          type={selectedType}
          currentValue={documentValue}
          validationResult={validationResult}
          data-testid="info-card"
        />
      </div>
    </div>
  );
};
