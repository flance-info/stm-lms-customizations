import React, { FC, ReactNode } from 'react';
import { useQuestionItemEditable } from '../../../question-item-hooks';
import { EditableFieldProps } from '~/components/forms/fields/editable-field/editable-field-interfaces';
import { EditableField } from '~/components/forms/fields';
import { FieldControl } from '~/components/forms/field-control';

interface MatchEditableFieldProps extends EditableFieldProps {
  removeClickHandler?: () => void;
  children?: ReactNode;
}

export const MatchEditableField: FC<MatchEditableFieldProps> = (props) => {
  const { ...fieldProps } = props;
  const { exitEditMode, enterEditMode } = useQuestionItemEditable();

  return (<>
      <FieldControl name={fieldProps.name} sx={{ w: '100%' }}>
        <EditableField
          {...fieldProps}
          fontSize={'16px'}
          color={'secondaryHover'}
          onEdit={enterEditMode}
          onCancel={exitEditMode}
          onSubmit={exitEditMode}
          inputProps={{
            variant: 'msQuiz',
            px: '4px',
            borderRadius: '4px',
            width: '100%',
          }}
        />
      </FieldControl>
    </>
  );
};
