import styled from "@emotion/styled";
import { FC } from "react";
import tw from "twin.macro";

const TabsPageContainer = styled.div`
  ${tw``}
`;

interface ITabsPage {}

export const TabsPage: FC<ITabsPage> = () => {
  return <TabsPageContainer></TabsPageContainer>;
};
