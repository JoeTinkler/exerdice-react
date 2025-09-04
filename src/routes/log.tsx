import { ActivityCard } from "@components/activity/ActivityCard";
import { Dialog } from "@components/ui/common/Dialog";
import { Button } from "@components/ui/common/Button";
import { Input, Select, Slider, TextArea } from "@components/ui/Form";
import { Header } from "@components/ui/common/Header";
import { SubHeader } from "@components/ui/common/Header";
import { Row } from "@components/ui/common/Layout";
import { Label, Paragraph } from "@components/ui/common/Text";
import { unixTimestamp } from "@helpers/date";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HistoryLink, RecentActivities, SliderContainer } from "@components/ui/routes/Log";
import { useActivity } from "@hooks/useActivity";
import { Activity, ActivityType } from "@db/schema";
import { useRecentActivities } from "@hooks/useActivities";
import { ActivityWheelModal } from "@components/activity/ActivityWheel";
import { ActivityTypesContext } from "@providers/activityTypes";

const parseDateInputValue = (value: string) => {
  var date = new Date(value);
  date.setMinutes(date.getMinutes());
  return date.getTime();
}

const timestampToDateInputValue = (value: number) => {
  var date = new Date(value);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0,16);
}

export const LogRoute: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [showRandomizeModal, setShowRandomizeModal] = useState(false);

  const { activity: activityData, loading, error, save, remove } = useActivity(id ? parseInt(id) : undefined);
  const [activity, setActivity] = useState<Activity>(activityData ?? { timestamp: unixTimestamp(), intensity: 3 });

  const { activityTypes } = useContext(ActivityTypesContext);
  const { recentActivities } = useRecentActivities();

  useEffect(() => {
    if (id && activityData) {
      setActivity(activityData);
    }
  }, [activityData]);

  const onSave = useCallback(() => {
    save(activity, () => {
      navigate(id ? '/history' : '/dashboard');
    });
  }, [id, activity]);

  const onDelete = useCallback(async () => {
    await remove();
    setIsDeleteOpen(false);
    navigate('/history');
  }, [id, activity]);

  const handleAcceptRandom = (type: ActivityType) => {
    setActivity({ ...activity, type: type.id });
    setShowRandomizeModal(false);
  };

  return (
    <>
      <Row>
        <Header>{id ? 'Edit' : 'Log'} Activity</Header>
      </Row>
      <SubHeader>Track your activity details below</SubHeader>
      {loading && <Paragraph>Loading...</Paragraph>}
      {error && <Paragraph>{error}</Paragraph>}
      <Label>Activity Type</Label>
      <Select value={activity.type || ''} onChange={(e) => setActivity({ ...activity, type: parseInt(e.target.value) })}>
        <option>Select activity type</option>
        {activityTypes.map(type => (
          <option key={type.id} value={type.id}>{type.name}</option>
        ))}
      </Select>
      <Button onClick={() => setShowRandomizeModal(true)}>Randomize</Button>

      <Label>Duration (minutes)</Label>
      <Input placeholder="Enter minutes" type="number" value={activity.minutes?.toString() || ''} onChange={(e) => setActivity({ ...activity, minutes: parseInt(e.target.value) })} />

      <Label>Calories Burned (kcal)</Label>
      <Input placeholder="Enter calories" type="number" value={activity.calories?.toString() || ''} onChange={(e) => setActivity({ ...activity, calories: parseInt(e.target.value as string) })} />

      <Label>Distance (km)</Label>
      <Input placeholder="Enter km" type="number" value={activity.distance?.toString() || ''} onChange={(e) => setActivity({ ...activity, distance: parseFloat(e.target.value as string) })} />

      <Label>Intensity</Label>
      <SliderContainer>
        <Slider
          type="range"
          min="1"
          max="5"
          value={activity.intensity}
          onChange={(e) => setActivity({ ...activity, intensity: parseInt(e.target.value) })}
        />
        <span>{activity.intensity ?? 'N/A'}/5</span>
      </SliderContainer>

      <Label>Date</Label>
      <Input type="datetime-local" value={timestampToDateInputValue(activity.timestamp)} onChange={(e) => setActivity({ ...activity, timestamp: parseDateInputValue(e.target.value) })} />

      <Label>Notes (optional)</Label>
      <TextArea placeholder="Add details about your workout" value={activity.notes || ''} onChange={(e) => setActivity({ ...activity, notes: e.target.value })} />

      <Button onClick={onSave} $primary={true}>Save Activity</Button>

      {id && <Button onClick={() => setIsDeleteOpen(true)}>Delete</Button>}

      {recentActivities.length > 0 &&
        <RecentActivities>
          <h3>Recent Exercises</h3>
          {recentActivities.map(r => (
            <ActivityCard key={r.id} activity={r} />
            ))}
        </RecentActivities>
      }

      <HistoryLink to={'/history'}>View All Activity History</HistoryLink>

      <Dialog
        title={'Confirm Delete'}
        text={`Are you sure you want to delete this activity?`}
        isOpen={isDeleteOpen}
        actions={[ { label: 'Delete', onClick: onDelete }, { label: 'Cancel', onClick: () => setIsDeleteOpen(false) } ]}
        onClose={() => setIsDeleteOpen(false)}
      />
      {showRandomizeModal && (
        <ActivityWheelModal
          isOpen={showRandomizeModal}
          onAccept={handleAcceptRandom}
          onCancel={() => setShowRandomizeModal(false)}
        />
      )}
    </>
  );
}