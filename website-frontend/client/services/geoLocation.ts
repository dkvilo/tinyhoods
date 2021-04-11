const getLocationService = ({
	watch = false,
	timeout = 5000,
	enableHighAccuracy = false,
	maximumAge = 0,
}) => {
	return new Promise((resolve, reject) => {
		if (!("geolocation" in navigator)) {
			return reject(new Error("Geolocation is not supported!"));
		}

		/*
		 * Resolve on success
		 */
		const geoSuccess = (position: any) => {
			if (process.env.NODE_ENV === "development") {
				console.log(position);
			}
			return resolve(position);
		};

		/*
		 * Reject on error [no permission or ...]
		 */
		const geoError = (error: any) => {
			return reject(new Error(`Error occurred. Error code: ${error.code}`));
		};

		if (watch) {
			navigator.geolocation.watchPosition(geoSuccess, geoError, {
				...(enableHighAccuracy as any),
				timeout,
				maximumAge,
			});
		}

		navigator.geolocation.getCurrentPosition(geoSuccess, geoError, {
			...(enableHighAccuracy as any),
			timeout,
			maximumAge,
		});
	});
};

export default getLocationService;
