
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Trash2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/contexts/AuthContext';

interface Admin {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  lastActive: string;
}

// Mock data for admin users
const mockAdmins: Admin[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    lastActive: '2023-04-05'
  },
  {
    id: '2',
    name: 'John Admin',
    email: 'john.admin@example.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=20',
    lastActive: '2023-04-02'
  },
  {
    id: '3',
    name: 'Sarah Manager',
    email: 'sarah.manager@example.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=21',
    lastActive: '2023-04-01'
  }
];

const AdminManage = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // New admin form
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin' as UserRole
  });

  useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAdmins(mockAdmins);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Filter admins based on search term
  const filteredAdmins = admins.filter(admin => 
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAdmin(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAdmin = () => {
    // Validate form
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }

    // Create new admin (mock implementation)
    const newAdminObj: Admin = {
      id: Math.random().toString(36).substr(2, 9),
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
      lastActive: new Date().toISOString().split('T')[0]
    };

    setAdmins(prev => [newAdminObj, ...prev]);
    
    // Reset form and close dialog
    setNewAdmin({
      name: '',
      email: '',
      password: '',
      role: 'admin'
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: "New admin has been added",
    });
  };

  const handleDeleteAdmin = (adminId: string) => {
    setAdmins(prev => prev.filter(admin => admin.id !== adminId));
    
    toast({
      title: "Admin Removed",
      description: "The admin has been removed successfully",
    });
  };

  return (
    <DashboardLayout title="Manage Admins">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Administrators</h1>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-app-green hover:bg-app-light-green">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-app-dark border-app-dark">
              <DialogHeader>
                <DialogTitle>Add New Administrator</DialogTitle>
                <DialogDescription>
                  Create a new administrator account with appropriate permissions.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className="bg-app-darker border-app-dark"
                    value={newAdmin.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@example.com"
                    className="bg-app-darker border-app-dark"
                    value={newAdmin.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-app-darker border-app-dark"
                    value={newAdmin.password}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">Role</label>
                  <Select 
                    defaultValue="admin"
                    onValueChange={(value) => setNewAdmin(prev => ({ ...prev, role: value as UserRole }))}
                  >
                    <SelectTrigger className="bg-app-darker border-app-dark">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-app-dark border-app-dark">
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-app-dark">
                  Cancel
                </Button>
                <Button className="bg-app-green hover:bg-app-light-green" onClick={handleAddAdmin}>
                  Add Administrator
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card className="border-app-dark bg-app-dark mb-6">
          <CardHeader className="pb-2">
            <CardTitle>Current Administrators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex w-full max-w-sm items-center space-x-2">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search admins..."
                  className="pl-8 bg-app-darker border-app-dark w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {isLoading ? (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Loading administrators...</p>
              </div>
            ) : (
              <div className="rounded-md border border-app-dark overflow-hidden">
                <Table>
                  <TableHeader className="bg-app-dark/80">
                    <TableRow className="hover:bg-app-dark/50 border-app-dark">
                      <TableHead className="font-medium">Name</TableHead>
                      <TableHead className="font-medium">Email</TableHead>
                      <TableHead className="font-medium">Last Active</TableHead>
                      <TableHead className="font-medium text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAdmins.length === 0 ? (
                      <TableRow className="hover:bg-app-dark/50 border-app-dark">
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                          No administrators found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAdmins.map((admin) => (
                        <TableRow key={admin.id} className="hover:bg-app-dark/50 border-app-dark">
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full overflow-hidden">
                                <img src={admin.avatar} alt={admin.name} className="w-full h-full object-cover" />
                              </div>
                              <span>{admin.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{admin.email}</TableCell>
                          <TableCell>{new Date(admin.lastActive).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            {admin.id !== '1' ? (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-app-red hover:text-white hover:bg-app-red"
                                onClick={() => handleDeleteAdmin(admin.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            ) : (
                              <span className="text-xs text-muted-foreground">Primary Admin</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminManage;
