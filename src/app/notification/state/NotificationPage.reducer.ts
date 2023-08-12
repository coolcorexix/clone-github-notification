import {
    DESELECT_NOTIFICATION,
    SELECT_ALL_NOTIFICATIONS,
    SELECT_NOTIFICATION,
    SWITCH_TO_EDIT_MODE,
    SWITCH_TO_READ_ONLY_MODE
} from './NotificationPage.constants';
import { Action, NotificationPageState } from './types';

export const reducer = (state: NotificationPageState, action: Action): NotificationPageState => {
    switch (action.type) {
        case SWITCH_TO_READ_ONLY_MODE: {
            return {
                ...state,
                mode: "readOnly"
            }
        }
        case SWITCH_TO_EDIT_MODE: {
            return {
                ...state,
                mode: "edit"
            }
        }
        case SELECT_NOTIFICATION: {
            const { notificationId } = action.payload || {};
            return {
                ...state,
                selectedNotificationIds: [
                    ...state.selectedNotificationIds,
                    notificationId
                ]
            }
        }
        case DESELECT_NOTIFICATION: {
            const { notificationId } = action.payload || {};
            return {
                ...state,
                selectedNotificationIds: state.selectedNotificationIds.filter(id => id !== notificationId)
            }
        }
        case SELECT_ALL_NOTIFICATIONS: {
            throw new Error("Not implemented");
            return {
                ...state,
            }
        }
        default: {
            return state;
        }
    }
};