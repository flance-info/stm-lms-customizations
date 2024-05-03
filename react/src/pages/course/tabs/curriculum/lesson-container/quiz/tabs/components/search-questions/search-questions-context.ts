import { createContext } from 'react';

interface LibraryContext {
  addQuestions: (questions: string[]) => void;
  isLoading: boolean;
  isDisabled: boolean;
  onUnDisable: () => void;
}

export const SearchContext = createContext<LibraryContext>(null!);
