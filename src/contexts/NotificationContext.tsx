import React, { useState, useCallback } from "react";
import { NotificationContext } from "./notification";
import type { Notification, NotificationContextType } from "./notification";

interface NotificationProviderProps {
  children: React.ReactNode;
  defaultDuration?: number;
  maxNotifications?: number;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
  defaultDuration = 5000,
  maxNotifications = 5,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const generateId = useCallback((): string => {
    return `notification-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }, []);

  const addNotification = useCallback(
    (notification: Omit<Notification, "id">): string => {
      const id = generateId();
      const newNotification: Notification = {
        id,
        duration: defaultDuration,
        ...notification,
      };

      setNotifications((prev) => {
        const updated = [newNotification, ...prev];
        // Limita o número máximo de notificações
        return updated.slice(0, maxNotifications);
      });

      // Auto-remove se não for persistente
      if (!newNotification.persistent && newNotification.duration) {
        setTimeout(() => {
          removeNotification(id);
        }, newNotification.duration);
      }

      return id;
    },
    [defaultDuration, maxNotifications, generateId]
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Métodos de conveniência
  const showSuccess = useCallback(
    (title: string, message?: string): string => {
      return addNotification({ type: "success", title, message });
    },
    [addNotification]
  );

  const showError = useCallback(
    (title: string, message?: string): string => {
      return addNotification({
        type: "error",
        title,
        message,
        duration: 7000, // Erros ficam mais tempo
      });
    },
    [addNotification]
  );

  const showWarning = useCallback(
    (title: string, message?: string): string => {
      return addNotification({ type: "warning", title, message });
    },
    [addNotification]
  );

  const showInfo = useCallback(
    (title: string, message?: string): string => {
      return addNotification({ type: "info", title, message });
    },
    [addNotification]
  );

  const value: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
