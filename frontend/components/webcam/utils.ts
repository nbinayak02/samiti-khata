export function getWebcamErrorMessage(error: DOMException): string {
  switch (error.name) {
    case "NotAllowedError":
      return "Camera permission was denied. Please allow camera access and try again.";

    case "NotFoundError":
      return "No camera was found on this device.";

    case "NotReadableError":
      return "The camera is currently in use by another application.";

    case "OverconstrainedError":
      return "The requested camera settings are not supported by your device.";

    case "SecurityError":
      return "Camera access is blocked due to your browser or security settings.";

    default:
      return "Something went wrong when accessing the camera.";
  }
}
