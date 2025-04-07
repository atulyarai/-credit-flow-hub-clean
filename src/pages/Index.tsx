
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowRight, Shield, Clock, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-app-darker to-app-dark text-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-app-blue" />
          <h1 className="text-xl font-bold">CreditFlow</h1>
        </div>
        <div className="space-x-4">
          <Button 
            variant="ghost" 
            className="text-white hover:text-app-blue"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button 
            className="bg-app-blue hover:bg-app-light-blue text-white"
            onClick={() => navigate('/register')}
          >
            Get Started
          </Button>
        </div>
      </header>

      <main>
        {/* Main Hero */}
        <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
          <div className="flex-1 space-y-6 mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Streamline Your <span className="text-app-blue">Credit Applications</span> Process
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl">
              CreditFlow makes managing credit applications easier than ever. Submit, track, and manage your applications all in one place.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-app-blue hover:bg-app-light-blue"
                onClick={() => navigate('/register')}
              >
                Create Account <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-app-blue text-app-blue hover:bg-app-blue/10"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 bg-app-blue/30 rounded-lg blur-xl"></div>
              <div className="relative bg-app-dark/80 backdrop-blur-sm p-8 rounded-lg border border-app-blue/50">
                <CreditCard className="h-16 w-16 text-app-blue mb-6" />
                <h3 className="text-2xl font-bold mb-4">Credit Management Made Simple</h3>
                <p className="text-gray-300 mb-6">
                  Our platform provides real-time updates and status tracking for all your credit applications.
                </p>
                <div className="space-y-3">
                  {[
                    { icon: Shield, text: "Secure application processing" },
                    { icon: Clock, text: "Real-time status updates" },
                    { icon: Check, text: "Streamlined approval process" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-app-blue" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-app-darker/50 backdrop-blur-sm py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Why Choose <span className="text-app-blue">CreditFlow</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Clock,
                  title: "Fast Processing",
                  description: "Submit applications quickly and get results faster than traditional methods."
                },
                {
                  icon: Shield,
                  title: "Secure & Private",
                  description: "Your financial data is protected with enterprise-grade security protocols."
                },
                {
                  icon: Check,
                  title: "Easy Tracking",
                  description: "Monitor the status of all your applications in real-time from one dashboard."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-app-dark/30 backdrop-blur-sm p-6 rounded-lg border border-app-blue/20 hover:border-app-blue/50 transition-all">
                  <feature.icon className="h-12 w-12 text-app-blue mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-auto border-t border-app-blue/20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <CreditCard className="h-5 w-5 text-app-blue" />
            <span className="text-lg font-bold">CreditFlow</span>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} CreditFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
