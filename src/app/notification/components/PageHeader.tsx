import { Button, Space, Typography } from "antd";
import { switchToEditMode, switchToReadOnlyMode } from "../state/actions";
import {
  useNotificationPageDispatch,
  useNotificationPageState,
} from "../state/context";

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
