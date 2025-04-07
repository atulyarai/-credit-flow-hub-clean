
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import StatisticsSection from '@/components/dashboard/StatisticsSection';
import ApplicationsSection from '@/components/dashboard/ApplicationsSection';
import ChartsSection from '@/components/dashboard/ChartsSection';
import { useApplications } from '@/contexts/ApplicationContext';
import { loanApplicationData, totalProcessingData, rejectionReasonsData } from '@/utils/mockData';

const VerifierDashboard = () => {
  const { 
    applications, 
    pendingApplications,
    updateApplicationStatus,
    isLoading,
    getStats
  } = useApplications();
  
  const { toast } = useToast();
  
  const stats = getStats();

  const handleAction = async (action: 'verify' | 'reject', applicationId: string) => {
    try {
      // Update the application status
      await updateApplicationStatus(
        applicationId, 
        action === 'verify' ? 'verified' : 'rejected'
      );
      
      // Show toast notification
      toast({
        title: action === 'verify' ? 'Application Verified' : 'Application Rejected',
        description: `Application #${applicationId} has been ${action === 'verify' ? 'verified' : 'rejected'}.`,
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
    <DashboardLayout title="Verifier Dashboard">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-6">Verification Dashboard</h1>
        
        <StatisticsSection 
          totalApplications={stats.totalApplications}
          pendingApplications={stats.pendingApplications}
          verifiedApplications={stats.verifiedApplications}
          rejectedApplications={stats.rejectedApplications}
          userRole="verifier"
        />
        
        <ApplicationsSection 
          applications={pendingApplications}
          isLoading={isLoading}
          userRole="verifier"
          title="Pending Applications"
          onAction={handleAction}
        />
        
        <ChartsSection 
          loanApplicationData={loanApplicationData}
          totalProcessingData={totalProcessingData}
          rejectionReasonsData={rejectionReasonsData}
        />
      </div>
    </DashboardLayout>
  );
};

export default VerifierDashboard;
