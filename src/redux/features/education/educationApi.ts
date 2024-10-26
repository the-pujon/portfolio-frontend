import baseApi from "../../api/baseApi";

const educationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllEducations: build.query({
      query: () => ({
        url: "/education",
        method: "GET",
      }),
      providesTags: ["Education"],
    }),
    createEducation: build.mutation({
      query: (data) => ({
        url: "/education/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Education"],
    }),
    updateEducation: build.mutation({
      query: ({ id, data }) => {
        console.log("id ekhane", id);
        console.log("data ekhane", data);
        return {
          url: `/education/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["Education"],
    }),
    deleteEducation: build.mutation({
      query: ({ id, userId }) => ({
        url: `/education/${id}`,
        method: "DELETE",
        body: { userId },
      }),
      invalidatesTags: ["Education"],
    }),
  }),
});

export const {
  useGetAllEducationsQuery,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} = educationApi;
