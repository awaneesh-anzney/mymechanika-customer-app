import api from "@/lib/axios/axios.config";

// Interface definitions
export interface UserProfile {
    id: number;
    publicId: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    status: string;
    profilePhoto: string;
    emailVerifiedAt: string;
    phoneVerifiedAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateProfilePayload {
    name?: string;
    email?: string;
    profilePhoto?: string;
}

export interface ChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ChangePasswordResponse {
    message: string;
}

export interface UploadPhotoResponse {
    message: string;
    profilePhoto: string;
}

export interface DeactivatePayload {
    reason: string;
}

export interface RequestPhoneChangePayload {
    newPhone: string;
}

export interface VerifyPhoneChangePayload {
    otp: string;
}

export interface VerifyEmailPayload {
    token: string;
}

// Service definition
export const profileService = {
    // 1. Get Profile
    getProfile: async (): Promise<UserProfile> => {
        const response = await api.get<UserProfile>("/users/profile");
        return response.data;
    },

    // 2. Update Profile
    updateProfile: async (payload: UpdateProfilePayload): Promise<UserProfile> => {
        const response = await api.patch<UserProfile>("/users/profile", payload);
        return response.data;
    },

    // 3. Change Password
    changePassword: async (payload: ChangePasswordPayload): Promise<ChangePasswordResponse> => {
        const response = await api.put<ChangePasswordResponse>("/users/change-password", payload);
        return response.data;
    },

    // 4. Upload Profile Photo
    uploadProfilePhoto: async (file: File): Promise<UploadPhotoResponse> => {
        const formData = new FormData();
        formData.append("photo", file);
        const response = await api.post<UploadPhotoResponse>("/users/profile/photo", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    // 5. Delete Profile Photo
    deleteProfilePhoto: async (): Promise<{ message: string }> => {
        const response = await api.delete<{ message: string }>("/users/profile/photo");
        return response.data;
    },

    // 6. Deactivate Account
    deactivateAccount: async (payload: DeactivatePayload): Promise<{ message: string; requestedAt: string }> => {
        const response = await api.post<{ message: string; requestedAt: string }>("/users/deactivate", payload);
        return response.data;
    },

    // 7. Request Phone Change
    requestPhoneChange: async (payload: RequestPhoneChangePayload): Promise<{ message: string; otp?: string }> => {
        const response = await api.post<{ message: string; otp?: string }>("/users/request-phone-change", payload);
        return response.data;
    },

    // 8. Verify Phone Change
    verifyPhoneChange: async (payload: VerifyPhoneChangePayload): Promise<{ message: string; newPhone: string }> => {
        const response = await api.post<{ message: string; newPhone: string }>("/users/verify-phone-change", payload);
        return response.data;
    },

    // 9. Send Email Verification
    sendEmailVerification: async (): Promise<{ message: string; token?: string }> => {
        const response = await api.post<{ message: string; token?: string }>("/users/send-email-verification");
        return response.data;
    },

    // 10. Verify Email
    verifyEmail: async (payload: VerifyEmailPayload): Promise<{ message: string; verifiedAt: string }> => {
        const response = await api.post<{ message: string; verifiedAt: string }>("/users/verify-email", payload);
        return response.data;
    }
};
