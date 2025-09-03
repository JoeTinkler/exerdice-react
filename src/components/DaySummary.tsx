import { Dice, diceShape } from "@components/ui/Dice";
import { Row } from "@components/ui/common/Layout";
import { DaySummaryContainer } from "@components/ui/routes/History";
import { Activity } from "@db/schema";
import { completedPercent, exerciseTotal, rollTotal } from "@helpers/rolls";
import { DayRollState } from "@hooks/useTodaysRoll";
import styled from "styled-components";

type PropTypes = {
  date: string;
  activities: Activity[];
  roll?: DayRollState;
}

const Column = styled.div`
`;

const DiceColumn = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
`;

const MiniDice = styled(Dice)`
  width: 20px;
  height: 20px;
  font-size: 10px;
  margin: 0;
`;

export const DaySummary: React.FC<PropTypes> = ({ date, activities, roll }) => (
  <DaySummaryContainer>
    <Row>
      <Column>{date} : {roll && `${exerciseTotal(activities)} / ${rollTotal(roll)} (${Math.round(completedPercent(roll, activities))}%)`}</Column>
      {roll && <DiceColumn>
        <MiniDice $highlight={true} $shape={diceShape(roll.modifierRoll.max)}>{roll.modifierRoll.value}</MiniDice>
        {roll.activityRolls.map((r, i) => <MiniDice key={i} $shape={diceShape(r.max)}>{r.value}</MiniDice>)}
      </DiceColumn>}
    </Row>
  </DaySummaryContainer>
)