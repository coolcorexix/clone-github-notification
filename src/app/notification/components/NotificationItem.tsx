import React from "react";
import {
  CheckCircleIcon,
  CommentDiscussionIcon,
  GitPullRequestIcon,
  Icon,
  IssueOpenedIcon,
} from "@primer/octicons-react";
import { GitHnbNotification, NotiType } from "@/types";

interface NotificationItemProps {
  item: GitHnbNotification;
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
  const { type } = props.item;
  const Icon = getIconFromNotiType(type);
  return <div>{!!Icon && <Icon />}</div>;
}

export default NotificationItem;
