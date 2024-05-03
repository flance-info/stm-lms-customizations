import { FC, memo, useState } from 'react';
import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
  Text,
  chakra,
  Icon as ChakraIcon,
  Button, Box, FormLabel
} from '@chakra-ui/react';
import { SelectField } from '~/components/forms/fields';
import { CloseModalButton } from '~/components/close-modal-button';
import { useTranslate } from '~/services';
import { ReactComponent as LockIcon } from '~/assets/icons/lock-icon.svg';
import { ReactComponent as ImagePlusIcon } from '~/assets/icons/qma-new-image.svg';
import { ReactComponent as VideoDisabledIcon } from '~/assets/icons/qma-new-video-disabled.svg';
import { ReactComponent as VideoPlusIcon } from '~/assets/icons/qma-new-video.svg';
import { ReactComponent as AudioDisabledIcon } from '~/assets/icons/qma-new-audio-disabled.svg';
import { ReactComponent as AudioPlusIcon } from '~/assets/icons/qma-new-audio.svg';
import {
  FileInput // eslint-disable-next-line
} from '../../pages/course/tabs/curriculum/lesson-container/quiz/tabs/questions/components/question-item/components/question-item-header/components/question-thumbnail-field/question-thumbnail-field-styles';
import { EAddon, TOAST_STATUS } from '~/common/constants';
import { useDropFileApi } from '~/components/forms/fields/drop-file-loader-field/dropzone/dropzone-hooks';
import { useHasPluginsOrAddons, getCourseBuilderSettings } from '~/common/hooks';
import { MediaGallery } from '../../modules/media-gallery';
import { Popup } from '~/components/lessons-modal/lesson-card/popup';
import { QuestionMediaTypes } from '~/models';
import { FieldsByVideoType } from '~/components/lessons/video/fields-by-video-type';
import { useToast } from '~/components/toast';
import { Loader } from '~/components/loader';

