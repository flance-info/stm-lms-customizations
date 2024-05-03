import { EQuestionType, ETypedQuestions } from '../../../../../questions-interfaces';
import { useTranslate } from '~/services';

export const useQuestionHintI18n = (type: ETypedQuestions) => {
  const { __ } = useTranslate();

  const hints = {
    [EQuestionType.SINGLE_CHOICE]:
      __('Single Choice questions require the selection of one answer from a list of options provided.'),
    [EQuestionType.MULTI_CHOICE]:
      __('A question type presents several options for the user to choose the correct answer from.'),
    [EQuestionType.TRUE_FALSE]:
      __('A question type requires a simple answer of either true or false to a given statement.'),
    [EQuestionType.ITEM_MATCH]:
      __('In this question type, learners match items from two columns based on their corresponding attributes.'),
    [EQuestionType.IMAGE_MATCH]:
      __('In Image Match type of questions, learners are asked to match pairs from different pictures.'),
    [EQuestionType.KEYWORDS]:
      __('Keywords question type requires a brief answer in the form of a few words or a short phrase.'),
    [EQuestionType.FILL_THE_GAP]:
      __('Fill the Gap question type presents a statement with a missing word ' +
        'or phrase that the learner must complete.'),
  };

  return hints[type];
};
