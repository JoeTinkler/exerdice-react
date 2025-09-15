import { ActivityIcon } from "./ActivityIcon";
import { ActivityType } from "@db/schema";
import { ChangeEvent, useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { TableData, TableRow } from "@components/ui/common/table";
import { ButtonRow, CheckIcon, EditIcon, BinIcon, IconButton, NameInput, IconSelect } from "@components/ui/ActivityTypeItem";
import { Dialog } from "@components/ui/common/Dialog";

type PropTypes = {
  activityType: ActivityType;
  showEdit: boolean;
  toggleEdit: () => void;
  update: (id: number, patch: Partial<ActivityType>) => void;
  remove: (id: number) => void;
}

export const ActivityTypeItem: React.FC<PropTypes> = ({ activityType, showEdit, toggleEdit, update, remove }) => {
  const [name, setName] = useState(activityType.name);
  const [icon, setIcon] = useState(activityType.icon);
  const [showConfirm, setShowConfirm] = useState(false);

  const debouncedUpdate = useDebouncedCallback((patch: Partial<ActivityType>) => {
    update(activityType.id, patch);
  }, 2000);

  const onUpdateName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    debouncedUpdate({ name: e.target.value });
  }, [debouncedUpdate]);

  const onUpdateIcon = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setIcon(e.target.value  as any);
    update(activityType.id, { icon: e.target.value as any });
  }, [activityType]);

  return (
    <>
    <TableRow>
      <TableData>
        {!showEdit && <ActivityIcon icon={activityType.icon} />}
        {showEdit &&
          <IconSelect value={icon ?? 'heart'} onChange={onUpdateIcon} >
            <option value={'bicycle'}>Bicycle</option>
            <option value={'dumbbell'}>Dumbbell</option>
            <option value={'swim'}>Swim</option>
            <option value={'heart'}>Heart</option>
            <option value={'run'}>Run</option>
            <option value={'walk'}>Walk</option>
          </IconSelect>
        }
      </TableData>
      <TableData>
        {!showEdit && activityType.name}
        { showEdit && <NameInput type="text" value={name} onChange={onUpdateName} /> }
      </TableData>
      <TableData>
        <ButtonRow>
          <IconButton $size="small" onClick={() => toggleEdit()}>
            {!showEdit && <EditIcon />}
            {showEdit && <CheckIcon />}
          </IconButton>
          <IconButton $size="small" onClick={() => setShowConfirm(true)}>
            <BinIcon />
          </IconButton>
        </ButtonRow>
      </TableData>
    </TableRow>
      <Dialog
        title={'Confirm Delete'}
        text={`Are you sure you want to delete the ${name ?? 'unnamed'} activity type?`}
        isOpen={showConfirm}
        actions={[ { label: 'Delete', onClick: () =>  remove(activityType.id) }, { label: 'Cancel', onClick: () => setShowConfirm(false) } ]}
        onClose={() => setShowConfirm(false)}
      />
    </>
  );
}