import {combineReducers, configureStore} from "@reduxjs/toolkit";
import logingReducer from "./reducers/logingSlice";
import UserReducer from './reducers/userSlice'
import registerReducer from "./reducers/registerSlice";
import isLoginReducer from './reducers/isLoginSlice'
import resumesReducer from './reducers/resumesSlice'
import userResumeReducer from './reducers/userResumeSlice'
import popupShowReducer from './reducers/popupShowSlice'
import sideBarReducer from './reducers/SideBarSlice'
import vacancyListReducer from './reducers/vacancySlice'
import SearchTemplateReducer from './reducers/searchTemplateSlice'
import resumeSelectedReducer from './reducers/resumeSelectedSlice'
import loaderReducer from './reducers/loaderSlice'
import testPopupReducer from "./reducers/testPopupSlice";
import questionsReducer from "./reducers/questionsSlice";
import vacancySelectedReducer from "./reducers/vacancySelectedSlice";
import searchReducer from './reducers/searchSlice'
import searchSortReducer from "./reducers/searchSortSlice";
import userWorksReducer from    './reducers/userWorksSlice'
import  replyReducer  from "./reducers/repliesSlice";
import createVacancyReducer from "./reducers/createVacancySlice";
import createTestReducer from './reducers/createTestSlice';
import createResumeSlice from "./reducers/createResumeSlice";
import chatsReducer from './reducers/chatsSlice';

const rootReducer = combineReducers({
    logingReducer,
    UserReducer,
    registerReducer,
    isLoginReducer,
    resumesReducer,
    userResumeReducer,
    popupShowReducer,
    sideBarReducer,
    vacancyListReducer,
    SearchTemplateReducer,
    resumeSelectedReducer,
    loaderReducer,
    testPopupReducer,
    questionsReducer,
    vacancySelectedReducer,
    searchReducer,
    searchSortReducer,
    userWorksReducer,
    replyReducer,
    createVacancyReducer,
    createTestReducer,
    createResumeSlice,
    chatsReducer
});


export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
