import { makeNotification } from "@test/factories/notification-factory";
import { InMenoryNotificationsRepository } from "@test/repositories/in-menory-notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { UnreadNotification } from "./unread-notification";

describe("Unread notification", () => {
  it("should be able to unread a notification", async () => {
    const notificationsRepository = new InMenoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({ readAt: new Date() });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it("should not be able to unread a non existing notification", async () => {
    const notificationsRepository = new InMenoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: "fake-notification-id",
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
