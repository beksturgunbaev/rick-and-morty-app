import Layout from '../layout';
import { EpisodeDetailsPage, EpisodesPage } from '@/pages';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';


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
    basename: "/rick-and-morty-app",
  }
);