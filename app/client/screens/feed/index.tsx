import React, { useCallback, useState } from "react";
import Carousel, { ModalGateway, Modal as GalleryModal } from "react-images";

import { useQuery } from "@apollo/react-hooks";

import { GET_POSTS } from "./query";
import PostLoader from "../../components/PostLoader";
import Post from "../../components/post";

export default function Feed(): JSX.Element {
	const {
		loading: postsLoading,
		data: postsData,
		error: postsError,
	} = useQuery(GET_POSTS, {
		fetchPolicy: "network-only",
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

	return (
		<>
			<h1 className="text-default-inverted font-bold text-2xl px-1 my-2">
				<span className="mr-1" role="image">
					🔥
				</span>{" "}
				Today November 24
			</h1>
			<div>
				{!postsLoading &&
					!postsError &&
					postsData.getPosts.map((item: any) => {
						return <Post key={item.id} {...item} onImageClick={openLightBox} />;
					})}

				{postsLoading &&
					!postsError &&
					Array(4)
						.fill(2)
						.map((_, index) => <PostLoader key={index} index={index} />)}

				<ModalGateway>
					{selectedPost && viewerIsOpen ? (
						<GalleryModal onClose={closeLightBox}>
							<Carousel
								currentIndex={currentImage}
								views={(selectedPost as any).images.map((x: any) => {
									return {
										...x,
										// src: `/imcargo/static/avatar/${x.src}`,
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
