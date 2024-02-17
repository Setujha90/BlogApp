import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isUser : false,
    id : null,
    avatarImage : "",
}

export const userSlice = createSlice({
    name: "isUser",
    initialState,
    reducers: {
        isLoggedIn: (state, action) => {
            state.isUser = true
            state.id = action.payload.id
            state.avatarImage = action.payload.avatarImage
        },
        loggedOut : (state, action) => {
            state.isUser = false
            state.id = null
            state.avatarImage = ""
        }
    }
})

export const {isLoggedIn, loggedOut} = userSlice.actions

export default userSlice.reducer