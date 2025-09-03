import { ProfileContext } from "@providers/profile"
import { useContext } from "react";
import ProfileIconAsset from '@assets/icons/profile-circle.svg?react';
import styled from "styled-components";

const ProfilePic = styled.img<{ $size?: number }>`
  width: ${({ $size }) => $size ?? 60}px;
  height: ${({ $size }) => $size ?? 60}px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileIcon = styled(ProfileIconAsset)<{ $size?: number }>`
  width: ${({ $size }) => $size ?? 60}px;
  height: ${({ $size }) => $size ?? 60}px;
`;

type PropTypes = {
  size?: number;
}

export const Avatar: React.FC<PropTypes> = ({ size = 60 }) => {
  const { profile } = useContext(ProfileContext);
  return profile?.avatarUrl ? <ProfilePic $size={size} src={profile?.avatarUrl} /> : <ProfileIcon $size={size} />
}