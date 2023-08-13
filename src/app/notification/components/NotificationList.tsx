"use client";
import React from "react";
import { Avatar, Checkbox, List, Typography, message } from "antd";
import VirtualList from "rc-virtual-list";

import { useSWRNotifications } from "@/app/state/swr";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { deselectNotification, selectNotification } from "../state/actions";
import {
  useNotificationPageDispatch,
  useNotificationPageState,
} from "../state/context";
import NotificationItem from "./NotificationItem";
import { GitHnbNotification } from "@/types";

const ContainerHeight = 400;

function NotificationList() {
  const state = useNotificationPageState();
  const { selectedNotificationIds } = state;
  const {
    notifications: notificationItems,
    loadMore,
    isLoading,
    isLoadingMore,
  } = useSWRNotifications();

  const dispatch = useNotificationPageDispatch();

  // this function does not use useCallback in intentional way
  const onChange = (e: CheckboxChangeEvent, item: GitHnbNotification) => {
    const newCheckedValued = e.target.checked;
    if (newCheckedValued) {
      selectNotification(dispatch, item.id);
    } else {
      deselectNotification(dispatch, item.id);
    }
  };

  const onScroll = async (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      if (isLoading || isLoadingMore) {
        return;
      }
      await loadMore();
    }
  };

  return (
    <List>
      <VirtualList
        data={notificationItems}
        height={ContainerHeight}
        itemHeight={47}
        // this will be used to distinguish between items
        // no need to set key for children below
        itemKey="id"
        onScroll={onScroll}
      >
        {(item: GitHnbNotification) => {
          return (
            <List.Item>
              <NotificationItem item={item} />
              <Checkbox
                checked={selectedNotificationIds.indexOf(item.id) !== -1}
                onChange={(e) => {
                  onChange(e, item);
                }}
              />
              <div>Content</div>
            </List.Item>
          );
        }}
      </VirtualList>
    </List>
  );
}

export default NotificationList;
