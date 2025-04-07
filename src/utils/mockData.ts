
import { Application } from '@/components/ApplicationTable';

// Mock data for a verifier
export const mockApplications: Application[] = [
  {
    id: '1',
    applicantName: 'John Doe',
    applicantAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=10',
    type: 'Personal Loan',
    amount: 5000,
    date: '2023-04-01',
    status: 'pending'
  },
  {
    id: '2',
    applicantName: 'Jane Smith',
    applicantAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=11',
    type: 'Business Loan',
    amount: 15000,
    date: '2023-03-15',
    status: 'pending'
  },
  {
    id: '3',
    applicantName: 'Robert Johnson',
    applicantAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12',
    type: 'Home Loan',
    amount: 250000,
    date: '2023-02-28',
    status: 'pending'
  },
  {
    id: '4',
    applicantName: 'Emily Parker',
    applicantAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=13',
    type: 'Education Loan',
    amount: 20000,
    date: '2023-01-10',
    status: 'pending'
  },
  {
    id: '5',
    applicantName: 'Michael Brown',
    applicantAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=14',
    type: 'Auto Loan',
    amount: 35000,
    date: '2022-12-05',
    status: 'pending'
  }
];

// Mock chart data
export const loanApplicationData = [
  { name: 'Jan', value: 45 },
  { name: 'Feb', value: 52 },
  { name: 'Mar', value: 38 },
  { name: 'Apr', value: 65 },
  { name: 'May', value: 47 },
  { name: 'Jun', value: 55 },
  { name: 'Jul', value: 60 },
  { name: 'Aug', value: 42 },
  { name: 'Sep', value: 50 },
  { name: 'Oct', value: 48 },
  { name: 'Nov', value: 40 },
  { name: 'Dec', value: 35 }
];

export const totalProcessingData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 40 },
  { name: 'Mar', value: 25 },
  { name: 'Apr', value: 50 },
  { name: 'May', value: 35 },
  { name: 'Jun', value: 45 },
  { name: 'Jul', value: 48 },
  { name: 'Aug', value: 32 },
  { name: 'Sep', value: 38 },
  { name: 'Oct', value: 30 },
  { name: 'Nov', value: 28 },
  { name: 'Dec', value: 25 }
];

export const rejectionReasonsData = [
  { name: 'Low Income', value: 35 },
  { name: 'High Debt', value: 25 },
  { name: 'Credit Score', value: 40 },
  { name: 'Doc Issues', value: 15 },
  { name: 'Fraud Risk', value: 8 },
  { name: 'Policy', value: 20 },
  { name: 'Other', value: 10 }
];
