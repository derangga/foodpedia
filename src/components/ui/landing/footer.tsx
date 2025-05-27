import React from "react";
import { Instagram, Github, Mail, ChefHat } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-orange-400">
                Foodpedia
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Your ultimate destination for culinary adventures and recipe
              discoveries.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://instagram.com" icon={<Instagram />} />
              <SocialLink href="https://github.com" icon={<Github />} />
              <SocialLink href="mailto:info@foodpedia.com" icon={<Mail />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              {[
                "Search Recipes",
                "Popular Categories",
                "Meal Plans",
                "Cooking Videos",
              ].map((item) => (
                <FooterLink key={item} href="#" label={item} />
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {["About Us", "Blog", "Careers", "Contact Us"].map((item) => (
                <FooterLink key={item} href="#" label={item} />
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest recipes and cooking
              tips.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-orange-500 w-full"
              />
              <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Foodpedia. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-500 hover:text-orange-400 text-sm transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors"
  >
    {icon}
  </a>
);

interface FooterLinkProps {
  href: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, label }) => (
  <li>
    <a
      href={href}
      className="text-gray-400 hover:text-orange-400 transition-colors"
    >
      {label}
    </a>
  </li>
);

export default Footer;
