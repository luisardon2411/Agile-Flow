import { createContext, useContext, useState } from "react";

export interface DashboardContextProps {
    page: string;
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}


export const DashboardContext = createContext<DashboardContextProps>({
    page: 'home',
    isSidebarOpen: false,
    toggleSidebar: () => { },
});

export const useDashboard = () => {
    return useContext(DashboardContext);
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [page, setPage] = useState('home');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const actualPage = (page: string) => {
        setPage(page);
    }

    const value = { isSidebarOpen, page, toggleSidebar, actualPage }

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};