import React from "react";
import { Search } from "lucide-react";
import { Input } from "../input";

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg"
          alt="Delicious food spread"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Adventure of <span className="text-orange-400">Delicious</span>
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Discover thousands of recipes, share your culinary creations, and get
          personalized suggestions from our AI
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search for recipes..."
            className="w-full px-5 py-3 pr-12 rounded-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-600">
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 text-white">
          <div className="text-center">
            <p className="text-3xl font-bold">10K+</p>
            <p className="text-sm opacity-80">Recipes</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">5K+</p>
            <p className="text-sm opacity-80">Active Users</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">3K+</p>
            <p className="text-sm opacity-80">Reviews</p>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center">
          <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
