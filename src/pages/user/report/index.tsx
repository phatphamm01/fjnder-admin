import styled from '@emotion/styled';
import classnames from 'classnames';
import { FC, useEffect } from 'react';
import { TableColumn } from 'react-data-table-component';
import { toast } from 'react-toastify';
import tw from 'twin.macro';
import { apiCaller } from '~/service';
import { ConfirmPopup } from '../../../components/ConfirmPopup/index';
import { Popup } from '~/components/Popup';
import { Table } from '~/components/Table';
import { Avatar } from '~/design/Avatar';
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

  const onAccept = (user: User) => async () => {
    try {
      await apiCaller.confirmBlockUser().$args({ user_id: user._id }).$fetch();
      toast.success('Chặn thành công');
      fetchGetAllReportUser({
        fetchPolicy: 'no-cache',
      });
    } catch (error) {}
  };

  const onDecline = (user: User) => async () => {
    try {
      await apiCaller.declineBlockUser().$args({ user_id: user._id }).$fetch();
      toast.success('Bỏ qua thành công');
      await fetchGetAllReportUser({
        fetchPolicy: 'no-cache',
      });
    } catch (error) {}
  };

  const columnsTable = [
    {
      name: 'Avatar',
      cell: row => <Avatar image={row.images?.[0]} />,
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
            <ConfirmPopup
              title='Chấp nhận'
              description='Bạn có chắn chắn muốn chặn người dùng này !'
              onAccept={onAccept(row)}
              ButtonComponent={({ ...rest }) => (
                <span
                  {...rest}
                  className={classnames([
                    'bg-red-100 text-red-800',
                    'inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 cursor-pointer',
                  ])}
                >
                  Confirm
                </span>
              )}
            />

            <span
              onClick={onDecline(row)}
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
