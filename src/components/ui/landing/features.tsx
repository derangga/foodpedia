import React from "react";
import { Share2, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "../button";

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Discover the Foodpedia Experience
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform brings together food lovers, home cooks, and
            professional chefs to explore and share amazing culinary creations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <FeatureCard
            icon={<Share2 className="h-8 w-8" />}
            title="Share Your Recipes"
            description="Showcase your culinary creations with our community. Add photos, ingredients, step-by-step instructions, and cooking tips."
            color="bg-orange-100 text-orange-600"
          />

          <FeatureCard
            icon={<Search className="h-8 w-8" />}
            title="Find Any Recipe"
            description="Discover recipes from around the world with our powerful search. Filter by cuisine, ingredients, cooking time, and dietary preferences."
            color="bg-green-100 text-green-600"
          />

          <FeatureCard
            icon={<Sparkles className="h-8 w-8" />}
            title="AI Recipe Suggestions"
            description="Get personalized recipe recommendations from our ChefAI based on your preferences, pantry items, and previous cooking history."
            color="bg-blue-100 text-blue-600"
          />
        </div>

        {/* Extra Feature Highlight */}
        <div className="mt-20 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <img
                src="https://images.pexels.com/photos/6941028/pexels-photo-6941028.jpeg"
                alt="AI-powered recipe suggestions"
                className="rounded-lg shadow-md w-full h-auto object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                ChefAI: Your Personal Chef Assistant
              </h3>
              <p className="text-gray-600 mb-6">
                Our advanced AI technology analyzes thousands of recipes to
                provide you with personalized cooking suggestions based on your
                taste preferences, dietary restrictions, and available
                ingredients.
              </p>
              <ul className="space-y-3">
                {[
                  "Get recipe ideas from ingredients you already have",
                  "Receive personalized recommendations based on your taste",
                  "Discover new cuisines and cooking techniques",
                  "Save time planning your meals with AI-generated weekly menus",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 mt-1 text-orange-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href={"/chefai"}>
                <Button
                  size="lg"
                  className="mt-8 px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
                >
                  Try ChefAI Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  color,
}) => (
  <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-1">
    <div className={`p-4 rounded-full ${color} mb-4`}>{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Features;
