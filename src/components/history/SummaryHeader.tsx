import { SummaryHeaderContainer } from "@components/ui/routes/History";
import { startOfDay } from "@helpers/date";

export const SummaryHeader: React.FC = () => {
  return (
    <SummaryHeaderContainer>
      <div>Last 30 days Summary</div>
      <div>{startOfDay().toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</div>
    </SummaryHeaderContainer>
  )
}

