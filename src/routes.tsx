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
import { Route } from '@components/Route';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Route useWrapper={false} showNav={false}><LandingRoute /></Route>,
  },
  {
    path: '/dashboard',
    element: (<Route providers={[DashboardProvider, ActivityTypesProvider]}><DashboardRoute /></Route>)
  },
  {
    path: '/history',
    element: (<Route providers={[HistoryDataProvider, ActivityTypesProvider]}><HistoryRoute /></Route>)
  },
  {
    path: '/roll',
    element: <Route providers={[RollDataProvider]}><RollRoute /></Route>,
  },
  {
    path: '/log',
    element: (<Route providers={[ActivityTypesProvider]}><LogRoute /></Route>)
  },
  {
    path: '/log/:id',
    element: (<Route providers={[ActivityTypesProvider]}><LogRoute /></Route>)
  },
  {

    path: '/profile',
    element: (<Route providers={[ActivityTypesProvider]}><ProfileRoute /></Route>),
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