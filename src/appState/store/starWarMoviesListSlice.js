// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';

// const baseUrl = 'https://swapi.dev/api';

// // interface FilmResultDTO {
// //     imgPath: string;
// //     title: String;
// //     episode_id: number;
// //     opening_crawl: string;
// //     director: string;
// //     producer: string;
// //     release_date: string;
// //     characters: any[];
// //     planets: string[];
// //     starships: string[];
// //     vehicles: string[];
// //     species: string[];
// //     created: string;
// //     edited: string;
// //     url: string;
// //     id?: number;
// //     backdrop_path: string;
// //   }

//   const initialState = {
//       filmResultDTOList: [{

//       }],
//       isLoading: false,
//       error: ''

//   };

//   export const fetchMovies = createAsyncThunk(
//     'movies/fetchMovies',
//     async (_, { getState, rejectWithValue }) => {
//       const state = getState();
//       const { movies } = state.filmResultDTOList;
  
//       if (movies.length > 0) {
//         // Data already exists, don't fetch again
//         return rejectWithValue('Data already loaded');
//       }
  
//       try {
//         const response = await axios.get('${baseUrl}/data');
//         return response.data;
//       } catch (error) {
//         return rejectWithValue(error.response.data);
//       }
//     }
//   );

//   const starWarMoviesListSlice = createSlice({
//     name: 'starWarMoviesList',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(fetchMovies.pending, (state) => {
//             state.isLoading = true;
//             state.error = '';
//           })
//           .addCase(fetchMovies.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.filmResultDTOList = action.payload;
//           })
//           .addCase(fetchMovies.rejected, (state, action) => {
//             state.isLoading = false;
//             if (action.payload !== 'Data already loaded') {
//               state.error = '';
//             }
//           });
//     },
//   });

//   export default starWarMoviesListSlice.reducer;