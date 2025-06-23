import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "../ui/textarea";
import { updateUserProfile } from "@/reducers/authSlice";

type User = {
  id: string;
  email: string;
  userName: string;
  biography: string;
  profilePicture: string;
  conversations: string[];
  notifications: string[];
  friendList: string[];
  posts: string[];
  role: string;
  state: string;
} | null;

export default function EditProfileComponent({ user }: { user: User }) {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState(user?.userName || "");
  const [biography, setBiography] = useState(user?.biography || "");
  const [profilePicturePreview, setProfilePicturePreview] = useState<string>(
    user?.profilePicture || ""
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialUsername = user?.userName || "";
  const initialBiography = user?.biography || "";
  const initialProfilePicture = user?.profilePicture || "";

  const isUsernameModified = username !== initialUsername;
  const isBiographyModified = biography !== initialBiography;
  const isProfilePictureModified = selectedImage !== null;

  const isModified =
    isUsernameModified || isBiographyModified || isProfilePictureModified;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);

      // Create preview URL for display
      const previewUrl = URL.createObjectURL(file);
      setProfilePicturePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("userName", username);
    formData.append("biography", biography);

    if (selectedImage) {
      formData.append("profilePicture", selectedImage);
    }

    await dispatch(updateUserProfile(formData));
  };

  const resetProfilePicture = () => {
    setSelectedImage(null);
    setProfilePicturePreview(initialProfilePicture);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetUsername = () => setUsername(initialUsername);
  const resetBiography = () => setBiography(initialBiography);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          Modifier le profil de {user?.userName}
        </h1>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-4 min-w-[250px] h-full">
          <Label htmlFor="username">Nom d'utilisateur</Label>
          <div className="flex justify-between items-center gap-1.5">
            <Input
              type="text"
              id="username"
              placeholder="Votre nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span
              role="button"
              tabIndex={0}
              onClick={resetUsername}
              className={cn(
                "bi bi-arrow-clockwise text-2xl cursor-pointer",
                { "text-gray-400 cursor-default": !isUsernameModified },
                { "hover-transition": isUsernameModified }
              )}
              aria-disabled={!isUsernameModified}
              title="Remettre le nom d'utilisateur initial"
            />
          </div>

          <Label htmlFor="biography">Biographie</Label>
          <div className="flex justify-between items-center gap-1.5">
            <Textarea
              className="resize-none max-w-full max-h-[10em]"
              id="biography"
              placeholder="Parlez un peu de vous"
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              required
            />
            <span
              role="button"
              tabIndex={0}
              onClick={resetBiography}
              className={cn(
                "bi bi-arrow-clockwise text-2xl cursor-pointer",
                { "text-gray-400 cursor-default": !isBiographyModified },
                { "hover-transition": isBiographyModified }
              )}
              aria-disabled={!isBiographyModified}
              title="Remettre la biographie initiale"
            />
          </div>
        </div>

        <Card className="w-full max-w-sm flex h-min-content min-w-[300px]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <CardTitle>Photo de profil</CardTitle>
                <CardDescription>Choisissez une nouvelle image</CardDescription>
              </div>

              <span
                role="button"
                tabIndex={0}
                onClick={resetProfilePicture}
                className={cn(
                  "bi bi-arrow-clockwise text-2xl cursor-pointer",
                  { "text-gray-400 cursor-default": !isProfilePictureModified },
                  { "hover-transition": isProfilePictureModified }
                )}
                aria-disabled={!isProfilePictureModified}
                title="Remettre la photo de profil initiale"
              />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 items-center">
            <img
              src={profilePicturePreview}
              width={120}
              height={120}
              alt="Aperçu photo de profil"
              className="rounded-full"
              style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
            />
            <Input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
          </CardContent>
        </Card>
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer"
        disabled={!isModified}
      >
        Enregistrer les modifications
      </Button>
    </form>
  );
}
