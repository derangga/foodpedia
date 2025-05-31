import { RecipeItem } from "@/models/recipe";
import { useEffect, useState, useRef } from "react";

export function useRecipesDebounce(
  query: string,
  selectedCategories: string[]
) {
  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear previous debounce timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set new debounce timeout
    debounceTimeoutRef.current = setTimeout(() => {
      // Abort previous fetch if it exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      const fetchRecipes = async () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (query) params.set("query", query);
        if (selectedCategories.length)
          params.set("filter", selectedCategories.join(","));

        try {
          const res = await fetch(`/api/recipes?${params.toString()}`, {
            signal: controller.signal,
          });

          if (!res.ok) throw new Error("Failed to fetch");
          const data = await res.json();
          setRecipes(data);
        } catch (err) {
          console.error("Fetch error:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchRecipes();
    }, 300); // 300ms debounce delay

    // Cleanup function
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [query, selectedCategories]);

  return { recipes, loading };
}
