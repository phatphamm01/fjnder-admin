import styled from "@emotion/styled";
import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import tw from "twin.macro";

interface DataRow {
  title: string;
  year: string;
}
const data = [{ title: "abc", year: "2012" }];

const columns: TableColumn<DataRow>[] = [
  {
    name: "Title",
    selector: (row) => row.title,
  },

  {
    name: "Year",
    selector: (row) => row.year,
  },
];

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
}

export const Table = <T,>({ columns, data }: TableProps<T>) => {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <TableCustom columns={columns} data={data} pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

const TableCustom = styled(DataTable)`
  .rdt_Table {
    ${tw`min-w-full table-fixed divide-y divide-gray-300`}
  }
  .rdt_TableHead {
    ${tw`bg-gray-50`}

    .rdt_TableHeadRow {
      ${tw`bg-gray-50`}
    }

    .rdt_TableCol {
      ${tw`px-3 py-3.5 text-left text-sm font-semibold text-gray-900`}
    }
  }

  .rdt_TableBody {
    ${tw`divide-y divide-gray-200 bg-white`}

    .rdt_TableCol {
      ${tw`whitespace-nowrap px-3 py-4 text-sm text-gray-500`}
    }
  }
` as typeof DataTable;
