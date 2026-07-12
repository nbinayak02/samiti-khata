import Webcam from "react-webcam";
import { getWebcamErrorMessage } from "./utils";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { Button } from "../ui/button";

type WebcamComponentProps = {
  setImageSrc: Dispatch<SetStateAction<string | null>>;
};

export default function WebcamComponent({ setImageSrc }: WebcamComponentProps) {
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraLoading, setIsCameraLoading] = useState<boolean>(true);
  const webCamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    if (!webCamRef.current) return;
    const shutter = new Audio("/sounds/camera_shutter.mp3");
    shutter.play().catch(console.error);
    const imageSrc = webCamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webCamRef]);

  const handleUserMediaError = (error: DOMException | string) => {
    setIsCameraLoading(false);
    if (typeof error === "string") {
      setCameraError(error);
      return;
    }
    const errorMessage = getWebcamErrorMessage(error);
    setCameraError(errorMessage);
  };

  return (
    <div>
      {cameraError ? (
        <div className="text-rose-500">{cameraError}</div>
      ) : (
        <div className="flex flex-col gap-3">
          <Webcam
            mirrored
            ref={webCamRef}
            onUserMedia={() => {
              setIsCameraLoading(false);
              setCameraError(null);
            }}
            onUserMediaError={handleUserMediaError}
          />
          {!isCameraLoading && (
            <>
              <Button className="self-end min-w-40" onClick={capture}>Capture</Button>
            </>
          )}
        </div>
      )}
      {isCameraLoading && (
        <div className="absolute top-30">Loading Camera, Please wait...</div>
      )}
    </div>
  );
}
