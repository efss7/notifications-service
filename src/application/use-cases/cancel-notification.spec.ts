import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notifications";
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found";



describe('Cancel notification', () => {
    it('should be able to cancel a notification', async () => {
        const notificationsRepository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);

        const notification = makeNotification()

        await notificationsRepository.create(notification)

        await cancelNotification.execute({
            notificationId: notification.id
        })

        expect(notificationsRepository.notifications[0].cancelAt).toEqual(expect.any(Date),
        );
    })
    it('should not be able to cancel a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);

        expect(()=>{
        return cancelNotification.execute({
        notificationId: 'fake-notification-id',
        })
        }).rejects.toThrow(NotificationNotFound);

    })
})