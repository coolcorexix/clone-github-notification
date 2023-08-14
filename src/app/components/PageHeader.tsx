import { useEffect, useMemo, useState } from "react";
import { Button, Space, Typography, message } from "antd";
import {
  deselectAllNotifications,
  removeDeletedSelectedNotifications,
  selectAllNotifications,
  switchToEditMode,
  switchToReadOnlyMode,
} from "../state/actions";
import {
  useNotificationPageDispatch,
  useNotificationPageState,
} from "../state/context";
import { useSWRNotifications } from "@/app/state/swr";

function PageHeader() {
  const state = useNotificationPageState();
  const dispatch = useNotificationPageDispatch();
  const {
    notifications,
    deleteNotifications,
    markNotificationsAsRead,
    markNotificationsAsUnread,
  } = useSWRNotifications();
  const loadedNotificationIds = notifications.map((item) => item.id);
  const { mode, selectedNotificationIds } = state;
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

  const [bulkSelectMode, setBulkSelectMode] = useState<"select" | "deselect">(
    "select"
  );

  useEffect(() => {
    if (!selectedNotificationIds.length) {
      setBulkSelectMode("select");
    }
  }, [selectedNotificationIds.length]);

  useEffect(() => {
    if (!notifications.length) {
      switchToReadOnlyMode(dispatch);
    }
  }, [notifications.length]);

  const toggleSelectMode = () => {
    if (bulkSelectMode === "select") {
      setBulkSelectMode("deselect");
    } else {
      setBulkSelectMode("select");
    }
  };
  return (
    <div>
      {mode === "readOnly" && (
        <Space direction="vertical">
          <Space>
            <Button
              className={notifications.length > 0 ? "visible" : "invisible"}
              type="text"
              onClick={() => {
                switchToEditMode(dispatch);
              }}
            >
              Select
            </Button>
          </Space>
          <Space className="ml-3">
            <Typography.Title level={2}>Inbox</Typography.Title>
          </Space>
        </Space>
      )}
      {mode === "edit" && (
        <Space direction="vertical">
          <Space>
            <Button
              onClick={() => {
                deselectAllNotifications(dispatch);
                switchToReadOnlyMode(dispatch);
              }}
              type="text"
            >
              Cancel
            </Button>
            {bulkSelectMode === "select" ? (
              <Button
                onClick={() => {
                  selectAllNotifications(dispatch, loadedNotificationIds);
                  toggleSelectMode();
                }}
                type="text"
              >
                Select all
              </Button>
            ) : (
              <Button
                type="text"
                onClick={() => {
                  deselectAllNotifications(dispatch);
                  toggleSelectMode();
                }}
              >
                Deselect all
              </Button>
            )}
          </Space>
          <Space className="ml-3">
            <Typography.Title level={2}>
              {totalOfSelectedItems
                ? `${totalOfSelectedItems} selected`
                : "Select Items"}
            </Typography.Title>
          </Space>
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
        </Space>
      )}
    </div>
  );
}

export default PageHeader;
