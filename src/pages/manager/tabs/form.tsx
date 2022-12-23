import { Formik } from 'formik';
import { FC } from 'react';
import Input from '~/design/Input';

interface FormData {
  name: string;
  type: string;
}

interface IForm {
  initialValues: FormData;
  isEdit?: boolean;
  onSubmit: (values: FormData) => void;
  onCancel: () => void;
}

export const Form: FC<IForm> = ({
  initialValues,
  isEdit,
  onSubmit,
  onCancel,
}) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
          <div className='grid gap-2 rounded-md shadow-sm'>
            <div>
              <Input label='Tên' name='name' placeholder='Tên' />
            </div>
            <div>
              <Input label='Loại' name='type' placeholder='Loại' />
            </div>
          </div>

          <div className='mt-4 flex justify-between gap-8'>
            <button
              className=' group-hover:text-neutral-400 group w-full justify-center rounded-md border border-transparent bg-neutral-600 py-2 px-4 text-sm font-medium text-white hover:bg-neutral-700 disabled:cursor-progress disabled:bg-neutral-600 disabled:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2'
              type='button'
              onClick={onCancel}
            >
              Huỷ
            </button>
            <button
              className='group-hover:text-primary-400 group w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white hover:bg-primary-700 disabled:cursor-progress disabled:bg-neutral-600 disabled:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
              type='submit'
            >
              {isEdit ? 'Sửa' : 'Thêm'}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};
