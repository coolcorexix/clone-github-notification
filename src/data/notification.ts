import { generateRandomIssueNoti } from ".";

const DATASET_SIZE = 200;

//* thank god this data is persistent
let notificationsData: any = null;

export const getNotificationsData = async () => {
    if (!notificationsData) {

        notificationsData = [];
        for (let i = 0; i < DATASET_SIZE; i++) {
            notificationsData.push(generateRandomIssueNoti());
        }
    }
    return notificationsData;
}

export const setNotificationsData = (data: any[]) => {
    notificationsData = data;
}