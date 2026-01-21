import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addressService, CreateAddressPayload, UpdateAddressPayload } from "@/services/address.service";
import { toast } from "sonner";

// Query keys
export const addressKeys = {
  all: ["addresses"] as const,
  lists: () => [...addressKeys.all, "list"] as const,
  list: () => [...addressKeys.lists()] as const,
  details: () => [...addressKeys.all, "detail"] as const,
  detail: (id: string) => [...addressKeys.details(), id] as const,
  cities: ["cities"] as const,
};

// Get all cities (public)
export const useCities = () => {
  return useQuery({
    queryKey: addressKeys.cities,
    queryFn: () => addressService.getCities(),
    staleTime: 1000 * 60 * 60, // 1 hour - cities don't change often
  });
};

// Get all addresses
export const useAddresses = () => {
  return useQuery({
    queryKey: addressKeys.list(),
    queryFn: () => addressService.getAddresses(),
  });
};

// Get address by ID
export const useAddressById = (id: string) => {
  return useQuery({
    queryKey: addressKeys.detail(id),
    queryFn: () => addressService.getAddressById(id),
    enabled: !!id,
  });
};

// Create address mutation
export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAddressPayload) => addressService.createAddress(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.list() });
      toast.success("Address added successfully");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to add address";
      toast.error(message);
    },
  });
};

// Update address mutation
export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateAddressPayload }) =>
      addressService.updateAddress(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.list() });
      toast.success("Address updated successfully");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to update address";
      toast.error(message);
    },
  });
};

// Delete address mutation
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => addressService.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.list() });
      toast.success("Address deleted successfully");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to delete address";
      toast.error(message);
    },
  });
};

// Set default address mutation
export const useSetDefaultAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => addressService.setDefaultAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.list() });
      toast.success("Default address updated");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to set default address";
      toast.error(message);
    },
  });
};
