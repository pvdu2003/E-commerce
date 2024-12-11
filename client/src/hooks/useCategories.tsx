import { useEffect, useState } from "react";
import { fetchCategories } from "../services/category.service";

interface Category {
  _id: string;
  name: string;
}

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError("Failed to fetch categories" + err);
      }
    };

    loadCategories();
  }, []);

  return { categories, error };
};

export default useCategories;
