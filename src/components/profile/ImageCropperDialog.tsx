"use client";

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { getCroppedImg } from '@/lib/canvasUtils';
import { Loader2 } from 'lucide-react';

interface ImageCropperDialogProps {
    open: boolean;
    imageSrc: string | null;
    onClose: () => void;
    onCropComplete: (croppedFile: File) => void;
}

export const ImageCropperDialog = ({ open, imageSrc, onClose, onCropComplete }: ImageCropperDialogProps) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const onCropChange = (crop: { x: number; y: number }) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom: number) => {
        setZoom(zoom);
    };

    const onCropCompleteHandler = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSave = async () => {
        if (imageSrc && croppedAreaPixels) {
            setIsProcessing(true);
            try {
                const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
                if (croppedBlob) {
                    const file = new File([croppedBlob], "profile_photo.jpg", { type: "image/jpeg" });
                    onCropComplete(file);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setIsProcessing(false);
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Adjust Profile Photo</DialogTitle>
                </DialogHeader>
                <div className="relative w-full h-80 bg-black/5 rounded-md overflow-hidden my-4">
                    {imageSrc && (
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={onCropChange}
                            onCropComplete={onCropCompleteHandler}
                            onZoomChange={onZoomChange}
                            classes={{
                                containerClassName: "rounded-md"
                            }}
                        />
                    )}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground w-12">Zoom</span>
                        <Slider
                            value={[zoom]}
                            min={1}
                            max={3}
                            step={0.1}
                            onValueChange={(value) => setZoom(value[0])}
                            className="flex-1"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isProcessing}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isProcessing}>
                        {isProcessing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Upload
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
