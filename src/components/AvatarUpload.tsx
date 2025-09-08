import { ChangeEvent, useContext, useRef, useState } from "react";
import { ProfileContext } from "@providers/profile";
import { ChangePhoto, ProfilePicWrapper } from "./ui/routes/Profile";
import { Avatar } from "./Avatar";
import { AvatarUrlDialog } from "./AvatarUrlDialog";

export const AvatarUpload: React.FC = () => {
  const { updateProfile } = useContext(ProfileContext);
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);

  const onFileSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        updateProfile({ avatarUrl: reader.result as string })
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      <ProfilePicWrapper>
        <Avatar onClick={() => inputFile.current?.click()} />
        <ChangePhoto onClick={() => inputFile.current?.click()}>Change Image</ChangePhoto>
        <ChangePhoto onClick={() => setIsAvatarDialogOpen(true)}>Change Url</ChangePhoto>
      </ProfilePicWrapper>
      <input type='file' id='file' ref={inputFile} style={{display: 'none'}} accept=".jpg .jpeg .png .svg .heic" onChange={onFileSelected} />
      <AvatarUrlDialog isOpen={isAvatarDialogOpen} onClose={() => setIsAvatarDialogOpen(false)} />
    </>
  )
}