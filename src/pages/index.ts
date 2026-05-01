import { lazy } from 'react';

export const EpisodesPage = lazy(() => import('./episodes'))
export const EpisodeDetailsPage = lazy(() => import('./episodes/detail'))