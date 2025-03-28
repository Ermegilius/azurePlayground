import { useState, useEffect } from "react";
import { Box, Skeleton } from "@mui/material";

interface ImageOptimizerProps {
	src: string;
	alt: string;
	width?: string | number;
	height?: string | number;
	objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

// Cache for already loaded images
const imageCache: Record<string, boolean> = {};

export const ImageOptimizer = ({
	src,
	alt,
	width = "100%",
	height = "140px",
	objectFit = "contain",
}: ImageOptimizerProps) => {
	const [loaded, setLoaded] = useState(imageCache[src] || false);
	const [error, setError] = useState(false);

	useEffect(() => {
		// Reset states when src changes
		setLoaded(imageCache[src] || false);
		setError(false);

		// If image is not in cache, load it
		if (!imageCache[src]) {
			const img = new Image();
			img.src = src;
			img.onload = () => {
				imageCache[src] = true;
				setLoaded(true);
			};
			img.onerror = () => {
				setError(true);
			};
		}
	}, [src]);

	if (error) {
		return (
			<Box
				sx={{
					width,
					height,
					bgcolor: "gray.200",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				Image Error
			</Box>
		);
	}

	if (!loaded) {
		return <Skeleton variant="rectangular" width={width} height={height} animation="wave" />;
	}

	return (
		<Box
			component="img"
			src={src}
			alt={alt}
			sx={{
				width,
				height,
				objectFit,
				display: "block",
				padding: "15px",
				//backgroundColor: "#d3d3d370",
			}}
			loading="lazy"
		/>
	);
};
