import { useContext } from "react";
import {
  NotificationContext,
  type NotificationContextType,
} from "../contexts/notification";

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications deve ser usado dentro de um NotificationProvider"
    );
  }
  return context;
};
