import { lazy } from 'react';

export const EpisodesPage = lazy(() => import('./episodes'))
export const EpisodesDetailPage = lazy(() => import('./episodes/detail'))