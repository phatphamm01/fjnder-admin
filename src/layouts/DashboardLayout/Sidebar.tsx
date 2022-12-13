import styled from "@emotion/styled";
import { Disclosure, Transition } from "@headlessui/react";
import tw from "twin.macro";

import { Dialog } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { default as classNames, default as classnames } from "classnames";
import { Fragment } from "react";

import { NavLink, useLocation } from "react-router-dom";
import { LogoIcon } from "~/icons/LogoIcon";
import { navbarList } from "~/router";
import { logout } from "~/store/auth";
import { useUserStore } from "~/store/user";
import { useDashboardLayoutStore } from "./store";
const SidebarContainer = styled.div`
  ${tw``}
`;

interface ISidebar {}

interface NavItemProps extends React.ComponentProps<"div"> {
  title?: string;
  path: string;
  isSub?: boolean;
  Icon?: React.FC<
    React.ComponentProps<"svg"> & { title?: string; titleId?: string }
  >;
}
const NavItem = ({
  title,
  Icon,
  className,
  path,
  isSub,
  ...rest
}: NavItemProps) => {
  return (
    <NavLink
      className={classnames(
        "cursor-pointer",
        isSub ? "pointer-events-none" : ""
      )}
      to={path}
    >
      {({ isActive }) => (
        <div
          className={classNames(
            isActive
              ? "bg-primary-100 text-primary-500"
              : "text-neutral-600 hover:bg-primary-50 hover:text-primary-400",
            "group flex gap-2 items-center px-2 py-2 text-base font-medium rounded-md"
          )}
          {...rest}
        >
          {Icon && <Icon className="h-5 w-5" />}
          <span>{title}</span>
        </div>
      )}
    </NavLink>
  );
};

const Nav = () => {
  const location = useLocation();

  return (
    <nav className="mt-5 flex-1 space-y-1 bg-white px-2 select-none">
      {navbarList.map((path) => (
        <Fragment key={path.path}>
          {path.children ? (
            <Disclosure>
              <Disclosure.Button as="div">
                {({ open }) => (
                  <div className="relative cursor-pointer">
                    <NavItem
                      isSub
                      path={path.path!}
                      title={path.title}
                      Icon={path.icon}
                    />

                    {open ? (
                      <ChevronUpIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4" />
                    ) : (
                      <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4" />
                    )}
                  </div>
                )}
              </Disclosure.Button>
              <Disclosure.Panel className="pl-3 flex flex-col gap-1">
                {path.children!.map((item) => (
                  <NavItem
                    key={item.path}
                    path={item.path!}
                    title={item.title}
                    Icon={item.icon}
                  />
                ))}
              </Disclosure.Panel>
            </Disclosure>
          ) : (
            <NavLink to={path.path!}>
              <NavItem
                key={path.path}
                path={path.path!}
                title={path.title}
                Icon={path.icon}
              />
            </NavLink>
          )}
        </Fragment>
      ))}
    </nav>
  );
};

export const Sidebar: React.FC<ISidebar> = () => {
  const sidebarOpen = useDashboardLayoutStore((s) => s.sidebarOpen);
  const user = useUserStore((s) => s.user);
  console.log({ user });

  return (
    <SidebarContainer>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={useDashboardLayoutStore.getState().setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() =>
                        useDashboardLayoutStore.getState().setSidebarOpen(false)
                      }
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                  <div className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Your Company"
                    />
                  </div>
                  <Nav />
                </div>
                <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                  <a href="#" className="group block flex-shrink-0">
                    <div className="flex items-center">
                      <div>
                        <img
                          className="inline-block h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                          {user?.username}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <LogoIcon className="h-8 w-auto text-primary-500" />
            </div>
            <Nav />
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <a href="#" className="group block w-full flex-shrink-0">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.6435-9/201182653_110117361307921_2746585933553542015_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Y4-H_FuhP-QAX8GkpMk&tn=mDLswQ6MgDlAP6Ml&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfBVzzVhHCnKmeX5bEA-07eU2Ep1uMYgbEDfrnNXpgkuvA&oe=63BD6A56"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {user?.username}
                  </p>
                  <p
                    onClick={logout}
                    className="text-xs font-medium text-gray-500 group-hover:text-gray-700"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </SidebarContainer>
  );
};
