import { makeNotification } from "@test/factories/notification-factory";
import { InMenoryNotificationsRepository } from "@test/repositories/in-menory-notifications-repository";
import { CountRecipientNotifications } from "./count-recipient-notifications";

describe("Count recipients notifications", () => {
  it("should be able to count recipient notifications", async () => {
    const notificationsRepository = new InMenoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: "recipient-1" }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: "recipient-1" }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: "recipient-2" }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: "recipient-1",
    });

    expect(count).toEqual(2);
  });
});
