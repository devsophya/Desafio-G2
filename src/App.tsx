import { Header, Footer } from "./components/layout";
import { DocumentForm } from "./components/forms/DocumentForm";
import { NotificationContainer, SkipLink } from "./components/ui";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { useNotifications, useAccessibility } from "./hooks";
import type { FormData } from "./types";

/**
 * Componente interno que usa os hooks de notificação
 */
const AppContent = () => {
  const { showSuccess, showError } = useNotifications();
  const { announceToScreenReader } = useAccessibility();

  const handleFormSubmit = (data: FormData) => {
    try {
      // Simula processamento
      if (data.document.isValid) {
        showSuccess(
          `${data.selectedType.toUpperCase()} cadastrado com sucesso!`,
          `Documento: ${data.document.formattedValue}`
        );

        // Anunciar sucesso para leitores de tela
        announceToScreenReader(
          `${data.selectedType.toUpperCase()} ${
            data.document.formattedValue
          } cadastrado com sucesso`,
          "assertive"
        );
      } else {
        showError(
          "Documento inválido",
          "Por favor, verifique os dados inseridos e tente novamente."
        );

        // Anunciar erro para leitores de tela
        announceToScreenReader(
          "Erro na validação do documento. Verifique os dados e tente novamente.",
          "assertive"
        );
      }
    } catch {
      showError(
        "Erro no sistema",
        "Ocorreu um erro inesperado. Tente novamente em alguns instantes."
      );

      announceToScreenReader(
        "Erro do sistema. Tente novamente em alguns instantes.",
        "assertive"
      );
    }
  };

  return (
    <div className="app">
      {/* Link para pular para conteúdo principal - Acessibilidade */}
      <SkipLink href="#main-content">Pular para o conteúdo principal</SkipLink>

      {/* Header da aplicação */}
      <Header />

      {/* Conteúdo principal */}
      <main id="main-content" className="app-main" role="main" tabIndex={-1}>
        <div className="container">
          <DocumentForm onSubmit={handleFormSubmit} data-testid="main-form" />
        </div>
      </main>

      {/* Footer da aplicação */}
      <Footer />

      {/* Container de notificações */}
      <NotificationContainer position="top-right" />
    </div>
  );
};

/**
 * Componente principal da aplicação
 * Wraps os providers de contexto
 */
function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
