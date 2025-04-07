
import { ReactNode } from 'react';
import AppSidebar from './AppSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { CreditCard } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-app-darker to-app-dark/90 text-white">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-app-dark/80 backdrop-blur-sm border-b border-app-darker flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-app-blue" />
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-app-blue hidden sm:block" />
              <h1 className="text-xl font-bold">{title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-app-blue">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-sm">{currentUser.name}</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
