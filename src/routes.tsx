import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LandingRoute } from './routes/landing';
import { DashboardRoute } from './routes/dashboard';
import { HistoryRoute } from './routes/history';
import { RollRoute } from './routes/roll';
import { LogRoute } from './routes/log';
import { ProfileRoute } from './routes/profile';
import { HistoryDataProvider } from '@providers/history';
import { ActivityTypesProvider } from '@providers/activityTypes';
import { DashboardProvider } from '@providers/dashboard';
import { SQLocal } from '@components/SQLocal';
import { RouteWrapper } from '@components/ui/common/Route';
import { GlobalStyle } from '@components/Global';
import { RollDataProvider } from '@providers/roll';
import { Route } from '@components/Route';
import { ResolutionWarning } from '@components/ui/ResolutionWarning';
import { Toasts } from '@components/toast/toasts';
import { ToastProvider } from '@components/toast/provider';

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
    element: (<Route providers={[ActivityTypesProvider]}><SQLocal /></Route>)
  }
]);

export const Routes: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ResolutionWarning>Exerdice was designed for mobile devices - for the best experience use a mobile device</ResolutionWarning>
      <ToastProvider>
        <Toasts />
        <RouterProvider router={router} />
      </ToastProvider>
    </>
  );
}