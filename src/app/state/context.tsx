import React, { Dispatch } from "react";
import { NotificationPageState } from "./types";
import { reducer } from "./reducer";

const initialState: NotificationPageState = {
  mode: "readOnly",
  selectedNotificationIds: [],
};

const NotificationPageContext = React.createContext<NotificationPageState>({
  mode: "readOnly",
  selectedNotificationIds: [],
});

const NotificationPageDispatchContext = React.createContext<Dispatch<any>>(
  () => null
);

export const NotificationPageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer<
    React.Reducer<NotificationPageState, any>
  >(reducer, initialState);
  return (
    <NotificationPageContext.Provider value={state}>
      <NotificationPageDispatchContext.Provider value={dispatch}>
        {children}
      </NotificationPageDispatchContext.Provider>
    </NotificationPageContext.Provider>
  );
};

export function useNotificationPageState() {
  const context = React.useContext(NotificationPageContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationPageState must be used within a NotificationPageContextProvider"
    );
  }
  return context;
}

export function useNotificationPageDispatch() {
  const context = React.useContext(NotificationPageDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationPageDispatch must be used within a NotificationPageContextProvider"
    );
  }
  return context;
}
