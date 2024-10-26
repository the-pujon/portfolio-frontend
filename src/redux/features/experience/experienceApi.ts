import baseApi from "../../api/baseApi";

const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create experience
    createExperience: builder.mutation({
      query: (data) => ({
        url: "/experience/create",
        method: "POST",
        body: data, // Ensure that data includes userId
      }),
      invalidatesTags: ["Experience", "Profile"],
    }),

    // Get all experiences
    getAllExperiences: builder.query({
      query: () => ({
        url: "/experience",
        method: "GET",
      }),
      providesTags: ["Experience"],
    }),

    // Get experience by ID
    getExperienceById: builder.query({
      query: (id) => ({
        url: `/experience/${id}`,
        method: "GET",
      }),
      providesTags: ["Experience"],
    }),

    // Update experience
    updateExperience: builder.mutation({
      query: ({ id, data }) => ({
        url: `/experience/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Experience", "Profile"],
    }),

    // Delete experience
    deleteExperience: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/experience/${id}`,
        method: "DELETE",
        body: { userId }, // Include userId in the body
      }),
      invalidatesTags: ["Experience", "Profile"],
    }),
  }),
});

export const {
  useCreateExperienceMutation,
  useGetAllExperiencesQuery,
  useGetExperienceByIdQuery,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi;
