import { FC, useEffect, useRef } from 'react';
import { useMutation } from 'react-query';
import { MediaGallery } from 'modules/media-gallery';
import { useDisclosure } from '@chakra-ui/react';
import { useHasPluginsOrAddons } from '~/common/hooks';
import { EAddon } from '~/common/constants';
import { MediaGalleryFile } from 'modules/media-gallery/media-gallery-interfaces';

// @ts-ignore
import tinymce from 'tinymce/tinymce';
import 'tinymce/plugins/code';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/textcolor';

import { EditorInputProps } from './editor-field-interfaces';
import { useApi } from '~/services';

import './style.css';

function uuid() {
  function generateDigit() {
    return Math.floor(Math.random() * 16).toString(16);
  }

  let uuid = '';
  for (let i = 0; i < 32; i++) {
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += generateDigit();
  }
  return uuid;
}

export const EditorInput: FC<EditorInputProps> = ({ onChange, value, height, onBlur, onFocus }) => {
  const editorRef = useRef<any>(null);
  const api = useApi();
  const { hasAddon } = useHasPluginsOrAddons();
  const hasMediaLibrary = hasAddon(EAddon.MEDIA_LIBRARY);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const insertImageIntoEditor = (url: string, alt: string) => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = alt;
    img.width = 400;
    tinymce.activeEditor.execCommand('mceInsertContent', false, img.outerHTML);
  };

  const tinymceAddMediaGalleryFile = (file: MediaGalleryFile) => {
    insertImageIntoEditor(file.url, file.title);
  };

  const { mutate } = useMutation(api.files.post, {
    onSuccess: res => {
      insertImageIntoEditor(res.source_url, 'Image');
    },
  });

  const uploadFile = (file: File) => {
    const filePayload = { file, title: file.name };
    mutate(filePayload);
  };

  useEffect(() => {
    if (!editorRef.current) return;

    tinymce.init({
      selector: `#${editorRef.current.id}`,
      width: '100%',
      height,
      convert_urls: false,
      menubar: false,
      statusbar: false,
      content_css: './style.css',
      content_style: `
        body {
          font-family: Eudoxus Sans Medium, sans-serif;
          font-size: 14px;
          color: #001931;
        }`,
      plugins: 'link lists code table media fullscreen textcolor',
      // eslint-disable-next-line
      toolbar: 'undo redo | bold italic underline strikethrough forecolor backcolor formatselect | removeformat | alignleft aligncenter alignright | subscript superscript | bullist numlist | code | link | table | media | customInsertImage | fullscreen |',
      // eslint-disable-next-line
      block_formats: 'Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3;Header 4=h4;Header 5=h5;Header 6=h6;Preformatted=pre',
      setup: (editor: any) => {
        editor.on('init', () => {
          editor.setContent(value || '');
        });
        editor.on('change', () => {
          handleEditorChange(editor.getContent());
        });
        editor.on('focus', () => {
          editor.getContainer().style.border = '1px solid #227AFF';
          onFocus();
        });
        editor.on('blur', () => {
          editor.getContainer().style.border = '1px solid #DBE0E9';
          onBlur();
        });
        editor.addButton('customInsertImage', {
          icon: 'image',
          onclick: () => {
            if (hasMediaLibrary) {
              onOpen();
            } else {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.addEventListener('change', async (event) => {
                const target = event.target as HTMLInputElement;
                if (target.files && target.files.length > 0) {
                  const file = target.files[0];
                  await uploadFile(file);
                }
              });
              input.click();
            }
          },
        });
      },
    });

    return () => tinymce.remove(editorRef.current);
  }, []);

  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  return (
    <>
      <textarea
        id={`editor-${uuid()}`}
        ref={editorRef}
        defaultValue={value}
      />
      {hasMediaLibrary &&
          <MediaGallery isOpen={isOpen} onClose={onClose} onAddFile={tinymceAddMediaGalleryFile}/>
      }
    </>
  );
};
