import { SummaryHeaderContainer } from "@components/ui/routes/History";
import { startOfDayUnix } from "@helpers/date";
import { ProfileContext } from "@providers/profile";
import { useContext } from "react";

export const SummaryHeader: React.FC = () => {
  const { profile } = useContext(ProfileContext);
  return (
    <SummaryHeaderContainer>
      <div>Last 30 days Summary</div>
      <div>{new Date(startOfDayUnix(profile.startOfDayOffset)).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</div>
    </SummaryHeaderContainer>
  )
}

