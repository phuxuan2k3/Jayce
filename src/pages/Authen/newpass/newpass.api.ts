import loginAPI from "../../../features/Test/AI.api";
const resetAPI = loginAPI.injectEndpoints({
    endpoints: (builder) => ({
      verifyResetCode: builder.mutation<{ email: string }, { resetCode: string }>({
        query: ({ resetCode }) => ({
          url: `/account/verify/resetcode`,
          method: "POST",
          body: { resetCode },
        }),
      }),
  
   
      resetPassword: builder.mutation<void, { email: string; resetCode: string; newPassword: string }>({
        query: ({ email, resetCode, newPassword }) => ({
          url: `/account/resetpassword`,
          method: "POST",
          body: { email, resetCode, newPassword },
        }),
      }),
    }),
    overrideExisting: false,
  });
  
  export const { useVerifyResetCodeMutation, useResetPasswordMutation } = resetAPI;