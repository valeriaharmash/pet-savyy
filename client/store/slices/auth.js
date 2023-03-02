import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserToken, setUserToken } from "../../utils";

// Add user auth token to every axios request.
axios.interceptors.request.use((config) => {
	config.headers.authorization = getUserToken();
	return config;
});

const initialState = { user: null, error: null };

const getUserByToken = createAsyncThunk("getUserByToken", async () => {
	const authToken = getUserToken();
	if (authToken) {
		const { data: user } = await axios.get("/api/auth/me");
		return user;
	}
	return null;
});

const authenticate = createAsyncThunk(
	"authenticate",
	async ({ email, password, method, firstName, lastName }) => {
		try {
			const {
				data: { token },
			} = await axios.post(`/api/auth/${method}`, {
				email,
				password,
				firstName,
				lastName,
			});

			setUserToken(token);
			return {};
		} catch (error) {
			return { error };
		}
	}
);

const auth = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, { payload: user }) => {
			return { ...state, user };
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getUserByToken.fulfilled, (state, { payload: user }) => {
			return { ...state, user };
		});
		builder.addCase(authenticate.fulfilled, (state, { payload }) => {
			if (payload.error) {
				return { ...state, error };
			}
			return state;
		});
	},
});

const { setUser } = auth.actions;

export { setUser, getUserByToken, authenticate };

export default auth.reducer;
