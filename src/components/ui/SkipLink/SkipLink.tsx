import "./SkipLink.css";

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

/**
 * Link "Pular para conteúdo" - essencial para acessibilidade
 * Permite que usuários de leitores de tela pule diretamente para o conteúdo principal
 */
export const SkipLink: React.FC<SkipLinkProps> = ({ href, children }) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.querySelector(href) as HTMLElement;
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      href={href}
      className="skip-link"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent<HTMLAnchorElement>);
        }
      }}
    >
      {children}
    </a>
  );
};
