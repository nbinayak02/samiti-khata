import { Trash2, UploadCloud } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import WebcamComponent from "../webcam/Webcam-Component";
import { Button } from "../ui/button";
import { MouseEvent, useState } from "react";

type ImageCaptureDialogProps = {
  onCapture: (file: File) => void;
};

export default function ImageCaptureDialog({
  onCapture,
}: ImageCaptureDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isUploadClicked, setIsUploadClicked] = useState<boolean>(false);

  const handleUpload = async () => {
    if (!imageSrc) return;
    // convert base64 to bytes
    const response = await fetch(imageSrc);

    // convert bytes to blob
    const blob = await response.blob();

    // convert blob to file
    const imageFile = new File([blob], "receipt_image.jpg", {
      type: blob.type || "image/jpeg",
    });

    onCapture(imageFile);
    setOpen(false);
    setIsUploadClicked(true);
  };

  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setImageSrc(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative min-h-50 bg-muted border-2 border-dashed border-muted-foreground rounded-2xl flex flex-col justify-center items-center gap-2">
          {imageSrc && isUploadClicked ? (
            <>
              <img src={imageSrc} alt="receipt_image" className="rounded-2xl" />
              <Button
                className="absolute top-2 right-2 bg-rose-300/70 text-rose-800 hover:bg-rose-400 hover:text-rose-900 transition-colors"
                onClick={handleRemove}
              >
                <Trash2 />
              </Button>
            </>
          ) : (
            <>
              <UploadCloud size={40} />
              <p>Click to upload image.</p>
            </>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="w-full min-w-2xl min-h-146">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>Click capture button.</DialogDescription>
        </DialogHeader>
        <div>
          {imageSrc ? (
            <div className="flex flex-col gap-3">
              <img src={imageSrc} className="animate-flash" />
              <div className="self-end flex flex-row items-center gap-3">
                <Button className="min-w-40" onClick={handleUpload}>
                  <UploadCloud />
                  Upload
                </Button>
                <Button
                  className="min-w-30"
                  variant={"secondary"}
                  onClick={() => setImageSrc(null)}
                >
                  Retake
                </Button>
              </div>
            </div>
          ) : (
            <WebcamComponent setImageSrc={setImageSrc} />
          )}
        </div>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
