
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Application } from '@/components/ApplicationTable';
import { useAuth } from './AuthContext';

interface ApplicationContextType {
  applications: Application[];
  addApplication: (application: Omit<Application, 'id' | 'date'>) => Promise<void>;
  updateApplicationStatus: (id: string, status: Application['status']) => Promise<void>;
  isLoading: boolean;
  userApplications: Application[];
  pendingApplications: Application[];
  verifiedApplications: Application[];
  approvedApplications: Application[];
  rejectedApplications: Application[];
  getStats: () => {
    totalApplications: number;
    pendingApplications: number;
    verifiedApplications: number;
    approvedApplications: number;
    rejectedApplications: number;
  };
}

// Initial applications data to bootstrap the system
const initialApplications: Application[] = [
  {
    id: '1',
    applicantName: 'John Doe',
    applicantAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=10',
    type: 'Personal Loan',
    amount: 5000,
    date: new Date().toISOString(),
    status: 'pending'
  },
  {
    id: '2',
    applicantName: 'Jane Smith',
    applicantAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=11',
    type: 'Business Loan',
    amount: 15000,
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'verified'
  },
  {
    id: '3',
    applicantName: 'Robert Johnson',
    applicantAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12',
    type: 'Home Loan',
    amount: 250000,
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'approved'
  },
  {
    id: '4',
    applicantName: 'Emily Parker',
    applicantAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=13',
    type: 'Education Loan',
    amount: 20000,
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'rejected'
  }
];

const ApplicationContext = createContext<ApplicationContextType | null>(null);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();

  // Load applications from localStorage on mount
  useEffect(() => {
    const loadApplications = async () => {
      try {
        setIsLoading(true);
        const savedApplications = localStorage.getItem('applications');
        
        if (savedApplications) {
          setApplications(JSON.parse(savedApplications));
        } else {
          // Initialize with sample data if nothing exists
          setApplications(initialApplications);
          localStorage.setItem('applications', JSON.stringify(initialApplications));
        }
      } catch (error) {
        console.error('Error loading applications:', error);
        setApplications(initialApplications);
      } finally {
        setIsLoading(false);
      }
    };

    loadApplications();
  }, []);

  // Add new application
  const addApplication = async (applicationData: Omit<Application, 'id' | 'date'>) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newApplication: Application = {
        ...applicationData,
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
      };
      
      const updatedApplications = [...applications, newApplication];
      setApplications(updatedApplications);
      localStorage.setItem('applications', JSON.stringify(updatedApplications));
      
      return;
    } catch (error) {
      console.error('Error adding application:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update application status
  const updateApplicationStatus = async (id: string, status: Application['status']) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedApplications = applications.map(app => 
        app.id === id ? { ...app, status } : app
      );
      
      setApplications(updatedApplications);
      localStorage.setItem('applications', JSON.stringify(updatedApplications));
      
      return;
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Filter applications for the current user
  const userApplications = currentUser 
    ? applications.filter(app => app.applicantName === currentUser.name)
    : [];

  // Get applications by status
  const pendingApplications = applications.filter(app => app.status === 'pending');
  const verifiedApplications = applications.filter(app => app.status === 'verified');
  const approvedApplications = applications.filter(app => app.status === 'approved');
  const rejectedApplications = applications.filter(app => app.status === 'rejected');

  // Get stats for dashboard
  const getStats = () => {
    return {
      totalApplications: applications.length,
      pendingApplications: pendingApplications.length,
      verifiedApplications: verifiedApplications.length,
      approvedApplications: approvedApplications.length,
      rejectedApplications: rejectedApplications.length
    };
  };

  const value: ApplicationContextType = {
    applications,
    addApplication,
    updateApplicationStatus,
    isLoading,
    userApplications,
    pendingApplications,
    verifiedApplications,
    approvedApplications,
    rejectedApplications,
    getStats
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

// Custom hook to use application context
export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
};
