//* thank god this data is persistent
let notificationsData: any = null;
const fakeDataUrl =
    "https://randomuser.me/api/?results=200&inc=name,gender,email,nat,picture&noinfo";

fetch(fakeDataUrl).then(async (response) => {
    const data = await response.json();
    notificationsData = data.results;
});

export const getNotificationsData = async () => {
    if (!notificationsData) {
        const response = await fetch(fakeDataUrl);
        const data = await response.json();
        notificationsData = data.results.map((result: any) => {
            return {
                ...result,
                id: Math.random(),
            };
        })

    }
    return notificationsData;
}

export const setNotificationsData = (data: any[]) => {
    notificationsData = data;
}