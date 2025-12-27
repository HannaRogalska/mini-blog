import { createSlice } from "@reduxjs/toolkit";



interface AuthState {
  token: string | null;
  isAuth: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
    initialState,
    reducers: {
        setAuth(state, action) {
            state.token = action.payload
            state.isAuth = true
        },
        logout(state) {
            state.token = null
            state.isAuth = false;
        }
    }
});
export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;