
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ApplicationTable from '@/components/ApplicationTable';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useApplications } from '@/contexts/ApplicationContext';

const UserApplications = () => {
  const { userApplications, isLoading } = useApplications();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter applications based on search term
  const filteredApplications = userApplications.filter(app => 
    app.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="My Credit Applications">
      <div className="mb-6">
        <div className="bg-app-dark/50 p-4 rounded-lg mb-6">
          <h1 className="text-2xl font-bold mb-2">Credit Applications</h1>
          <p className="text-sm text-muted-foreground">View and manage all your credit applications</p>
        </div>
        
        <div className="mb-6 flex w-full max-w-sm items-center space-x-2">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search applications..."
              className="pl-8 bg-app-darker border-app-dark w-full focus:border-app-blue focus:ring-app-blue/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="rounded-md border border-app-dark bg-app-dark p-8 text-center">
            <p className="text-muted-foreground">Loading applications...</p>
          </div>
        ) : (
          <ApplicationTable 
            applications={filteredApplications} 
            userRole="user"
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserApplications;
