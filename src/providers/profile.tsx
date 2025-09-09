import { useLocalState } from "@hooks/useLocalState";
import { PropsWithChildren } from "react";
import { createContext } from 'react';

const STORAGE_KEY = 'miro_exerdice_profile';
const DEFAULT_DATA: ProfileData = {
  modifierDiceSize: 4,
  exerciseDiceSize: 20,
  weeklyRestDays: 3,
  startOfDayOffset: 0,
  show3dDice: false
}

type ProfileData = {
  name?: string;
  email?: string;
  avatarUrl?: string;
  weeklyRestDays: number;
  modifierDiceSize: number;
  exerciseDiceSize: number;
  startOfDayOffset: number;
  show3dDice: boolean;
}

type ProfileContextData = {
  profile: ProfileData;
  updateProfile: (profile: Partial<ProfileData>) => void;
}

export const ProfileContext = createContext<ProfileContextData>({
  profile: DEFAULT_DATA,
  updateProfile: () => {}
});

export const ProfileProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { value: profile, mergeValue } = useLocalState<ProfileData>(STORAGE_KEY, DEFAULT_DATA);

  return (
  <ProfileContext.Provider value={{ profile, updateProfile: mergeValue }}>
    {children}
  </ProfileContext.Provider>
  );
}