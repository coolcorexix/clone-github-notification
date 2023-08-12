import { Dispatch } from 'react';
import * as constants from './NotificationPage.constants';
import { Action } from './types';

export function switchToEditMode(dispatch: Dispatch<Action>) {
    dispatch({
        type: constants.SWITCH_TO_EDIT_MODE
    });
}

export function switchToReadOnlyMode(dispatch: Dispatch<Action>) {
    dispatch({
        type: constants.SWITCH_TO_READ_ONLY_MODE
    });
}

export function selectNotification(dispatch: Dispatch<Action>, notificationId: number) {
    dispatch({
        type: constants.SELECT_NOTIFICATION,
        payload: { notificationId }
    });
}

export function deselectNotification(dispatch: Dispatch<Action>, notificationId: number) {
    dispatch({
        type: constants.DESELECT_NOTIFICATION,
        payload: { notificationId }
    });
}

export function selectAllNotifications(dispatch: Dispatch<Action>) {
    dispatch({
        type: constants.SELECT_ALL_NOTIFICATIONS
    });
}