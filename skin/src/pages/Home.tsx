
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white">
      <div className="container max-w-4xl mx-auto text-center px-4">
        <h1 className="text-6xl md:text-7xl font-bold mb-8">
        <span className="block">
    <span className="text-purple-400">Maximize</span> Gains
  </span>
  <span className="block">
    <span className="text-purple-400">Minimize</span> Risk
  </span>
        </h1>
        
        <div className="w-24 h-1 bg-uphold-primary mx-auto my-8"></div>
        
        <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto">
        Take control of your financial future with smart, diversified ETFs. Invest with confidence and watch your wealth grow.        </p>
        
        <Button 
          size="lg" 
          className="bg-uphold-primary hover:bg-uphold-dark text-white gap-2 text-lg px-8 py-6"
          onClick={() => navigate('/dashboard')}
        >
          Start Now <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Home;
