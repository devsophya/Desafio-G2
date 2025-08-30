import { ThemeToggle } from "../../ui/ThemeToggle";
import "./Header.css";
import logo from "../../../assets/logo.jpg";

export interface HeaderProps {
  className?: string;
}

/**
 * Header da aplicação com logo G2 e toggle de tema
 */
export const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  return (
    <header className={`header ${className}`} role="banner">
      <div className="container">
        <div className="header__content">
          <div className="header__brand">
            <div className="header__logo" aria-label="Logo G2">
              <img src={logo} alt="Logo G2" />
            </div>
            <div className="header__text">
              <h1 className="header__title">Cadastro de CPF/CNPJ</h1>
              <p className="header__subtitle">Powered by G2</p>
            </div>
          </div>

          <nav className="header__nav" aria-label="Navegação principal">
            <ThemeToggle size="md" showLabel />
          </nav>
        </div>
      </div>
    </header>
  );
};
