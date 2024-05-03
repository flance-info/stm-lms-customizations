import { useEffect, useMemo, useState } from 'react';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import { useFormContext } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';

import { CurriculumResponse } from '~/services/resources/curriculum/curriculum';
import { CustomField, CustomFormValues, Errors, Material, NestedFormError } from '~/models';
import { EAddon, EPlugin, TOAST_STATUS } from './constants';
import { useApi, useTranslate } from '~/services';

import certificatesAddonImage from '~/assets/images/certificates.png';
import multiInstructors from '~/assets/images/multiinstructors.png';
import trialCoursesUnlock from '~/assets/images/trial_courses_unlock.png';
import upcomingCoursesStatusImage from '~/assets/images/upcoming_status.png';
import prerequsitesAddonImage from '~/assets/images/prerequisites.png';
import groupCoursesImage from '~/assets/images/group_courses.png';
import pointSystemImage from '~/assets/images/point_system.png';
import DripNoAddon from '~/assets/images/drip_content_unlock.png';

export const useLessonPageType = () => {
  const location = useLocation();

  return {
    isSingleLessonPage: !location.pathname.includes('edit-course'),
  };
};

export const useNewCoursePage = () => {
  const api = useApi();
  return useQuery('new-course', api.course.new);
};

export const getCourseBuilderSettings = () => {
  const api = useApi();
  return useQuery('course-builder-settings', api.lessons.getCourseBuilderSettings, {
    staleTime: Infinity,
  });
};

export const useCourseData = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const api = useApi();

  return useQuery(['course', courseId], ({ queryKey }) => {
    const [, id] = queryKey;
    return api.course.getBy(id);
  }, {
    staleTime: Infinity,
  });
};

export const useHasPluginsOrAddons = () => {
  const settings = getCourseBuilderSettings();

  const hasPlugin = (plugin: EPlugin) => settings?.data ? settings.data?.plugins[plugin] : false;
  const hasAddon = (addon: EAddon) => settings?.data
    ? settings.data?.plugins[EPlugin.LMS_PRO] && settings.data?.addons[addon]
    : false;

  return { hasPlugin, hasAddon };
};

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => clearTimeout(handler);
    },
    [value, delay],
  );

  return debouncedValue;
};

export interface IGetSections extends CurriculumResponse {
  groupedBySections: Record<string, Material[]>;
}

export const useGetSections = (courseId: string) => {
  const api = useApi();
  return useQuery<IGetSections, unknown, IGetSections, string[]>
  (['course', courseId, 'curriculum'], async ({ queryKey }) => {
    const [, courseId] = queryKey;
    if (!courseId) throw new Error('Course id is undefined');
    const data = await api.curriculum.getBy(courseId);
    return {
      ...data,
      groupedBySections: groupBy(data.materials, 'section_id') as Record<string, Material[]>,
    };
  }, {
    staleTime: Infinity,
  });
};

export const useGetUserInfo = () => {
  const commonData = getCourseBuilderSettings();
  return { isAdmin: !commonData?.data?.options.is_instructor, currentUserId: commonData?.data?.current_user_id };
};

export const useConfirm = (callback: () => void, message: string) => {
  return () => {
    const confirmed = window.confirm(message);
    if (confirmed) {
      callback();
    }
  };
};

export const useInvalidate = (queryKey: string | string[]) => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries(queryKey);
};

export const useErrorToastOptions = (serverError: string | Error, defaultMessage: string) => {
  const errorMessage = typeof serverError === 'string' ? serverError : defaultMessage;

  return { message: errorMessage, type: TOAST_STATUS.ERROR };
};

export const useGetFieldValue = (name: string) => {
  const { watch, getValues } = useFormContext();

  return watch(name) || getValues(name);
};

export const useInvalidateLesson = (type: string) => {
  const { lessonId } = useParams<{ lessonId: string }>();
  return useInvalidate([type, lessonId!]);
};

export const useCustomFieldsConfig = (fields: CustomField[]) => {

  const defaultValues = useMemo(() => {
    return fields
      .reduce((result: CustomFormValues, field) => {
        result[field.name] = field.value;
        return result;
      }, {});
  }, [fields]);

  const validationFields = useMemo(() => {
    return fields.filter(field => field.required).map(el => el.name);
  }, [fields]);

  return { defaultValues, validationFields };
};

interface EditLessonValidationProps {
  lessonFields: string[];
  customFields: string[];
}

export const useEditLessonValidation = (props: EditLessonValidationProps) => {
  const { lessonFields, customFields } = props;

  return function (values: any) {
    const errors: Errors = {};

    lessonFields.forEach((fieldName) => {
      const fieldValue = values[fieldName];
      if (fieldValue == null || fieldValue === '') {
        if (!errors[fieldName]) {
          errors[fieldName] = { message: 'This field is required' };
        }
      }
    });

    if (!errors['custom_fields']) {
      errors['custom_fields'] = {};
    }

    customFields.forEach((fieldName) => {
      const fieldValue = values['custom_fields'][fieldName];
      if (fieldValue == null || fieldValue === '') {
        if (!(errors['custom_fields'] as NestedFormError)[fieldName]) {
          (errors['custom_fields'] as NestedFormError)[fieldName] = { message: 'This field is required' };
        }
      }
    });

    if (isEmpty(errors['custom_fields'])) {
      delete errors['custom_fields'];
    }

    return { values, errors };
  };
};

export const useUnlockBannerState = (courseId: string, addonName: EAddon) => {
  const { hasAddon, hasPlugin } = useHasPluginsOrAddons();
  const { data: curriculum } = useGetSections(courseId);

  const shouldRenderElements = !curriculum?.scorm?.url;
  const isProActive = hasPlugin(EPlugin.LMS_PRO);
  const isAddonEnabled = (isProActive && hasAddon(addonName));

  return {
    shouldRenderElements,
    isProActive,
    isAddonEnabled,
  };
};

export const useGetUnlockAddons = (addon: EAddon) => {
  const { __ } = useTranslate();

  switch (addon) {
    case EAddon.MULTI_INSTRUCTORS:
      return [
        {
          name: __('Multi-instructors addon is locked!'),
          img: multiInstructors,
          slug: 'multi-instructors',
        },
      ];
    case EAddon.CERTIFICATE_BUILDER:
      return [
        {
          name: __('Certificate Builder addon is locked!'),
          img: certificatesAddonImage,
	      slug: 'certificate-builder',
        },
      ];
    case EAddon.SHAREWARE:
      return [
        {
          name: __('Trial Courses addon is locked!'),
          img: trialCoursesUnlock,
	      slug: 'trial-courses',
        },
        {
          name: __('Upcoming Course Status addon is locked!'),
          img: upcomingCoursesStatusImage,
          slug: 'upcoming-course-status',
        },
      ];
    case EAddon.PREREQUISITE:
      return [
        {
          name: __('Prerequisities addon is locked!'),
          img: prerequsitesAddonImage,
	      slug: 'prerequisities',
        },
      ];
    case EAddon.SEQUENTIAL_DRIP_CONTENT:
      return [
        {
          name: __('Drip Content addon is locked!'),
          img: DripNoAddon,
	      slug: 'drip-content',
        },
      ];
    case EAddon.POINT_SYSTEM:
      return [
        {
          name: 'Point System addon is locked!',
          img: pointSystemImage,
	      slug: 'point-system',
        },
        {
          name: 'Group Courses addon is locked!',
          img: groupCoursesImage,
	      slug: 'group-courses',
        },
      ];

    default:
      return [];
  }
};
