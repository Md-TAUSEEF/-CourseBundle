import { configureStore } from "@reduxjs/toolkit";
import {userReducer,updateProfileReducer,subscriptionReducer } from "./reducers/reducer";
import  courseReducer from '../Redux/reducers/coursereducer';
import admincreatecourse from '../Redux/reducers/admin_reducer'
const store = configureStore({
    reducer: {
        user: userReducer,
        profile: updateProfileReducer,
        course: courseReducer,
        subscription:  subscriptionReducer,
        admin: admincreatecourse,
    },
});

const server = 'https://coursebandlear-1.onrender.com';
export { store, server };
