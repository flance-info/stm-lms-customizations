import { ReactElement } from 'react';
import { Settings } from './settings';
import { Qa } from './qa';
import { Questions } from './questions/questions';

export const TAB_PANELS: { id: string; component: ReactElement }[] = [
  { id: 'questions', component: <Questions /> },
  { id: 'settings', component: <Settings /> },
  { id: 'qa', component: <Qa /> },
];
