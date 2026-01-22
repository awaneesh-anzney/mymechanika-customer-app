import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    profileService,
    UpdateProfilePayload,
    ChangePasswordPayload,
    DeactivatePayload,
    RequestPhoneChangePayload,
    VerifyPhoneChangePayload,
    VerifyEmailPayload,
    UserProfile
} from '@/services/profile.service';

// Query Keys
export const PROFILE_KEYS = {
    all: ['profile'] as const,
    details: () => [...PROFILE_KEYS.all, 'details'] as const,
};

// Hooks

export const useProfile = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: PROFILE_KEYS.details(),
        queryFn: profileService.getProfile,
        staleTime: 5 * 60 * 1000, // 5 minutes
        ...options
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateProfilePayload) => profileService.updateProfile(payload),
        onSuccess: (data) => {
            // Update the cache immediately with the new user profile data
            queryClient.setQueryData(PROFILE_KEYS.details(), data);
        },
    });
};

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (payload: ChangePasswordPayload) => profileService.changePassword(payload),
    });
};

export const useUploadProfilePhoto = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file: File) => profileService.uploadProfilePhoto(file),
        onSuccess: (data) => {
            // Patch the existing profile data with the new photo URL
            queryClient.setQueryData(PROFILE_KEYS.details(), (oldData: UserProfile | undefined) => {
                if (!oldData) return undefined;
                return {
                    ...oldData,
                    profilePhoto: data.profilePhoto
                };
            });
            // Also invalidate to be sure but setQueryData gives immediate feedback
            queryClient.invalidateQueries({ queryKey: PROFILE_KEYS.details() });
        },
    });
};

export const useDeleteProfilePhoto = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: profileService.deleteProfilePhoto,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PROFILE_KEYS.details() });
        },
    });
};

export const useDeactivateAccount = () => {
    return useMutation({
        mutationFn: (payload: DeactivatePayload) => profileService.deactivateAccount(payload),
    });
};

export const useRequestPhoneChange = () => {
    return useMutation({
        mutationFn: (payload: RequestPhoneChangePayload) => profileService.requestPhoneChange(payload),
    });
};

export const useVerifyPhoneChange = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: VerifyPhoneChangePayload) => profileService.verifyPhoneChange(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PROFILE_KEYS.details() });
        },
    });
};

export const useSendEmailVerification = () => {
    return useMutation({
        mutationFn: profileService.sendEmailVerification,
    });
};

export const useVerifyEmail = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: VerifyEmailPayload) => profileService.verifyEmail(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PROFILE_KEYS.details() });
        },
    });
};
