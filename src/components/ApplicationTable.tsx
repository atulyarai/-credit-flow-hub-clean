
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

// Define the type for application
export interface Application {
  id: string;
  applicantName: string;
  applicantAvatar?: string;
  type: string;
  amount: number;
  date: string;
  status: 'pending' | 'verified' | 'rejected' | 'approved' | 'processing';
}

interface ApplicationTableProps {
  applications: Application[];
  userRole: 'user' | 'verifier' | 'admin';
  onAction?: (action: 'verify' | 'reject' | 'approve', applicationId: string) => void;
}

const ApplicationTable = ({ applications, userRole, onAction }: ApplicationTableProps) => {
  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-app-yellow text-xs">Pending</span>;
      case 'verified':
        return <span className="px-2 py-1 rounded-full bg-blue-500/20 text-app-blue text-xs">Verified</span>;
      case 'approved':
        return <span className="px-2 py-1 rounded-full bg-green-500/20 text-app-green text-xs">Approved</span>;
      case 'rejected':
        return <span className="px-2 py-1 rounded-full bg-red-500/20 text-app-red text-xs">Rejected</span>;
      case 'processing':
        return <span className="px-2 py-1 rounded-full bg-blue-500/20 text-app-blue text-xs">Processing</span>;
      default:
        return null;
    }
  };

  // Get actions based on user role and application status
  const renderActions = (application: Application) => {
    if (userRole === 'verifier' && application.status === 'pending') {
      return (
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-app-green/10 hover:bg-app-green/20 border-app-green/20"
            onClick={() => onAction && onAction('verify', application.id)}
          >
            <CheckCircle className="h-4 w-4 text-app-green" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-app-red/10 hover:bg-app-red/20 border-app-red/20"
            onClick={() => onAction && onAction('reject', application.id)}
          >
            <XCircle className="h-4 w-4 text-app-red" />
          </Button>
        </div>
      );
    }
    
    if (userRole === 'admin' && application.status === 'verified') {
      return (
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-app-green/10 hover:bg-app-green/20 border-app-green/20"
            onClick={() => onAction && onAction('approve', application.id)}
          >
            <CheckCircle className="h-4 w-4 text-app-green" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-app-red/10 hover:bg-app-red/20 border-app-red/20"
            onClick={() => onAction && onAction('reject', application.id)}
          >
            <XCircle className="h-4 w-4 text-app-red" />
          </Button>
        </div>
      );
    }

    if (userRole === 'user') {
      return (
        <div className="flex items-center">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" /> Updated: {new Date(application.date).toLocaleDateString()}
          </span>
        </div>
      );
    }

    return getStatusBadge(application.status);
  };

  return (
    <div className="rounded-md border border-app-dark bg-app-dark overflow-hidden">
      <Table>
        <TableHeader className="bg-app-dark/80">
          <TableRow className="hover:bg-app-dark/50 border-app-dark">
            <TableHead className="font-medium">Applicant</TableHead>
            <TableHead className="font-medium">Type</TableHead>
            <TableHead className="font-medium text-right">Amount</TableHead>
            <TableHead className="font-medium">Date</TableHead>
            <TableHead className="font-medium">Status</TableHead>
            <TableHead className="font-medium text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.length === 0 ? (
            <TableRow className="hover:bg-app-dark/50 border-app-dark">
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No applications found
              </TableCell>
            </TableRow>
          ) : (
            applications.map((application) => (
              <TableRow key={application.id} className="hover:bg-app-dark/50 border-app-dark">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {application.applicantAvatar && (
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img src={application.applicantAvatar} alt={application.applicantName} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <span>{application.applicantName}</span>
                  </div>
                </TableCell>
                <TableCell>{application.type}</TableCell>
                <TableCell className="text-right">${application.amount.toLocaleString()}</TableCell>
                <TableCell>{new Date(application.date).toLocaleDateString()}</TableCell>
                <TableCell>{getStatusBadge(application.status)}</TableCell>
                <TableCell className="text-right">{renderActions(application)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationTable;
