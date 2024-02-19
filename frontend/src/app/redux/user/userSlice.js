import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    currentUser: null,
    loading: false,
    error: null,
}

// if (typeof window !== 'undefined') {
//     initialState.currentUser = JSON.parse(localStorage.getItem("user"));
// }

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // process start (sign up and sign in and logout)
        authStart : (state) => {
            state.loading = true
            state.error = null
        },

        // sucess
        signUpSuccess : (state) => {
            state.loading = false
            state.error = null
        },

        signInSuccess : (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
            localStorage.setItem("user", JSON.stringify(state.currentUser))
        },

        logoutSuccess : (state) => {
            state.loading = false
            state.currentUser = null
            state.error = null
            // if(typeof localStorage !== 'undefined'){
                localStorage.removeItem("user")
            // }
        },

        // failure
        authFailure : (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})

export const {authStart, signUpSuccess, signInSuccess, logoutSuccess, authFailure} = userSlice.actions

export default userSlice.reducer