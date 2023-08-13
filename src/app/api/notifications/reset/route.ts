import { setNotificationsData } from '@/data/notification';
import { NextResponse } from 'next/server';
import initialNotificationData from '@/data/notificationData.json';

export async function POST() {
    setNotificationsData(initialNotificationData)
    return NextResponse.json({})
}