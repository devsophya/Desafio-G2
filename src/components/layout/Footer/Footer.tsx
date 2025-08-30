import "./Footer.css";

/**
 * Componente Footer da aplicação
 */
export const Footer: React.FC = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__content">
          <p className="footer__text">
            © 2025 Validador de Documentos G2. Desenvolvido com React,
            TypeScript e acessibilidade em mente.
          </p>
          <div className="footer__links">
            <a
              href="#"
              className="footer__link"
              aria-label="Informações sobre privacidade"
            >
              Privacidade
            </a>
            <a href="#" className="footer__link" aria-label="Termos de uso">
              Termos
            </a>
            <a href="#" className="footer__link" aria-label="Suporte técnico">
              Suporte
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
