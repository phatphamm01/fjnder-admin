import styled from '@emotion/styled';
import classnames from 'classnames';
import { FC, useEffect } from 'react';
import { TableColumn } from 'react-data-table-component';
import { toast } from 'react-toastify';
import tw from 'twin.macro';
import { apiCaller } from '~/service';
import { Table } from '~/components/Table';
import { ContentLayout } from '~/layouts/ContentLayout';
import { User, useGetAllReportsUser } from '~/api-graphql';

const ReportPageContainer = styled.div`
  ${tw``}
`;

interface IReportPage {}

export const ReportPage: FC<IReportPage> = () => {
  const [fetchGetAllReportUser, { loading, data: response }] =
    useGetAllReportsUser([
      'totalCount',
      {
        results: [
          '_id',
          'images',
          'username',
          'age',
          {
            reports: [
              'reasonReport',
              'descriptionReport',
              'createdAt',
              { reportBy: ['username'] },
            ],
          },
        ],
      },
    ]);

  const data = response?.getAllReportsUser.results || [];

  useEffect(() => {
    fetchGetAllReportUser();
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
    {
      name: 'Lý do',
      selector: row => row.reports?.[0].reasonReport,
    },
    {
      name: 'Chi tiết',
      selector: row => row.reports?.[0].descriptionReport,
    },
    {
      name: 'Báo cáo bởi',
      selector: row => row.reports?.[0].reportBy.username,
    },
    {
      name: 'Số lượng báo cáo',
      cell(row, rowIndex, column, id) {
        return <p className='mx-auto'>{row.reports?.length}</p>;
      },
    },
    {
      name: 'Trạng thái',
      cell(row, rowIndex, column, id) {
        return (
          <span
            className={classnames([
              row.isBlocked
                ? 'bg-red-100 text-red-800'
                : 'bg-green-100 text-green-800',
              'inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 ',
            ])}
          >
            {row.isBlocked ? 'Blocked' : 'Non Blocked'}
          </span>
        );
      },
    },
    {
      name: <p className='text-center w-full'>Action</p>,
      style: {
        '& div': {
          width: '100%',
        },
      },
      width: '180px',
      cell(row, rowIndex, column, id) {
        return (
          <div className='flex gap-4'>
            <span
              onClick={async () => {
                try {
                  await apiCaller
                    .confirmBlockUser()
                    .$args({ user_id: row._id })
                    .$fetch();
                  toast.success('Báo cáo thành công');
                  fetchGetAllReportUser();
                } catch (error) {}
              }}
              className={classnames([
                'bg-red-100 text-red-800',
                'inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 cursor-pointer',
              ])}
            >
              Confirm
            </span>
            <span
              onClick={async () => {
                try {
                  await apiCaller
                    .declineBlockUser()
                    .$args({ user_id: row._id })
                    .$fetch();
                  toast.success('Bỏ qua thành công');
                  let a = await fetchGetAllReportUser({
                    fetchPolicy: 'no-cache',
                  });
                  console.log({ a });
                } catch (error) {}
              }}
              className={classnames([
                'bg-gray-100 text-gray-800',
                'inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 cursor-pointer',
              ])}
            >
              Decline
            </span>
          </div>
        );
      },
    },
  ] as TableColumn<NonNullable<User>>[];

  return (
    <ContentLayout title='Báo cáo người dùng'>
      <ReportPageContainer>
        <Table columns={columnsTable} data={data} progressPending={loading} />
      </ReportPageContainer>
    </ContentLayout>
  );
};
