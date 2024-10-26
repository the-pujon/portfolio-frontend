import baseApi from "../../api/baseApi";

const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create skill
    createSkill: builder.mutation({
      query: (data) => ({
        url: "/skill/create",
        method: "POST",
        body: data, // Ensure that data includes userId
      }),
      invalidatesTags: ["Skill", "Profile"],
    }),

    // Get all skills
    getAllSkills: builder.query({
      query: () => ({
        url: "/skill",
        method: "GET",
      }),
      providesTags: ["Skill"],
    }),

    // Get skill by ID
    getSkillById: builder.query({
      query: (id) => ({
        url: `/skill/${id}`,
        method: "GET",
      }),
      providesTags: ["Skill"],
    }),

    // Update skill
    updateSkill: builder.mutation({
      query: ({ id, data }) => ({
        url: `/skill/${id}`,
        method: "PATCH",
        body: data, // Ensure that data includes userId
      }),
      invalidatesTags: ["Skill", "Profile"],
    }),

    // Delete skill
    deleteSkill: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/skill/${id}`,
        method: "DELETE",
        body: { userId }, // Include userId in the body
      }),
      invalidatesTags: ["Skill", "Profile"],
    }),
  }),
});

export const {
  useCreateSkillMutation,
  useGetAllSkillsQuery,
  useGetSkillByIdQuery,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = skillApi;
