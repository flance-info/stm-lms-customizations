import { FC, memo, useState } from 'react';
import { Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react';

import { useTranslate } from '~/services';

export const TextInput: FC<InputProps> = memo(props => {
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);
  const { __ } = useTranslate();

  return (
    <InputGroup variant="msVariant">
      <Input {...props} type={show ? 'text' : 'password'}/>
      <InputRightElement width='4.5rem' onClick={handleClick} cursor="pointer">
        {show ? __('hide') : __('show')}
      </InputRightElement>
    </InputGroup>
  );
});
