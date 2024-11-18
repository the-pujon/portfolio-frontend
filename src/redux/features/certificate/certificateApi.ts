import baseApi from "../../api/baseApi";

const certificateApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCertificates: build.query({
      query: () => ({
        url: "/certificate",
        method: "GET",
      }),
      providesTags: ["Certificate"],
    }),
    createCertificate: build.mutation({
      query: (data) => ({
        url: "/certificate/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Certificate"],
    }),
    updateCertificate: build.mutation({
      query: ({ id, data }) => ({
        url: `/certificate/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Certificate"],
    }),
    deleteCertificate: build.mutation({
      query: ({ id, userId }) => ({
        url: `/certificate/${id}`,
        method: "DELETE",
        body: { userId },
      }),
      invalidatesTags: ["Certificate"],
    }),
  }),
});

export const {
  useGetAllCertificatesQuery,
  useCreateCertificateMutation,
  useUpdateCertificateMutation,
  useDeleteCertificateMutation,
} = certificateApi;
