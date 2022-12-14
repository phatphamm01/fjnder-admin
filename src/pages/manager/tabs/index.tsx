import styled from '@emotion/styled';
import { FC, useEffect } from 'react';
import { TableColumn } from 'react-data-table-component';
import tw from 'twin.macro';
import { Table } from '~/components/Table';
import { ContentLayout } from '~/layouts/ContentLayout';
import { Tag, useGetAllTag } from '~/api-graphql';

const TagPageContainer = styled.div`
  ${tw``}
`;

interface ITagPage {}

export const TagPage: FC<ITagPage> = () => {
  const [fetchGetTag, { loading, data: response }] = useGetAllTag([
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
      ],
    },
  ]);

  const data = response?.getAllTag.results || [];

  useEffect(() => {
    fetchGetTag();
  }, []);

  const columnsTable = [
    { name: 'Tên', selector: row => row.name },
    { name: 'Loại', selector: row => row.type },
    { name: 'Từ khoá', selector: row => new Date(row.createdAt) },
  ] as TableColumn<NonNullable<Tag>>[];

  return (
    <ContentLayout title='Người dùng'>
      <TagPageContainer>
        <Table columns={columnsTable} data={data} progressPending={loading} />
      </TagPageContainer>
    </ContentLayout>
  );
};
