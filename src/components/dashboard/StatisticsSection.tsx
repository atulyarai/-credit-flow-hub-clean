
import StatCard from '@/components/StatCard';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

interface StatisticsSectionProps {
  totalApplications: number;
  pendingApplications: number;
  verifiedApplications: number;
  rejectedApplications: number;
  approvedApplications?: number; // Optional for verifier dashboard
  userRole?: 'user' | 'verifier' | 'admin';
}

const StatisticsSection = ({
  totalApplications,
  pendingApplications,
  verifiedApplications = 0, // Provide default value
  rejectedApplications,
  approvedApplications = 0,
  userRole = 'verifier'
}: StatisticsSectionProps) => {
  
  // Show appropriate stats based on user role
  if (userRole === 'user') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Applications" 
          value={totalApplications} 
          icon={FileText} 
          color="app-blue"
        />
        <StatCard 
          title="Pending" 
          value={pendingApplications} 
          icon={Clock} 
          color="app-yellow"
        />
        <StatCard 
          title="Approved" 
          value={approvedApplications} 
          icon={CheckCircle} 
          color="app-green" 
        />
        <StatCard 
          title="Rejected" 
          value={rejectedApplications} 
          icon={XCircle} 
          color="app-red" 
        />
      </div>
    );
  }
  
  if (userRole === 'admin') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Applications" 
          value={totalApplications} 
          icon={FileText} 
          color="app-blue"
        />
        <StatCard 
          title="Pending Approval" 
          value={verifiedApplications} 
          icon={Clock} 
          color="app-yellow"
        />
        <StatCard 
          title="Approved" 
          value={approvedApplications} 
          icon={CheckCircle} 
          color="app-green" 
        />
        <StatCard 
          title="Rejected" 
          value={rejectedApplications} 
          icon={XCircle} 
          color="app-red" 
        />
      </div>
    );
  }
  
  // Default verifier view
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard 
        title="Total Applications" 
        value={totalApplications} 
        icon={FileText} 
        color="app-blue"
      />
      <StatCard 
        title="Pending Verification" 
        value={pendingApplications} 
        icon={Clock} 
        color="app-yellow"
      />
      <StatCard 
        title="Verified" 
        value={verifiedApplications} 
        icon={CheckCircle} 
        color="app-green" 
      />
      <StatCard 
        title="Rejected" 
        value={rejectedApplications} 
        icon={XCircle} 
        color="app-red" 
      />
    </div>
  );
};

export default StatisticsSection;
