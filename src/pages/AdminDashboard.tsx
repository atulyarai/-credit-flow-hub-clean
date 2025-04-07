
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import ChartComponent from '@/components/ChartComponent';
import { Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { useApplications } from '@/contexts/ApplicationContext';
import StatisticsSection from '@/components/dashboard/StatisticsSection';
import ApplicationsSection from '@/components/dashboard/ApplicationsSection';
import { loanApplicationData, totalProcessingData, rejectionReasonsData } from '@/utils/mockData';

const AdminDashboard = () => {
  const { 
    verifiedApplications, 
    updateApplicationStatus,
    isLoading,
    getStats
  } = useApplications();
  
  const { toast } = useToast();
  
  const stats = getStats();

  const handleAction = async (action: 'approve' | 'reject', applicationId: string) => {
    try {
      // Update the application status
      await updateApplicationStatus(
        applicationId, 
        action === 'approve' ? 'approved' : 'rejected'
      );
      
      // Show toast notification
      toast({
        title: action === 'approve' ? 'Application Approved' : 'Application Rejected',
        description: `Application #${applicationId} has been ${action === 'approve' ? 'approved' : 'rejected'}.`,
      });
    } catch (error) {
      toast({
        title: 'Action Failed',
        description: `Failed to ${action} the application. Please try again.`,
        variant: 'destructive'
      });
    }
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {/* First 4 stats come from StatisticsSection */}
          <div className="lg:col-span-4">
            <StatisticsSection 
              totalApplications={stats.totalApplications}
              pendingApplications={stats.pendingApplications}
              verifiedApplications={stats.verifiedApplications}
              approvedApplications={stats.approvedApplications}
              rejectedApplications={stats.rejectedApplications}
              userRole="admin"
            />
          </div>
          <StatCard 
            title="Total Users" 
            value={210}  // This is still hardcoded as user management is not implemented
            icon={Users} 
            color="app-blue" 
          />
        </div>
        
        <ApplicationsSection 
          applications={verifiedApplications}
          isLoading={isLoading}
          userRole="admin"
          title="Applications Waiting for Approval"
          onAction={handleAction}
        />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          <div className="xl:col-span-3">
            <ChartComponent 
              title="Loan Applications (Monthly)" 
              data={loanApplicationData} 
              type="area" 
              color="#24a950" 
            />
          </div>
          <div className="xl:col-span-1">
            <ChartComponent 
              title="Total Processing Loans (Monthly)" 
              data={totalProcessingData} 
              type="bar" 
              color="#3498DB" 
            />
          </div>
          <div className="xl:col-span-2">
            <ChartComponent 
              title="Number of Rejections (Monthly)" 
              data={rejectionReasonsData} 
              type="bar" 
              color="#E74C3C" 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-app-dark bg-app-dark">
            <CardContent className="p-6">
              <h3 className="font-semibold text-xl mb-2">System Performance</h3>
              <p className="text-muted-foreground">The system is operating at 95% efficiency with an average response time of 1.2 seconds.</p>
              <div className="mt-4 text-app-yellow">
                <strong>95%</strong> uptime in the last 30 days
              </div>
            </CardContent>
          </Card>
          <Card className="border-app-dark bg-app-dark">
            <CardContent className="p-6">
              <h3 className="font-semibold text-xl mb-2">Security Status</h3>
              <p className="text-muted-foreground">No security incidents reported in the last 30 days. Last scan completed yesterday.</p>
              <div className="mt-4 text-app-green">
                <strong>100%</strong> compliance with security protocols
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
