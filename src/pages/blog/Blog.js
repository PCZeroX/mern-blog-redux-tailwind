import { Link } from "react-router-dom";
import { RingLoader as Loader } from "react-spinners";
import { useGetPostsQuery } from "../../features/posts/postsApiSlice";
import useTitle from "../../hooks/useTitle";

const Blog = () => {
	const { posts } = useGetPostsQuery("postsList", {
		selectFromResult: ({ data }) => ({
			posts: data?.ids.map((id) => data?.entities[id]),
		}),
	});

	useTitle(`Blog`);

	let content;

	const filteredPosts =
		posts?.length &&
		posts.filter((item) => item.isCompleted === true);

	if (filteredPosts?.length) {
		content = (
			<section className="grid gap-4 grid-cols-auto-fill">
				{filteredPosts.map((post) => {
					return (
						<Link
							key={post.id}
							to={`/blog/post/${post.id}`}
						>
							<article className="space-y-2">
								<div
									className="relative overflow-hidden group
									duration-500 transition-transform

									after:absolute after:bottom-0 after:left-0

									after:bg-gradient-to-b
								after:bg-black/20

									after:duration-[inherit] after:transition-[inherit]

									after:w-full after:h-0 after:pb-[100%] after:rounded-full after:-translate-x-1/2
									after:translate-y-1/2
									after:scale-[0]

									hover:after:translate-x-0
									hover:after:translate-y-0
									hover:after:scale-[2.5]

									before:absolute before:bottom-0 before:left-0

									before:bg-gradient-to-b
								before:bg-black/20

									before:duration-[inherit] before:transition-[inherit]

									before:w-full before:h-0 before:pb-[100%] before:rounded-full before:translate-x-1/2
									before:translate-y-1/2
									before:scale-[0]

									hover:before:translate-x-0
									hover:before:translate-y-0
									hover:before:scale-[2.5]
								"
								>
									<img
										src={post.image}
										alt={post.title}
										className="duration-[inherit] transition-[inherit]"
									/>
								</div>
								<h1 className="font-semibold">
									{post.title}
								</h1>
							</article>
						</Link>
					);
				})}
			</section>
		);
	} else {
		content = (
			<div className="flex justify-center items-center">
				<Loader color="#33F0F9" />
			</div>
		);
	}

	return content;
};

export default Blog;
