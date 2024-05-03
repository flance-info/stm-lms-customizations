import { PropsWithChildren } from 'react';

export type QuestionListProps<P, FieldAlias extends string> = PropsWithChildren<P & { name: FieldAlias }>;
