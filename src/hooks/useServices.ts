import { useQuery } from "@tanstack/react-query";
import { getServiceCategories, getServices, ServiceCategory } from "@/services/services.service";

export const useServiceCategories = () => {
    return useQuery({
        queryKey: ["serviceCategories"],
        queryFn: getServiceCategories,
        select: (data) => data.data,
    });
};

export const useServices = (categoryId?: string) => {
    return useQuery({
        queryKey: ["services", categoryId],
        queryFn: ({ signal }) => getServices(categoryId, signal),
        select: (data) => data.data,
        enabled: !!categoryId,
    });
};