const CardContainer = chakra(Flex, {
  baseStyle: {
    position: 'relative',
    flexDirection: 'column',
    border: '1px solid',
    borderColor: 'border',
    borderRadius: '10px',
    minWidth: '117px',
    minHeight: '117px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shouldForwardProp() {
    return true;
  },
});
interface QuizModalProps {
  isOpen: boolean;
  onClose: ()=>void;
  onSave: ()=>void;
  type: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const QuizModal: FC<QuizModalProps> = memo(( { isOpen, onClose, onSave, type } ) => {
  const { __ } = useTranslate();
  const { hasAddon } = useHasPluginsOrAddons();
  const name = 'image';
  const isLocked = ! hasAddon(EAddon.QUESTION_MEDIA);
  const commonData = getCourseBuilderSettings();
  const titleImage = __( 'Image' );
  const titleVideo = __( 'Video' );
  const titleAudio = __( 'Audio' );
  const iconColor = isLocked ? 'dark50' : 'primary';
  const [selectedFileType, setSelectedFileType] = useState<string | undefined>(undefined);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [isActiveNativeAudio, setNativeAudio] = useState(false);
  const [isActiveNativeImage, setNativeImage] = useState(false);

  const handleFileCardClick = (fileType: string) => {
    if(fileType === 'video') {
      setIsOpenMG(false);
      setOpenVideoModal(true);
    }
    else {
      setSelectedFileType(fileType);
    }
  };
  const {
    onChange,
    isLoading,
    onAddMediaGalleryFile,
  } = useDropFileApi({ name, maxSize: commonData.data?.options?.max_upload_size });
  const [isOpenMG, setIsOpenMG] = useState(false);

  const toast = useToast();
  const handleSaveClick = () => {
    toast({ message: __('Question successfully saved'), type: TOAST_STATUS.SUCCESS });
    type = 'video';
    onSave();
    onClose();
  };

  const handleMediaCardClick = (mediaType: string) => {
    if (hasAddon(EAddon.MEDIA_LIBRARY)) {
      setIsOpenMG(true);
      handleFileCardClick(mediaType);
    }
    handleFileCardClick(mediaType);
  };

  return (
    <>
      { !openVideoModal && (
      <Modal variant="lessons" isOpen={isOpen} size="2xl" isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex flexDirection="column" gap="5px">
              <Text fontSize="xl" color="dark" fontWeight="medium" lineHeight="xxl">
                {__('Select media type')}
              </Text>
            </Flex>
            <CloseModalButton onClick={onClose} />
          </ModalHeader>
          <ModalBody>
            <Flex flexDirection="column">
              <Text fontSize="xs" color="dark70" mb="10px" fontWeight="bold">
                {__('SELECT QUESTION MEDIA TYPE')}
              </Text>
              <Flex gap="20px" mb="20px" flexWrap={'wrap'} width={'530px'}>
                <CardContainer onClick={() => handleMediaCardClick('image')}
                 _hover={{
                  cursor: 'pointer',
                  border: '2px solid',
                  borderColor: 'primary' }}
                >
                  <Flex>
                    <ChakraIcon as={ImagePlusIcon} fill={iconColor} fontSize="38px"
                     style={isActiveNativeImage && isLoading ? { opacity: '0.3' } : {}}
                    />
                    <FileInput
                      type={hasAddon(EAddon.MEDIA_LIBRARY) ? '' : 'file'}
                      onChange={onChange}
                      accept={'.png, .jpg, .jpeg'}
                      onClick={() => setNativeImage(true)}
                    />
                    { isActiveNativeImage && isLoading ?
                      <Flex
                        justifyContent="center"
                        alignItems="center"
                        position="absolute"
                        top="0"
                        right="0"
                        bottom="0"
                        left="0"
                      >
                        <Loader/>
                      </Flex> : null }
                  </Flex>

                  <Text fontSize="sm" color="dark70" mt="10px" display="inline-block" textAlign="center" w="100px"
                   style={isActiveNativeImage && isLoading ? { opacity: '0.3' } : {}}
                  >
                    {titleImage}
                  </Text>
                </CardContainer>
                <CardContainer onClick={!isLocked ? () => handleMediaCardClick('video') : undefined }
                  _hover={{
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                    border: isLocked ? '1px solid' : '2px solid',
                    borderColor: isLocked ? 'border' : 'primary',
                  }}>
                  {isLocked && <Popup type={QuestionMediaTypes.VIDEO}/>}
                  <Flex>
                    {isLocked && <ChakraIcon as={VideoDisabledIcon} fill={iconColor} fontSize="38px"/>}
                    {!isLocked && <ChakraIcon as={VideoPlusIcon} fill={iconColor} fontSize="38px"/>}
                    {isLocked && <ChakraIcon as={LockIcon} position="absolute" top="10px" right="10px"/>}
                  </Flex>
                  <Text fontSize="sm" color="dark70" mt="10px" display="inline-block" textAlign="center" w="100px">
                    {titleVideo}
                  </Text>
                </CardContainer>
                <CardContainer onClick={ !isLocked ? () => handleMediaCardClick('audio') : undefined }
                  _hover={{
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                    border: isLocked ? '1px solid' : '2px solid',
                    borderColor: isLocked ? 'border' : 'primary',
                  }}
                >
                  {isLocked && <Popup type={QuestionMediaTypes.AUDIO}/>}
                  <Flex>
                    {isLocked && <ChakraIcon as={AudioDisabledIcon} fill={iconColor} fontSize="38px"
                    style={isActiveNativeAudio && isLoading ? { opacity: '0.3' } : {}}/>}
                    {!isLocked && <ChakraIcon as={AudioPlusIcon} fill={iconColor} fontSize="38px"
                    style={isActiveNativeAudio && isLoading ? { opacity: '0.3' } : {}}/>}
                    {isLocked && <ChakraIcon as={LockIcon} position="absolute" top="10px" right="10px"
                    style={isActiveNativeAudio && isLoading ? { opacity: '0.3' } : {}}/>}
                    <FileInput
                      type={hasAddon(EAddon.MEDIA_LIBRARY) ? '' : 'file'}
                      onChange={onChange}
                      onClick={() => setNativeAudio(true)}
                      accept={'.mp3, .wav, .ogg'}
                    />
                    { isActiveNativeAudio && isLoading ?
                      <Flex
                        justifyContent="center"
                        alignItems="center"
                        position="absolute"
                        top="0"
                        right="0"
                        bottom="0"
                        left="0"
                      >
                        <Loader/>
                      </Flex> : null }
                  </Flex>
                  <Text fontSize="sm" color="dark70" mt="10px" display="inline-block" textAlign="center" w="100px"
                  style={isActiveNativeAudio && isLoading ? { opacity: '0.3' } : {}}>
                    {titleAudio}
                  </Text>
                </CardContainer>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      )}
      <MediaGallery isOpen={isOpenMG} onClose={onClose} onAddFile={onAddMediaGalleryFile} fileType={selectedFileType}/>
      <Modal isOpen={openVideoModal} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="600px">
          <ModalHeader>Select video type</ModalHeader>
          <ModalCloseButton />
          <ModalBody className={'question-media-modal'}>
            <style>
              {`.question-media-modal .chakra-form-control {
                margin-bottom: 20px;
                }
                .question-media-modal .chakra-form-control:last-child{
                  margin-bottom: 0;
                  }
                `}
            </style>
            <Box width={'100%'} marginBottom={'20px'}>
              <FormLabel fontSize="xs" fontWeight="semiBold" mb={'3px'}>
                {__('Source type')}
              </FormLabel>
              <SelectField
                name="video_type"
                options={commonData?.data?.video_sources}
                placeholder={__('Select source')}
              />
            </Box>
            <FieldsByVideoType videoType="question"/>
        </ModalBody>
          <ModalFooter alignSelf="flex-start">
            <Button variant="primary" margin={0} onClick={handleSaveClick}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});
