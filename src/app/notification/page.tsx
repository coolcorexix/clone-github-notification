"use client";

import NotificationList from "./components/NotificationList";
import PageHeader from "./components/PageHeader";
import { NotificationPageContextProvider } from "./state/context";

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
