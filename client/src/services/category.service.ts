import axios from "axios";
const API_URL = "http://localhost:3000";

interface Category {
  id: number;
  name: string;
}

let cachedCategories: Category[] | null = null;

export const fetchCategories = async (): Promise<Category[]> => {
  if (cachedCategories) {
    return cachedCategories;
  }

  const response = await axios.get<Category[]>(`${API_URL}/cat/all`);
  cachedCategories = response.data;
  return cachedCategories;
};
