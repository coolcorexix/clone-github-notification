import { GitHnbNotification } from '@/types';
import initialNotificationData from '../data/notificationData.json';

//* this is not so persistent
let notificationsData: any = null;

export const getNotificationsData = async () => {
    if (!notificationsData) {

        notificationsData = initialNotificationData
    }
    return notificationsData;
}

export const setNotificationsData = (data: GitHnbNotification[]) => {
    notificationsData = data;
}