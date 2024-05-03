import { useTranslate } from '~/services';
import { EQuestionType, ETypedQuestions } from '../../../../questions-interfaces';

export const useGetTypeOptions = (): {
  id: ETypedQuestions,
  label: string;
}[] => {
  const { __ } = useTranslate();

  return [
    { id: EQuestionType.SINGLE_CHOICE, label: __('Single choice') },
    { id: EQuestionType.MULTI_CHOICE, label: __('Multiple choice') },
    { id: EQuestionType.TRUE_FALSE, label: __('True-False') },
    { id: EQuestionType.ITEM_MATCH, label: __('Matching') },
    { id: EQuestionType.IMAGE_MATCH, label: __('Image matching') },
    { id: EQuestionType.KEYWORDS, label: __('Keywords') },
    { id: EQuestionType.FILL_THE_GAP, label: __('Fill in the gap') },
  ];
};
