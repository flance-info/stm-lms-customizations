import { Embed } from './embed';
import { ExternalLink } from './external-link';
import { Html } from './html';
import { PrestoPlayer } from './presto-player';
import { Shortcode } from './shortcode';
import { Vimeo } from './vimeo';
import { Youtube } from './youtube';

const TYPES = {
  EMBED: 'embed',
  EXTERNAL_LINK: 'ext_link',
  HTML: 'html',
  PRESTO_PLAYER: 'presto_player',
  SHORTCODE: 'shortcode',
  VIMEO: 'vimeo',
  YOUTUBE: 'youtube',
};

export const FIELDS_BY_TYPE = {
  [TYPES.EMBED]: <Embed />,
  [TYPES.EXTERNAL_LINK]: <ExternalLink />,
  [TYPES.HTML]: <Html />,
  [TYPES.PRESTO_PLAYER]: <PrestoPlayer />,
  [TYPES.SHORTCODE]: <Shortcode />,
  [TYPES.VIMEO]: <Vimeo />,
  [TYPES.YOUTUBE]: <Youtube />,
};