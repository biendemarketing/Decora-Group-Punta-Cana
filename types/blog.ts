export interface MagazineSection {
  title: string;
  subtitle: string;
}

export interface BlogCategory {
  id: string;
  name: string;
}

export interface BlogTag {
  id: string;
  name: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  date: string; // ISO 8601 format
  categoryId: string;
  tagIds: string[];
}
