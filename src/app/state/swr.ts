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
    const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);
    const isLoading = !data && !error;
    const loadMore = () => setSize(size + 1);
    const notifications = data ? data.flatMap((page) => page.notifications) : [];
    return {
        notifications,
        isLoading,
        loadMore,
    }

}