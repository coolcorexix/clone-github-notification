export interface User {
    id: number;
    name: string;
    avatarUrl: string;
}
export type NotiType =
    | "closedIssue"
    | "openIssue"
    | "discussion"
    | "pipeline"
    | "warning"
    | "pullRequest"
    | "danger";

export interface GitHnbNotification {
    id: number;
    type: NotiType;
    subTitle: string;
    title: string;
    notifyingUser: User;
    descriptionText: string;
    isRead: boolean;
}

export type FixMeLater = any;