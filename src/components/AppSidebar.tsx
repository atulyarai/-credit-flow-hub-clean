
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel
} from '@/components/ui/sidebar';
import { Home, LogOut, FileText, PlusCircle, ClipboardCheck, UserPlus, Users, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AppSidebar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!currentUser) return null;

  return (
    <Sidebar className="border-r border-app-dark">
      <SidebarHeader className="p-4 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <CreditCard className="h-7 w-7 text-app-blue" />
            <h1 className="text-2xl font-bold text-app-blue">CreditFlow</h1>
          </div>
          <p className="text-xs text-muted-foreground">Credit Management System</p>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          {currentUser.role === 'user' && (
            <>
              <SidebarGroupLabel>User Menu</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild 
                    onClick={() => navigate('/user/dashboard')}
                    className="flex gap-3 items-center hover:bg-app-blue/10">
                    <div className="flex items-center gap-3 w-full">
                      <Home className="h-5 w-5 text-app-blue" />
                      <span>Dashboard</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild 
                    onClick={() => navigate('/user/apply')}
                    className="flex gap-3 items-center hover:bg-app-blue/10">
                    <div className="flex items-center gap-3 w-full">
                      <PlusCircle className="h-5 w-5 text-app-blue" />
                      <span>Apply for Credit</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild 
                    onClick={() => navigate('/user/applications')}
                    className="flex gap-3 items-center hover:bg-app-blue/10">
                    <div className="flex items-center gap-3 w-full">
                      <FileText className="h-5 w-5 text-app-blue" />
                      <span>My Applications</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </>
          )}

          {currentUser.role === 'verifier' && (
            <>
              <SidebarGroupLabel>Verifier Menu</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild 
                    onClick={() => navigate('/verifier/dashboard')}
                    className="flex gap-3 items-center hover:bg-app-blue/10">
                    <div className="flex items-center gap-3 w-full">
                      <Home className="h-5 w-5 text-app-blue" />
                      <span>Dashboard</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild 
                    onClick={() => navigate('/verifier/dashboard')}
                    className="flex gap-3 items-center hover:bg-app-blue/10">
                    <div className="flex items-center gap-3 w-full">
                      <ClipboardCheck className="h-5 w-5 text-app-blue" />
                      <span>Verify Applications</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </>
          )}

          {currentUser.role === 'admin' && (
            <>
              <SidebarGroupLabel>Admin Menu</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild 
                    onClick={() => navigate('/admin/dashboard')}
                    className="flex gap-3 items-center hover:bg-app-blue/10">
                    <div className="flex items-center gap-3 w-full">
                      <Home className="h-5 w-5 text-app-blue" />
                      <span>Dashboard</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild 
                    onClick={() => navigate('/admin/manage')}
                    className="flex gap-3 items-center hover:bg-app-blue/10">
                    <div className="flex items-center gap-3 w-full">
                      <UserPlus className="h-5 w-5 text-app-blue" />
                      <span>Manage Admins</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild 
                    onClick={() => navigate('/admin/dashboard')}
                    className="flex gap-3 items-center hover:bg-app-blue/10">
                    <div className="flex items-center gap-3 w-full">
                      <Users className="h-5 w-5 text-app-blue" />
                      <span>Applications</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </>
          )}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-app-dark">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-app-blue">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleLogout} className="w-full flex items-center gap-2 border-app-blue text-app-blue hover:bg-app-blue/10">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
