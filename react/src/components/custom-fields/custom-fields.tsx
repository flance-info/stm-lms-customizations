import React, { FC } from 'react';
import { VStack } from '@chakra-ui/react';
import omit from 'lodash/omit';

import { CustomField } from '~/components/forms/fields';
import { CustomField as CustomFieldModel } from '~/models';
import { FIELD_SPACING } from '~/common/constants';
import parse from 'html-react-parser';

interface CustomFieldsProps {
  fields: CustomFieldModel[];
}

export const CustomFields: FC<CustomFieldsProps> = ({ fields }) => {
  return (
    <VStack spacing={FIELD_SPACING} align="left" p={`${FIELD_SPACING}px 0`} maxWidth="570px" mb={FIELD_SPACING}>
      {fields.map((field => {
        const customFieldProps = omit(field, ['value', 'required', 'name']);
        const name = `custom_fields.${field.name}`;
        return (
          <React.Fragment key={field.name}>
            <CustomField {...customFieldProps} name={name}/>
            {field.custom_html && parse(field.custom_html)}
          </React.Fragment>
        );
      }))}
    </VStack>
  );
};
