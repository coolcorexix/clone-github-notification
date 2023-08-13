const actionFormatter = (action: string) => `notification.${action}`;

export const SWITCH_TO_READ_ONLY_MODE = actionFormatter('SWITCH_TO_READ_ONLY_MODE');
export const SWITCH_TO_EDIT_MODE = actionFormatter('SWITCH_TO_EDIT_MODE');
export const SELECT_NOTIFICATION = actionFormatter('SELECT_NOTIFICATION');
export const DESELECT_NOTIFICATION = actionFormatter('DESELECT_NOTIFICATION');
export const SELECT_ALL_NOTIFICATIONS = actionFormatter('SELECT_ALL_NOTIFICATIONS');
export const DE_SELECT_ALL_NOTIFICATIONS = actionFormatter('DE_SELECT_ALL_NOTIFICATIONS');