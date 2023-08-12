// Header from antd Layout can not be used as Server Component hence this component
import { Tooltip } from "antd";
import Link from "next/link";
import React from "react";
import { BellIcon } from "@primer/octicons-react";

function AppHeader() {
  return (
    <div>
      <Tooltip title="Notification">
        <Link href="/notification">
          <BellIcon />
        </Link>
      </Tooltip>
    </div>
  );
}

export default AppHeader;
