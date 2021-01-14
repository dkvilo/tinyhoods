import { FormEvent, useRef, useState } from "react";
import Like from "../like/Like";
import Unlike from "../like/Unlike";

export default function PostActions({
	isDetailed = false,
	postId,
	liked,
	likesCount,
	commentsCount,
	onPostShallowClick,
}: {
	liked: boolean;
	likesCount: number;
	commentsCount?: number;
	isDetailed?: boolean;
	postId: string | undefined;
	onPostShallowClick?(): (event: FormEvent<any>) => void;
}): JSX.Element {
	const handleShallowClick = (event: FormEvent<any>) => {
		onPostShallowClick && onPostShallowClick();
	};

	const [likeActionStatusState, setLikeActionStatusState] = useState<boolean>(
		liked
	);
	const [localLikeCount, setLocalLikeCount] = useState<number>(likesCount);

	const soundEffect = useRef<any>();

	const playAudio = () => {
		if (soundEffect?.current) {
			soundEffect.current.play();
		}
	};

	const handleLikeActionStateAfterUser = (status: boolean) => {
		setLikeActionStatusState(status);
		playAudio();
		setLocalLikeCount((prev: number) => (status ? prev + 1 : prev - 1));
	};

	const handleUnLikeActionStateAfterUser = (status: boolean) => {
		setLikeActionStatusState(!status);
		playAudio();
		setLocalLikeCount((prev: number) => (status ? prev - 1 : prev + 1));
	};

	return (
		<div className="flex items-center my-2 justify-start rounded-b">
			{/* TODO: Make global audio player for app nad pass data using context */}
			<audio controls={false} className="hidden" ref={soundEffect}>
				<source src="/audio/like_sound_effect.webm" type="audio/webm" />
				<source src="/audio/like_sound_effect.mp4" type="audio/mp4" />
			</audio>
			<div className="flex items-center">
				{!likeActionStatusState ? (
					<Like onAction={handleLikeActionStateAfterUser} postId={postId} />
				) : (
					<Unlike onAction={handleUnLikeActionStateAfterUser} postId={postId} />
				)}
				<span className="mx-1 font-bold text-default-inverted">
					{localLikeCount}
				</span>
			</div>

			<div className="flex items-center ml-1">
				<button className="p-1 rounded-full focus:outline-none">
					<svg
						viewBox="0 0 23 23"
						strokeWidth="2"
						className="stroke-current h-6 w-6 text-default-inverted hover:text-primary"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							fill="none"
							d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
						/>
					</svg>
				</button>
				<span className="mx-1 font-bold text-default-inverted">
					{commentsCount}
				</span>
			</div>

			<div className="flex items-center ml-1">
				<button className="p-1 rounded-full focus:outline-none">
					<svg
						viewBox="0 0 23 24"
						fill="none"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="stroke-current h-6 w-6 text-default-inverted hover:text-primary"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							fill="none"
							d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
						/>
					</svg>
				</button>
			</div>
			{!isDetailed && (
				<div className="flex items-start justify-start text-default-inverted text-sm">
					<button
						onClick={handleShallowClick}
						className="text-left p-2 rounded-full ml-1 focus:outline-none hover:text-primary"
					>
						Add a Comment ...
					</button>
				</div>
			)}
		</div>
	);
}
