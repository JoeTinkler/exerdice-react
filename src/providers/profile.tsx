import { PropsWithChildren, useEffect, useState } from "react";
import { createContext } from 'react';

const STORAGE_KEY = 'miro_exerdice_profile';
const DEFAULT_DATA: ProfileData = {
  modifierDiceSize: 4,
  exerciseDiceSize: 20,
  weeklyRestDays: 3,
}

type ProfileData = {
  name?: string;
  email?: string;
  avatarUrl?: string;
  weeklyRestDays: number;
  modifierDiceSize: number;
  exerciseDiceSize: number;
}

type ProfileContextData = {
  profile: ProfileData;
  updateProfile: (profile: Partial<ProfileData>) => void;
}

const fetchProfile = (): ProfileData => {
  const storedProfile = localStorage.getItem(STORAGE_KEY);
  return storedProfile ? JSON.parse(storedProfile) : DEFAULT_DATA;
}

const storeProfile = (profile: ProfileData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}


export const ProfileContext = createContext<ProfileContextData>({
  profile: DEFAULT_DATA,
  updateProfile: () => {}
});

export const ProfileProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [profile, setProfile] = useState(fetchProfile());
  const updateProfile = (data: Partial<ProfileData>) => {
    setProfile({ ...profile, ...data });
  };

  useEffect(() => {
    storeProfile(profile);
  }, [profile]);

  return (
  <ProfileContext.Provider value={{ profile, updateProfile }}>
    {children}
  </ProfileContext.Provider>
  );
}