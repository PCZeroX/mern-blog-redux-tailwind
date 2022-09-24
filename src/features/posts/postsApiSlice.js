import {
	createSelector,
	createEntityAdapter,
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const postsAdapter = createEntityAdapter({
	sortComparer: (a, b) => {
		return a.completed === b.completed
			? 0
			: a.completed
			? 1
			: -1;
	},
});

const initialState = postsAdapter.getInitialState();

export const postsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: () => "/posts",
			validateStatus: (response, result) => {
				return response.status === 200 && !result.isError;
			},
			keepUnusedDataFor: 5,
			transformResponse: (responseData) => {
				const loadedPosts = responseData.map((post) => {
					post.id = post._id;
					return post;
				});
				return postsAdapter.setAll(
					initialState,
					loadedPosts
				);
			},
			providesTags: (result, error, arg) => {
				if (result?.ids) {
					return [
						{ type: "Post", id: "LIST" },
						...result.ids.map((id) => ({
							type: "Post",
							id,
						})),
					];
				} else return [{ type: "Post", id: "LIST" }];
			},
		}),
	}),
});

export const { useGetPostsQuery } = postsApiSlice;

export const selectPostsResult =
	postsApiSlice.endpoints.getPosts.select();

const selectPostsData = createSelector(
	selectPostsResult,
	(postsResult) => postsResult.data
);

export const {
	selectAll: selectAllPosts,
	selectById: selectPostById,
	selectIds: selectPostIds,
} = postsAdapter.getSelectors(
	(state) => selectPostsData(state) ?? initialState
);
