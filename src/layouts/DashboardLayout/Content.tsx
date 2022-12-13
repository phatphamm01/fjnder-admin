import styled from "@emotion/styled";
import {
  Bars3Icon,
  ChevronRightIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import classnames from "classnames";
import { FC } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import tw from "twin.macro";
import { deepPath } from "~/router";
import { useDashboardLayoutStore } from "./store";

const ContentContainer = styled.div`
  ${tw`flex flex-1 flex-col md:pl-64`}
`;

interface IContent {}

const pages = [
  { name: "Projects", href: "#", current: false },
  { name: "Project Nero", href: "#", current: true },
];

export const Content: FC<IContent> = () => {
  const location = useLocation();
  const breadcrumb = deepPath.get(location.pathname) || [];

  return (
    <ContentContainer>
      <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
        <button
          type="button"
          className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={() =>
            useDashboardLayoutStore.getState().setSidebarOpen(true)
          }
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <main className="flex-1">
        <div className="py-3">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol role="list" className="flex items-center space-x-4">
                <li>
                  <div>
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                      <HomeIcon
                        className="h-5 w-5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Home</span>
                    </a>
                  </div>
                </li>
                {breadcrumb.map((item) => (
                  <li key={item.path}>
                    <div className="flex items-center">
                      <ChevronRightIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          classnames(
                            "ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                            // isActive && "pointer-events-none cursor-none"
                          )
                        }
                      >
                        {item.title}
                      </NavLink>
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mt-8">
            <Outlet />
            {/* Replace with your content */}
            {/* <div className="py-4"> */}
            {/* <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" /> */}
            {/* </div> */}
            {/* /End replace */}
          </div>
        </div>
      </main>
    </ContentContainer>
  );
};
