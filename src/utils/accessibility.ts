/**
 * Utilitários para acessibilidade
 */

/**
 * Gera ID único para elementos
 */
export const generateId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Anuncia mensagem para leitores de tela
 */
export const announceToScreenReader = (message: string): void => {
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove após 1 segundo
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Gerencia foco para navegação por teclado
 */
export const manageFocus = {
  /**
   * Move foco para próximo elemento focalizável
   */
  moveToNext: (currentElement: HTMLElement): void => {
    const focusableElements = getFocusableElements();
    const currentIndex = Array.from(focusableElements).indexOf(currentElement);
    const nextIndex = (currentIndex + 1) % focusableElements.length;
    (focusableElements[nextIndex] as HTMLElement).focus();
  },

  /**
   * Move foco para elemento anterior
   */
  moveToPrevious: (currentElement: HTMLElement): void => {
    const focusableElements = getFocusableElements();
    const currentIndex = Array.from(focusableElements).indexOf(currentElement);
    const prevIndex =
      currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
    (focusableElements[prevIndex] as HTMLElement).focus();
  },

  /**
   * Retorna foco para elemento específico
   */
  returnTo: (element: HTMLElement): void => {
    element.focus();
  },
};

/**
 * Obtém todos os elementos focalizáveis na página
 */
const getFocusableElements = (): NodeListOf<Element> => {
  return document.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
};

/**
 * Valida se elemento tem atributos de acessibilidade necessários
 */
export const validateAccessibility = (element: HTMLElement): string[] => {
  const errors: string[] = [];

  // Verifica se input tem label
  if (
    element.tagName === "INPUT" &&
    !element.getAttribute("aria-label") &&
    !element.getAttribute("aria-labelledby")
  ) {
    const id = element.getAttribute("id");
    if (!id || !document.querySelector(`label[for="${id}"]`)) {
      errors.push("Input deve ter label associado");
    }
  }

  // Verifica se botão tem texto descritivo
  if (
    element.tagName === "BUTTON" &&
    !element.textContent?.trim() &&
    !element.getAttribute("aria-label")
  ) {
    errors.push("Botão deve ter texto descritivo");
  }

  return errors;
};

/**
 * Constantes para teclas especiais
 */
export const KEYS = {
  ENTER: "Enter",
  SPACE: " ",
  TAB: "Tab",
  ESCAPE: "Escape",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
} as const;
