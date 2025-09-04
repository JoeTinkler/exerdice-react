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
import { SQLocal } from '@components/SQLocal';
import { RouteWrapper } from '@components/ui/common/Route';
import { GlobalStyle } from '@components/Global';
import { RollDataProvider } from '@providers/roll';

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
    element: <Providers providers={[RollDataProvider]}><RollRoute /></Providers>,
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
  },
  {
    path: '/sqlocal',
    element: <>
      <GlobalStyle />
      <RouteWrapper>
        <SQLocal />
      </RouteWrapper>
    </>
  }
]);

export const Routes: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
}