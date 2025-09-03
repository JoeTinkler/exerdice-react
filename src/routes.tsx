import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LandingRoute } from './routes/landing';
import { DashboardRoute } from './routes/dashboard';
import { HistoryRoute } from './routes/history';
import { RollRoute } from './routes/roll';
import { LogRoute } from './routes/log';
import { ProfileRoute } from './routes/profile';
import { HistoryDataProvider } from '@providers/history';
import { Providers } from '@providers/providers';
import { ActivityTypesProvider } from '@providers/activityTypes';
import { DashboardProvider } from '@providers/dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingRoute />,
  },
  {
    path: '/dashboard',
    element: (<Providers providers={[DashboardProvider, ActivityTypesProvider]}><DashboardRoute /></Providers>)
  },
  {
    path: '/history',
    element: (<Providers providers={[HistoryDataProvider, ActivityTypesProvider]}><HistoryRoute /></Providers>)
  },
  {
    path: '/roll',
    element: <RollRoute />,
  },
  {
    path: '/log',
    element: (<Providers providers={[ActivityTypesProvider]}><LogRoute /></Providers>)
  },
  {
    path: '/log/:id',
    element: (<Providers providers={[ActivityTypesProvider]}><LogRoute /></Providers>)
  },
  {

    path: '/profile',
    element: (<Providers providers={[ActivityTypesProvider]}><ProfileRoute /></Providers>),
  }
]);

export const Routes: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
}