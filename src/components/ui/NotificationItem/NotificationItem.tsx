import React, { useEffect, useState } from "react";
import { useNotifications } from "../../../hooks/useNotifications";
import type { Notification } from "../../../contexts/notification";
import "./NotificationItem.css";

export interface NotificationItemProps {
  notification: Notification;
  className?: string;
}

/**
 * Item individual de notificação
 */
export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  className = "",
}) => {
  const { removeNotification } = useNotifications();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleClose = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeNotification(notification.id);
    }, 200); // Tempo da animação de saída
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };

  // Auto-close se tiver duração definida
  useEffect(() => {
    if (!notification.persistent && notification.duration) {
      const timer = setTimeout(() => {
        handleClose();
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification.duration, notification.persistent]);

  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return (
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "error":
        return (
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "warning":
        return (
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "info":
        return (
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`notification-item notification-item--${notification.type} ${
        isRemoving ? "notification-item--removing" : ""
      } ${className}`}
      role="alert"
      aria-live={notification.type === "error" ? "assertive" : "polite"}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="notification-item__icon" aria-hidden="true">
        {getIcon()}
      </div>

      <div className="notification-item__content">
        <h4 className="notification-item__title">{notification.title}</h4>
        {notification.message && (
          <p className="notification-item__message">{notification.message}</p>
        )}
      </div>

      <button
        type="button"
        className="notification-item__close"
        onClick={handleClose}
        aria-label="Fechar notificação"
        title="Fechar notificação"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Progress bar para mostrar tempo restante */}
      {!notification.persistent && notification.duration && (
        <div
          className="notification-item__progress"
          style={{
            animationDuration: `${notification.duration}ms`,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
