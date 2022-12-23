import styled from '@emotion/styled';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import classnames from 'classnames';
import moment from 'moment';
import 'moment/locale/vi';
import { FC, Fragment, useEffect, useMemo } from 'react';
import { TableColumn } from 'react-data-table-component';
import { toast } from 'react-toastify';
import tw from 'twin.macro';
import { apiCaller } from '~/service/index';
import { Form } from '~/pages/manager/tabs/form';
import { handleError } from '~/common/utils/handleError';
import { Popup } from '~/components/Popup/index';
import { Table } from '~/components/Table';
import { ContentLayout } from '~/layouts/ContentLayout';
import { Tag, useGetAllTag, useLoadingStore } from '~/api-graphql';

moment.locale('vi');
const TagPageContainer = styled.div`
  ${tw``}
`;

interface ITagPage {}

export const TagPage: FC<ITagPage> = () => {
  const deleteTagLoading = useLoadingStore(s => s.deleteTagLoading);
  const [fetchGetTag, { loading: fetchGetTagLoading, data: response }] =
    useGetAllTag([
      'totalCount',
      {
        results: [
          'name',
          'type',
          '_id',
          'parentType',
          'keyword',
          'description',
          'createdAt',
          'updatedAt',
        ],
      },
    ]);
  const loading = deleteTagLoading || fetchGetTagLoading;

  const data = response?.getAllTag.results || [];

  useEffect(() => {
    fetchGetTag({ fetchPolicy: 'no-cache' });
  }, []);

  const onDeleteTag = (tag: NonNullable<Tag>) => async () => {
    try {
      if (!tag._id) return;
      await apiCaller.deleteTag().$args({ tag_id: tag._id }).$fetch();
      fetchGetTag({ fetchPolicy: 'no-cache' });
      toast.success('Xoá tag thành công');
    } catch (error) {
      handleError(error);
    }
  };

  const columnsTable = useMemo(
    () =>
      [
        { name: 'Tên', selector: row => row.name },
        { name: 'Type', selector: row => row.type },
        { name: 'Keyword', selector: row => row.keyword },
        {
          name: 'Updated At',
          selector: row =>
            moment(row.updatedAt).format('MM/DD/YYYY, h:mm:ss a'),
        },
        {
          name: <p className='text-center w-full'>Action</p>,
          style: {
            '& div': {
              width: '100%',
            },
          },
          width: '100px',
          cell: (row, rowIndex, column, id) => {
            return (
              <div className='flex gap-4'>
                <Popup
                  title='Sửa Tag'
                  ButtonComponent={props => (
                    <PencilSquareIcon
                      {...(props as any)}
                      className='cursor-pointer'
                      height={24}
                    />
                  )}
                >
                  {({ setIsOpen }) => (
                    <Form
                      initialValues={{
                        name: row.name || '',
                        type: row.type || '',
                      }}
                      onSubmit={async ({ name, type }) => {
                        try {
                          const response = await apiCaller
                            .updateTag()
                            .$args({
                              tag_id: row._id!,
                              input: { name, type: type || (row.type as any) },
                            })
                            .$fetch();

                          if (response) {
                            toast.success('Sửa thành công');
                          } else {
                            toast.error('Sửa thất bại');
                          }
                        } catch (error) {}
                        setIsOpen(false);
                        fetchGetTag({ fetchPolicy: 'no-cache' });
                      }}
                      onCancel={() => {
                        setIsOpen(false);
                      }}
                      isEdit
                    />
                  )}
                </Popup>

                <TrashIcon
                  onClick={onDeleteTag(row)}
                  height={24}
                  className={classnames([
                    loading ? 'cursor-not-allowed' : '',
                    'text-red-600 cursor-pointer',
                  ])}
                />
              </div>
            );
          },
        },
      ] as TableColumn<NonNullable<Tag>>[],
    [loading],
  );

  return (
    <Fragment>
      <ContentLayout
        title='Quản lí tag'
        rightRenderComponent={
          <Fragment>
            <Popup
              title='Thêm Tag'
              ButtonComponent={props => (
                <button
                  {...(props as any)}
                  className=' group-hover:text-primary-400 group w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white hover:bg-primary-700 disabled:cursor-progress disabled:bg-neutral-600 disabled:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
                >
                  Thêm
                </button>
              )}
            >
              {({ setIsOpen }) => (
                <Form
                  initialValues={{ name: '', type: '' }}
                  onSubmit={async ({ name, type }) => {
                    try {
                      const response = await apiCaller
                        .createTag()
                        .$args({
                          input: { name, type: type as any },
                        })
                        .$fetch();

                      if (response) {
                        toast.success('Thêm thành công');
                      } else {
                        toast.error('Thêm thất bại');
                      }
                    } catch (error) {}
                    setIsOpen(false);
                    fetchGetTag({ fetchPolicy: 'no-cache' });
                  }}
                  onCancel={() => {
                    setIsOpen(false);
                  }}
                />
              )}
            </Popup>
          </Fragment>
        }
      >
        <TagPageContainer>
          <Table
            columns={columnsTable}
            data={data}
            progressPending={fetchGetTagLoading}
          />
        </TagPageContainer>
      </ContentLayout>
    </Fragment>
  );
};
