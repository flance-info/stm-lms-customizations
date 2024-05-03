import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { DefaultViewWrapper } from './default-view-wrapper';
import { EAddon, EMPTY_VIEW_TYPE, EPlugin } from 'common/constants';
import { EmptyView } from '~/components/empty-view';
import { ErrorFallback } from '~/components/error-fallback';
import { FormContainer } from './form';
import { getLink } from '~/helpers/string';
import { Loader } from '~/components/loader';
import { useCourseData, useGetSections, useHasPluginsOrAddons, useGetUnlockAddons } from 'common/hooks';
import { WithDrip } from './with-drip';
import { UnlockAddons } from '~/components/unlock-addons';

export const DripTab: FC = () => {
  const { hasAddon, hasPlugin } = useHasPluginsOrAddons();
  const { data: courseData } = useCourseData();
  const { courseId } = useParams<{ courseId: string }>();

  if (!courseId) return null;

  const { data, isLoading, error } = useGetSections(courseId);

  if (isLoading) {
    return <Loader/>;
  }

  if (!data || error) {
    return <ErrorFallback message={(error as Error).message}/>;
  }

  const onClick = () => {
    window.open(getLink(courseData.urls.addons, 'Drip+Content'), '_blank');
  };

  const sectionsWithMaterials = data.sections.filter(section => data.groupedBySections[section.id]);
  const addons = useGetUnlockAddons(EAddon.SEQUENTIAL_DRIP_CONTENT);

  return (
    (hasAddon(EAddon.SEQUENTIAL_DRIP_CONTENT) && hasPlugin(EPlugin.LMS_PRO))
      ? (
        <WithDrip isCurriculumExist={!!data.materials.length && !!data.sections.length} courseId={courseId}>
          <FormContainer sections={sectionsWithMaterials} materials={data.materials} courseId={courseId}/>
        </WithDrip>
      )
      : (
        <>
        { hasPlugin(EPlugin.LMS_PRO) && (
        <DefaultViewWrapper>
          <EmptyView type={EMPTY_VIEW_TYPE.DRIP_NO_ADDON} onClick={onClick}/>
        </DefaultViewWrapper>
        )}
        { !hasPlugin(EPlugin.LMS_PRO) && (
        <Box marginTop='60px'>
            <UnlockAddons addons={addons} />
        </Box>
        )}
        </>
      )
  );
};