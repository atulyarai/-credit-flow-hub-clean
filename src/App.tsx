
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ApplicationProvider } from "./contexts/ApplicationContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import UserApplicationForm from "./pages/UserApplicationForm";
import UserApplications from "./pages/UserApplications";
import VerifierDashboard from "./pages/VerifierDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminManage from "./pages/AdminManage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ApplicationProvider>
        <TooltipProvider>
          <SidebarProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* User Routes */}
                <Route 
                  path="/user/dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={["user"]}>
                      <UserDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/user/apply" 
                  element={
                    <ProtectedRoute allowedRoles={["user"]}>
                      <UserApplicationForm />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/user/applications" 
                  element={
                    <ProtectedRoute allowedRoles={["user"]}>
                      <UserApplications />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Verifier Routes */}
                <Route 
                  path="/verifier/dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={["verifier"]}>
                      <VerifierDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Admin Routes */}
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/manage" 
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminManage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Default Routes */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </SidebarProvider>
        </TooltipProvider>
      </ApplicationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
