import { FC } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { AccessTab } from 'pages/course/tabs/settings/tabs/access';
import { CertificateTab } from 'pages/course/tabs/settings/tabs/certificate';
import { CourseMaterialsTab } from 'pages/course/tabs/settings/tabs/course-materials';
import { CoursePage } from 'pages/course';
import { CreateCoursePage } from 'pages/create-course';
import { CurriculumTab } from 'pages/course/tabs/curriculum';
import { CustomFieldsTab } from 'pages/course/tabs/settings/tabs/custom-fields';
import { DefaultView } from 'pages/course/tabs/curriculum/default-view';
import { DripTab } from 'pages/course/tabs/drip';
import { ErrorFallback } from '~/components/error-fallback';
import { FaqTab } from 'pages/course/tabs/faq';
import { getCourseBuilderSettings } from '~/common/hooks';
import { LessonContainer } from 'pages/course/tabs/curriculum/lesson-container';
import { LessonPage } from 'pages/lesson';
import { MainTab } from 'pages/course/tabs/settings/tabs/main';
import { NotFoundRoute } from '~/components/not-found-route';
import { NoticeTab } from 'pages/course/tabs/notice';
import { PrerequisitesTab } from 'pages/course/tabs/settings/tabs/prerequisites';
import { PricingTab } from 'pages/course/tabs/pricing';
import { SettingsTab } from 'pages/course/tabs/settings';
import { SingleLessonContainer } from 'pages/lesson/single-lesson-container';
import { useBaseUrl } from '~/components/base-url-context';

export const AppRoutes: FC = () => {
  const baseUrl = useBaseUrl();
  getCourseBuilderSettings();

  const router = createBrowserRouter([
    {
      path: '/edit-course/',
      element: <CreateCoursePage />,
      errorElement: <ErrorFallback/>,
    },
    {
      path: '/edit-course/:courseId',
      element: <CoursePage/>,
      errorElement: <ErrorFallback/>,
      children: [
        { path: '', element: <Navigate to="curriculum" replace /> },
        {
          path: 'curriculum',
          element: <CurriculumTab/>,
          children: [
            { path: '', element: <DefaultView/> },
            { path: 'sections/:sectionId', element: <DefaultView/> },
            { path: 'sections/:sectionId/lessons/new', element: <LessonContainer/> },
            { path: 'sections/:sectionId/lessons/:lessonId', element: <LessonContainer/> },
            { path: 'sections/:sectionId/:lessonType/:lessonId', element: <LessonContainer/> },
          ],
        },
        { path: 'drip', element: <DripTab/> },
        {
          path: 'settings',
          element: <SettingsTab/>,
          children: [
            { path: '', element: <Navigate to="main" replace /> },
            { path: 'main', element: <MainTab/> },
            { path: 'access', element: <AccessTab/> },
            { path: 'prerequisites', element: <PrerequisitesTab/> },
            { path: 'course-files', element: <CourseMaterialsTab/> },
            { path: 'certificate', element: <CertificateTab/> },
            { path: 'custom-fields', element: <CustomFieldsTab/> },
          ],
        },
        { path: 'pricing', element: <PricingTab/> },
        { path: 'faq', element: <FaqTab/> },
        { path: 'notice', element: <NoticeTab/> },
      ]
    },
    { path: '/edit-lesson', element: <LessonPage/>, errorElement: <ErrorFallback/> },
    { path: '/edit-lesson/new', element: <SingleLessonContainer/>, errorElement: <ErrorFallback/> },
    { path: '/edit-lesson/:lessonId', element: <SingleLessonContainer/>, errorElement: <ErrorFallback/> },
    { path: '/edit-assignment', element: <SingleLessonContainer/>, errorElement: <ErrorFallback/> },
    { path: '/edit-assignment/:lessonId', element: <SingleLessonContainer/>, errorElement: <ErrorFallback/> },
    { path: '/edit-google-meet', element: <SingleLessonContainer/>, errorElement: <ErrorFallback/> },
    { path: '/edit-google-meet/:lessonId', element: <SingleLessonContainer/>, errorElement: <ErrorFallback/> },
    { path: '/edit-quiz', element: <SingleLessonContainer/>, errorElement: <ErrorFallback/> },
    { path: '/edit-quiz/:lessonId', element: <SingleLessonContainer/>, errorElement: <ErrorFallback/> },
    { path: '*', element: <NotFoundRoute/> },
  ],
    { basename: `/${baseUrl}` });

  return <RouterProvider router={router} />;
};
