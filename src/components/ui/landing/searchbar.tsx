"use client";
import { Search } from "lucide-react";
import { Input } from "../input";
import { useRouter } from "next/navigation";

const SearchBar: React.FC = () => {
  const router = useRouter();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;

    if (query === "") return;
    router.push(`/recipes?search=${query}`);
  };
  return (
    <form className="relative max-w-md mx-auto" onSubmit={(e) => onSubmit(e)}>
      <Input
        type="text"
        name="search"
        placeholder="Search for recipes..."
        className="w-full px-5 py-3 pr-12 rounded-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-600"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
};

export default SearchBar;
