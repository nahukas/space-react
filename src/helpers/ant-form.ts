import { WrappedFormUtils } from 'antd/lib/form/Form';

export function validateAntForm<T>(form: WrappedFormUtils<T>) {
  return new Promise<T>((resolve, reject) => {
    form.validateFieldsAndScroll((error, values: T) => {
      if (error) {
        reject(error);
      } else {
        resolve(values);
      }
    });
  });
}

export function validateAntFormFields<T>(
  form: WrappedFormUtils,
  fields: string[]
) {
  return new Promise<T>((resolve, reject) => {
    form.validateFields(fields, (error, values: T) => {
      if (error) {
        reject(error);
      } else {
        resolve(values);
      }
    });
  });
}
