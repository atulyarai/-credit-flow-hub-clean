
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-app-darker text-white p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-app-green mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => navigate(-1)} 
            variant="outline"
            className="border-app-dark"
          >
            Go Back
          </Button>
          <Button 
            onClick={() => navigate('/')} 
            className="bg-app-green hover:bg-app-light-green"
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
