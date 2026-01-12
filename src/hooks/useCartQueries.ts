import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cartService, AddToCartDto, SyncCartDto } from "@/services/cart.services";

export const useGetCart = (guestId?: string | null, isAuthenticated?: boolean) => {
    return useQuery({
        queryKey: ["cart", guestId, isAuthenticated],
        queryFn: () => cartService.getCart(isAuthenticated ? undefined : (guestId || undefined)),
        // Fetch if authenticated OR if we have a guestId
        enabled: isAuthenticated || !!guestId,
        retry: 1, // Don't retry too much if cart not found or API error
    });
};

export const useAddToCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: AddToCartDto) => cartService.addToCart(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
};

export const useSyncCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: SyncCartDto) => cartService.syncCart(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
};
