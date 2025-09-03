import { useEffect, useState } from "react";
import { WheelContainer, Wheel, WheelItem, WheelLabelWrapper, WheelIcon } from "@components/ui/ActivityWheel";
import { Modal } from "@components/Modal";
import { ModalSize } from "@components/ui/common/Modal";
import { Button } from "@components/ui/common/Button";
import { ActivityType } from "@db/schema";
import { useActivityTypes } from "@hooks/useActivityTypes";

type PropTypes = {
  onAccept: (type: ActivityType) => void;
  onCancel: () => void;
  isOpen: boolean;
};

export const ActivityWheelModal: React.FC<PropTypes> = ({ onAccept, onCancel, isOpen }) => {
  const [spinning, setSpinning] = useState(false);
  const [selectedType, setSelectedType] = useState<ActivityType | undefined>();
  const [rotation, setRotation] = useState(0);
  const { activityTypes } = useActivityTypes();

  const handleRoll = () => {
    setSpinning(true);
    setSelectedType(undefined);
    const randomIndex = Math.floor(Math.random() * activityTypes.length);
    const stepRotation = 360 / activityTypes.length;
    const newRotation = (Math.ceil(rotation / 360) * 360) + (360 * 5) + (stepRotation * Math.abs(randomIndex - activityTypes.length));
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      setSelectedType(activityTypes[randomIndex]);
    }, 4000);
  };

  useEffect(() => {
    if (activityTypes.length > 0) {
      handleRoll();
    }
  }, [activityTypes]);

  return (
    <Modal isOpen={isOpen} onClose={onCancel} width={ModalSize.Medium}>
      <h2>Randomize Activity Type</h2>
      <WheelContainer $items={activityTypes.length}>
        <Wheel $rotation={rotation}>
          {activityTypes.map((type, index) => (
            <WheelItem key={type.id} $items={activityTypes.length} $index={index}>
              <WheelLabelWrapper>
                <WheelIcon icon={type.icon} />{type.name}
              </WheelLabelWrapper>
            </WheelItem>
          ))}
        </Wheel>
      </WheelContainer>
      {selectedType && <p>Selected: {selectedType.name}</p>}
      <div>
        <Button $primary={true} onClick={() => onAccept(selectedType!)} disabled={!selectedType}>Accept</Button>
        <Button onClick={handleRoll} disabled={spinning}>Roll Again</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </Modal>
  );
};