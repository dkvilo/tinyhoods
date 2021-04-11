import { useRouter } from "next/router";
import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

import Carousel, { ModalGateway, Modal as GalleryModal } from "react-images";
import { useQuery } from "@apollo/react-hooks";
import { isEmpty } from "ramda";

import Post from "../../components/post";
import Detailed from "../../components/post/Detailed";
import PostLoader from "../../components/PostLoader";

import {
	ShallowQuery,
	Router,
	ShallowRedirect,
} from "../../components/ShallowRouter";

import { GET_POSTS } from "./query";
import { FiltersContext, UserTokenContext } from "../../context";

import EmptyCard from "../../components/EmptyCard";
import FeedFilterMenu from "../../components/FeedFilterMenu";
import { normalizeImagePath } from "../../../shared/utils";

export default function Feed(): JSX.Element {
	const [page, setPage] = useState(1);

	const { state: loginState } = useContext(UserTokenContext);
	const { state: filtersState } = useContext<any>(FiltersContext);

	const { loading, data, error, refetch } = useQuery(GET_POSTS, {
		fetchPolicy: "network-only",
		variables: {
			data: {
				page,
				token: loginState.isLogin ? loginState.token : "",
				dataType: filtersState.feedType,
			},
		},
	});

	const [currentImage, setCurrentImage] = useState(0);
	const [viewerIsOpen, setViewerIsOpen] = useState(false);
	const openLightBox = useCallback(
		({ post, imageIndex }: any) => (event: any) => {
			selectPost(post);
			setCurrentImage(imageIndex);
			setViewerIsOpen(true);
		},
		[]
	);

	function closeLightBox() {
		setCurrentImage(0);
		setViewerIsOpen(false);
		// Reset the selected post state
		setSelectedPost(null);
	}

	const [selectedPost, setSelectedPost] = useState<any>(null);
	function selectPost(post: any) {
		setSelectedPost(post as any);
	}

	const observer = useRef<any>();
	const lastPostElementRef = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && data.getPosts.nextPage) {
					setPage(data.getPosts.nextPage);
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading]
	);

	// cache posts in memory
	const [posts, setPosts] = useState<[]>([]);
	useEffect(() => {
		if (!loading && !error) {
			setPosts(
				(prevPosts) =>
					[...new Set([...prevPosts, ...data.getPosts.docs])] as any
			);
		}
	}, [loading, error, data]);

	useEffect(() => {
		if (loginState.isLogin) {
			setPosts([]);
			setPage(1);
			refetch({
				data: {
					page,
					token: loginState.token,
					dataType: filtersState.feedType,
				},
			});
		}
	}, [filtersState.feedType, loginState.isLogin]);

	const router = useRouter();

	return (
		<>
			<div className="z-30 bg-default flex items-center sticky top-0">
				<FeedFilterMenu />
			</div>
			<ShallowQuery
				selector="tab"
				default={
					<div>
						{(posts as any).map((item: any, index: number) => {
							if ((posts as any).length === index + 1) {
								return (
									<div key={item.id} ref={lastPostElementRef}>
										<Post
											{...item}
											index={index}
											onImageClick={openLightBox}
											onPostShallowClick={() => {
												setSelectedPost(item);
												router.push(`/?tab=post&id=${item.id}`, undefined, {
													shallow: true,
												});
											}}
										/>
									</div>
								);
							}
							return (
								<div key={item.id}>
									<Post
										{...item}
										index={index}
										onImageClick={openLightBox}
										onPostShallowClick={() => {
											setSelectedPost(item);
											router.push(`/?tab=post&id=${item.id}`, undefined, {
												shallow: true,
											});
										}}
									/>
								</div>
							);
						})}

						{!loading &&
							!error &&
							!isEmpty(posts) &&
							data.getPosts.totalDocs === posts.length && (
								<div className="p-4 bg-secondary border border-secondary-soft flex flex-col items-center justify-center">
									<span role="image" className="text-2xl">
										✌
									</span>
									<p className="text-default-inverted font-bold">
										Wow! You reached the end!
									</p>
									<p className="text-default-inverted text-sm text-center">
										You have seen all {posts.length} Posts, Sometimes it's okay
										to take a break.
									</p>
								</div>
							)}

						{!loading && !error && isEmpty(posts) && (
							<EmptyCard message="You don't have a personalized feed yet, to make tiny hoods feed more personal go to the explore page meet new people, and follow them" />
						)}

						{loading &&
							!error &&
							Array(3)
								.fill(0)
								.map((_, index) => <PostLoader key={index} index={index} />)}
					</div>
				}
			>
				<Router component={<div />} on="empty" />
				<Router
					on="post"
					component={
						<>
							{selectedPost && typeof window !== "undefined" ? (
								<Detailed {...selectedPost} onImageClick={openLightBox} />
							) : (
								<ShallowRedirect href={`/post/${router.query.id}`} />
							)}
						</>
					}
				/>
			</ShallowQuery>

			<ModalGateway>
				{selectedPost && viewerIsOpen ? (
					<GalleryModal onClose={closeLightBox}>
						<Carousel
							currentIndex={currentImage}
							views={(selectedPost as any).images.map((x: any) => {
								return {
									...x,
									src: normalizeImagePath(x.src),
								} as any;
							})}
						/>
					</GalleryModal>
				) : null}
			</ModalGateway>
		</>
	);
}

export const config = {
	amp: true,
};
