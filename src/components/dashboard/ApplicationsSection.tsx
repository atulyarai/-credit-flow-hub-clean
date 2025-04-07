
import { Application } from '@/components/ApplicationTable';
import ApplicationTable from '@/components/ApplicationTable';

interface ApplicationsSectionProps {
  applications: Application[];
  isLoading: boolean;
  userRole: 'verifier' | 'admin' | 'user';
  title?: string;
  onAction?: (action: 'verify' | 'reject' | 'approve', applicationId: string) => void;
}

const ApplicationsSection = ({
  applications,
  isLoading,
  userRole,
  title = "Applications",
  onAction
}: ApplicationsSectionProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {isLoading ? (
        <div className="rounded-md border border-app-dark bg-app-dark p-8 text-center">
          <p className="text-muted-foreground">Loading applications...</p>
        </div>
      ) : (
        <ApplicationTable 
          applications={applications} 
          userRole={userRole}
          onAction={onAction}
        />
      )}
    </div>
  );
};

export default ApplicationsSection;
