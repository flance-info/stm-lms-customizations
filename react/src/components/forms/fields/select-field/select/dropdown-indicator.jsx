import { components } from 'react-select';
import { Icon } from '@chakra-ui/react';

import { ReactComponent as ChevronDown } from '~/assets/icons/chevron-down.svg';
import { ReactComponent as ChevronUp } from '~/assets/icons/chevron-up.svg';

export const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon
        as={props.selectProps.menuIsOpen ? ChevronUp : ChevronDown}
        fill="dark50"
        fontSize="10px"
      />
    </components.DropdownIndicator>
  );
};