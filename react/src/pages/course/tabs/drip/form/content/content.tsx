import { FC, useEffect, useRef, useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { createPortal } from 'react-dom';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import some from 'lodash/some';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { ContentProps } from './content-interfaces';
import { DependencyItem } from './dependency-item';
import { EMPTY_VIEW_TYPE } from '~/common/constants';
import { EmptyView } from '~/components/empty-view';
import { Footer } from '~/components/footer';
import { FormWrapper } from '~/components/form-wrapper';
import { Header } from './header';
import { Material } from './sidebar/section/material';
import { Material as MaterialModel } from '~/models';
import { Sidebar } from './sidebar';
import { useTranslate } from '~/services';
import { WithFieldsPrefix } from '~/helpers/form/with-prefix-context';

export const Content: FC<ContentProps> = ({ showContent, sections, materials, isLoading, isDisabled }) => {
  const { append, fields, remove } = useFieldArray({ name: 'dependencies' });
  const { watch, setValue } = useFormContext();

  const [activeMaterial, setActiveMaterial] = useState<MaterialModel | null>(null);
  const { __ } = useTranslate();

  const [countFields, setCountFields] = useState<number>(0);
  const lastFieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fields.length > countFields) {
      setCountFields(fields.length);
      lastFieldRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCountFields(fields.length);
    }
  }, [fields.length]);

  const onAddDependency = () => append({ materials: [] });

  const onDragStart = (event: DragStartEvent) => {
    setActiveMaterial(event.active.data.current as MaterialModel);
  };

  const onDragEnd = (event: DragEndEvent) => {
    if (!event.over || !event.active) return;

    const name = event.over.data?.current?.name;
    const materials = watch(name, []);
    const lesson = event.active.data.current;

    if (!lesson) return;

    const material = {
      id: lesson.post_id,
      post_type: lesson.post_type,
      lesson_type: lesson.lesson_type,
      title: lesson.title,
    };

    if (some(materials, items => items.id === material?.id)) return;

    if (!materials.length) {
      setValue(name, [material], { shouldDirty: true });
    } else {
      setValue(name, [...materials, material], { shouldDirty: true });
    }

    setActiveMaterial(null);
  };

  return (
    <DndContext id="drip" onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Sidebar sections={sections} materials={materials}/>
        <Flex p="60px 0px 0px 405px" overflowX="hidden" overflowY="hidden">
          <Flex w="100%" h="calc(100vh - 60px)" p="30px 30px 0" overflowY="scroll">
            {showContent ?
              <FormWrapper p="0px" w="100%">
                <Header isLoading={isLoading} isDisabled={isDisabled}/>
                {fields.map((field, index) => (
                  <WithFieldsPrefix prefix={`dependencies.${index}`} key={`${field.id}-${index}`}>
                    <div ref={lastFieldRef}>
                      <DependencyItem
                        index={index}
                        onRemove={() => remove(index)}
                      />
                    </div>
                  </WithFieldsPrefix>
                ))}
                <Button
                  variant="primary"
                  m="0px 20px 20px"
                  w="150px"
                  onClick={() => append({ materials: [] })}
                >
                  {__('Add dependency')}
                </Button>
                <Footer isLoading={isLoading} isDisabled={isDisabled} sticky background="white"/>
              </FormWrapper>
              : <EmptyView type={EMPTY_VIEW_TYPE.DRIP} onClick={onAddDependency}/>
            }
        </Flex>
      </Flex>
      {createPortal(
        <DragOverlay zIndex={100}>
          {activeMaterial && <Material isDragged material={activeMaterial} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};
