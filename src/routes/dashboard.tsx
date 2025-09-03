import { GlobalStyle } from "@components/Global";
import { NavBar } from "@components/NavBar";
import { useState } from "react";
import { RouteWrapper } from "@components/ui/common/Route";
import { Grid, Row } from "@components/ui/common/Layout";
import { Header } from "@components/ui/common/Header";
import { ChallengeText, CompletedLabel, DiceIcon, DiceRow, HistoryIcon, Metric, MetricLabel, MetricNumber, Metrics, ModifierDice, NotRolledLabel, ProfileIcon } from "@components/ui/routes/Dashboard";
import { Card, CardTitle, GridCard } from "@components/ui/Card";
import { ProgressBar } from "@components/ProgressBar";
import { Paragraph } from "@components/ui/common/Text";
import { Dice, diceShape } from "@components/ui/Dice";
import { Button, NavigationButton } from "@components/ui/common/Button";
import { Today } from "@components/Today";
import { Dialog } from "@components/ui/common/Dialog";
import { startOfDayUnix } from "@helpers/date";
import { useTodaysRolls } from "@hooks/useTodaysRoll";
import { useTodaysStats } from "@hooks/useTodayStats";
import { useIsRestDay } from "@hooks/useIsRestDay";
import { RestCard } from "@components/RestCard";

export const DashboardRoute: React.FC = () => {
  const [showRest, setShowRest] = useState(false);
  const { isRestDay, insert: addRest } = useIsRestDay();
  const { todaysRoll, goal } = useTodaysRolls();
  const { stats } = useTodaysStats();
  const hasRolled = goal > 0;
  const completionPercentage =  hasRolled ? (stats.minutes / goal) * 100 : 0;

  return (
    <>
      <GlobalStyle />
      <RouteWrapper>
        <Row>
          <Header>Dashboard</Header>
          <Today />
        </Row>
        {isRestDay && <RestCard />}
        {!isRestDay &&
          <>
            <Card>
              <CompletedLabel>{completionPercentage.toFixed(0)}% Complete</CompletedLabel>
              <CardTitle>Today's Progress</CardTitle>
              <ProgressBar percentage={completionPercentage} />
              <Metrics>
                <Metric><MetricNumber $highlight={true}>{stats.minutes ?? 0}</MetricNumber><MetricLabel>Minutes Logged</MetricLabel></Metric>
                <Metric><MetricNumber>{hasRolled ? goal : <NotRolledLabel>Not Rolled</NotRolledLabel>}</MetricNumber><MetricLabel>Daily Goal</MetricLabel></Metric>
                <Metric><MetricNumber>{stats.activities ?? 0}</MetricNumber><MetricLabel>Activities</MetricLabel></Metric>
              </Metrics>
            </Card>
            <Card>
              <Row>
                <CardTitle>Today's Roll</CardTitle>
                {hasRolled ? <ModifierDice $highlight={true} $shape={diceShape(todaysRoll!.modifierRoll.max)}>{todaysRoll?.modifierRoll.value}</ModifierDice>: <DiceIcon />}
              </Row>
              {!hasRolled && <Paragraph>Roll the dice for today's exercise challenge!</Paragraph>}
              {hasRolled &&
                <>
                  <DiceRow>
                    {todaysRoll?.activityRolls.map((r, i) => (<Dice key={i} $shape={diceShape(r.max)}>{r.value}</Dice>))}
                  </DiceRow>
                  <Row>
                    <ChallengeText>
                      Today's challenge:
                      <strong>{goal} minutes of exercise</strong>
                    </ChallengeText>
                  </Row>
                </>
              }
              <NavigationButton to="/roll" $primary={false} $size={'medium'}>Roll {hasRolled ? 'Again' : 'Now'}</NavigationButton>
            </Card>
          </>
        }
        {!isRestDay && hasRolled && <NavigationButton to="/log" $primary={true} $size={'large'}>Log Exercise</NavigationButton>}
        {!hasRolled && !isRestDay && <Button onClick={() => setShowRest(true)}>Take A Rest Day</Button>}
        <Grid>
          <GridCard to="/history">
            <HistoryIcon />
            <strong>Exercise History</strong>
            View past workouts
          </GridCard>
          <GridCard to="/profile">
            <ProfileIcon />
            <strong>Profile</strong>
            Settings & goals
          </GridCard>
        </Grid>
      </RouteWrapper>
      <Dialog
        title="Confirm Rest Day"
        isOpen={showRest}
        onClose={() => setShowRest(true)}
        actions={[
          { label: 'Confirm', onClick: () => { addRest({ timestamp: startOfDayUnix() }); setShowRest(false); }},
          { label: 'Cancel', onClick: () => setShowRest(false)}
        ]}
      />
      <NavBar />
    </>
  );
}
