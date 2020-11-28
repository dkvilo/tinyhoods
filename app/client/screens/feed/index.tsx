import React, { useCallback, useEffect, useRef, useState } from "react";
import Carousel, { ModalGateway, Modal as GalleryModal } from "react-images";
import { useQuery } from "@apollo/react-hooks";
import { isEmpty } from "ramda";

import PostLoader from "../../components/PostLoader";
import Post from "../../components/post";

import { GET_POSTS } from "./query";
import moment from "moment";

export default function Feed(): JSX.Element {
	const [page, setPage] = useState(1);

	const { loading, data, error } = useQuery(GET_POSTS, {
		fetchPolicy: "network-only",
		variables: {
			data: {
				page,
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

	return (
		<>
			<h1 className="text-default-inverted font-bold text-2xl px-1 my-2">
				{/* <span className="mr-1" role="image">
					🔥
				</span>{" "} */}
				Today, {moment().format("LL")}
			</h1>
			<div>
				{!loading &&
					!error &&
					!isEmpty(posts) &&
					(posts as any).map((item: any, index: number) => {
						if ((posts as any).length === index + 1) {
							return (
								<div key={item.id} ref={lastPostElementRef}>
									<Post {...item} onImageClick={openLightBox} />
								</div>
							);
						}
						return (
							<div key={item.id}>
								<Post {...item} onImageClick={openLightBox} />
							</div>
						);
					})}
				{!loading &&
					!error &&
					!isEmpty(posts) &&
					data.getPosts.totalDocs === posts.length && (
						<div className="p-4 mt-4 bg-secondary rounded-md flex flex-col items-center justify-center">
							<span role="image" className="text-2xl">
								✌
							</span>
							<p className="text-default-inverted font-bold">
								Wow! You reached the end!
							</p>
							<p className="text-default-inverted text-sm text-center">
								You have seen all {posts.length} Posts, Sometimes it's okay to
								take a break.
							</p>
						</div>
					)}

				{loading &&
					!error &&
					Array(3)
						.fill(0)
						.map((_, index) => <PostLoader key={index} index={index} />)}

				<ModalGateway>
					{selectedPost && viewerIsOpen ? (
						<GalleryModal onClose={closeLightBox}>
							<Carousel
								currentIndex={currentImage}
								views={(selectedPost as any).images.map((x: any) => {
									return {
										...x,
										src:
											process.env.NODE_ENV === "development"
												? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}${x.src}`
												: x.src,
									} as any;
								})}
							/>
						</GalleryModal>
					) : null}
				</ModalGateway>
			</div>
		</>
	);
}
