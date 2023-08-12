"use client";
import React, { useEffect, useState } from "react";
import VirtualList from "rc-virtual-list";
import { Avatar, Checkbox, List, Typography, message } from "antd";

import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useNotificationPageDispatch } from "../state/NotificationPage.context";
import {
  deselectNotification,
  selectNotification,
} from "../state/NoticationPage.actions";

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

const fakeDataUrl =
  "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
const ContainerHeight = 400;

function NotificationList() {
  const [notificationItems, setNotificationItems] = useState<UserItem[]>([]);
  const dispatch = useNotificationPageDispatch();

  // this function does not use useCallback in intentional way
  const onChange = (e: CheckboxChangeEvent, item: UserItem) => {
    const newCheckedValued = e.target.checked;
    const updatedNotificationItems = notificationItems.map(
      (notificationItem) => {
        if (notificationItem.id === item.id) {
          return { ...notificationItem, isSelected: e.target.checked };
        }
        return notificationItem;
      }
    );
    if (newCheckedValued) {
      selectNotification(dispatch, item.id);
    } else {
      deselectNotification(dispatch, item.id);
    }
    setNotificationItems(updatedNotificationItems);
  };

  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        console.log("🚀 ~ file: NotificationList.tsx:33 ~ .then ~ body:", body);
        setNotificationItems(
          notificationItems.concat(
            body.results.map((result: any) => {
              return {
                ...result,
                isSelected: false,
                id: Math.random(),
              };
            })
          )
        );
        message.success(`${body.results.length} more items loaded!`);
      });
  };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
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
              checked={item.isSelected}
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
