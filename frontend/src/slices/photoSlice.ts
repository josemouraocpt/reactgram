import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState	= {
	photos: [],
	photo: {},
	error: false,
	success: false,
	loading: false,
	message: false,
};

//inser photo
export const insertPhoto = createAsyncThunk("photo/insert", 
	async(photo, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;
		const data = await photoService.insertPhoto(photo, token);
		if(data.errors){
			return thunkAPI.rejectWithValue(data.errors[0]);
		};
		return data;
	}
);

//get user photos
export const getUserPhotosById = createAsyncThunk("photos/get", 
	async(id, thunkAPI) => {
		const data = await photoService.getUserPhotos(id);
		if(data.errors){
			return thunkAPI.rejectWithValue(data.errors[0]);
		};
		return data;
	}
);

//delete photo
export const deletePhoto = createAsyncThunk("photos/delete", 
	async(id, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;
		const data = await photoService.deletePhoto(id, token);
		if(data.errors){
			return thunkAPI.rejectWithValue(data.errors[0]);
		};
		return data;
	}	
);

//update photo
export const updatePhoto = createAsyncThunk("photos/update", 
	async(photoData, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;
		const data = await photoService.updatePhoto(photoData.id, {title: photoData.title}, token);
		if(data.errors){
			return thunkAPI.rejectWithValue(data.errors[0]);
		};
		return data;
	}	
);

//get photo by id
export const getPhotoById = createAsyncThunk("photos/getPhoto", 
	async(id, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;
		const data = await photoService.getPhotoById(id, token);
		if(data.errors){
			return thunkAPI.rejectWithValue(data.errors[0]);
		};
		return data;
	}
);

//like
export const like = createAsyncThunk("photos/like",
	async(id, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;
		const data = await photoService.like(id, token);
		if(data.errors){
			return thunkAPI.rejectWithValue(data.errors[0]);
		};
		return data;
	}
);

//comment
export const comment = createAsyncThunk("photos/comment", 
	async(photoData, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;
		const data = await photoService.comment(photoData.id, {comment: photoData.comment}, token);
		if(data.errors){
			return thunkAPI.rejectWithValue(data.errors[0]);
		};
		return data;
	}
);

//get all photos
export const getAllPhotos = createAsyncThunk("photos/all",
	async(_, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;
		const data = await photoService.getAllPhotos(token);
		if(data.errors){
			return thunkAPI.rejectWithValue(data.errors[0]);
		};
		return data;
	}
);

//search
export const search = createAsyncThunk("photos/search", 
	async(query, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;
		const data = await photoService.search(query, token);
		if(data.errors){
			return thunkAPI.rejectWithValue(data.errors[0]);
		};
		return data;
	}
);

export const photoSlice = createSlice({
	name: "photo",
	initialState,
	reducers: {
		resetMessage: (state) => {
			state.message = false;
		}
	},
	extraReducers: (builder) => {
		builder
		.addCase(insertPhoto.pending, (state) => {
			state.loading = true;
			state.error = false;
		})
		.addCase(insertPhoto.fulfilled, (state, action) => {
			state.loading = false;
			state.error = false;
			state.success = true;
			state.photo = action.payload;
			state.photos.unshift(state.photo);
			state.message = "Foto publicada com sucesso!";
		})
		.addCase(insertPhoto.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.photo = {};
		})
		.addCase(getUserPhotosById.pending, (state) => {
			state.loading = true;
			state.error = false;
		})
		.addCase(getUserPhotosById.fulfilled, (state, action) => {
			state.loading = false;
			state.error = false;
			state.success = true;
			state.photos = action.payload;
		})
		.addCase(deletePhoto.pending, (state) => {
			state.loading = true;
			state.error = false;
		})
		.addCase(deletePhoto.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.error = false;
				state.photos = state.photos.filter((photo) => {
						return photo._id !== action.payload.id;
				});	 
				state.message = action.payload.message;
		})
		.addCase(deletePhoto.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.photo = {};
		})
		.addCase(updatePhoto.pending, (state) => {
			state.loading = true;
			state.error = false;	
		})
		.addCase(updatePhoto.fulfilled, (state, action) => {
			state.loading = false;
			state.success = true;
			state.error = false;
			state.photos.map((photo) => {
					if (photo?._id === action.payload.photo._id) {
							return (photo.title = action.payload.photo.title);
					}
					return photo;
			});
			state.message = action.payload.message;
		})
		.addCase(updatePhoto.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.photo = {};
		})
		.addCase(getPhotoById.pending, (state) => {
			state.loading = true;
			state.error = false;
		})
		.addCase(getPhotoById.fulfilled, (state, action) => {
			state.loading = false;
			state.success = true;
			state.error = false;
			state.photo = action.payload;
		})
		.addCase(like.fulfilled, (state, action) => {
			state.loading = false;
			state.success = true;
			state.error = false;
			if(state.photo.likes){
				state.photo.likes.push(action.payload.userId);
			};
			state.photos.map((photo) => {
				if(photo._id === action.payload.photoId){
					return photo.likes.push(action.payload.userId);
				}
			});
			state.message = action.payload.message;
		})
		.addCase(like.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase(comment.fulfilled, (state, action) => {
			state.loading = false;
			state.success = true;
			state.error = false;
			state.photo.comments.push(action.payload.comment);
			state.message = action.payload.message;
		})
		.addCase(comment.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase(getAllPhotos.pending, (state) => {
			state.loading = true;
			state.error = false;
		})
		.addCase(getAllPhotos.fulfilled, (state, action) => {
			state.loading = false;
			state.error = false;
			state.success = true;
			state.photos = action.payload;
		})
		.addCase(getAllPhotos.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase(search.pending, (state) => {
			state.loading = true;
			state.error = false;
		})
		.addCase(search.fulfilled, (state, action) => {
			state.loading = false;
			state.success = true;
			state.error = false;
			state.photos = action.payload;
		})
}
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
