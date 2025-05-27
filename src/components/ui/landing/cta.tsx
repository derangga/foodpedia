import React from "react";
import { ArrowRight } from "lucide-react";

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Culinary Journey?
            </h2>
            <p className="text-white/90 text-lg max-w-xl">
              Join Foodpedia today and unlock a world of recipes, cooking tips,
              and personalized AI recommendations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 bg-white text-orange-600 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Sign Up Free
            </button>
            <button className="px-6 py-3 bg-transparent border border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
