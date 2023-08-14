// Header from antd Layout can not be used as Server Component hence this component
import { BellFillIcon, BellIcon, MarkGithubIcon } from "@primer/octicons-react";
import { Badge, Space, Tooltip, Typography } from "antd";
import { useSWRNotifications } from "../state/swr";

function AppHeader() {
  const { notifications } = useSWRNotifications();
  const haveUnreadNotifications = notifications.some((item) => item.isUnread);

  return (
    <div className="w-full border-b-gray-700 border-b-2">
      <div className="max-w-screen-md w-100 flex flex-row m-auto justify-between p-4  ">
        <Space>
          <MarkGithubIcon size="medium" />
          <h1 className=" font-bold">GitHnb</h1>
        </Space>
        <Typography.Text className="w-full text-center  block">
          Made with love by <a href="https://nemothecollector.dev/">Nemo</a>
        </Typography.Text>
        <Space>
          <Tooltip title="Notification">
            <Badge color="#1f6feb" dot count={haveUnreadNotifications ? 1 : 0}>
              <BellFillIcon fill="white" />
            </Badge>
          </Tooltip>
        </Space>
      </div>
    </div>
  );
}

export default AppHeader;
