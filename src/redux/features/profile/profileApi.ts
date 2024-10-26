import baseApi from "../../api/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create profile
    createProfile: builder.mutation({
      query: (data) => {
        console.log("inside create profile", data);
        return {
          url: "/profile/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Profile"],
    }),

    // Get profile by ID
    getProfileById: builder.query({
      query: (id) => ({
        url: `/profile/${id}`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    // Update profile
    updateProfile: builder.mutation({
      query: ({ id, data }) => {
        console.log("inside update profile", data);
        return {
          url: `/profile/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["Profile"],
    }),

    // Delete profile
    deleteProfile: builder.mutation({
      query: (id) => ({
        url: `/profile/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useCreateProfileMutation,
  useGetProfileByIdQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = profileApi;
