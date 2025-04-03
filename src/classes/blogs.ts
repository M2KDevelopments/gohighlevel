import axios from "axios";
import { Gohighlevel } from "..";
import { AuthData } from "../interfaces/auth/authdata";
import { IBlog } from "../interfaces/blog";

export class Blog {
    private authData?: AuthData;

    /**
     * Endpoints For Blogs
     * https://highlevel.stoplight.io/docs/integrations/4c364bc1d8c73-blogs-api
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }


    /**
     * Get All Blog Categories. The "Get all categories" Api return the blog categoies for a given location ID. Please use "blogs/category.readonly"
     * Documentation - https://highlevel.stoplight.io/docs/integrations/8ebd3128ee462-get-all-categories
     * @param locationId 
     * @param limit Number of categories to show in the listing
     * @param offset Number of categories to skip in listing
     */
    async getAllCategories(locationId: string, limit: number = 20, offset: number = 0) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/blogs/categories?locationId=${locationId}&limit=${limit}&offset=${offset}`, { headers });
        return response.data.categories as Array<any>;
    }

    /**
     * Get All Blog Authors. The "Get all authors" Api return the blog authors for a given location ID. Please use "blogs/author.readonly"
     * Documentation - https://highlevel.stoplight.io/docs/integrations/8ebd3128ee462-get-all-categories
     * @param locationId 
     * @param limit Number of categories to show in the listing
     * @param offset Number of categories to skip in listing
     */
    async getAllAuthors(locationId: string, limit: number = 20, offset: number = 0) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/blogs/authors?locationId=${locationId}&limit=${limit}&offset=${offset}`, { headers });
        return response.data.authors as Array<any>;
    }

    /**
     * Create Blog
     * Documentation - https://highlevel.stoplight.io/docs/integrations/c24ff055e7cf8-create-blog-post
     * @param blog 
     * @returns 
     */
    async add(blog: IBlog) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/blogs`, blog, { headers });
        return response.data.data as any;
    }

    /**
     * Update Blog. The "Update Blog Post" API allows you create blog post for any given blog site. Please use blogs/post-update.write
     * Documentation - https://highlevel.stoplight.io/docs/integrations/9ac5fb40f9fb4-update-blog-post
     * @param blogId 
     * @param blog 
     * @returns 
     */
    async update(blogId: string, blog: IBlog) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${this.authData?.baseurl}/blogs/${blogId}`, blog, { headers });
        return response.data.blog as IBlog;
    }

    /**
     * Check url slug. The "Check url slug" API allows check the blog slug validation which is needed before publishing any blog post. Please use blogs/check-slug.readonly. you can find the POST ID from the post edit url.
     * Documentation - https://highlevel.stoplight.io/docs/integrations/6f776fbd6dd1f-delete-blog
     * @param blogId 
     * @returns 
     */
    async isSlugUrlExists(locationId: string, urlSlug: string, postId: string = "") {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/blogs/posts/url-slug-exists?locationId=${locationId}&urlSlug=${urlSlug}${postId ? `&postId=${postId}` : ``}`, { headers });
        return response.data.exists as boolean;
    }
}