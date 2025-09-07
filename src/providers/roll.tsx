import { PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { createContext } from 'react';
import { DayRollState, useTodaysRolls } from "@hooks/useTodaysRoll";
import { useIsRestDay } from "@hooks/useIsRestDay";
import { useRestCountThisWeek } from "@hooks/useRestCountThisWeek";
import { RollStats, useRollStats } from "@hooks/useRollStats";
import { ProfileContext } from "./profile";
import { useNavigate } from "react-router-dom";
import { generateRoll } from "@helpers/rolls";
import { useDiceBox } from "@hooks/useDiceBox";

type RollDataContextData = {
  isRestDay: boolean;
  weekRestCount: number;
  stats: RollStats;
  roll?: DayRollState;
  minutesRolled: number;
  hasRolled: boolean;
  rollDice: () => void;
  acceptRoll: () => void;
  refreshTodaysRoll: () => void;
  onCancelRest: () => Promise<void>;
}

export const RollDataContext = createContext<RollDataContextData>({
  isRestDay: false,
  weekRestCount: 0,
  stats: { yesterdayTotal: 0, weekAverage: 0},
  minutesRolled: 0,
  hasRolled: false,
  rollDice: () => { },
  acceptRoll: () => { },
  refreshTodaysRoll: () => { },
  onCancelRest: async () => { }
});

export const RollDataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isRestDay, removeRest } = useIsRestDay();
  const { weekRestCount, refresh: refreshRestCount } = useRestCountThisWeek();
  const { todaysRoll, saveRoll, refresh: refreshTodaysRoll } = useTodaysRolls();
  const { stats } = useRollStats();
  const { profile } = useContext(ProfileContext);
  const { rollResult, roll: rollDiceBox } = useDiceBox('#dice-box-container');

  const [roll, setRoll] = useState(todaysRoll);

  const minutesRolled = roll?.activityRolls?.reduce((s, ex) => s + ex.value, 0) ?? 0;
  const hasRolled = !!roll;
  const navigate = useNavigate();

  const rollDice = () => {
    if (profile.show3dDice) {
      rollDiceBox();
    } else {
      const newRoll = generateRoll({ maxCount: profile.modifierDiceSize, maxExcerciseValue: profile.exerciseDiceSize });
      setRoll(newRoll);
    }
  };

  const acceptRoll = async () => {
    if (!roll) return;
    await saveRoll(roll);
    navigate('/dashboard');
  };

  const onCancelRest = async () => {
    await removeRest();
    refreshRestCount();
  }

  useEffect(() => {
    setRoll(todaysRoll);
  }, [todaysRoll]);

  useEffect(() => {
    if (rollResult) {
      setRoll(rollResult);
    }
  }, [rollResult]);

  return (
    <RollDataContext.Provider value={{ isRestDay, weekRestCount, acceptRoll, refreshTodaysRoll, stats, roll, minutesRolled, hasRolled, rollDice, onCancelRest }}>
      {children}
    </RollDataContext.Provider>
  );
}