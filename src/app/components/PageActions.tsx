import { useSWRNotifications } from "@/app/state/swr";
import { Button, Space, message } from "antd";
import { useMemo } from "react";
import {
  deselectAllNotifications,
  removeDeletedSelectedNotifications,
} from "../state/actions";
import {
  useNotificationPageDispatch,
  useNotificationPageState,
} from "../state/context";

function PageActions() {
  const state = useNotificationPageState();
  const dispatch = useNotificationPageDispatch();
  const {
    notifications,
    deleteNotifications,
    markNotificationsAsRead,
    markNotificationsAsUnread,
    resetNotificationsSize,
  } = useSWRNotifications();

  const { selectedNotificationIds } = state;
  const isSelectingAll = useMemo(() => {
    return (
      notifications.length > 0 &&
      selectedNotificationIds.length === notifications.length
    );
  }, [notifications.length, selectedNotificationIds]);
  const totalOfSelectedItems = selectedNotificationIds.length;
  const unreadIds = useMemo(() => {
    return notifications.filter((item) => item.isUnread).map((item) => item.id);
  }, [notifications]);
  const isSelectedIncludingUnread = useMemo(() => {
    return selectedNotificationIds.some((id) => unreadIds.includes(id));
  }, [selectedNotificationIds, unreadIds]);
  const iseSelectedIncludingRead = useMemo(() => {
    return selectedNotificationIds.some((id) => !unreadIds.includes(id));
  }, [selectedNotificationIds, unreadIds]);

  return (
    <div>
      {totalOfSelectedItems > 0 && (
        <Space direction="horizontal">
          {iseSelectedIncludingRead && (
            <Button
              onClick={() => {
                markNotificationsAsUnread(selectedNotificationIds);
                deselectAllNotifications(dispatch);
              }}
              type="text"
            >
              Mark as unread
            </Button>
          )}
          {isSelectedIncludingUnread && (
            <Button
              type="text"
              onClick={() => {
                markNotificationsAsRead(selectedNotificationIds);
                deselectAllNotifications(dispatch);
              }}
            >
              Mark as read
            </Button>
          )}

          <Button
            onClick={async () => {
              try {
                await deleteNotifications(selectedNotificationIds);
                removeDeletedSelectedNotifications(
                  dispatch,
                  selectedNotificationIds
                );
                if (isSelectingAll) {
                  resetNotificationsSize();
                }
              } catch (error) {
                message.error("Failed to delete notifications");
                // send log to sentry here
              }
            }}
            type="text"
          >
            Delete
          </Button>
        </Space>
      )}
    </div>
  );
}

export default PageActions;
