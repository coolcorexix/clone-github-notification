import { useSWRNotifications } from "@/app/state/swr";
import { Button, Space, Typography } from "antd";
import { useEffect, useState } from "react";
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
        </Space>
      )}
    </div>
  );
}

export default PageHeader;
