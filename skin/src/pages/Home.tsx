
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white">
      <div className="container max-w-4xl mx-auto text-center px-4">
        <h1 className="text-6xl md:text-7xl font-bold mb-8">
          <span className="block text-purple-400">Earn</span>
          <span className="block">Crypto Better</span>
        </h1>
        
        <div className="w-24 h-1 bg-uphold-primary mx-auto my-8"></div>
        
        <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto">
          Discover the future of ETF investments with our comprehensive platform designed for modern investors.
        </p>
        
        <Button 
          size="lg" 
          className="bg-uphold-primary hover:bg-uphold-dark text-white gap-2 text-lg px-8 py-6"
          onClick={() => navigate('/dashboard')}
        >
          Start Now <ArrowRight size={20} />
        </Button>
      </div>
      
      <div className="absolute bottom-10 w-full text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Uphold. All rights reserved.
      </div>
    </div>
  );
};

export default Home;
