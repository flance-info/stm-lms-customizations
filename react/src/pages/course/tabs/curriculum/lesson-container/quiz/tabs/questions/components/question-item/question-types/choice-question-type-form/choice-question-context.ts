import { createContext } from 'react';

export const ChoiceContext = createContext<{ isGrid: boolean; }>({ isGrid: false });
