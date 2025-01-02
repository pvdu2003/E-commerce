import axios from "axios";
const API_URL = import.meta.env.VITE_SERVER_URL;

interface Category {
  _id: string;
  name: string;
}
interface Book {
  _id: string;
  image: string;
  title: string;
  price: number;
  quantity_sold: number;
}
interface FetchCategoryResponse {
  books: Book[];
  totalPages: number;
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
export const fetchCategoryById = async (
  id: string,
  page: number,
  title?: string,
  from?: number,
  to?: number
): Promise<FetchCategoryResponse> => {
  const response = await axios.get<FetchCategoryResponse>(
    `${API_URL}/cat/${id}?page=${page}${
      title ? `&title=${encodeURIComponent(title)}` : ""
    }${from ? `&from=${from}` : ""}${to ? `&to=${to}` : ""}`
  );
  return response.data;
};
