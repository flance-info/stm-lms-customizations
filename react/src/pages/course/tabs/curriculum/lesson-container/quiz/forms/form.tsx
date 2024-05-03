import { FC, useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { 
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
} from '@chakra-ui/react';

import { Exams } from '~/models';
import { Footer } from '~/components/footer';
import { FormHeader } from '../../../../../../lesson/single-lesson-container/components/form-header';
import {
  FormWrapper as SingleFormWrapper
} from '../../../../../../lesson/single-lesson-container/components/form-wrapper/form-wrapper';
import { Header } from '../../components/header';
import { QuizFormProps } from '../interfaces';
import { Tabs } from '../tabs';
import { useLessonPageType, useGetUserInfo } from 'common/hooks';
import { useTranslate } from '~/services';
import { UnlockAddons } from '~/components/unlock-addons';
import { ReactComponent as ModalClose } from '~/assets/icons/close-icon.svg';
import { EPlugin } from '~/common/constants';
import { useHasPluginsOrAddons } from '~/common/hooks';

export const Form: FC<QuizFormProps> = (props) => {
  const { type = Exams.QUIZ, isLoading, fields = [], isDisabled } = props;
  const { __ } = useTranslate();
  const { watch } = useFormContext();
  const { isSingleLessonPage } = useLessonPageType();
  const id = watch('id', undefined);
  const label = !id ? __('Create') : __('Save');

  const headerProps = {
    type,
    placeholder: __('Enter quiz name'),
    isLoading,
  };

  const content = <>
    <Tabs fields={fields}/>
    <Divider variant='msVariant' />
    <Footer label={label} sticky isLoading={isLoading} background={'white'} isDisabled={isDisabled}/>
  </>;

  const [isOpen, setIsOpen] = useState(false);
  const { hasPlugin } = useHasPluginsOrAddons();
  const isProActive = hasPlugin(EPlugin.LMS_PRO);
  const { isAdmin } = useGetUserInfo();
  const onClose = () => {
    setIsOpen(false);
    localStorage.setItem('isQuizUnlockBannerClosed', 'true');
  };
  
  useEffect(() => {
    const isModalClosed = localStorage.getItem('isQuizUnlockBannerClosed');
    if (!isModalClosed) {
      setIsOpen(true);
    }
  }, []);
  
  return isSingleLessonPage ? (
    <>
      {!isProActive && isAdmin && (
       <Modal isOpen={isOpen} onClose={onClose}>
       <ModalOverlay/>
       <ModalContent maxH="410px" maxW="570px" position="relative" margin="160px 0 50px 0">
            <Box
              position='absolute'
              top='20px'
              right='20px'
              cursor='pointer'
              zIndex='1'
              >
                <ModalClose onClick={onClose} style={{ fill: '#B3BAC2' }} />
            </Box>
            <UnlockAddons 
              addons={[]} 
              isHide={true} 
              options={true}
              isModal={true} 
              description={__(
                'Are you ready to step up your e-learning game? ' +
                'With Premium Addons, the possibilities are endless and right at your fingertips. ' +
                'Don\'t let this chance slip away to turbocharge your courses.'
              )}
              />
            </ModalContent>
       </Modal>
    )}
      <FormHeader
        {...headerProps}
        isNew={!id}
        id={id}
        isDisabled={isDisabled}
      />
      <SingleFormWrapper>
        {content}
      </SingleFormWrapper>
    </>
  ) : (
    <>
      <Header
        {...headerProps}
        label={label}
        id={id}
        isDisabled={isDisabled}
      />
      {content}
    </>
  );
};
