export const getImageOrAvatarPath = (
	image: string | null,
	avatar: string
): string => {
	if (image)
		return `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/${image}`;
	return avatar;
};

export const normalizeImagePath = (src: string): string => {
	if (process.env.NODE_ENV === "development") {
		return src;
		// return `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/${src}`;
	}
	return src;
};
