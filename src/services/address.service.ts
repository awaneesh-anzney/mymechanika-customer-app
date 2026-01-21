import api from "@/lib/axios";

// Interface definitions
export interface City {
  id: string;
  name: string;
  state: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  userId: string;
  cityId: string;
  label: "home" | "office" | "other";
  houseNo: string;
  street: string;
  landmark?: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  contactName?: string;
  contactPhone?: string;
  country?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  city?: City;
}

export interface CreateAddressPayload {
  cityId: string;
  label: "home" | "office" | "other";
  houseNo: string;
  street: string;
  landmark?: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  contactName?: string;
  contactPhone?: string;
  country?: string;
  isDefault?: boolean;
}

export interface UpdateAddressPayload {
  cityId?: string;
  label?: "home" | "office" | "other";
  houseNo?: string;
  street?: string;
  landmark?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
  contactName?: string;
  contactPhone?: string;
  country?: string;
  isDefault?: boolean;
}

export interface AddressesResponse {
  success: boolean;
  message: string;
  data: Address[];
}

export interface AddressResponse {
  success: boolean;
  message: string;
  data: Address;
}

export interface CitiesResponse {
  success: boolean;
  message: string;
  data: City[];
}

// Service definition
export const addressService = {
  // 1. Get All Cities (Public)
  getCities: async (): Promise<City[]> => {
    const response = await api.get<City[]>("/addresses/cities");
    return response.data;
  },

  // 2. Get All Addresses
  getAddresses: async (): Promise<Address[]> => {
    const response = await api.get<Address[]>("/addresses");
    return response.data;
  },

  // 3. Get Address by ID
  getAddressById: async (id: string): Promise<Address> => {
    const response = await api.get<Address>(`/addresses/${id}`);
    return response.data;
  },

  // 4. Create New Address
  createAddress: async (payload: CreateAddressPayload): Promise<Address> => {
    const response = await api.post<Address>("/addresses", payload);
    return response.data;
  },

  // 5. Update Address
  updateAddress: async (id: string, payload: UpdateAddressPayload): Promise<Address> => {
    const response = await api.patch<Address>(`/addresses/${id}`, payload);
    return response.data;
  },

  // 6. Delete Address
  deleteAddress: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/addresses/${id}`);
    return response.data;
  },

  // 7. Set Default Address
  setDefaultAddress: async (id: string): Promise<Address> => {
    const response = await api.patch<Address>(`/addresses/${id}/default`);
    return response.data;
  },
};
