import { DropzoneProps } from './dropzone/dropzone-interfaces';
import { CommonFieldProps } from '../../common-interfaces';

export type DropFileLoaderFieldProps = CommonFieldProps & Omit<DropzoneProps, 'value'>;
