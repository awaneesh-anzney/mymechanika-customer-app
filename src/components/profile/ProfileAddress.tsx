"use client";

import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Edit2, Trash2, Home, Briefcase, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { 
  useAddresses, 
  useCities, 
  useCreateAddress, 
  useUpdateAddress, 
  useDeleteAddress, 
  useSetDefaultAddress 
} from '@/hooks/useAddress';
import { Address } from '@/services/address.service';
import { Skeleton } from '@/components/ui/skeleton';

export const ProfileAddress = () => {
  // Fetch data from API
  const { data: addresses = [], isLoading: isLoadingAddresses } = useAddresses();
  const { data: cities = [], isLoading: isLoadingCities } = useCities();
  
  // Mutations
  const createAddressMutation = useCreateAddress();
  const updateAddressMutation = useUpdateAddress();
  const deleteAddressMutation = useDeleteAddress();
  const setDefaultMutation = useSetDefaultAddress();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    cityId: "",
    label: "home" as "home" | "office" | "other",
    houseNo: "",
    street: "",
    landmark: "",
    pincode: "",
    latitude: undefined as number | undefined,
    longitude: undefined as number | undefined,
    contactName: "",
    contactPhone: "",
    country: "Saudi Arabia",
    isDefault: false,
  });

  const getAddressIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case "home":
        return Home;
      case "office":
      case "work":
        return Briefcase;
      default:
        return MapPin;
    }
  };

  const handleSetDefault = (id: string) => {
    setDefaultMutation.mutate(id);
  };

  const handleDelete = (id: string) => {
    const addressToDelete = addresses.find(addr => addr.id === id);
    if (addressToDelete?.isDefault && addresses.length > 1) {
      return; // API will handle this validation
    }
    deleteAddressMutation.mutate(id);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      cityId: address.cityId,
      label: address.label,
      houseNo: address.houseNo,
      street: address.street,
      landmark: address.landmark || "",
      pincode: address.pincode,
      latitude: address.latitude,
      longitude: address.longitude,
      contactName: address.contactName || "",
      contactPhone: address.contactPhone || "",
      country: address.country || "Saudi Arabia",
      isDefault: address.isDefault,
    });
    setIsAddDialogOpen(true);
  };

  const handleSaveAddress = () => {
    // Basic validation
    if (!formData.cityId || !formData.houseNo || !formData.street || !formData.pincode) {
      return;
    }

    const payload = {
      cityId: formData.cityId,
      label: formData.label,
      houseNo: formData.houseNo,
      street: formData.street,
      landmark: formData.landmark || undefined,
      pincode: formData.pincode,
      latitude: formData.latitude,
      longitude: formData.longitude,
      contactName: formData.contactName || undefined,
      contactPhone: formData.contactPhone || undefined,
      country: formData.country || undefined,
      isDefault: formData.isDefault,
    };

    if (editingAddress) {
      updateAddressMutation.mutate(
        { id: editingAddress.id, payload },
        {
          onSuccess: () => resetForm(),
        }
      );
    } else {
      createAddressMutation.mutate(payload, {
        onSuccess: () => resetForm(),
      });
    }
  };

  const resetForm = () => {
    setFormData({
      cityId: "",
      label: "home",
      houseNo: "",
      street: "",
      landmark: "",
      pincode: "",
      latitude: undefined,
      longitude: undefined,
      contactName: "",
      contactPhone: "",
      country: "Saudi Arabia",
      isDefault: false,
    });
    setEditingAddress(null);
    setIsAddDialogOpen(false);
  };

  const isLoading = isLoadingAddresses || isLoadingCities;
  const isSaving = createAddressMutation.isPending || updateAddressMutation.isPending;

  return (
    <Card className="border-border shadow-md bg-card -mt-2 md:-mt-3 min-h-[520px]">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">My Addresses</h3>
            <p className="text-sm text-muted-foreground">Manage your delivery addresses</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
            setIsAddDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2" disabled={addresses.length >= 10}>
                <Plus className="w-4 h-4" />
                Add Address
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="label">Label</Label>
                    <Select value={formData.label} onValueChange={(value: any) => setFormData({ ...formData, label: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Select 
                      value={formData.cityId} 
                      onValueChange={(value) => setFormData({ ...formData, cityId: value })}
                      disabled={isLoadingCities}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.id} value={city.id}>
                            {city.name}, {city.state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="houseNo">House/Flat Number *</Label>
                  <Input
                    id="houseNo"
                    value={formData.houseNo}
                    onChange={(e) => setFormData({ ...formData, houseNo: e.target.value })}
                    placeholder="e.g., A-123, Flat 4B"
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="street">Street/Area *</Label>
                  <Input
                    id="street"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    placeholder="Street address, area name"
                    maxLength={255}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="landmark">Landmark</Label>
                  <Input
                    id="landmark"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    placeholder="Nearby landmark"
                    maxLength={255}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="Postal code"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="Country"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Name</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="Alternate contact"
                      maxLength={100}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                    className="rounded border-border"
                  />
                  <Label htmlFor="isDefault" className="cursor-pointer">Set as default address</Label>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={resetForm} disabled={isSaving}>
                  Cancel
                </Button>
                <Button onClick={handleSaveAddress} disabled={isSaving}>
                  {isSaving ? 'Saving...' : editingAddress ? 'Update' : 'Add'} 
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))
          ) : addresses.length === 0 ? (
            <div className="py-12 text-center">
              <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No addresses found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add your first address to get started
              </p>
            </div>
          ) : (
            addresses.map((address) => {
              const Icon = getAddressIcon(address.label);
              const cityName = address.city ? `${address.city.name}, ${address.city.state}` : "";
              return (
                <Card
                  key={address.id}
                  className={cn(
                    "transition-all hover:border-primary/50",
                    address.isDefault && "border-primary bg-primary/5"
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                          address.isDefault ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                        )}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground capitalize">{address.label}</h4>
                            {address.isDefault && (
                              <Badge variant="default" className="text-xs">
                                Default
                              </Badge>
                            )}
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>{address.houseNo}, {address.street}</p>
                            {address.landmark && <p>{address.landmark}</p>}
                            <p>{cityName}</p>
                            <p>{address.pincode}, {address.country || 'Saudi Arabia'}</p>
                            {address.contactName && <p>Contact: {address.contactName} {address.contactPhone && `(${address.contactPhone})`}</p>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!address.isDefault && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSetDefault(address.id)}
                            title="Set as default"
                            disabled={setDefaultMutation.isPending}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(address)}
                          disabled={updateAddressMutation.isPending}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(address.id)}
                          className="text-destructive hover:text-destructive"
                          disabled={deleteAddressMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};
