import React, { forwardRef } from "react";
import "./Input.css";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "default" | "error" | "success";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  "data-testid"?: string;
}

/**
 * Componente atômico Input
 * Input básico com variações de estilo e estados
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      size = "md",
      fullWidth = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const classes = [
      "input",
      `input--${variant}`,
      `input--${size}`,
      fullWidth && "input--full-width",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <input ref={ref} className={classes} {...props} />;
  }
);

Input.displayName = "Input";
