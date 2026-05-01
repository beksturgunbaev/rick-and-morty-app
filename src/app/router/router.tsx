import { createBrowserRouter } from 'react-router-dom';
import { EpisodeDetailsPage, EpisodesPage } from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <EpisodesPage />,
  },
  {
    path: 'episode/:id',
    element: <EpisodeDetailsPage />,
  },
]);