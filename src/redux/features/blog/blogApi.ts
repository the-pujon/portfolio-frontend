import baseApi from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create blog
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/blog/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),

    // Get all blogs
    getAllBlogs: builder.query({
      query: () => ({
        url: "/blog",
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),

    // Get blog by ID
    getBlogById: builder.query({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),

    // Update blog
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blog/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),

    // Delete blog
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),

    // Add feedback
    addFeedback: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blog/${id}/feedback`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
