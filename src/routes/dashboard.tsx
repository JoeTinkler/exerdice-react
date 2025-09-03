import { GlobalStyle } from "@components/Global";
import { NavBar } from "@components/NavBar";
import { useContext, useState } from "react";
import { RouteWrapper } from "@components/ui/common/Route";
import { Grid, Row } from "@components/ui/common/Layout";
import { Header } from "@components/ui/common/Header";
import { ChallengeText, CompletedLabel, DiceIcon, DiceRow, HistoryIcon, Metric, MetricLabel, MetricNumber, Metrics, ModifierDice, NotRolledLabel, ProfileIcon, RemainingRestsLabel } from "@components/ui/routes/Dashboard";
import { Card, CardTitle, GridCard } from "@components/ui/Card";
import { ProgressBar } from "@components/ProgressBar";
import { Paragraph } from "@components/ui/common/Text";
import { Dice, diceShape } from "@components/ui/Dice";
import { Button, NavigationButton } from "@components/ui/common/Button";
import { Today } from "@components/Today";
import { Dialog } from "@components/ui/common/Dialog";
import { startOfDayUnix } from "@helpers/date";
import { RestCard } from "@components/RestCard";
import { DashboardContext } from "@providers/dashboard";
import { ProfileContext } from "@providers/profile";
import { StreakCard } from "@components/StreakCard";

export const DashboardRoute: React.FC = () => {
  const { streakStats, weekRestCount, isRestDay, addRest, todaysRoll, goal, stats, hasRolled, completionPercentage } = useContext(DashboardContext);
  const [showRest, setShowRest] = useState(false);
  const { profile } = useContext(ProfileContext);

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
            {streakStats.current > 1 && <StreakCard />}
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
        {!hasRolled && !isRestDay && profile.weeklyRestDays > weekRestCount &&
          <>
            <Button onClick={() => setShowRest(true)}>Take A Rest Day</Button>
            <RemainingRestsLabel>{profile.weeklyRestDays - weekRestCount} / {profile.weeklyRestDays} rest days remaining</RemainingRestsLabel>
          </>
        }
        <Grid>
          <GridCard to="/history">
            <HistoryIcon />
            <strong>Activity History</strong>
            View past activities
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
