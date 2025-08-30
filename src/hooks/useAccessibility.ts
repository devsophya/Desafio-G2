import { useEffect, useCallback, useRef } from "react";

interface AccessibilityOptions {
  announceChanges?: boolean;
  focusManagement?: boolean;
  keyboardNavigation?: boolean;
}

interface AccessibilityReturn {
  announceToScreenReader: (
    message: string,
    priority?: "polite" | "assertive"
  ) => void;
  focusElement: (selector: string) => void;
  manageFocusTrap: (container: HTMLElement | null, active: boolean) => void;
  skipToMain: () => void;
}

/**
 * Hook personalizado para melhorar a acessibilidade da aplicação
 * Garante que pessoas com deficiências possam usar o formulário sem dificuldades
 */
export const useAccessibility = (
  options: AccessibilityOptions = {}
): AccessibilityReturn => {
  const {
    announceChanges = true,
    focusManagement = true,
    keyboardNavigation = true,
  } = options;

  const announcerRef = useRef<HTMLDivElement | null>(null);
  const focusTrapRef = useRef<HTMLElement | null>(null);

  // Criar elemento para anúncios de tela
  useEffect(() => {
    if (!announceChanges) return;

    const announcer = document.createElement("div");
    announcer.id = "accessibility-announcer";
    announcer.setAttribute("aria-live", "polite");
    announcer.setAttribute("aria-atomic", "true");
    announcer.style.position = "absolute";
    announcer.style.left = "-10000px";
    announcer.style.width = "1px";
    announcer.style.height = "1px";
    announcer.style.overflow = "hidden";

    document.body.appendChild(announcer);
    announcerRef.current = announcer;

    return () => {
      if (announcer.parentNode) {
        announcer.parentNode.removeChild(announcer);
      }
    };
  }, [announceChanges]);

  // Configurar navegação por teclado global
  useEffect(() => {
    if (!keyboardNavigation) return;

    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      // Alt + S: Pular para conteúdo principal
      if (event.altKey && event.key === "s") {
        event.preventDefault();
        skipToMain();
      }

      // Esc: Fechar modais/notificações
      if (event.key === "Escape") {
        const activeModal = document.querySelector(
          '[role="dialog"]:not([aria-hidden="true"])'
        );
        const activeNotification = document.querySelector(
          ".notification-item:focus"
        );

        if (activeModal) {
          const closeButton = activeModal.querySelector(
            '[aria-label*="Fechar"], [aria-label*="Close"]'
          ) as HTMLElement;
          closeButton?.click();
        } else if (activeNotification) {
          const closeButton = activeNotification.querySelector(
            'button[aria-label*="Fechar"]'
          ) as HTMLElement;
          closeButton?.click();
        }
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [keyboardNavigation]);

  // Anunciar mensagem para leitores de tela
  const announceToScreenReader = useCallback(
    (message: string, priority: "polite" | "assertive" = "polite") => {
      if (!announcerRef.current) return;

      announcerRef.current.setAttribute("aria-live", priority);
      announcerRef.current.textContent = message;

      // Limpar após 1 segundo
      setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = "";
        }
      }, 1000);
    },
    []
  );

  // Focar elemento específico
  const focusElement = useCallback(
    (selector: string) => {
      if (!focusManagement) return;

      setTimeout(() => {
        const element = document.querySelector(selector) as HTMLElement;
        if (element && element.focus) {
          element.focus();
          // Anunciar mudança de foco
          const label =
            element.getAttribute("aria-label") ||
            element.getAttribute("title") ||
            element.textContent?.trim() ||
            "Elemento";
          announceToScreenReader(`Foco movido para ${label}`, "polite");
        }
      }, 100);
    },
    [focusManagement, announceToScreenReader]
  );

  // Gerenciar armadilha de foco (focus trap)
  const manageFocusTrap = useCallback(
    (container: HTMLElement | null, active: boolean) => {
      if (!focusManagement || !container) return;

      if (active) {
        focusTrapRef.current = container;

        const handleFocusTrap = (event: KeyboardEvent) => {
          if (event.key !== "Tab" || !focusTrapRef.current) return;

          const focusableElements = focusTrapRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) as NodeListOf<HTMLElement>;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        };

        container.addEventListener("keydown", handleFocusTrap);

        // Focar primeiro elemento focável
        const firstFocusable = container.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;

        if (firstFocusable) {
          firstFocusable.focus();
        }

        return () => {
          container.removeEventListener("keydown", handleFocusTrap);
          focusTrapRef.current = null;
        };
      } else {
        focusTrapRef.current = null;
      }
    },
    [focusManagement]
  );

  // Pular para conteúdo principal
  const skipToMain = useCallback(() => {
    const mainContent = document.querySelector(
      'main, [role="main"], #main-content'
    ) as HTMLElement;
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: "smooth" });
      announceToScreenReader("Navegando para o conteúdo principal", "polite");
    }
  }, [announceToScreenReader]);

  return {
    announceToScreenReader,
    focusElement,
    manageFocusTrap,
    skipToMain,
  };
};
