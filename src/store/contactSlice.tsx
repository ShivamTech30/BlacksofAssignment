// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Define the shape of the form data
// interface FormData {
//   [key: string]: any; // You can define specific fields if known, e.g., name: string, email: string
// }

// // Define the shape of the API response
// interface SubmitFormResponse {
//   success: boolean;
//   message: string;
// }

// // Define the shape of the contact state
// interface ContactState {
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
//   formData: SubmitFormResponse | null;
// }

// // Simulate API call with a delay
// const mockSubmitForm = async (formData: FormData): Promise<SubmitFormResponse> => {
//   return new Promise((resolve) => {
//     console.log(formData)
//     setTimeout(() => {
//       resolve({ success: true, message: 'Form submitted successfully' });
//     }, 1500);
//   });
// };
 


// // Create async thunk for form submission
// export const submitContactForm = createAsyncThunk<
//   SubmitFormResponse, // Return type of the payload on success
//   FormData, // First argument to the payload creator (formData)
//   { rejectValue: string } // Type of the rejected value
// >(
//   'contact/submitForm',
//   async (formData: FormData, { rejectWithValue }) => {
//     try {
//       const response = await mockSubmitForm(formData);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.message || 'Failed to submit form');
//     }
//   }
// );

// // Create the contact slice
// const contactSlice = createSlice({
//   name: 'contact',
//   initialState: {
//     status: 'idle',
//     error: null,
//     formData: null,
//   } as ContactState, // Type the initial state
//   reducers: {
//     resetFormStatus: (state: ContactState) => {
//       state.status = 'idle';
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // .addCase(submitContactForm.pending, (state: ContactState) => {
//       //   state.status = 'loading';
//       //   state.error = null;
//       // })
//       // .addCase(submitContactForm.fulfilled, (state: ContactState, action: PayloadAction<SubmitFormResponse>) => {
//       //   state.status = 'succeeded';
//       //   state.formData = action.payload;
//       // })
//       // .addCase(submitContactForm.rejected, (state: ContactState, action: PayloadAction<string>) => {
//       //   state.status = 'failed';
//       //   state.error = action.payload;
//       // });
//   },
// });

// // Export the action and reducer
// export const { resetFormStatus } = contactSlice.actions;
// export default contactSlice.reducer;

// // Export the state type for use in the store or components
// export type { ContactState };