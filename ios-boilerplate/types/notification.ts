export type NotificationType = 'info' | 'warning' | 'promo';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body?: string;
  isRead: boolean;
  isDismissable: boolean;
}
