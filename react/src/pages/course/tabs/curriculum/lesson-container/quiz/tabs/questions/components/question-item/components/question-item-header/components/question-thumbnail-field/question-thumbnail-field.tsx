import { FC, useState } from 'react';
import { Box, Icon, Image, useDisclosure } from '@chakra-ui/react';
import { useController, useFormContext } from 'react-hook-form';
import { CommonFieldProps } from '~/components/forms/common-interfaces';
import { EAddon } from '~/common/constants';
import { MediaGallery } from 'modules/media-gallery';
import { FileInput, QuestionThumbnailFlex, RemoveButton } from './question-thumbnail-field-styles';
import { getCourseBuilderSettings, useHasPluginsOrAddons } from '~/common/hooks';
import { Loader } from '~/components/loader';
import { useDropFileApi } from '~/components/forms/fields/drop-file-loader-field/dropzone/dropzone-hooks';
import { ReactComponent as ImagePlusIcon } from '~/assets/icons/image-video-mix.svg';
import { ReactComponent as ImageIcon } from '~/assets/icons/image-plus.svg';
import { ReactComponent as TimesIcon } from '~/assets/icons/times.svg';
import AudioPlaceholder from '~/assets/images/audio_placeholder_qma.png';
import VideoPlaceholder from '~/assets/images/video_placeholder_qma.png';
import { QuizModal } from '~/components/quiz-modal';

export const QuestionThumbnailField: FC<CommonFieldProps> = (props) => {
  const { name } = props;
  const { field } = useController({ name });
  const media = field.value;
  const { hasAddon } = useHasPluginsOrAddons();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const commonData = getCourseBuilderSettings();
  const {
    onChange,
    isLoading,
    removeImageHandler,
    onAddMediaGalleryFile,
  } = useDropFileApi( { name, maxSize: commonData.data?.options?.max_upload_size } );
  const [inComingType, setInComingType] = useState('');
  const { setValue } = useFormContext();
  const hasImage = media?.id;
  let shouldRenderPlaceholder = hasImage !== undefined;
  let mediaUrl = media?.url;
  if( media !== undefined && media !== null ) {
    if( media.type !== undefined ) {
      mediaUrl = media.type.includes('audio') ? AudioPlaceholder : mediaUrl;
    }
  }

  const handleCloseQuizModal = () => {
    setInComingType(inComingType);
  };
  const handleQuizModalSave = () => {
    const mediaObj = {
      id: '',
      url: VideoPlaceholder,
      type: 'video',
      title: '',
    };
    setValue(name, mediaObj, { shouldDirty: true });
  };

  shouldRenderPlaceholder = inComingType === 'video' ? true : shouldRenderPlaceholder;
  const [isQuizModalOpen, setQuizModalOpen] = useState( false );
  const onOpenQuestionMedia = () => {
    setQuizModalOpen( true );
  };
  const allowVideoAudio = hasAddon( EAddon.QUESTION_MEDIA );
  const hasMediaLibrary = hasAddon( EAddon.MEDIA_LIBRARY );

  const hasQuestionMedia = hasAddon( EAddon.QUESTION_MEDIA );
  let shouldDisableQuestionMedia = hasQuestionMedia && !allowVideoAudio;
  const isInstructor = commonData.data?.options?.is_instructor;

  if ((!hasQuestionMedia || !allowVideoAudio) && isInstructor) {
    shouldDisableQuestionMedia = true;
  }
  const SharedFileInput: FC<{ onClick?: () => void }> = ( { onClick } ) => (
    <Box onClick={onClick}>
      <Icon as={allowVideoAudio ? ImagePlusIcon : ImageIcon} boxSize={'25px'}/>
      <FileInput
        type={hasMediaLibrary ? '' : 'file'}
        onChange={onChange}
        accept={'.png, .jpg, .jpeg'}
      />
    </Box>
  );
  return (
    <>
    <Box pos={'relative'} mr={'20px'}>
    <Box onClick={ !shouldDisableQuestionMedia ? onOpenQuestionMedia : undefined }>
      <QuestionThumbnailFlex alignItems={'center'} justifyContent={'center'}>
        {shouldRenderPlaceholder ? (
          <Image
            boxSize='100%'
            alt={media.title}
            src={undefined === mediaUrl ? VideoPlaceholder : mediaUrl}
            sx={{
              objectFit: 'cover',
            }}
          />
        ) : (
          isLoading ? (
            <Loader/>
          ) : (
            <>
              { shouldDisableQuestionMedia && <SharedFileInput onClick={hasMediaLibrary ? onOpen : undefined}/>}
              {!shouldDisableQuestionMedia && <Icon as={allowVideoAudio ? ImagePlusIcon : ImageIcon} boxSize={'30px'}/>}
            </>
          )
        )}
        {isQuizModalOpen && <QuizModal onSave={handleQuizModalSave} onClose={() => {
          handleCloseQuizModal();
          setQuizModalOpen(false);
        }} type={inComingType}
         isOpen={isQuizModalOpen}/>}
        <MediaGallery isOpen={isOpen} onClose={onClose} onAddFile={onAddMediaGalleryFile}/>
      </QuestionThumbnailFlex>
    </Box>
    {shouldRenderPlaceholder && (
      <RemoveButton
        aria-label={'remove'}
        variant={'error'}
        onClick={removeImageHandler}
        icon={<Icon as={TimesIcon} boxSize={'6px'}/>}
      />
    )}
    </Box>
    </>
  );
};
