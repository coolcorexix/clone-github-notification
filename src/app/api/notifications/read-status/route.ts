import { getNotificationsData, setNotificationsData } from '@/data/notification';
import { GitHnbNotification } from '@/types';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
    const reqJson = await req.json();
    const { notificationIds, toBeUnread } = reqJson;
    const notificationsData = await getNotificationsData();
    const notifications = notificationsData.map((notification: GitHnbNotification) => {
        if (notificationIds.includes(notification.id)) {
            return {
                ...notification,
                isUnread: toBeUnread,
            }
        }
        return notification;
    });
    setNotificationsData(notifications);
    return NextResponse.json({ notifications })
}