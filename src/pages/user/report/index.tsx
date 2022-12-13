import { FC } from "react";
import styled from "@emotion/styled";
import tw from "twin.macro";

const ReportPageContainer = styled.div`
  ${tw``}
`;

interface IReportPage {}

export const ReportPage: FC<IReportPage> = () => {
  return <ReportPageContainer></ReportPageContainer>;
};
