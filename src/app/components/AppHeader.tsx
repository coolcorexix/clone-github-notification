// Header from antd Layout can not be used as Server Component hence this component
import { BellFillIcon, BellIcon, MarkGithubIcon } from "@primer/octicons-react";
import { Badge, Space, Tooltip } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSWRNotifications } from "../state/swr";

function AppHeader() {
  const pathname = usePathname();
  const { notifications } = useSWRNotifications();

  const isAtNotificationPage = pathname === "/notification";

  return (
    <div className="w-full border-b-gray-700 border-b-2">
      <div className="max-w-screen-md w-100 flex flex-row m-auto justify-between p-4  ">
        <Link href="/">
          <Space>
            <MarkGithubIcon size="medium" />
            <h1 className=" font-bold">GitHnb</h1>
          </Space>
        </Link>
        <Space>
          <Tooltip title="Notification">
            <Link href="/notification">
              {isAtNotificationPage ? (
                <BellFillIcon fill="white" />
              ) : (
                <Badge color="blue" dot count={notifications.length}>
                  <BellIcon />
                </Badge>
              )}
            </Link>
          </Tooltip>
        </Space>
      </div>
    </div>
  );
}

export default AppHeader;
