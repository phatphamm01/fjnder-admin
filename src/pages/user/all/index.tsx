import styled from '@emotion/styled';
import classnames from 'classnames';
import { FC, useEffect } from 'react';
import { TableColumn } from 'react-data-table-component';
import tw from 'twin.macro';
import { Table } from '~/components/Table';
import { Avatar } from '~/design/Avatar';
import { ContentLayout } from '~/layouts/ContentLayout';
import { User, useGetAllUser, useStatisticUser } from '~/api-graphql';

const AllUserPageContainer = styled.div`
  ${tw``}
`;

interface IAllUserPage {}

export const AllUserPage: FC<IAllUserPage> = () => {
  const [fetchGetAllUser, { loading, data: response }] = useStatisticUser([
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

  const data = response?.statisticUser.results || [];

  useEffect(() => {
    fetchGetAllUser();
  }, []);

  const columnsTable = [
    {
      name: 'Avatar',
      cell: row => <Avatar image={row.images?.[0]} />,
    },
    { name: 'Họ và tên', selector: row => row.username },
    { name: 'Tuổi', selector: row => row.age },
    { name: 'Giới thiệu', width: '500px', selector: row => row.aboutMe },
  ] as TableColumn<NonNullable<User>>[];

  return (
    <ContentLayout title='Người dùng'>
      <AllUserPageContainer>
        <Table columns={columnsTable} data={data} progressPending={loading} />
      </AllUserPageContainer>
    </ContentLayout>
  );
};
