import { FC } from 'react';
import { Button, Flex, Image, Box, Text, UnorderedList, ListItem } from '@chakra-ui/react';
import unlockProLabel from '~/assets/images/pro_label.png';
import { useTranslate } from '~/services';
import { ReactComponent as LockedAddon } from '~/assets/icons/locked_addon.svg';
import { ReactComponent as OptionsCheckIcon } from '~/assets/icons/options_check.svg';
import { useHasPluginsOrAddons, useGetUserInfo } from '~/common/hooks';
import { UnlockAddon } from '~/models';
import {
  listItems,
  listStyles,
  listItemBaseStyles,
  listItemLightStyles,
  listItemDarkStyles,
} from './unlock-addons-constants';
import { EPlugin } from '~/common/constants';

interface UnlockAddonsProps {
  addons: UnlockAddon[];
  isHide?: boolean;
  options?: boolean;
  isDark?: boolean;
  isModal?: boolean;
  description?: string;
}

export const UnlockAddons: FC<UnlockAddonsProps> = ( { addons, isHide, options, isDark, isModal, description } ) => {

  const { hasPlugin } = useHasPluginsOrAddons();
  const { __ } = useTranslate();
  const { isAdmin } = useGetUserInfo();

  const redirectToExternalPage = () => {
	let url;

	if (addons[0]) {
	  url = `${window.location.origin}/wp-admin/admin.php?page=stm-lms-go-pro&source=button-${
		  addons[0].slug
	  }-builder`;
	} else {
	  url = window.location.origin + '/wp-admin/admin.php?page=stm-lms-go-pro&source=course_builder';
	}
	window.open(url, '_blank');
  };

  const listItemStyles = isDark
    ? { ...listItemBaseStyles, ...listItemDarkStyles }
    : { ...listItemBaseStyles, ...listItemLightStyles };

  if (hasPlugin(EPlugin.LMS_PRO) || !isAdmin ) {
    return null;
  }

  return (
    <Flex
      height={ isDark ? '100%': 'fit-content' }
      padding='40px'
      borderBottom='1px solid border'
      flexDirection='column'
      position='relative'
      margin={!isHide ? '30px auto' : '0' }
      background={ !isDark
        ? 'white'
        : 'unlockBannerBg' }
      width={ !isDark ? '570px' : '400px' }
      borderRadius={ (isDark || isModal) ? '10px' : '4px' }
    >

      {addons && addons.length > 1 ? (
        <Flex flexDirection="row" justifyContent="space-between">
          {addons.map( ( addon, index ) => (
            <Flex
              key={index}
              alignItems='center'
              justifyContent='space-between'
              p='40px'
              background='mainBackground'
              borderRadius='4px'
              marginBottom='20px'
              position='relative'
              width="230px"
            >
              <Box position='absolute' top='20px' right='20px'>
                <LockedAddon/>
              </Box>

              <Flex alignItems='center' flexDirection='column' textAlign='center'>
                <Flex boxSize='50px' borderRadius='50%' background='white' alignItems='center' justifyContent='center'>
                  <Image src={addon.img} alt='Image' boxSize='30px'/>
                </Flex>
                <Text color='secondary' fontSize='14px' fontWeight='500' margin='10px 10px 0 10px'>
                  {addon.name}
                </Text>
              </Flex>
            </Flex>
          ) )}
        </Flex>
      ) : (
        (addons && addons.length === 1 && !isHide) && (
          <Flex
            alignItems='center'
            justifyContent='space-between'
            p='20px'
            background='secondaryBg'
            borderRadius='4px'
            marginBottom='20px'
          >
            <Flex alignItems='center' flexDirection='row'>
              <Flex boxSize='50px' borderRadius='50%' background='white' alignItems='center' justifyContent='center'>
                <Image src={addons[0].img} alt='Image' boxSize='30px'/>
              </Flex>
              <Text ml='20px' color='secondary' fontSize='14px' fontWeight='500'>
                {addons[0].name}
              </Text>
            </Flex>
            <LockedAddon/>
          </Flex>
        )
      )}

      <Text
        fontWeight='400'
        mb='10px'
        display='inline-block'
        lineHeight='1.2'
        color={ !isDark ? 'secondaryHover' : 'white' }
        fontSize={ !isDark ? '1.875rem' : '24px' }
      >
        {__( 'Unlock' )}&nbsp;
        <Box
          marginRight='5px'
          color={ !isDark ? 'primary' : 'white' }
          display='inline-block'
          fontWeight='bold'
          >
           {__( 'Premium Addons' )}
         </Box> {!isDark && <br/>}

        <Flex alignItems='center'>
          {__( 'with' )} &nbsp;
          <Box fontWeight='bold' display='inline-block' > {__( 'MasterStudy' )}</Box>
          <Image src={unlockProLabel} display="inline-block"/>
        </Flex>
      </Text>
      <Text
        fontSize='14px'
        mb='20px'
        color={ !isDark ? 'secondary' : 'description'}
      >
        {
          description ?? (
            <>
              {__(
                'With Premium Addons, the possibilities are endless and right at your fingertips. ' +
                'Don\'t let this chance slip away to turbocharge your courses and make your ' +
                'e-learning platform truly outstanding.'
              )}
            </>
          )
        }
      </Text>

      {options && (
        <Flex mt='2' flexDirection='column'>
          <Text
            fontWeight='bold'
            fontSize='14px'
            color={ !isDark ? 'secondaryHover' : 'white' }
            marginBottom='10px'
          >
            {__( 'Get more options for creating a selling course:' )}
            </Text>
          <UnorderedList style={listStyles}>
            {listItems.map( ( item, index ) => (
              <ListItem key={index} style={listItemStyles}>
                <OptionsCheckIcon style={{ marginRight: '10px' }}/> {item}
              </ListItem>
            ) )}
          </UnorderedList>
        </Flex>
      )}
      <Flex
        justifyContent='flex-start'
        alignItems={ isDark ? 'flex-start' : 'center' }
        flexDirection={ isDark ? 'column' : 'row' }
      >

        <div>
          <Button
            variant='primary'
            m='0'
            onClick={redirectToExternalPage}
          >
            {__( 'Upgrade to PRO' )}
          </Button>

        </div>
      </Flex>
    </Flex>
  );
};
