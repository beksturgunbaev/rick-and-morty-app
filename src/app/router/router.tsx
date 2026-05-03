import Layout from '../layout';
import { EpisodeDetailsPage, EpisodesPage } from '@/pages';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const isProd = process.env.NODE_ENV === 'production';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route index element={<EpisodesPage />} />
        <Route path='episode/:id' element={<EpisodeDetailsPage />} />
      </Route>
    </>
  ),
  {
    // Добавляем basename здесь
    basename: isProd ? "/rick-and-morty-app/" : "/",
  }
);