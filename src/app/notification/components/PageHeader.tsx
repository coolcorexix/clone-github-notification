import { useState } from "react";
import { Button, Space, Typography } from "antd";
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
import { useSWRNotifications } from "@/app/state/swr";

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
        <Space>
          <Space>
            <Button
              type="text"
              onClick={() => {
                switchToEditMode(dispatch);
              }}
            >
              Select
            </Button>
          </Space>

          <Typography.Title level={2}>Inbox</Typography.Title>
        </Space>
      )}
      {mode === "edit" && (
        <div>
          <Space>
            <Button
              onClick={() => {
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
          <Typography.Title level={2}>
            {totalOfSelectedItems
              ? `${totalOfSelectedItems} selected`
              : "Select Items"}
          </Typography.Title>
        </div>
      )}
    </div>
  );
}

export default PageHeader;
