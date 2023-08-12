import React from "react";
import {
  CheckCircleIcon,
  CommentDiscussionIcon,
  GitPullRequestIcon,
  Icon,
  IssueOpenedIcon,
} from "@primer/octicons-react";
import { NotiType } from "@/types";

interface NotificationItemProps {
  notiType: NotiType;
  isUnread: boolean;
  timeStamp: number;
  subTitle: string;
  title: string;
  description: string;
}

const getIconFromNotiType = (notiType: NotiType): Icon | null => {
  switch (notiType) {
    case "closedIssue":
      return CheckCircleIcon;
    case "openIssue":
      return IssueOpenedIcon;
    case "discussion":
      return CommentDiscussionIcon;
    case "pullRequest":
      return GitPullRequestIcon;
    default:
      return null;
  }
};

function NotificationItem(props: NotificationItemProps) {
  const { notiType } = props;
  const Icon = getIconFromNotiType(notiType);
  return <div>{!!Icon && <Icon />}</div>;
}

export default NotificationItem;
