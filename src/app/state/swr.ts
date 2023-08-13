import { fetcher } from "@/utils/fetcher";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 20;

const getKey = (
    pageIndex: number,
    previousPageData: {
        notifications: any[];
        hasMore: boolean;
    }
) => {
    if (previousPageData && !previousPageData.notifications.length) return null; // reached the end

    return `/api/notifications?page=${pageIndex + 1}&pageSize=${PAGE_SIZE}`;
};

export function useSWRNotifications() {
    const { data, size, setSize, isLoading, mutate } = useSWRInfinite(getKey, fetcher);
    const loadMore = () => setSize(size + 1);
    const notifications = data ? data.flatMap((page) => page.notifications) : [];
    const isLoadingMore = (size > 0 && data && typeof data[size - 1] === "undefined");
    const deleteNotifications = async (notificationIds: number[]) => {
        await fetcher(`/api/notifications?notificationIds`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ notificationIds })
        });
        mutate();
    }

    const restoreNotifications = async () => {
        await fetcher(`/api/notifications/reset`, {
            method: 'POST',
        });
        mutate();
    }
    return {
        notifications,
        loadMore,
        isLoading,
        isLoadingMore,
        deleteNotifications,
        restoreNotifications
    }

}