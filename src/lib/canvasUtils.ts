import { Area } from "react-easy-crop";

export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        const corsImage = new Image(); // avoid CORS issues on some browsers
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous");
        image.src = url;
    });

export function getRadianAngle(degreeValue: number) {
    return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width: number, height: number, rotation: number) {
    const rotRad = getRadianAngle(rotation);

    return {
        width:
            Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height:
            Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
}

/**
 * Compresses the image if it exceeds the max size.
 */
async function compressImage(canvas: HTMLCanvasElement, quality: number = 0.9): Promise<Blob> {
    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error("Canvas is empty"));
                }
            },
            "image/jpeg",
            quality
        );
    });
}


export async function getCroppedImg(
    imageSrc: string,
    pixelCrop: Area,
    rotation = 0,
    flip = { horizontal: false, vertical: false }
): Promise<Blob> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error('No 2d context');
    }

    const rotRad = getRadianAngle(rotation);

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
        image.width,
        image.height,
        rotation
    );

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // draw rotated image
    ctx.drawImage(image, 0, 0);

    const data = ctx.getImageData(
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height
    );

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image at the top left corner
    ctx.putImageData(data, 0, 0);

    // Basic compression strategy:
    // If larger than roughly 2000px, resize down.
    // Quality starts at 0.9
    let quality = 0.9;

    // Resize logic if needed (e.g. max 1080p for profile)
    if (canvas.width > 1080 || canvas.height > 1080) {
        const scalingFactor = Math.min(1080 / canvas.width, 1080 / canvas.height);
        const newWidth = canvas.width * scalingFactor;
        const newHeight = canvas.height * scalingFactor;

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = newWidth;
        tempCanvas.height = newHeight;
        const tCtx = tempCanvas.getContext('2d');
        if (tCtx) {
            tCtx.drawImage(canvas, 0, 0, newWidth, newHeight);
            canvas.width = newWidth;
            canvas.height = newHeight;
            const finalCtx = canvas.getContext('2d');
            if (finalCtx) finalCtx.drawImage(tempCanvas, 0, 0);
        }
    }


    // Get Blob
    let blob = await compressImage(canvas, quality);

    // Check size (5MB = 5 * 1024 * 1024)
    const MAX_SIZE = 5 * 1024 * 1024;

    while (blob.size > MAX_SIZE && quality > 0.5) {
        quality -= 0.1;
        blob = await compressImage(canvas, quality);
    }

    return blob;
}
