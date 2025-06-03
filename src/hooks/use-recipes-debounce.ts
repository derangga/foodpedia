import { RecipeItem } from "@/models/recipe";
import { useEffect, useState, useRef, useCallback } from "react";
import debounce from "lodash.debounce";

interface UseRecipesDebounceOptions {
  debounceDelay?: number;
  enabled?: boolean;
}

export function useRecipesDebounce(
  query: string,
  selectedCategories: string[],
  options: UseRecipesDebounceOptions = {}
) {
  const { debounceDelay = 300, enabled = true } = options;

  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  // Cleanup function to abort ongoing requests
  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  // Main fetch function
  const fetchRecipes = useCallback(
    async (searchQuery: string, categories: string[]) => {
      // Don't fetch if component is unmounted or disabled
      if (!isMountedRef.current || !enabled) return;

      // Abort any ongoing request
      cleanup();

      // Create new abort controller
      const controller = new AbortController();
      abortControllerRef.current = controller;

      // Only set loading if component is still mounted
      if (isMountedRef.current) {
        setLoading(true);
        setError(null);
      }

      try {
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.set("query", searchQuery.trim());
        if (categories.length) params.set("filter", categories.join(","));

        const res = await fetch(`/api/recipes?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(
            `Failed to fetch recipes: ${res.status} ${res.statusText}`
          );
        }

        const data = await res.json();

        // Only update state if component is still mounted and this is the current request
        if (isMountedRef.current && abortControllerRef.current === controller) {
          setRecipes(data);
          setError(null);
        }
      } catch (err) {
        // Only handle error if not aborted and component is mounted
        if (isMountedRef.current && abortControllerRef.current === controller) {
          if (err instanceof Error && err.name !== "AbortError") {
            console.error("Fetch error:", err);
            setError(err.message);
            setRecipes([]); // Clear recipes on error
          }
        }
      } finally {
        // Only update loading state if component is still mounted and this is the current request
        if (isMountedRef.current && abortControllerRef.current === controller) {
          setLoading(false);
        }
      }
    },
    [cleanup, enabled]
  );

  const debouncedFetchRef = useRef<ReturnType<typeof debounce> | null>(null);

  // Update the debounced function when dependencies change
  useEffect(() => {
    debouncedFetchRef.current = debounce(
      (searchQuery: string, categories: string[]) => {
        fetchRecipes(searchQuery, categories);
      },
      debounceDelay
    );

    return () => {
      debouncedFetchRef.current?.cancel();
    };
  }, [fetchRecipes, debounceDelay]);

  // Effect to handle search when query or categories change
  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    // Trigger debounced fetch
    debouncedFetchRef.current?.(query, selectedCategories);

    // Cleanup function
    return () => {
      debouncedFetchRef.current?.cancel();
    };
  }, [query, selectedCategories, enabled, cleanup]);

  // Cleanup effect for component unmount
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      cleanup();
      debouncedFetchRef.current?.cancel();
    };
  }, [cleanup]);

  // Manual refresh function
  const refresh = useCallback(() => {
    if (enabled) {
      debouncedFetchRef.current?.cancel();
      fetchRecipes(query, selectedCategories);
    }
  }, [fetchRecipes, query, selectedCategories, enabled]);

  return {
    recipes,
    loading,
    error,
    refresh,
  };
}
