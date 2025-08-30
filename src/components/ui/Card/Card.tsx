import "./Card.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "ghost";
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
  as?: "div" | "article" | "section";
  "data-testid"?: string;
}

/**
 * Componente atômico Card
 * Container básico para agrupar conteúdo relacionado
 */
export const Card: React.FC<CardProps> = ({
  variant = "default",
  padding = "md",
  interactive = false,
  as: Component = "div",
  children,
  className = "",
  ...props
}) => {
  const classes = [
    "card",
    `card--${variant}`,
    `card--padding-${padding}`,
    interactive && "card--interactive",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};
