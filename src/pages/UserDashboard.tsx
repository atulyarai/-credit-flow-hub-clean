
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import StatisticsSection from '@/components/dashboard/StatisticsSection';
import ApplicationsSection from '@/components/dashboard/ApplicationsSection';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useApplications } from '@/contexts/ApplicationContext';
import { PlusCircle } from 'lucide-react';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const { userApplications, isLoading } = useApplications();
  const navigate = useNavigate();

  // Calculate stats from real data
  const pendingApplications = userApplications.filter(app => app.status === 'pending').length;
  const approvedApplications = userApplications.filter(app => app.status === 'approved').length;
  const rejectedApplications = userApplications.filter(app => app.status === 'rejected').length;
  
  const stats = {
    totalApplications: userApplications.length,
    pendingApplications,
    approvedApplications,
    rejectedApplications
  };

  return (
    <DashboardLayout title="Credit Dashboard">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6 bg-app-dark/50 p-4 rounded-lg">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome, {currentUser?.name}</h1>
            <p className="text-sm text-muted-foreground">Manage your credit applications with ease</p>
          </div>
          <Button 
            onClick={() => navigate('/user/apply')}
            className="bg-app-blue hover:bg-app-blue/90 flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Apply for Credit
          </Button>
        </div>
        
        <StatisticsSection 
          totalApplications={stats.totalApplications}
          pendingApplications={stats.pendingApplications}
          approvedApplications={stats.approvedApplications}
          rejectedApplications={stats.rejectedApplications}
          userRole="user"
          verifiedApplications={0}
        />
        
        <ApplicationsSection 
          applications={userApplications}
          isLoading={isLoading}
          userRole="user"
          title="Recent Applications"
        />
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
