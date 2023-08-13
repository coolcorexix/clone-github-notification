import { setNotificationsData } from '@/data/notification';
import { NextResponse } from 'next/server';
import initialNotificationData from '@/data/notificationData.json';
import { GitHnbNotification } from '@/types';

export async function POST() {
    setNotificationsData(initialNotificationData as GitHnbNotification[])
    return NextResponse.json({})
}