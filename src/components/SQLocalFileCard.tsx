import { Button } from "@components/ui/common/Button";
import { Card, CardTitle } from "@components/ui/Card";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { SQLocal } from 'sqlocal';
import { processCSVFile } from "@helpers/csv";
import { ToggleLabel } from "./ui/common/Text";
import { ProfileContext } from "@providers/profile";

const { getDatabaseFile, overwriteDatabaseFile } = new SQLocal('database.sqlite3');

export const SQLocalFileCard: React.FC = () => {
  const { profile } = useContext(ProfileContext);
  const inputFile = useRef<HTMLInputElement | null>(null);
  const csvInputFile = useRef<HTMLInputElement | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

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
      alert('Database restored');
    }
  }

  const onCSVFileSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    const csvFile = e.target.files?.[0];
    if (csvFile) {
      await processCSVFile(csvFile, profile.startOfDayOffset);
      alert('Database data imported');
    }
  }

  return (
    <Card>
      <CardTitle>Database</CardTitle>
      <Button onClick={onDownload}>Download File</Button>
      <Button onClick={() => inputFile.current?.click()}>Restore from file</Button>
      <ToggleLabel onClick={() => setShowAdvanced(!showAdvanced)}>Show {showAdvanced ? 'Less' : 'More'}</ToggleLabel>
      {showAdvanced && <Button onClick={() => csvInputFile.current?.click()}>Import data from csv file</Button>}
      <input type='file' id='file' ref={inputFile} style={{display: 'none'}} accept=".sqlite3" onChange={onFileSelected} />
      <input type='file' id='csv-file' ref={csvInputFile} style={{display: 'none'}} accept=".csv" onChange={onCSVFileSelected} />
    </Card>
  )
}