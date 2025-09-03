import { Dialog } from "@components/ui/common/Dialog";
import { Label } from "@components/ui/common/Text";
import { ProfileContext } from "@providers/profile"
import { useContext, useState } from "react"
import ProfileIconAsset from '@assets/icons/profile-circle.svg?react';
import styled from "styled-components";
import { Input } from "@components/ui/Form";

type PropTypes = {
  isOpen: boolean;
  onClose: () => void;
}

const ProfilePic = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileIcon = styled(ProfileIconAsset)`
  width: 60px;
  height: 60px;
`;

export const AvatarUrlDialog: React.FC<PropTypes> = ({ isOpen, onClose }) => {
  const { profile, updateProfile } = useContext(ProfileContext);
  const [url, setUrl] = useState(profile.avatarUrl);

  const onSave = () => {
    updateProfile({ ...profile, avatarUrl: url });
    onClose();
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={'Profile Picture URL'}
      actions={[
        { label: 'Save', onClick: onSave },
        { label: 'Cancel', onClick: onClose }
      ]}
    >
      {url ? <ProfilePic src={url} /> : <ProfileIcon />}
      <Label>Url</Label>
      <Input value={url} onChange={(e) => setUrl(e.target.value)} />
    </Dialog>
  )
}