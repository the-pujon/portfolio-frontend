import baseApi from "../../api/baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create project
    createProject: builder.mutation({
      query: (data) => ({
        url: "/project/create",
        method: "POST",
        body: data, // Ensure that data includes userId
      }),
      invalidatesTags: ["Project", "Profile"],
    }),

    // Get all projects
    getAllProjects: builder.query({
      query: () => ({
        url: "/project",
        method: "GET",
      }),
      providesTags: ["Project"],
    }),

    // Get project by ID
    getProjectById: builder.query({
      query: (id) => {
        console.log("id paisi", id);
        return {
          url: `/project/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Project"],
    }),

    // Update project
    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/project/${id}`,
        method: "PATCH",
        body: data, // Ensure that data includes userId
      }),
      invalidatesTags: ["Project", "Profile"],
    }),

    // Delete project
    deleteProject: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/project/${id}`,
        method: "DELETE",
        body: { userId }, // Include userId in the body
      }),
      invalidatesTags: ["Project", "Profile"],
    }),

    // Get profile by user ID
    getProfileByUserId: builder.query({
      query: (userId) => ({
        url: "/project/profile", // Assuming this endpoint exists
        method: "POST",
        body: { userId },
      }),
      providesTags: ["Profile"],
    }),

    //give feedback
    giveFeedback: builder.mutation({
      query: (data) => ({
        url: "/project/feedback",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetProfileByUserIdQuery,
  useGiveFeedbackMutation,
} = projectApi;
