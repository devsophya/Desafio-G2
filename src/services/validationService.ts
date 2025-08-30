import type { DocumentType, ValidationResult } from "../types";

/**
 * Serviço de validação de documentos CPF e CNPJ
 * Implementa algoritmos oficiais de validação
 */
export class ValidationService {
  static validateDocument(value: string, type: DocumentType): ValidationResult {
    const cleanValue = this.cleanValue(value);

    if (!cleanValue) {
      return {
        isValid: false,
        message: `${type.toUpperCase()} é obrigatório`,
        formattedValue: "",
      };
    }

    switch (type) {
      case "cpf":
        return this.validateCPF(cleanValue);
      case "cnpj":
        return this.validateCNPJ(cleanValue);
      default:
        return {
          isValid: false,
          message: "Tipo de documento inválido",
          formattedValue: "",
        };
    }
  }

  private static cleanValue(value: string): string {
    return value.replace(/\D/g, "");
  }

  /**
   * Valida CPF usando algoritmo oficial da Receita Federal
   * 1. Verifica se tem 11 dígitos
   * 2. Verifica se não são todos dígitos iguais
   * 3. Calcula primeiro dígito verificador
   * 4. Calcula segundo dígito verificador
   */
  private static validateCPF(cpf: string): ValidationResult {
    if (cpf.length !== 11) {
      return {
        isValid: false,
        message: "CPF deve ter 11 dígitos",
        formattedValue: this.formatCPF(cpf),
      };
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
      return {
        isValid: false,
        message: "CPF inválido",
        formattedValue: this.formatCPF(cpf),
      };
    }

    // Algoritmo de validação dos dígitos verificadores
    let soma = 0;
    let resto;

    // Primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) {
      return {
        isValid: false,
        message: "CPF inválido",
        formattedValue: this.formatCPF(cpf),
      };
    }

    // Segundo dígito verificador
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) {
      return {
        isValid: false,
        message: "CPF inválido",
        formattedValue: this.formatCPF(cpf),
      };
    }

    return {
      isValid: true,
      message: "CPF válido",
      formattedValue: this.formatCPF(cpf),
    };
  }

  /**
   * Valida CNPJ usando algoritmo oficial da Receita Federal
   * 1. Verifica se tem 14 dígitos
   * 2. Verifica se não são todos dígitos iguais
   * 3. Calcula primeiro dígito verificador (peso 5,4,3,2,9,8,7,6,5,4,3,2)
   * 4. Calcula segundo dígito verificador (peso 6,5,4,3,2,9,8,7,6,5,4,3,2)
   */
  private static validateCNPJ(cnpj: string): ValidationResult {
    if (cnpj.length !== 14) {
      return {
        isValid: false,
        message: "CNPJ deve ter 14 dígitos",
        formattedValue: this.formatCNPJ(cnpj),
      };
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(cnpj)) {
      return {
        isValid: false,
        message: "CNPJ inválido",
        formattedValue: this.formatCNPJ(cnpj),
      };
    }

    // Valida primeiro dígito verificador
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) {
      return {
        isValid: false,
        message: "CNPJ inválido",
        formattedValue: this.formatCNPJ(cnpj),
      };
    }

    // Valida segundo dígito verificador
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) {
      return {
        isValid: false,
        message: "CNPJ inválido",
        formattedValue: this.formatCNPJ(cnpj),
      };
    }

    return {
      isValid: true,
      message: "CNPJ válido",
      formattedValue: this.formatCNPJ(cnpj),
    };
  }

  /**
   * Formata CPF para exibição (000.000.000-00)
   */
  static formatCPF(cpf: string): string {
    const clean = this.cleanValue(cpf);
    if (clean.length <= 3) return clean;
    if (clean.length <= 6) return `${clean.slice(0, 3)}.${clean.slice(3)}`;
    if (clean.length <= 9)
      return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6)}`;
    return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(
      6,
      9
    )}-${clean.slice(9, 11)}`;
  }

  /**
   * Formata CNPJ para exibição (00.000.000/0000-00)
   */
  static formatCNPJ(cnpj: string): string {
    const clean = this.cleanValue(cnpj);
    if (clean.length <= 2) return clean;
    if (clean.length <= 5) return `${clean.slice(0, 2)}.${clean.slice(2)}`;
    if (clean.length <= 8)
      return `${clean.slice(0, 2)}.${clean.slice(2, 5)}.${clean.slice(5)}`;
    if (clean.length <= 12)
      return `${clean.slice(0, 2)}.${clean.slice(2, 5)}.${clean.slice(
        5,
        8
      )}/${clean.slice(8)}`;
    return `${clean.slice(0, 2)}.${clean.slice(2, 5)}.${clean.slice(
      5,
      8
    )}/${clean.slice(8, 12)}-${clean.slice(12, 14)}`;
  }

  /**
   * Aplica máscara durante a digitação
   */
  static applyMask(value: string, type: DocumentType): string {
    const clean = this.cleanValue(value);

    switch (type) {
      case "cpf":
        return this.formatCPF(clean);
      case "cnpj":
        return this.formatCNPJ(clean);
      default:
        return clean;
    }
  }

  /**
   * Verifica se o valor está completo para validação
   */
  static isComplete(value: string, type: DocumentType): boolean {
    const clean = this.cleanValue(value);
    return type === "cpf" ? clean.length === 11 : clean.length === 14;
  }
}
