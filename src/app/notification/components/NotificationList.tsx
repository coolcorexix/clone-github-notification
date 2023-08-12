"use client";
import React from "react";
import { Avatar, Checkbox, List, Typography, message } from "antd";
import VirtualList from "rc-virtual-list";

import { useSWRNotifications } from "@/app/state/swr";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  deselectNotification,
  selectNotification,
} from "../state/NoticationPage.actions";
import {
  useNotificationPageDispatch,
  useNotificationPageState,
} from "../state/NotificationPage.context";

interface UserItem {
  email: string;
  gender: string;
  name: {
    first: string;
    last: string;
    title: string;
  };
  nat: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  id: number;
  isSelected: boolean;
}

const ContainerHeight = 400;

function NotificationList() {
  const state = useNotificationPageState();
  const { selectedNotificationIds } = state;
  const { notifications: notificationItems, loadMore } = useSWRNotifications();

  const dispatch = useNotificationPageDispatch();

  // this function does not use useCallback in intentional way
  const onChange = (e: CheckboxChangeEvent, item: UserItem) => {
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
      await loadMore();
      message.success(`more items loaded!`);
    }
  };

  return (
    <List>
      <VirtualList
        data={notificationItems}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item: UserItem) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={
                <a href="https://ant.design">
                  <Typography.Text>{item.name.last}</Typography.Text>
                </a>
              }
              description={item.email}
            />
            <Checkbox
              checked={selectedNotificationIds.indexOf(item.id) !== -1}
              onChange={(e) => {
                onChange(e, item);
              }}
            />
            <div>Content</div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
}

export default NotificationList;
