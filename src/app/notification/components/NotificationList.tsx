"use client";
import React from "react";
import { Avatar, Checkbox, Empty, List, Typography, message } from "antd";
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
  const { mode, selectedNotificationIds } = state;
  const isAtEditMode = mode === "edit";
  const {
    notifications: notificationItems,
    loadMore,
    isLoading,
    isLoadingMore,
  } = useSWRNotifications();

  const dispatch = useNotificationPageDispatch();

  // this function does not use useCallback in intentional way
  const onCheckNotificationItem = (item: GitHnbNotification) => {
    const isBeingChecked = selectedNotificationIds.includes(item.id);
    const newCheckedValued = !isBeingChecked;
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

  if (notificationItems.length === 0 && !isLoading) {
    return <Empty description="It is so quiet here 🦗" />;
  }

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
            <List.Item
              style={{
                padding: 0,
              }}
              className="border-b-gray-700 border-b-2"
            >
              <NotificationItem
                isChecked={selectedNotificationIds.includes(item.id)}
                onCheckItem={() => {
                  onCheckNotificationItem(item);
                }}
                isSelectable={isAtEditMode}
                item={item}
              />
            </List.Item>
          );
        }}
      </VirtualList>
    </List>
  );
}

export default NotificationList;
