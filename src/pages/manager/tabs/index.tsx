import styled from '@emotion/styled';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import classnames from 'classnames';
import moment from 'moment';
import 'moment/locale/vi';
import { FC, useEffect, Fragment, useMemo } from 'react';
import { TableColumn } from 'react-data-table-component';
import { toast } from 'react-toastify';
import tw from 'twin.macro';
import { apiCaller } from '~/service/index';
import { handleError } from '~/common/utils/handleError';
import { Table } from '~/components/Table';
import { ContentLayout } from '~/layouts/ContentLayout';
import { useLoadingStore } from '~/api-graphql';
import { Tag, useGetAllTag } from '~/api-graphql';

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
  console.log({ deleteTagLoading });

  const columnsTable = useMemo(
    () =>
      [
        { name: 'Tên', selector: row => row.name },
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
                <TrashIcon
                  onClick={onDeleteTag(row)}
                  height={24}
                  className={classnames([
                    loading ? 'cursor-not-allowed' : '',
                    'text-red-600 cursor-pointer',
                  ])}
                />

                <PencilSquareIcon height={24} className='cursor-not-allowed' />
              </div>
            );
          },
        },
      ] as TableColumn<NonNullable<Tag>>[],
    [loading],
  );

  return (
    <ContentLayout
      title='Người dùng'
      rightRenderComponent={
        <Fragment>
          <button
            className='cursor-not-allowed group-hover:text-primary-400 group w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white hover:bg-primary-700 disabled:cursor-progress disabled:bg-neutral-600 disabled:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
            onClick={() => {}}
          >
            Thêm
          </button>
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
  );
};
