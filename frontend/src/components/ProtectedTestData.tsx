import { useEffect, useState } from "react";
import { TestData } from "../types/test";
import { Box, Typography } from "@mui/material";
import { supabase } from "../config/supabase";
import { DynamicTable } from "./DynamicTable";
import { CreateEntryForm } from "./CreateEntryForm";

const ProtectedTestData = () => {
	const [data, setData] = useState<TestData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchProtectedData = async () => {
		try {
			const { data: protectedData, error } = await supabase.from("protected_data").select("*");
			if (error) {
				throw error;
			}
			setData(protectedData);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An unknown error occurred");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProtectedData();
	}, []);

	if (loading) return <Box>Loading...</Box>;
	if (error) return <Box>Error: {error}</Box>;

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h2" gutterBottom>
				Protected test data only for authenticated users
			</Typography>
			<CreateEntryForm onSuccess={fetchProtectedData} />
			{data.length > 0 ? (
				<DynamicTable data={data} />
			) : (
				<div>No protected data available, please provide them.</div>
			)}
		</Box>
	);
};

export default ProtectedTestData;
