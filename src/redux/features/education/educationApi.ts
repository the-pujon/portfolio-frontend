import baseApi from "../../api/baseApi";

const educationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create education
    createEducation: builder.mutation({
      query: (data) => ({
        url: "/education/create",
        method: "POST",
        body: data, // Ensure that data includes userId
      }),
      invalidatesTags: ["Education", "Profile"],
    }),

    // Get all educations
    getAllEducations: builder.query({
      query: () => ({
        url: "/education",
        method: "GET",
      }),
      providesTags: ["Education"],
    }),

    // Get education by ID
    getEducationById: builder.query({
      query: (id) => ({
        url: `/education/${id}`,
        method: "GET",
      }),
      providesTags: ["Education"],
    }),

    // Update education
    updateEducation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/education/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Education", "Profile"],
    }),

    // Delete education
    deleteEducation: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/education/${id}`,
        method: "DELETE",
        body: { userId }, // Include userId in the body
      }),
      invalidatesTags: ["Education", "Profile"],
    }),
  }),
});

export const {
  useCreateEducationMutation,
  useGetAllEducationsQuery,
  useGetEducationByIdQuery,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} = educationApi;
