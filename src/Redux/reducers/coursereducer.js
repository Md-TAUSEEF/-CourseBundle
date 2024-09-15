import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    courses: [],
    lectures: [],
    loading: false,
    error: null,
    message: null
};

const courseReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('allCoursesRequest', (state) => {
            state.loading = true;
        })
        .addCase('allCoursesSuccess', (state, action) => {
            state.loading = false;
            state.courses = action.payload; 
            console.log("Updated courses state:", state.courses); 
        })
        .addCase('allCoursesFail', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('getCourseRequest', (state) => {
            state.loading = true;
        })
        .addCase('getCourseSuccess', (state, action) => {
            state.loading = false;
            state.lectures = action.payload; 
            console.log("Updated lectures state:", state.lectures); 
        })
        .addCase('getCourseFail', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('clearError', (state) => {
            state.error = null;
        })
        .addCase('clearMessage', (state) => {
            state.message = null;
        });
});

export default courseReducer;
