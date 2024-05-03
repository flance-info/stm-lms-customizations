import { FC, useEffect, useRef } from 'react';
import { Button, chakra, Collapse, Divider, Flex, Text, VStack } from '@chakra-ui/react';
import { useFieldArray } from 'react-hook-form';

import { AccordionIcon } from '~/components/accordion-icon';
import { DeleteButton } from '~/components/delete-button';
import { EmptyView } from '~/components/empty-view';
import { EMPTY_VIEW_TYPE, FIELD_SPACING, NEW_FAQ_ITEM } from '~/common/constants';
import { FaqArrayProps } from './faq-array-interfaces';
import { FormWrapper } from '~/components/form-wrapper';
import { TabHeader } from '~/components/tab-header';
import { TextareaField, TextField } from '~/components/forms/fields';
import { useConfirm, useGetFieldValue } from '~/common/hooks';
import { useExpanded } from './faq-array-hooks';
import { useTranslate } from '~/services';

const Title = chakra(Text, {
  baseStyle: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: 'dark',
    height: '20px',
    width: '250px',
  },
});

export const FaqArray: FC<FaqArrayProps> = ({ isLoading, isExistFaq, isDisabled }) => {
  const { append, fields, remove } = useFieldArray({
    name: 'faq',
  });

  const { expandedItems, setExpandedItems, handleItemClick } = useExpanded();

  const lastFieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastFieldRef.current) {
      const newFieldIndex = fields.length - 1;
      if (expandedItems.includes(newFieldIndex)) {
        lastFieldRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [fields, expandedItems]);

  const { __ } = useTranslate();

  const onDeleteConfirm = (index: number) => useConfirm(
    () => remove(index),
    __('Are you sure that you want to delete this question?')
  );

  const onAddClick = () => {
    const newIndex = fields.length;
    setExpandedItems([...expandedItems, newIndex]);
    append(NEW_FAQ_ITEM);
  };

  return fields.length || isExistFaq ? (
    <FormWrapper>
      <TabHeader text={__('Frequently Asked Questions')} />
      {fields.map((field, index) => {
        const name = `faq[${index}].question`;
        const title = useGetFieldValue(name);
        const isLastField = index === fields.length - 1;
        return (
          <Flex bg="white" key={index} flexDirection="column" ref={isLastField ? lastFieldRef : null}>
            <Flex justify="space-between" p="22px 20px">
              <Flex flexDirection="column">
                <Text color="dark50" fontSize="xs">
                  {__('Question')} {index + 1}
                </Text>
                <Title title={title}>{title}</Title>
              </Flex>
              <Flex alignItems="center" gap="20px">
                <DeleteButton onClick={onDeleteConfirm(index)}/>
                <AccordionIcon isOpen={expandedItems.includes(index)} onClick={() => handleItemClick(index)} />
              </Flex>
            </Flex>
            <Collapse in={expandedItems.includes(index)} animateOpacity>
              <VStack spacing={FIELD_SPACING} align="stretch" p="0 20px 20px">
                <TextField
                  name={`faq[${index}].question`}
                  label={__('Question')}
                  placeholder={__('Enter question')}
                />
                <TextareaField
                  name={`faq[${index}].answer`}
                  label={__('Answer')}
                  placeholder={__('Enter an answer')}
                />
              </VStack>
            </Collapse>
            <Divider variant="msVariant"/>
          </Flex>
        );
      })}
      <Flex justify="space-between" p="10px 20px" position="sticky" bottom="0" left="0" right="0" bg="white">
        <Button onClick={onAddClick} m="0px">
          {__('Add new question')}
        </Button>
        <Button variant="primary" type="submit" m="0px" isLoading={isLoading} isDisabled={isDisabled}>
          {__('Save')}
        </Button>
      </Flex>
    </FormWrapper>
  ) : (
    <EmptyView type={EMPTY_VIEW_TYPE.FAQ} onClick={onAddClick}/>
  );
};
