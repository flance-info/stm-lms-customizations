import { yupResolver } from '@hookform/resolvers/yup';
import { flattenObject } from '~/helpers/form';

export const hookFormResolver = (validationSchema: any) =>
  async (data: any, context: any, options: any) =>
    new Promise((resolve, reject) => {
      yupResolver(validationSchema)(data, context, options).then((result) => {
        resolve({
          ...result,
          errors: flattenObject(result.errors),
        });
      }).catch((error) => {
        reject(error);
      });
    });
