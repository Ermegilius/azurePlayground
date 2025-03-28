import { describe } from "vitest";
import { DynamicTable } from "../DynamicTable";
import { render, screen } from "@testing-library/react";

describe("DynamicTable tests", () => {
	it("should render the table with no data", () => {
		const data: [] = [];
		render(<DynamicTable data={data} />);
		expect(screen.queryByRole("table")).not.toBeInTheDocument();
		expect(screen.queryByText("John")).not.toBeInTheDocument();
	});
	it("should render the table with data", () => {
		const data = [
			{
				id: 1,
				name: "John",
				email: "sdfg@asdf.com",
				phone: "1234567890",
			},
			{
				id: 2,
				name: "Jane",
				email: "asdfa@asfgs.com",
				phone: "0987654321",
			},
		];
		render(<DynamicTable data={data} />);
		expect(screen.queryByRole("table")).toBeInTheDocument();
		expect(screen.queryByText("John")).toBeInTheDocument();
	});
});
