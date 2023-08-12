import React from "react";
import {
  useNotificationPageDispatch,
  useNotificationPageState,
} from "../state/NotificationPage.context";
import { Space, Typography, Button } from "antd";
import {
  SWITCH_TO_EDIT_MODE,
  SWITCH_TO_READ_ONLY_MODE,
} from "../state/NotificationPage.constants";
import {
  switchToEditMode,
  switchToReadOnlyMode,
} from "../state/NoticationPage.actions";

function PageHeader() {
  const state = useNotificationPageState();
  const dispatch = useNotificationPageDispatch();
  const { mode, selectedNotificationIds } = state;
  const totalOfSelectedItems = selectedNotificationIds.length;
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
            <Button type="text">Select all</Button>
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
