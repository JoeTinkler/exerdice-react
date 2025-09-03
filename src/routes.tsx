import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ExerciseTimeTracker } from './routes/landing';
import { DashboardRoute } from './routes/dashboard';
import { HistoryRoute } from './routes/history';
import { RollRoute } from './routes/roll';
import { LogRoute } from './routes/log';
import { ProfileRoute } from './routes/profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ExerciseTimeTracker />,
  },
  {
    path: '/dashboard',
    element: <DashboardRoute />,
  },
  {
    path: '/history',
    element: <HistoryRoute />,
  },
  {
    path: '/roll',
    element: <RollRoute />,
  },
  {
    path: '/log',
    element: <LogRoute />
  },
  {
    path: '/log/:id',
    element: <LogRoute />
  },
  {

    path: '/profile',
    element: <ProfileRoute />
  }
]);

export const Routes: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
}