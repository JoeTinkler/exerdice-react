import { SummaryMetricsContainer } from "@components/ui/routes/History";
import { HistoryDataContext } from "@providers/history"
import { useContext } from "react"

export const SummaryMetrics: React.FC = () => {
  const { stats } = useContext(HistoryDataContext);

  return (
    <SummaryMetricsContainer>
      <div>
        <span>{stats.minutes}</span>
        Total Minutes
      </div>
      <div>
        <span>{Math.round(stats.dailyAverage)}</span>
        Daily Average
      </div>
      <div>
        <span>{stats.activities}</span>
        Activities
      </div>
    </SummaryMetricsContainer>
  )
}