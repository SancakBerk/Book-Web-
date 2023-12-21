export interface CategoryModel {
  category: Category[];
}

export interface Category {
  id: number;
  name: string;
  created_at: Date;
}
