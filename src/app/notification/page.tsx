"use client";

import NotificationList from "./components/NotificationList";
import PageHeader from "./components/PageHeader";
import { NotificationPageContextProvider } from "./state/context";

function NotificationPage() {
  return (
    <NotificationPageContextProvider>
      <div className="max-w-screen-lg w-100 m-auto py-2">
        <div className="border-b-gray-700 border-b-2 pb-2">
          <PageHeader />
        </div>
        <div className="p-4">
          <NotificationList />
        </div>
      </div>
    </NotificationPageContextProvider>
  );
}

export default NotificationPage;
