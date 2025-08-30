import { useTheme } from "../../../hooks/useTheme";
import "./ThemeToggle.css";

export interface ThemeToggleProps {
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

/**
 * Botão para alternar entre tema claro e escuro
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = "md",
  showLabel = false,
  className = "",
}) => {
  const { mode, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    }
  };

  const isDark = mode === "dark";

  return (
    <div className={`theme-toggle ${className}`}>
      {showLabel && (
        <span className="theme-toggle__label">
          {isDark ? "Modo Escuro" : "Modo Claro"}
        </span>
      )}

      <button
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`theme-toggle__button theme-toggle__button--${size}`}
        aria-label={`Alternar para modo ${isDark ? "claro" : "escuro"}`}
        aria-pressed={isDark}
        title={`Alternar para modo ${isDark ? "claro" : "escuro"}`}
      >
        <div className="theme-toggle__track">
          <div className="theme-toggle__thumb">
            <div className="theme-toggle__icon">
              {isDark ? (
                // Ícone da lua
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                // Ícone do sol
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="currentColor"
                  />
                  <path
                    d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>

        <span className="sr-only">
          Tema atual: {isDark ? "escuro" : "claro"}
        </span>
      </button>
    </div>
  );
};
