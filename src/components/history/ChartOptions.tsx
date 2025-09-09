import { Radiobox } from "@components/form/Radiobox";
import { Toggle } from "@components/form/Toggle";
import { Label } from "@components/ui/common/Text";
import { Checkbox, CheckboxGroup, CheckboxLabel, Select } from "@components/ui/Form";
import { ChartOptions, HistoryDataContext } from "@providers/history"
import { useContext } from "react"

type ColumnCheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}
const ColumnCheckbox: React.FC<ColumnCheckboxProps> = ({ label, checked, onChange }) => (
  <CheckboxLabel>
    {label}
    <Checkbox type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
  </CheckboxLabel>
);

export const ConfigureChart: React.FC = () => {
  const { chartOptions, setChartOptions } = useContext(HistoryDataContext);

  const onChange = (patch: Partial<ChartOptions>) => {
    setChartOptions({ ...chartOptions, ...patch });
  }

  const onChangeColumn = (patch: Partial<ChartOptions['columns']>) => {
    console.log(chartOptions);
    console.log(patch);
    setChartOptions({ ...chartOptions, columns: { ...chartOptions.columns, ...patch } });
  }

  return (
    <>
      <hr />

      <Label>Chart Type</Label>
      <Radiobox value={chartOptions.type} options={[
        { label: 'Line', name: 'line', value: 'line' },
        { label: 'Bar', name: 'bar', value: 'bar' },
      ]} onChange={(value) => onChange({ type: value as ChartOptions['type'] })} />

      <Label>Chart Columns</Label>
      <CheckboxGroup>
        <ColumnCheckbox label="Total Minutes" checked={chartOptions.columns.minutes} onChange={(checked) => onChangeColumn({ minutes: checked})} />
        <ColumnCheckbox label="Total Rolls" checked={chartOptions.columns.rolls} onChange={(checked) => onChangeColumn({ rolls: checked})} />
        <ColumnCheckbox label="Total Distance" checked={chartOptions.columns.distance} onChange={(checked) => onChangeColumn({ distance: checked})} />
        <ColumnCheckbox label="Total Calories" checked={chartOptions.columns.calories} onChange={(checked) => onChangeColumn({ calories: checked})} />
      </CheckboxGroup>
    </>
  )
}