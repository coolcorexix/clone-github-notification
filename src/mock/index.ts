import { NotiType } from "@/types";

interface User {
    id: number;
    name: string;
    avatarUrl: string;
}

interface Notification {
    id: number;
    type: NotiType;
    subTitle: string;
    title: string;
    notifyingUser: User;
    descriptionText: string;
    isRead: boolean;
}

const users: User[] = [{
    id: 1,
    name: "coolcorexix",
    avatarUrl: "https://avatars.githubusercontent.com/u/25930830?s=40&v=4",
}, {
    id: 2,
    name: "giautm",
    avatarUrl: "https://avatars.githubusercontent.com/u/12751435?s=40&v=4",
}, {
    id: 3,
    name: "danielmontenegro",
    avatarUrl: "https://avatars.githubusercontent.com/u/669295?s=40&v=4"
}]

export const notifications: Notification[] = [
    {
        id: 1,
        type: "closedIssue",
        subTitle: 'ant-design/ant-design #1',
        title: '👋 Nemo #1',
        isRead: false,
        notifyingUser: users[0],
        descriptionText: "@giautm woah, that's p...",
    }
]
