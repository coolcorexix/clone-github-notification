import { generateRandomIssueNoti } from ".";

const DATASET_SIZE = 200;

//* thank god this data is persistent
let notificationsData: any = null;
const fakeDataUrl =
    "https://randomuser.me/api/?results=200&inc=name,gender,email,nat,picture&noinfo";

export const getNotificationsData = async () => {
    if (!notificationsData) {
        // const response = await fetch(fakeDataUrl);
        // const data = await response.json();
        // notificationsData = data.results.map((result: any) => {
        //     return {
        //         ...result
        //     };
        // })
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