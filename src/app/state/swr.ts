import { GitHnbNotification } from "@/types";
import { fetcher } from "@/utils/fetcher";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 20;

const getKey = (
    pageIndex: number,
    previousPageData: {
        notifications: GitHnbNotification[];
        hasMore: boolean;
    }
) => {
    if (previousPageData && !previousPageData.notifications.length) return null; // reached the end

    return `/api/notifications?page=${pageIndex + 1}&pageSize=${PAGE_SIZE}`;
};

export function useSWRNotifications() {
    const { data, size, setSize, isLoading, mutate, isValidating } = useSWRInfinite(getKey, fetcher, {
        revalidateFirstPage: false,
    });
    const loadMore = () => setSize(size + 1);
    const notifications: GitHnbNotification[] = data ? data.flatMap((page) => page.notifications) : [];
    const isLoadingMore = (size > 0 && data && typeof data[size - 1] === "undefined");
    const deleteNotifications = async (notificationIds: number[]) => {
        const response = await fetcher(`/api/notifications`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ notificationIds })
        });

        if (!data || !response) return;
        const {
            notificationIds: deletedNotificationIds
        } = response;
        mutate(
            data.map((page) => ({
                ...page,
                notifications: page.notifications
                    .filter((notification: GitHnbNotification) => !deletedNotificationIds.includes(notification.id))
            })),
            {
                rollbackOnError: true,
            }
        );
    }

    const restoreNotifications = async () => {
        await fetcher(`/api/notifications/reset`, {
            method: 'POST',
        });
        mutate();
    }

    const mutateNotificationsReadStatus = (notificationIds: number[], toBeUnread: boolean) => {
        if (!data) return;
        mutate(
            data.map((page) => ({
                ...page,
                notifications: page.notifications.map((notification: GitHnbNotification) => {
                    if (notificationIds.includes(notification.id)) {
                        return {
                            ...notification,
                            isUnread: toBeUnread,
                        }
                    }
                    return notification;
                })
            })),
            {
                revalidate: false,
            }
        );
    }

    const markNotificationsAsRead = async (notificationIds: number[]) => {
        await fetcher(`/api/notifications/read-status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ notificationIds, toBeUnread: false })
        });
        mutateNotificationsReadStatus(
            notificationIds,
            false,
        );
    }
    const markNotificationsAsUnread = async (notificationIds: number[]) => {
        await fetcher(`/api/notifications/read-status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ notificationIds, toBeUnread: true })
        });
        mutateNotificationsReadStatus(
            notificationIds,
            true,
        );
    }

    return {
        notifications,
        loadMore,
        isLoading,
        isLoadingMore,
        deleteNotifications,
        isValidating,
        restoreNotifications,
        markNotificationsAsRead,
        markNotificationsAsUnread,
    }

}