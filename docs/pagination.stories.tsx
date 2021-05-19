import { Meta } from "@storybook/react";
import { useCallback, useState } from "react";
import { Pagination } from "../core/src";

export default {
	title: "Components/Pagination",
	component: Pagination,
} as Meta;

export const Primary = (): JSX.Element => {
	const [page, setPage_] = useState(1);
	const setPage = useCallback((page): Promise<void> => {
		return new Promise((resolve) => {
			setPage_(page);
			window.setTimeout(() => resolve(), 1000);
		});
	}, []);

	return (
		<div>
			<Pagination value={page} setValue={setPage} max={10} min={1} />
		</div>
	);
};
