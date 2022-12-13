import styled from '@emotion/styled';
import classnames from 'classnames';
import { FC, useEffect } from 'react';
import { TableColumn } from 'react-data-table-component';
import tw from 'twin.macro';
import { Table } from '~/components/Table';
import { ContentLayout } from '~/layouts/ContentLayout';
import { User, useGetAllUser } from '~/api-graphql';

const AllUserPageContainer = styled.div`
  ${tw``}
`;

interface IAllUserPage {}

export const AllUserPage: FC<IAllUserPage> = () => {
  const [fetchGetAllUser, { loading, data: response }] = useGetAllUser([
    'totalCount',
    {
      results: [
        '_id',
        'phoneNumber',
        'images',
        'username',
        'age',
        'aboutMe',
        { tags: ['_id', 'name'] },
      ],
    },
  ]);

  const data = response?.getAllUser.results || [];

  useEffect(() => {
    fetchGetAllUser();
  }, []);

  const columnsTable = [
    {
      name: 'Avatar',
      cell(row, rowIndex, column, id) {
        return (
          <img
            className='inline-block h-10 w-10 rounded-full'
            src={row.images?.[0]}
            alt=''
          />
        );
      },
    },
    { name: 'Họ và tên', selector: row => row.username },
    { name: 'Tuổi', selector: row => row.age },
    { name: 'Giới thiệu', width: '300px', selector: row => row.aboutMe },
    {
      name: 'Tags',
      cell(row, rowIndex, column, id) {
        return row.tags?.map(value => (
          <span
            className={classnames([
              'bg-primary-100 text-pribg-primary-800',
              'inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 ',
            ])}
          >
            {value.name}
          </span>
        ));
      },
    },
  ] as TableColumn<NonNullable<User>>[];

  return (
    <ContentLayout title='Người dùng'>
      <AllUserPageContainer>
        <Table columns={columnsTable} data={data} progressPending={loading} />
      </AllUserPageContainer>
    </ContentLayout>
  );
};
