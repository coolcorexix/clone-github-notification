import {
    DESELECT_NOTIFICATION,
    DE_SELECT_ALL_NOTIFICATIONS,
    SELECT_ALL_NOTIFICATIONS,
    SELECT_NOTIFICATION,
    SWITCH_TO_EDIT_MODE,
    SWITCH_TO_READ_ONLY_MODE
} from './constants';
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
            const { notificationIds } = action.payload || {};
            return {
                ...state,
                selectedNotificationIds: notificationIds,
            }
        }
        case DE_SELECT_ALL_NOTIFICATIONS: {
            return {
                ...state,
                selectedNotificationIds: [],
            }
        }
        default: {
            return state;
        }
    }
};