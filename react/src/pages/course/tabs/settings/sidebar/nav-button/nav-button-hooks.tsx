import { useLocation } from 'react-router-dom';

import { ReactComponent as Access } from '~/assets/icons/access-tab.svg';
import { ReactComponent as Certificate } from '~/assets/icons/certificate-tab.svg';
import { ReactComponent as CourseFiles } from '~/assets/icons/course-files-tab.svg';
import { ReactComponent as CustomFields } from '~/assets/icons/custom-fields-tab.svg';
import { ReactComponent as Main } from '~/assets/icons/main-tab.svg';
import { ReactComponent as Prerequisites } from '~/assets/icons/prerequisites-tab.svg';

export const useGetIcon = (icon: string) => {
  switch (icon) {
    case 'main':
      return Main;
    case 'access':
      return Access;
    case 'prerequisites':
      return Prerequisites;
    case 'course-files':
      return CourseFiles;
    case 'certificate':
      return Certificate;
    case 'custom-fields':
      return CustomFields;
    default:
      return CustomFields;
  }
};

export const useIsActive = (path: string) => {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, '');
  const words = pathname.split('/');

  return words[words.length - 1] === path;
};
