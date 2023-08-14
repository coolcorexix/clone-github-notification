import { useSWRNotifications } from "@/app/state/swr";
import { Button, Space, Typography } from "antd";
import { useEffect, useMemo } from "react";
import {
  deselectAllNotifications,
  selectAllNotifications,
  switchToEditMode,
  switchToReadOnlyMode,
} from "../state/actions";
import {
  useNotificationPageDispatch,
  useNotificationPageState,
} from "../state/context";

function PageHeader() {
  const state = useNotificationPageState();
  const dispatch = useNotificationPageDispatch();
  const { notifications } = useSWRNotifications();
  const loadedNotificationIds = notifications.map((item) => item.id);
  const { mode, selectedNotificationIds } = state;
  const totalOfSelectedItems = selectedNotificationIds.length;

  const isSelectingAll = useMemo(() => {
    return (
      notifications.length > 0 &&
      selectedNotificationIds.length === notifications.length
    );
  }, [notifications.length, selectedNotificationIds]);

  useEffect(() => {
    if (!notifications.length) {
      switchToReadOnlyMode(dispatch);
    }
  }, [notifications.length]);

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
            {isSelectingAll ? (
              <Button
                type="text"
                onClick={() => {
                  deselectAllNotifications(dispatch);
                }}
              >
                Deselect all
              </Button>
            ) : (
              <Button
                onClick={() => {
                  selectAllNotifications(dispatch, loadedNotificationIds);
                }}
                type="text"
              >
                Select all
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
        </Space>
      )}
    </div>
  );
}

export default PageHeader;
