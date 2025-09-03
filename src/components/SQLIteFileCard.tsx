import { Button } from "@components/ui/common/Button";
import { Card, CardTitle } from "@components/ui/Card";
import { ChangeEvent, useRef } from "react";
import { SQLocal } from 'sqlocal';

const { getDatabaseFile, overwriteDatabaseFile } = new SQLocal('database.sqlite3');

export const SQLocalFileCard: React.FC = () => {
  const inputFile = useRef<HTMLInputElement | null>(null);

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

  const onRestore = async () => {
    inputFile.current?.click();
  }

  const onFileSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    const databaseFile = e.target.files?.[0];
    if (databaseFile) {
      await overwriteDatabaseFile(databaseFile);
      alert('Database restored');
    }
  }

  return (
    <Card>
      <CardTitle>Database</CardTitle>
      <Button onClick={onDownload}>Download File</Button>
      <Button onClick={onRestore}>Restore from file</Button>
      <input type='file' id='file' ref={inputFile} style={{display: 'none'}} accept=".sqlite3" onChange={onFileSelected} />
    </Card>
  )
}