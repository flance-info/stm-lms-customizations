import { createContext } from 'react';

export const QuizQuestionContext = createContext<{ onSaveClick: () => void }>(null!);
