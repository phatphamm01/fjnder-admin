import create from "zustand";

interface DashboardLayout {
  sidebarOpen: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;

  // currentLink: string;
  // setCurrentLink: string;
}

export const useDashboardLayoutStore = create<DashboardLayout>((set, get) => ({
  sidebarOpen: false,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
}));
