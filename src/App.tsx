import { Route, Routes } from 'react-router';
import { Layout } from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import ApproachPage from './pages/ApproachPage';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import FunZonePage from './pages/FunZonePage';
import NotFoundPage from './pages/NotFoundPage';
import { routes } from './config/navigation';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={routes.courses} element={<CoursesPage />} />
        <Route path={`${routes.courses}/:slug`} element={<CourseDetailPage />} />
        <Route path={routes.approach} element={<ApproachPage />} />
        <Route path={routes.about} element={<AboutPage />} />
        <Route path={routes.faqs} element={<FaqPage />} />
        <Route path={routes.contact} element={<ContactPage />} />
        <Route path={routes.privacy} element={<PrivacyPage />} />
        <Route path={routes.funZone} element={<FunZonePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
