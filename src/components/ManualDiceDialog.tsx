import { Dialog } from "@components/ui/common/Dialog";
import { Label } from "@components/ui/common/Text";
import { ProfileContext } from "@providers/profile"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { Input } from "@components/ui/Form";
import { Button } from "@components/ui/common/Button";
import { Row } from "@components/ui/common/Layout";
import styled from "styled-components";
import { useTodaysRolls } from "@hooks/useTodaysRoll";
import PlusIconAsset from "@assets/icons/plus.svg?react";
import MinusIconAsset from "@assets/icons/minus.svg?react";

type PropTypes = {
  isOpen: boolean;
  onClose: () => void;
}

const NumberRow = styled(Row)`
  margin: 0;
  width: 100%;
  max-width: 100%;
  gap: 5px;
`;

const NumberButton = styled(Button)`
  padding: 5px;
  max-width: 35px;
`;

const PlusIcon = styled(PlusIconAsset)`
  width: 15px;
  height: 15px;
  padding: 0;
  margin: 0;
`;

const MinusIcon = styled(MinusIconAsset)`
  width: 15px;
  height: 15px;
  padding: 0;
  margin: 0;
`;

export const ManualDiceDialog: React.FC<PropTypes> = ({ isOpen, onClose }) => {
  const { todaysRoll, saveRoll, loading } = useTodaysRolls();
  const { profile } = useContext(ProfileContext);

  const [modifierValue, setModifierValue] = useState<number | undefined>(todaysRoll?.modifierRoll.value ?? 1);
  const [activityValues, setActivityValues] = useState<(number | undefined)[]>(todaysRoll?.activityRolls?.map((r) => r.value) ?? Array.from(Array(modifierValue)).fill(1));

  useEffect(() => {
    setModifierValue(todaysRoll?.modifierRoll.value ?? 1);
    setActivityValues(todaysRoll?.activityRolls?.map((r) => r.value) ?? Array.from(Array(modifierValue)).fill(1));
  }, [todaysRoll]);

  const modifierMax = todaysRoll?.modifierRoll.max ?? profile.modifierDiceSize;
  const isFormValid = modifierValue && activityValues.every((v) => !!v);

  const onSave = async () => {
    if (loading || !isFormValid) return;
    await saveRoll({
      ...todaysRoll,
      modifierRoll: {
        value: modifierValue!,
        max: todaysRoll?.modifierRoll.max ?? profile.modifierDiceSize
      },
      activityRolls: activityValues.map((value) => ({ value: value!, max: profile.exerciseDiceSize }))
    });
    onClose();
  }

  const onModifierChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModifier(parseInt(e.target.value));
  }

  const setModifier = (value: number) => {
    if (isNaN(value)) {
      setModifierValue(undefined);
      setActivityValues([])
      return;
    }
    value = Math.max(1, Math.min(modifierMax, value))
    let activityRolls = activityValues.slice(0, value);
    if (activityRolls.length < value) {
      activityRolls = [...activityValues, ...Array(value - activityValues.length).fill(1)];
    }
    setModifierValue(value);
    setActivityValues(activityRolls);
  }

  const onActivityChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setActivity(parseInt(e.target.value), index);
  }

  const setActivity = (value: number, index: number) => {
    const activityValue = isNaN(value) ? undefined : Math.max(1, Math.min(profile.exerciseDiceSize, value));
    setActivityValues(activityValues.map((v, i) => i === index ? activityValue : v));
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={'Manual Dice Roll'}
      actions={[
        { label: 'Save', onClick: onSave },
        { label: 'Cancel', onClick: onClose }
      ]}
    >
      <Label>Modifier Dice {loading && <Label>Loading...</Label>}</Label>
      <NumberRow>
        <Input value={modifierValue} onChange={onModifierChange} max={modifierMax} />
        <NumberButton onClick={() => setModifier((modifierValue?? 0) - 1)}><MinusIcon /></NumberButton>
        <NumberButton onClick={() => setModifier((modifierValue ?? 0) + 1)}><PlusIcon /></NumberButton>
      </NumberRow>

      {activityValues.map((value, i) => (
        <NumberRow key={i}>
          <Label>Activity Dice {i + 1}</Label>
          <Input value={value} onChange={(e) => onActivityChange(e, i)} max={profile.exerciseDiceSize} />
          <NumberButton onClick={() => setActivity((value  ?? 0) - 1, i)}><MinusIcon /></NumberButton>
          <NumberButton onClick={() => setActivity((value  ?? 0) + 1, i)}><PlusIcon /></NumberButton>
        </NumberRow>
      ))}
    </Dialog>
  )
}