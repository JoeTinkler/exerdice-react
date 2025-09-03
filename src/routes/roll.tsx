import { GlobalStyle } from "@components/Global";
import { NavBar } from "@components/NavBar";
import { Header } from "@components/ui/common/Header";
import { Card, CardTitle } from "@components/ui/Card";
import { SubHeader } from "@components/ui/common/Header";
import { Row } from "@components/ui/common/Layout";
import { RouteWrapper } from "@components/ui/common/Route";
import { Paragraph } from "@components/ui/common/Text";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Today } from "@components/Today";
import { Button } from "@components/ui/common/Button";
import { ButtonRow, DiceBox, InfoRow, ManualLink, ResultBox, ResultText, RolledDice, TipIcon } from "@components/ui/routes/Roll";
import { ProfileContext } from "@providers/profile";
import { diceShape } from "@components/ui/Dice";
import { ManualDiceDialog } from "@components/ManualDiceDialog";
import { useIsRestDay } from "@hooks/useIsRestDay";
import { useTodaysRolls } from "@hooks/useTodaysRoll";
import { useRollStats } from "@hooks/useRollStats";
import { generateRoll } from "@helpers/rolls";
import { RestCard } from "@components/RestCard";

export const RollRoute: React.FC = () => {
  const { isRestDay } = useIsRestDay();
  const { todaysRoll, saveRoll, refresh: refreshTodaysRoll } = useTodaysRolls();
  const { stats } = useRollStats();
  const { profile } = useContext(ProfileContext);

  const [roll, setRoll] = useState(todaysRoll);
  const [showManual, setShowManual] = useState(false);

  const minutesRolled = roll?.activityRolls?.reduce((s, ex) => s + ex.value, 0) ?? 0;
  const hasRolled = !!roll;
  const navigate = useNavigate();

  const rollDice = () => {
    const newRoll = generateRoll({ maxCount: profile.modifierDiceSize, maxExcerciseValue: profile.exerciseDiceSize });
    setRoll(newRoll);
  };

  const acceptRoll = async () => {
    if (!roll) return;
    await saveRoll(roll);
    navigate('/dashboard');
  };

  useEffect(() => {
    setRoll(todaysRoll);
  }, [todaysRoll])

  return (
    <>
      <GlobalStyle />
      <RouteWrapper>
        <Row>
          <Header>Today's Roll</Header>
          <Today />
        </Row>
        <SubHeader>Feeling lucky? Let the dice decide your exercise duration today! <ManualLink onClick={() => setShowManual(true)}>Or set your roll manually</ManualLink></SubHeader>

        {isRestDay && <RestCard />}

        {!isRestDay &&
          <>
            <DiceBox>
              {hasRolled &&
                <>
                  <RolledDice $shape={diceShape(roll.modifierRoll.max)} $highlight={true}>{roll.modifierRoll.value}</RolledDice>
                  {roll.activityRolls?.map((r, i) => (<RolledDice $shape={diceShape(r.max)} $highlight={true} key={i}>{r.value}</RolledDice>))}
                </>
              }
              {!hasRolled && <>Not Rolled</>}
            </DiceBox>

            <ResultBox>
              {!hasRolled && <ResultText>Ready to roll?</ResultText>}
              {hasRolled &&
                <>
                  <ResultText>You rolled <strong>{minutesRolled}</strong> minutes!</ResultText>
                  <p>That's a great workout length. Ready to get started?</p>
                </>
              }
              <ButtonRow>
                <Button $size="medium" onClick={rollDice}>Roll {hasRolled ? 'Again' : 'to Start'}</Button>
                <Button $size="medium" $primary onClick={acceptRoll} disabled={!hasRolled}>Accept</Button>
              </ButtonRow>
            </ResultBox>
          </>
        }

        <Card>
          <CardTitle>Today's Workout</CardTitle>
          <InfoRow>
            <span>Duration:</span>
            <strong>{minutesRolled} minutes</strong>
          </InfoRow>
          <InfoRow>
            <span>Previous Roll:</span>
            <span>{stats.yesterdayTotal} minutes</span>
          </InfoRow>
          <InfoRow>
            <span>Weekly Average:</span>
            <span>{Math.round(stats.weekAverage)} minutes</span>
          </InfoRow>
        </Card>

        <Card>
          <CardTitle>
            <Row>
              <TipIcon /> Workout Tip
            </Row>
          </CardTitle>
          <Paragraph>
            Rolling higher numbers? Try splitting your workout into multiple
            sessions throughout the day!
          </Paragraph>
        </Card>
      </RouteWrapper>
      <ManualDiceDialog isOpen={showManual} onClose={() => { setShowManual(false); refreshTodaysRoll(); }} />
      <NavBar />
    </>
  );
}
