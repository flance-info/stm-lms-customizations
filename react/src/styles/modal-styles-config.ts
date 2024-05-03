import { defineStyleConfig } from '@chakra-ui/react';

export const Modal = defineStyleConfig({
  variants: {
    materials: {
      header: {
        padding: '20px',
        background: 'mainBackground',
        borderRadius: '10px 10px 0 0',
      },
      dialog: {
        background: 'mainBackground',
        padding: '0px',
        maxHeight: '600px',
        maxWidth: '600px',
      },
      body: {
        padding: '0px',
        minHeight: '259px',
        maxHeight: '500px',
        overflowY: 'auto',
      },
      footer: {
        background: 'mainBackground',
        padding: '20px',
        justifyContent: 'space-between',
        borderRadius: '0 0 10px 10px',
      },
    },
    lessons: {
      header: {
        position: 'relative',
        padding: '0px',
        marginBottom: '30px',
      },
      dialog: {
        padding: '30px',
        width: '590px',
      },
      body: {
        padding: '0px',
      },
    },
    category: {
      dialog: {
        padding: '40px',
      },
      header: {
        position: 'relative',
        padding: '0 0 20px',
      },
      body: {
        padding: '0px',
      },
    },
    course: {
      header: {
        padding: '20px',
        background: 'mainBackground',
        borderRadius: '10px 10px 0 0',
      },
      dialog: {
        padding: '0px',
        maxHeight: '600px',
      },
      body: {
        padding: '0px',
        minHeight: '250px',
        maxHeight: '500px',
        overflowY: 'auto',
        borderTop: '1px solid',
        borderColor: 'border',
      },
      footer: {
        background: 'mainBackground',
        padding: '20px',
        justifyContent: 'space-between',
        borderRadius: '0 0 10px 10px',
      },
    },
    prompt: {
      header: {
        padding: '0px',
        fontSize: 'lg',
        fontWeight: 'medium',
      },
      dialog: {
        padding: '20px',
        borderRadius: '10px',
        gap: '10px',
      },
      footer: {
        padding: '0px',
        gap: '10px',
      },
    },
    mediaGallery: {
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 0,
      },
      dialog: {
        padding: '20px',
        borderRadius: '10px',
        gap: '20px',
        boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.20)',
        margin: '0px',
      },
      body: {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        padding: '0px',
      }
    },
    oldBuilder: {
      dialog: {
        padding: '30px',
        margin: '0px',
        borderRadius: '10px',
        boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.20)',
      },
      header: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0px',
        alignItems: 'center',
      },
      body: {
        margin: '40px 0px',
        padding: '0px',
        display: 'flex',
        justifyContent: 'center',
      },
      footer: {
        padding: '0px',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '40px',
      },
    }
  },
});
