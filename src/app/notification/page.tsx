"use client";

import React, { useState } from "react";
import NotificationList from "./components/NotificationList";
import { NotificationPageContextProvider } from "./state/NotificationPage.context";
import PageHeader from "./components/PageHeader";

function NotificationPage() {
  return (
    <NotificationPageContextProvider>
      <PageHeader />
      <div className="p-4">
        <NotificationList />
      </div>
    </NotificationPageContextProvider>
  );
}

export default NotificationPage;
