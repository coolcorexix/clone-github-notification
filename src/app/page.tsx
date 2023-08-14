"use client";

import NotificationList from "./components/NotificationList";
import PageActions from "./components/PageActions";
import PageHeader from "./components/PageHeader";
import { NotificationPageContextProvider } from "./state/context";

function NotificationPage() {
  return (
    <NotificationPageContextProvider>
      <div className="max-w-screen-md w-100 m-auto py-2">
        <div className="border-b-gray-700 border-b-2 pb-2">
          <PageHeader />
        </div>
        <div className="p-4 max-w-screen-md m-auto">
          <NotificationList />
        </div>
        <PageActions />
      </div>
    </NotificationPageContextProvider>
  );
}

export default NotificationPage;
