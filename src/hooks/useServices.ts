import { useQuery } from "@tanstack/react-query";
import { getServiceCategories, ServiceCategory } from "@/services/services.service";

export const useServiceCategories = () => {
    return useQuery({
        queryKey: ["serviceCategories"],
        queryFn: getServiceCategories,
        select: (data) => data.data,
    });
};
