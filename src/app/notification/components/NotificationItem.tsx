import React from "react";
import {
  CheckCircleIcon,
  CommentDiscussionIcon,
  DotFillIcon,
  GitPullRequestIcon,
  Icon,
  IssueOpenedIcon,
} from "@primer/octicons-react";
import { GitHnbNotification, NotiType } from "@/types";
import { Avatar, Checkbox, Tooltip, Typography } from "antd";

interface NotificationItemProps {
  item: GitHnbNotification;
  isSelectable: boolean;
  isChecked: boolean;
  onCheckItem: () => void;
}

const getIconFromNotiType = (notiType: NotiType): Icon | null => {
  switch (notiType) {
    case "closedIssue":
      return () => <CheckCircleIcon fill="#a371f7" />;
    case "openIssue":
      return () => <IssueOpenedIcon fill="#3fb950" />;
    case "discussion":
      return CommentDiscussionIcon;
    case "pullRequest":
      return GitPullRequestIcon;
    default:
      return null;
  }
};

function NotificationItem(props: NotificationItemProps) {
  const { type } = props.item;
  const Icon = getIconFromNotiType(type);
  return (
    <div
      onClick={() => {
        if (props.isSelectable) {
          props.onCheckItem();
        }
      }}
      id="whole-item"
      className={
        (props.isSelectable ? "hover:bg-gray-700 cursor-pointer" : "") +
        " flex flex-row w-full p-2"
      }
    >
      <div
        id="checkbox"
        className={
          (props.isSelectable ? "visible" : "invisible") +
          " mr-2 flex flex-col justify-center items-center"
        }
      >
        <Checkbox checked={props.isChecked} />
      </div>
      <div className="w-full  flex flex-row flex-nowrap " id="content">
        <div id="icon" className="mr-2 w-min">
          {Icon && <Icon />}
          {props.item.isUnread && <DotFillIcon fill="#1f6feb" />}
        </div>
        <div
          className=" flex flex-col w-full pb-4 border-b-gray-700 border-b-2"
          id="detail"
        >
          <div>
            <Typography.Text type="secondary">
              {props.item.subTitle}
            </Typography.Text>
          </div>
          <div>
            <Typography.Text>{props.item.title}</Typography.Text>
          </div>

          <div>
            <Tooltip placement="bottom" title={props.item.notifyingUser.name}>
              <Avatar
                className="mr-1"
                size="small"
                src={props.item.notifyingUser.avatarUrl}
              />
            </Tooltip>

            <Typography.Text type="secondary">
              {props.item.descriptionText}
            </Typography.Text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationItem;
