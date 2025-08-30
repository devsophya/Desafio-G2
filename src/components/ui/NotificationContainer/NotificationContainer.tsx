import { useNotifications } from "../../../hooks/useNotifications";
import { NotificationItem } from "../NotificationItem/NotificationItem";
import "./NotificationContainer.css";

export interface NotificationContainerProps {
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  className?: string;
}

/**
 * Container para exibir notificações na tela
 */
export const NotificationContainer: React.FC<NotificationContainerProps> = ({
  position = "top-right",
  className = "",
}) => {
  const { notifications } = useNotifications();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div
      className={`notification-container notification-container--${position} ${className}`}
      role="region"
      aria-label="Notificações"
    >
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
};
