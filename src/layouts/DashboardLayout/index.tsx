import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { deepPath } from "~/router";
import { Content } from "./Content";
import { Sidebar } from "./Sidebar";

export const DashboardLayout = () => {
  const location = useLocation();
  const breadcrumb = deepPath.get(location.pathname) || [];

  useEffect(() => {
    document.title =
      `Finder - ${breadcrumb[breadcrumb.length - 1].title}` || "Finder";
  }, [breadcrumb]);

  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
};
