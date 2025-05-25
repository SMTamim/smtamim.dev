import config from "@/config";
import { TBlog } from "../types";

export const createBlog = async (blog: TBlog) => {
  const res = await fetch(`${config.api_url}/blogs`, {
    method: "POST",
    body: JSON.stringify(blog)
  });
  return await res.json();
};
