import { FC } from 'react';
import { Button, chakra, Flex, Image, Text } from '@chakra-ui/react';

import { ContentProps } from '~/components/empty-view/content/content-interfaces';
import { EMPTY_VIEW_TYPE, EPlugin } from '~/common/constants';
import { useTranslate } from '~/services';
import { useHasPluginsOrAddons } from '~/common/hooks';

import dripEmpty from '~/assets/images/drip-empty.png';
import dripNoAddon from '~/assets/images/drip-no-addon.png';
import emptyImage from '~/assets/images/empty.png';
import errorFallbackImage from '~/assets/images/error-fallback.png';
import faqImage from '~/assets/images/faq.png';
import noAddon from '~/assets/images/no-addon.png';
import scormImage from '~/assets/images/scorm.png';

export const Container = chakra(Flex, {
  baseStyle: {
    width: '270px',
    minHeight: '290px',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '20px',
  },
});

export const ImageWrapper = chakra(Flex, {
  baseStyle: {
    width: '120px',
    minHeight: '120px',
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Content: FC<ContentProps> = ({ type, onClick, errorMessage, label }) => {
  const { __ } = useTranslate();
  const { hasPlugin } = useHasPluginsOrAddons();

  const OPTIONS_BY_TYPE = {
    [EMPTY_VIEW_TYPE.CURRICULUM]: {
      src: emptyImage,
      // eslint-disable-next-line
      title: __("Let's build your course!"),
      text: __('Get started by creating the lessons from scratch in the column on the left ' +
        'or import your Educational content.'),
      imageBg: 'rgba(255, 168, 0, 0.3)',
      boxSize: '100px',
    },
    [EMPTY_VIEW_TYPE.Q_A]: {
      src: emptyImage,
      title: __('Add a lesson first'),
      // eslint-disable-next-line
      text: __("You'll need to create a lesson before editing the Q&A section." +
        // eslint-disable-next-line
        " Once the lesson is created, you can manage the Questions and Answers."),
      imageBg: 'rgba(255, 168, 0, 0.3)',
      boxSize: '100px',
    },
    [EMPTY_VIEW_TYPE.Q_A_QUIZ]: {
      src: emptyImage,
      title: __('Add an quiz first'),
      // eslint-disable-next-line
      text: __("You'll need to create an quiz before editing the Q&A section." +
        // eslint-disable-next-line
        " Once the quiz is created, you can set up the Questions and Answers."),
      imageBg: 'rgba(255, 168, 0, 0.3)',
      boxSize: '100px',
    },
    [EMPTY_VIEW_TYPE.Q_A_ASSIGNMENT]: {
      src: emptyImage,
      title: __('Add an assignment first'),
      // eslint-disable-next-line
      text: __("You'll need to create an assignment before editing the Q&A section. " +
        // eslint-disable-next-line
        "Once the assignment is created, you can set up the Questions and Answers."),
      imageBg: 'rgba(255, 168, 0, 0.3)',
      boxSize: '100px',
    },
    [EMPTY_VIEW_TYPE.FAQ]: {
      src: faqImage,
      title: __('No FAQ Yet'),
      text: __('Create frequently asked questions and answers (FAQ) about your course in this section'),
      label: __('Create'),
      variant: 'primary',
      imageBg: 'rgba(34, 122, 255, 0.3)',
      boxSize: '90px',
    },
    [EMPTY_VIEW_TYPE.ERROR]: {
      src: errorFallbackImage,
      title: __('An error occurred'),
      text: errorMessage,
      imageBg: 'rgba(34, 122, 255, 0.3)',
      label: label,
      onClick: onClick,
    },
    [EMPTY_VIEW_TYPE.NOT_FOUND_PAGE]: {
      src: errorFallbackImage,
      title: __('Error 404'),
      text: __('Page not found'),
      imageBg: 'rgba(34, 122, 255, 0.3)',
    },
    [EMPTY_VIEW_TYPE.DRIP_NO_ADDON]: {
      src: dripNoAddon,
      title: __('Drip Content is disabled'),
      text: hasPlugin(EPlugin.LMS_PRO)
        ? __('Enable this addon to create drip content')
        : __('This section is available in the PRO version'),
      label: hasPlugin(EPlugin.LMS_PRO) ? __('Enable addon') : __('Enable Pro'),
      variant: 'primary',
      imageBg: 'rgba(255, 168, 0, 0.3)',
      boxSize: '80px',
    },
    [EMPTY_VIEW_TYPE.DRIP]: {
      src: dripNoAddon,
      title: __('Drip Content'),
      text: __('Click the button below and drag and drop the elements for the left bar for a new dependency'),
      label: __('Create a new dependency'),
      variant: 'primary',
      imageBg: 'rgba(255, 168, 0, 0.3)',
      boxSize: '80px',
    },
    [EMPTY_VIEW_TYPE.DRIP_EMPTY]: {
      src: dripEmpty,
      title: __('No course materials yet'),
      text: __('Please create lessons, quizzes, and assignments before setting up drip content.'),
      label: __('Go to curriculum'),
      variant: 'primary',
      imageBg: 'rgba(255, 168, 0, 0.3)',
      boxSize: '100px',
    },
    [EMPTY_VIEW_TYPE.SCORM]: {
      src: scormImage,
      title: __('SCORM Course'),
      text: __('SCORM packages are pre-built content that cannot be customized like LMS-created lessons,' +
        ' assignments, or quizzes'),
      imageBg: 'rgba(242, 110, 112, 0.3)',
      boxSize: '80px',
    },
    [EMPTY_VIEW_TYPE.ASSIGNMENT]: {
      src: noAddon,
      title: __('Assignments addon disabled'),
      text: __('Engage and evaluate learners with interesting tasks and projects.'),
      imageBg: 'rgba(242, 110, 112, 0.3)',
      boxSize: '80px',
    },
    [EMPTY_VIEW_TYPE.GOOGLE_MEET]: {
      src: noAddon,
      title: __('Google Meet addon disabled'),
      // TODO text
      text: __(''),
      imageBg: 'rgba(242, 110, 112, 0.3)',
      boxSize: '80px',
    },
    [EMPTY_VIEW_TYPE.STREAM]: {
      src: noAddon,
      title: __('Live Stream addon disabled'),
      text: __('Create YouTube streams from your course to conduct lectures in real time.'),
      imageBg: 'rgba(242, 110, 112, 0.3)',
      boxSize: '80px',
    },
    [EMPTY_VIEW_TYPE.ZOOM]: {
      src: noAddon,
      title: __('Zoom webinar addon disabled'),
      text: __('Teach with Zoom lessons, meetings and webinars directly on your website.'),
      imageBg: 'rgba(242, 110, 112, 0.3)',
      boxSize: '80px',
    },
  };

  const options = OPTIONS_BY_TYPE[type] || { src: emptyImage, imageBg: '', title: 'No content', text: '' };

  return (
    <Container>
      <ImageWrapper bg={options.imageBg}>
        <Image src={options.src} objectFit="cover" boxSize={options.boxSize || '90px'}/>
      </ImageWrapper>
      <Flex gap="10px" flexDirection="column" alignItems="center">
        <Text color="dark" fontSize="xl" fontWeight="medium" textAlign="center">{options.title}</Text>
        <Text color="dark50" fontSize="sm" fontWeight="medium" textAlign="center">{options.text}</Text>
      </Flex>
      {options.label && <Button m="0" onClick={onClick} variant={options.variant}>{options.label}</Button>}
    </Container>
  );
};
