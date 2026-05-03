import Layout from '../layout';
import { EpisodeDetailsPage, EpisodesPage } from '@/pages';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

// argv.mode будет 'production' при сборке и 'development' при запуске devServer
const isDev = process.env.NODE_ENV === 'development';

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
    basename: isDev ? "/" : "/rick-and-morty-app",
  }
);