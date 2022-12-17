import { InMenoryNotificationsRepository } from "@test/repositories/in-menory-notifications-repository";
import { SendNotification } from "./send-notification";

describe("Send notification", () => {
  it("should be able to send notification", async () => {
    const notificationsRepository = new InMenoryNotificationsRepository();

    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      content: "This is a notification",
      category: "social",
      recipientId: "example-recipient-id",
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
