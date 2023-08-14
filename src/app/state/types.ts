export interface NotificationPageState {
    selectedNotificationIds: number[];
    mode: "readOnly" | "edit";
}

export interface Action {
    type: string;
    payload?: {
        [key: string]: any;
    };
}