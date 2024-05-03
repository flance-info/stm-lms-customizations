import { FC, useState, useEffect } from 'react';
import {
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { Content } from '~/components/lessons/content';
import { Footer } from '~/components/footer';
import { FormContentProps } from './form-content-interfaces';
import { FormHeader } from '../../components/form-header';
import { FormWrapper } from '../../components/form-wrapper';
import { LESSON_FORM_BY_TYPE } from '~/components/lessons/lesson-constants';
import { useTranslate } from '~/services';
import { UnlockAddons } from '~/components/unlock-addons';
import { ReactComponent as ModalClose } from '~/assets/icons/close-icon.svg';
import { useHasPluginsOrAddons, useGetUserInfo } from '~/common/hooks';
import { EPlugin } from '~/common/constants';

export const FormContent: FC<FormContentProps> = ({ type, isLoading, isDisabled, fields = [] }) => {
  const { form: LessonForm } = LESSON_FORM_BY_TYPE[type];
  const { __ } = useTranslate();

  const { watch } = useFormContext();
  const id = watch('id', undefined);
  const label = !id ? __('Create') : __('Save');

  const { hasPlugin } = useHasPluginsOrAddons();
  const isProActive = hasPlugin(EPlugin.LMS_PRO);
  const { isAdmin } = useGetUserInfo();

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    localStorage.setItem('isLessonUnlockBannerClosed', 'true');
  };
  
  useEffect(() => {
    const isModalClosed = localStorage.getItem('isLessonUnlockBannerClosed');
    if (!isModalClosed) {
      setIsOpen(true);
    }
  }, []);

  return (
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
        type={type}
        placeholder={__('Enter lesson name')}
        isLoading={isLoading}
        isNew={!id}
        isDisabled={isDisabled}
      />
      <FormWrapper>
        <Content fields={fields}>
          <LessonForm/>
        </Content>
        <Divider h="30px" bg="mainBackground"/>
        <Footer label={label} sticky isLoading={isLoading} background="white" isDisabled={isDisabled}/>
      </FormWrapper>
    </>
  );
};
