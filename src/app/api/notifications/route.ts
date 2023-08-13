import { GitHnbNotification } from '@/types';
import { NextResponse } from 'next/server';
import {
    getNotificationsData, setNotificationsData
} from '../../../data/notification';


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '20';
    const startIndex = (Number(page) - 1) * Number(pageSize);
    const endIndex = startIndex + Number(pageSize);
    const notificationsData = await getNotificationsData();

    const notifications = notificationsData.slice(startIndex, endIndex);

    return NextResponse.json({ notifications })
}

export async function DELETE(req: Request) {
    // conver req.body to json
    const reqJson = await req.json();
    const { notificationIds } = reqJson;
    const notificationsData = await getNotificationsData();
    const notifications = notificationsData.filter((notification: GitHnbNotification) => !notificationIds.includes(notification.id));
    setNotificationsData(notifications);
    return NextResponse.json({ notifications })
}