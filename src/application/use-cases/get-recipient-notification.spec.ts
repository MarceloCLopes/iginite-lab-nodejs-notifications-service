import { makeNotification } from "@test/factories/notification-factory";
import { InMenoryNotificationsRepository } from "@test/repositories/in-menory-notifications-repository";
import { GetRecipientNotifications } from "./get-recipient-notifications";

describe("Get recipients notifications", () => {
  it("should be able to get recipient notifications", async () => {
    const notificationsRepository = new InMenoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: "recipient-1",
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: "recipient-1" }),
        expect.objectContaining({ recipientId: "recipient-1" }),
      ]),
    );
  });
});
