import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, User, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await login(email, password);

      // Check the user role to redirect to the appropriate dashboard
      const user = localStorage.getItem("currentUser");
      if (user) {
        const userData = JSON.parse(user);
        if (userData.role === "user") {
          navigate("/user/dashboard");
        } else if (userData.role === "verifier") {
          navigate("/verifier/dashboard");
        } else if (userData.role === "admin") {
          navigate("/admin/dashboard");
        }
      }

      toast({
        title: "Success!",
        description: "You have successfully logged in",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-app-darker to-app-dark p-4">
      <Card className="w-full max-w-md border-app-dark bg-app-dark/70 backdrop-blur-sm shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <CreditCard className="h-12 w-12 text-app-blue" />
          </div>
          <CardTitle className="text-3xl font-bold text-app-blue">
            CreditFlow
          </CardTitle>
          <CardDescription className="text-gray-300">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium flex items-center gap-2 text-white"
              >
                <User className="h-4 w-4" /> Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-app-darker border-app-dark focus:border-app-blue focus:ring-app-blue/20"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium flex items-center gap-2 text-white"
                >
                  <Lock className="h-4 w-4" /> Password
                </label>
                <Link to="#" className="text-xs text-app-blue hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-app-darker border-app-dark focus:border-app-blue focus:ring-app-blue/20"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-app-blue hover:bg-app-blue/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </Button>

            <div className="text-center text-sm mt-4 p-3 bg-app-darker rounded-md border border-app-dark text-gray-300">
              <p className="font-medium mb-2">Demo Accounts:</p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2 bg-app-dark/50 rounded">
                  <span className="block font-medium text-app-blue">User</span>
                  <span className="text-white">
                    user@example.com
                    <br />
                    password
                  </span>
                </div>
                <div className="p-2 bg-app-dark/50 rounded">
                  <span className="block font-medium text-app-blue">
                    Verifier
                  </span>
                  <span className="text-white">
                    verifier@example.com
                    <br />
                    password
                  </span>
                </div>
                <div className="p-2 bg-app-dark/50 rounded">
                  <span className="block font-medium text-app-blue">Admin</span>
                  <span className="text-white">
                    admin@example.com
                    <br />
                    password
                  </span>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-300">
            Don't have an account?{" "}
            <Link to="/register" className="text-app-blue hover:underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
