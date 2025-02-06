import { TCategory } from "./category";

export type TBlogContentType = "mdx" | "text" | "string";
export type TBlogStatus = "published" | "draft" | "unlisted" | "deleted";
export interface IBlogAuthor {
  name: string;
  email: string;
}

export type TBlog = {
  title: string;
  slug: string;
  content: string;
  brief: string;
  cover: string;
  contentType: TBlogContentType;
  author: IBlogAuthor;
  status: TBlogStatus;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
  category: TCategory;
  isDeleted: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
};
