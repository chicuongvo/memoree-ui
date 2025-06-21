import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Upload, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/api/post.api";

interface PostPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostPhotoModal({
  isOpen,
  onClose,
}: PostPhotoModalProps) {
  const [activeTab, setActiveTab] = useState("upload");
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess() {
      setIsSubmitting(false);
      setPreviewImage(null);
      setCaption("");
      onClose();
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context?.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataUrl = canvas.toDataURL("image/png");
      setPreviewImage(imageDataUrl);

      // Stop the webcam stream
      const stream = video.srcObject as MediaStream;
      const tracks = stream?.getTracks();
      tracks?.forEach(track => track.stop());
      video.srcObject = null;
    }
  };

  const handleSubmit = () => {
    if (!previewImage || !imageFile) return;

    const formData = new FormData();
    formData.append("title", caption);
    formData.append("image", imageFile);

    setIsSubmitting(true);
    mutate(formData);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "camera") {
      startWebcam();
    } else if (videoRef.current) {
      // Stop webcam if switching away from camera tab
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream?.getTracks();
      tracks?.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const clearPreview = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share a moment</DialogTitle>
        </DialogHeader>

        {!previewImage ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="mb-2 text-sm text-muted-foreground">
              Click to upload or drag and drop
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <Button onClick={() => fileInputRef.current?.click()}>
              Choose file
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img
                src={previewImage || "/placeholder.svg"}
                alt="Preview"
                className="object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full"
                onClick={clearPreview}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <Textarea
              placeholder="Add a caption... (max 100 characters)"
              value={caption}
              onChange={e => setCaption(e.target.value)}
              maxLength={100}
              className="resize-none"
              rows={3}
            />

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
