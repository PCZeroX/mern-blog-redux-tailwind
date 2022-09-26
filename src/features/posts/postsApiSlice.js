import {
	createSelector,
	createEntityAdapter,
} from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

const postsAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.isCompleted === b.isCompleted
		? 0
		: a.isCompleted
			? 1
			: -1
});

const initialState = postsAdapter.getInitialState();

export const postsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: () => "/posts",
			validateStatus: (response, result) => {
				return response.status === 200 && !result.isError;
			},
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
		addNewPost: builder.mutation({
			query: (initialPost) => ({
				url: "/posts",
				method: "POST",
				body: {
					...initialPost,
				},
			}),
			invalidatesTags: [{ type: "Post", id: "LIST" }],
		}),
		updatePost: builder.mutation({
			query: (initialPost) => ({
				url: "/posts",
				method: "PUT",
				body: {
					...initialPost,
				},
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Post", id: arg.id },
			],
		}),
		deletePost: builder.mutation({
			query: ({ id }) => ({
				url: "/posts",
				method: "DELETE",
				body: { id },
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Post", id: arg.id },
			],
		}),
	}),
});

export const {
	useGetPostsQuery,
	useAddNewPostMutation,
	useUpdatePostMutation,
	useDeletePostMutation,
} = postsApiSlice;
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
