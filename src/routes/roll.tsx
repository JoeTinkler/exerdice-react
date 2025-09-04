import { GlobalStyle } from "@components/Global";
import { NavBar } from "@components/NavBar";
import { Header } from "@components/ui/common/Header";
import { Card, CardTitle } from "@components/ui/Card";
import { SubHeader } from "@components/ui/common/Header";
import { Row } from "@components/ui/common/Layout";
import { RouteWrapper } from "@components/ui/common/Route";
import { Paragraph } from "@components/ui/common/Text";
import { useContext, useState } from "react";
import { Today } from "@components/Today";
import { Button } from "@components/ui/common/Button";
import { ButtonRow, DiceBox, InfoRow, ManualLink, ResultBox, ResultText, RolledDice, TipIcon } from "@components/ui/routes/Roll";
import { ProfileContext } from "@providers/profile";
import { diceShape } from "@components/ui/Dice";
import { ManualDiceDialog } from "@components/ManualDiceDialog";
import { RestCard } from "@components/RestCard";
import { RollDataContext } from "@providers/roll";

export const RollRoute: React.FC = () => {
  const { isRestDay, weekRestCount, stats, roll, minutesRolled, hasRolled, rollDice, acceptRoll, refreshTodaysRoll} = useContext(RollDataContext);
  const { profile } = useContext(ProfileContext);
  const [showManual, setShowManual] = useState(false);

  return (
    <>
      <GlobalStyle />
      <RouteWrapper>
        <Row>
          <Header>Today's Roll</Header>
          <Today />
        </Row>
        <SubHeader>Feeling lucky? Let the dice decide your activity duration!</SubHeader>
        <ManualLink onClick={() => setShowManual(true)}>Or set your roll manually</ManualLink>

        {isRestDay && <RestCard weekRestCount={weekRestCount} weeklyRestDays={profile.weeklyRestDays} />}

        {!isRestDay &&
          <>
            <DiceBox>
              {hasRolled &&
                <>
                  <RolledDice $shape={diceShape(roll!.modifierRoll.max)} $highlight={true}>{roll!.modifierRoll.value}</RolledDice>
                  {roll!.activityRolls?.map((r, i) => (<RolledDice $shape={diceShape(r.max)} $highlight={true} key={i}>{r.value}</RolledDice>))}
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
          <InfoRow>
            <span>Total:</span>
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
              <TipIcon /> Tip
            </Row>
          </CardTitle>
          <Paragraph>
            Rolling higher numbers? Try splitting your total into multiple
            activities throughout the day!
          </Paragraph>
        </Card>
      </RouteWrapper>
      <ManualDiceDialog isOpen={showManual} onClose={() => { setShowManual(false); refreshTodaysRoll(); }} />
      <NavBar />
    </>
  );
}
