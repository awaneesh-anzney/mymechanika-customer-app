"use client";

import React, { useState, useRef, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { getCroppedImg } from "@/lib/canvasUtils";
import { Camera, Upload, ZoomIn, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProfileAvatarProps {
    src?: string | null;
    alt?: string;
    size?: number;
    editable?: boolean;
    onImageUpdate?: (file: Blob) => void;
    className?: string; // Allow external styling
}

export function ProfileAvatar({ src, alt, size = 100, editable = false, onImageUpdate, className }: ProfileAvatarProps) {
    const [imageSrc, setImageSrc] = useState<string | null>(src || null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Temp state for key prop to reset input
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            // Basic validation
            if (!file.type.startsWith('image/')) {
                toast.error("Please upload an image file");
                return;
            }

            const imageDataUrl = await readFile(file);
            setImageSrc(imageDataUrl);
            setIsDialogOpen(true);

            // Reset input so same file selection works again if cancelled
            e.target.value = '';
        }
    };

    const handleSave = async () => {
        if (!imageSrc || !croppedAreaPixels) return;

        try {
            setIsProcessing(true);
            const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

            // Create a preview URL
            const previewUrl = URL.createObjectURL(croppedBlob);
            setImageSrc(previewUrl); // Update local preview

            if (onImageUpdate) {
                onImageUpdate(croppedBlob);
            }

            setIsDialogOpen(false);
            toast.success("Profile photo updated");
        } catch (e) {
            console.error(e);
            toast.error("Failed to crop image");
        } finally {
            setIsProcessing(false);
        }
    };

    // If no src, show initials or placeholder logic handled by parent OR this component
    // Assuming this component handles the visual circle.

    // Display Logic
    const hasImage = !!imageSrc;

    return (
        <div className={`relative inline-block ${className}`}>
            <div
                className="relative overflow-hidden rounded-full border border-border bg-muted flex items-center justify-center group"
                style={{ width: size, height: size }}
            >
                {hasImage ? (
                    <img src={imageSrc} alt={alt || "Profile"} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-primary/10 text-primary">
                        <Camera className="w-1/3 h-1/3 opacity-50" />
                    </div>
                )}

                {editable && (
                    <div
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Camera className="text-white w-6 h-6" />
                    </div>
                )}
            </div>

            {/* Hidden Input */}
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Crop Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Adjust Profile Picture</DialogTitle>
                    </DialogHeader>

                    <div className="relative w-full h-64 bg-black/5 rounded-md overflow-hidden mt-4">
                        {imageSrc && (
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1} // Square for profile
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        )}
                    </div>

                    <div className="flex items-center gap-4 py-4">
                        <ZoomIn className="w-4 h-4 text-muted-foreground" />
                        <Slider
                            value={[zoom]}
                            min={1}
                            max={3}
                            step={0.1}
                            onValueChange={(v) => setZoom(v[0])}
                            className="flex-1"
                        />
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isProcessing}>Cancel</Button>
                        <Button onClick={handleSave} disabled={isProcessing}>
                            {isProcessing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function readFile(file: File): Promise<string> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result as string), false);
        reader.readAsDataURL(file);
    });
}
