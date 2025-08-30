import { Card } from "../Card";
import type { DocumentType } from "../../../types";
import "./InfoCard.css";

export interface InfoCardProps {
  type: DocumentType;
  currentValue?: string;
  validationResult?: {
    isValid: boolean;
    message: string;
    formattedValue: string;
  };
  className?: string;
  "data-testid"?: string;
}

/**
 * Dados informativos para CPF e CNPJ
 */
const documentInfo = {
  cpf: {
    title: "Sobre o CPF",
    description: "Cadastro de Pessoa Física",
    format: "000.000.000-00",
    tips: [
      "Deve conter exatamente 11 dígitos",
      "Formato: XXX.XXX.XXX-XX",
      "Não pode ter todos os dígitos iguais",
      "Os dois últimos dígitos são verificadores",
    ],
    examples: ["123.456.789-09", "987.654.321-00"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  cnpj: {
    title: "Sobre o CNPJ",
    description: "Cadastro Nacional da Pessoa Jurídica",
    format: "00.000.000/0000-00",
    tips: [
      "Deve conter exatamente 14 dígitos",
      "Formato: XX.XXX.XXX/XXXX-XX",
      "Não pode ter todos os dígitos iguais",
      "Os dois últimos dígitos são verificadores",
    ],
    examples: ["11.222.333/0001-81", "12.345.678/0001-95"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 7V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="3"
          y="7"
          width="18"
          height="13"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 11H16M8 15H12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};

/**
 * Componente molecular InfoCard
 * Exibe informações e dicas sobre CPF ou CNPJ
 */
export const InfoCard: React.FC<InfoCardProps> = ({
  type,
  currentValue = "",
  validationResult,
  className = "",
  "data-testid": testId,
}) => {
  const info = documentInfo[type];

  // Função para verificar requisitos individuais
  const checkRequirements = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    const expectedLength = type === "cpf" ? 11 : 14;

    return {
      hasCorrectLength: cleanValue.length === expectedLength,
      hasVariedDigits: !/^(\d)\1+$/.test(cleanValue),
      isComplete: cleanValue.length >= expectedLength,
      isFormatted: value.includes(type === "cpf" ? "-" : "/"),
    };
  };

  const requirements = checkRequirements(currentValue);
  const hasValue = currentValue.length > 0;

  return (
    <Card
      variant="outlined"
      padding="md"
      className={`info-card ${className}`}
      data-testid={testId}
      role="complementary"
      aria-label={`Informações sobre ${info.title}`}
    >
      <div className="info-card__header">
        <div className="info-card__icon" aria-hidden="true">
          {info.icon}
        </div>
        <div>
          <h3 className="info-card__title">{info.title}</h3>
          <p className="info-card__description">{info.description}</p>
        </div>
      </div>

      <div className="info-card__content">
        <div className="info-card__section">
          <h4 className="info-card__section-title">Formato</h4>
          <code
            className="info-card__format"
            aria-label={`Formato do ${type.toUpperCase()}: ${info.format}`}
          >
            {info.format}
          </code>
        </div>

        {/* Feedback em tempo real */}
        {hasValue && (
          <div className="info-card__section">
            <h4 className="info-card__section-title">Status da validação</h4>
            <ul className="info-card__requirements" role="list">
              <li
                className={`info-card__requirement ${
                  requirements.hasCorrectLength
                    ? "info-card__requirement--valid"
                    : "info-card__requirement--invalid"
                }`}
              >
                <span
                  className="info-card__requirement-icon"
                  aria-hidden="true"
                >
                  {requirements.hasCorrectLength ? "✓" : "✗"}
                </span>
                {type === "cpf" ? "11 dígitos" : "14 dígitos"} (
                {currentValue.replace(/\D/g, "").length}/
                {type === "cpf" ? "11" : "14"})
              </li>
              <li
                className={`info-card__requirement ${
                  requirements.hasVariedDigits
                    ? "info-card__requirement--valid"
                    : "info-card__requirement--invalid"
                }`}
              >
                <span
                  className="info-card__requirement-icon"
                  aria-hidden="true"
                >
                  {requirements.hasVariedDigits ? "✓" : "✗"}
                </span>
                Dígitos variados (não podem ser todos iguais)
              </li>
              {validationResult && requirements.hasCorrectLength && (
                <li
                  className={`info-card__requirement ${
                    validationResult.isValid
                      ? "info-card__requirement--valid"
                      : "info-card__requirement--invalid"
                  }`}
                >
                  <span
                    className="info-card__requirement-icon"
                    aria-hidden="true"
                  >
                    {validationResult.isValid ? "✓" : "✗"}
                  </span>
                  Dígitos verificadores válidos
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="info-card__section">
          <h4 className="info-card__section-title">Dicas importantes</h4>
          <ul className="info-card__tips" role="list">
            {info.tips.map((tip, index) => (
              <li key={index} className="info-card__tip">
                <span className="info-card__tip-icon" aria-hidden="true">
                  ✓
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="info-card__section">
          <h4 className="info-card__section-title">Exemplos válidos</h4>
          <div
            className="info-card__examples"
            role="list"
            aria-label="Exemplos de documentos válidos"
          >
            {info.examples.map((example, index) => (
              <code
                key={index}
                className="info-card__example"
                role="listitem"
                aria-label={`Exemplo ${index + 1}: ${example}`}
              >
                {example}
              </code>
            ))}
          </div>
        </div>
      </div>

      <div className="info-card__footer">
        <p className="info-card__note">
          <span className="info-card__note-icon" aria-hidden="true">
            💡
          </span>
          A validação é feita em tempo real usando os algoritmos oficiais da
          Receita Federal.
        </p>
      </div>
    </Card>
  );
};
