import { Button, NavigationButton } from "@components/ui/common/Button";
import { Card, CardTitle } from "@components/ui/Card";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { SQLocal } from 'sqlocal';
import { processCSVFile } from "@helpers/csv";
import { ToggleLabel } from "./ui/common/Text";
import { ProfileContext } from "@providers/profile";
import WarningIconAsset from '@assets/icons/warning.svg?react';
import { Dialog } from "./ui/common/Dialog";
import styled from "styled-components";
import { ToastContext } from "./toast/provider";

const ButtonWarning = styled(WarningIconAsset)`
  height: 20px;
  width: 20px;
  color: ${({ theme }) => theme.warningColour};
  margin: -4px 0;
`;

const { getDatabaseFile, overwriteDatabaseFile, deleteDatabaseFile } = new SQLocal('database.sqlite3');

export const SQLocalFileCard: React.FC = () => {
  const { profile } = useContext(ProfileContext);
  const { addToast } = useContext(ToastContext);
  const inputFile = useRef<HTMLInputElement | null>(null);
  const csvInputFile = useRef<HTMLInputElement | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onDownload = async () => {
    const databaseFile = await getDatabaseFile();
    const fileUrl = URL.createObjectURL(databaseFile);

    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = 'database.sqlite3';
    a.click();
    a.remove();

    URL.revokeObjectURL(fileUrl);
  }

  const onFileSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    const databaseFile = e.target.files?.[0];
    if (databaseFile) {
      await overwriteDatabaseFile(databaseFile);
      addToast('Database restored', 'success', 3);
    }
  }

  const onCSVFileSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    const csvFile = e.target.files?.[0];
    if (csvFile) {
      await processCSVFile(csvFile, profile.startOfDayOffset);
      addToast('Database data imported', 'success', 3);
    }
  }

  const onResetData = async () => {
    await deleteDatabaseFile();
    localStorage.clear();
    setShowConfirm(false);
    addToast('Database cleared', 'success', 3);
  }

  return (
    <Card>
      <CardTitle>Database</CardTitle>
      <Button onClick={onDownload}>Download file</Button>
      <Button onClick={() => inputFile.current?.click()}>Restore from file</Button>
      <ToggleLabel onClick={() => setShowAdvanced(!showAdvanced)}>Show {showAdvanced ? 'Less' : 'More'}</ToggleLabel>
      {showAdvanced &&
        <>
          { profile.developer &&
            <>
              <Button onClick={() => csvInputFile.current?.click()}>Import data from csv file</Button>
              <NavigationButton to="/sqlocal">Query Database</NavigationButton>
            </>
          }
          <Button onClick={() => setShowConfirm(true)}>Reset all data <ButtonWarning /></Button>
        </>
      }
      <input type='file' id='file' ref={inputFile} style={{display: 'none'}} accept=".sqlite3" onChange={onFileSelected} />
      <input type='file' id='csv-file' ref={csvInputFile} style={{display: 'none'}} accept=".csv" onChange={onCSVFileSelected} />
      <Dialog
        title={'Confirm Reset'}
        text={`Are you sure you want to reset all data? This action is not reversable and will delete all data!`}
        isOpen={showConfirm}
        actions={[ { label: 'Reset data', onClick: onResetData }, { label: 'Cancel', onClick: () => setShowConfirm(false) } ]}
        onClose={() => setShowConfirm(false)}
      />
    </Card>
  )
}