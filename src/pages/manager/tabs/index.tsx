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

  const data = response?.getAllTag.results || [];

  useEffect(() => {
    fetchGetTag({
      variables: { filter: {}, pagination: { page: 0, size: 9999 } },
    });
  }, []);

  const columnsTable = [
    { name: 'Tên', selector: row => row.name },
    { name: 'Loại', selector: row => row.type },
  ] as TableColumn<NonNullable<Tag>>[];

  return (
    <ContentLayout title='Người dùng'>
      <TagPageContainer>
        <Table columns={columnsTable} data={data} progressPending={loading} />
      </TagPageContainer>
    </ContentLayout>
  );
};
