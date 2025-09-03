import { ProgressBarContainer, ProgressFill } from "@components/ui/ProgressBar"

type PropTypes = {
  percentage: number;
}

export const ProgressBar: React.FC<PropTypes> = ({ percentage }) => (
  <ProgressBarContainer>
    <ProgressFill $percentage={percentage}/>
  </ProgressBarContainer>
);