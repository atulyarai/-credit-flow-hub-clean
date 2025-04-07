import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useApplications } from '@/contexts/ApplicationContext';

const UserApplicationForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const { addApplication } = useApplications();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    loanType: '',
    amount: 5000,
    purpose: '',
    duration: 12,
    employmentStatus: '',
    monthlyIncome: '',
    additionalInfo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [name]: value[0] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.loanType || !formData.purpose || !formData.employmentStatus || !formData.monthlyIncome) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Map loan type to readable format
      const loanTypeMap: Record<string, string> = {
        'personal': 'Personal Loan',
        'business': 'Business Loan',
        'home': 'Home Loan',
        'auto': 'Auto Loan',
        'education': 'Education Loan'
      };
      
      // Create application
      await addApplication({
        applicantName: currentUser?.name || 'Unknown User',
        applicantAvatar: currentUser?.avatar,
        type: loanTypeMap[formData.loanType] || formData.loanType,
        amount: formData.amount,
        status: 'pending'
      });
      
      toast({
        title: "Application Submitted",
        description: "Your loan application has been submitted successfully",
      });
      
      navigate('/user/applications');
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "An error occurred while submitting your application",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="Apply for a Loan">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Loan Application Form</h1>
        
        <Card className="border-app-dark bg-app-dark mb-6">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="loanType" className="text-sm font-medium">Loan Type *</label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('loanType', value)}
                    value={formData.loanType}
                  >
                    <SelectTrigger className="bg-app-darker border-app-dark">
                      <SelectValue placeholder="Select loan type" />
                    </SelectTrigger>
                    <SelectContent className="bg-app-dark border-app-dark">
                      <SelectItem value="personal">Personal Loan</SelectItem>
                      <SelectItem value="business">Business Loan</SelectItem>
                      <SelectItem value="home">Home Loan</SelectItem>
                      <SelectItem value="auto">Auto Loan</SelectItem>
                      <SelectItem value="education">Education Loan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="employmentStatus" className="text-sm font-medium">Employment Status *</label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('employmentStatus', value)}
                    value={formData.employmentStatus}
                  >
                    <SelectTrigger className="bg-app-darker border-app-dark">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-app-dark border-app-dark">
                      <SelectItem value="employed">Employed Full-time</SelectItem>
                      <SelectItem value="part-time">Employed Part-time</SelectItem>
                      <SelectItem value="self-employed">Self-employed</SelectItem>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="monthlyIncome" className="text-sm font-medium">Monthly Income ($) *</label>
                  <Input
                    id="monthlyIncome"
                    name="monthlyIncome"
                    type="number"
                    placeholder="e.g. 5000"
                    className="bg-app-darker border-app-dark"
                    value={formData.monthlyIncome}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="purpose" className="text-sm font-medium">Loan Purpose *</label>
                  <Input
                    id="purpose"
                    name="purpose"
                    placeholder="e.g. Home renovation"
                    className="bg-app-darker border-app-dark"
                    value={formData.purpose}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Loan Amount: ${formData.amount.toLocaleString()}</label>
                <Slider
                  defaultValue={[5000]}
                  max={100000}
                  min={1000}
                  step={1000}
                  onValueChange={(value) => handleSliderChange('amount', value)}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$1,000</span>
                  <span>$100,000</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Loan Duration: {formData.duration} months</label>
                <Slider
                  defaultValue={[12]}
                  max={60}
                  min={3}
                  step={3}
                  onValueChange={(value) => handleSliderChange('duration', value)}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>3 months</span>
                  <span>60 months</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="additionalInfo" className="text-sm font-medium">Additional Information</label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  placeholder="Any additional details about your application"
                  className="min-h-[100px] bg-app-darker border-app-dark"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="flex justify-end gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/user/dashboard')}
                  className="border-app-dark"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-app-green hover:bg-app-light-green"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserApplicationForm;
