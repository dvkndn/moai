import * as M from "../../core/src";
import s from "./styles.module.css";
import { BOOKS } from "./example/normalizedBooks";
import { GoSearch } from "react-icons/go";
import { Shot } from "./shot/shot";

const bookOptions: M.SelectOption<string>[] = [];

function getBookList(array: M.SelectOption<string>[]) {
	BOOKS.forEach((book) => {
		if (book.title.length < 15) {
			const option = M.Select.toStringOption(book.title);
			option.disabled = option.label === "";
			array.push(option);
		}
	});
}

getBookList(bookOptions);

bookOptions.unshift({
	...M.Select.toStringOption("Select"),
	disabled: true,
});

const modelOptions: M.SelectOption<string>[] = (() => {
	const arr = ["Title", "Author", "Publisher", "All"];
	return arr.map(M.Select.toStringOption);
})();

type ColumnProps = Pick<M.SelectProps<unknown>, "style">;

const base: M.SelectProps<string> = {
	options: bookOptions,
	defaultValue: "Select",
};

const Column = ({ style }: ColumnProps): JSX.Element => (
	<div className={[s.col, s.rows].join(" ")}>
		<M.Select {...base} style={style} />
		<M.Select {...base} style={style} disabled />
	</div>
);

const Full = (): JSX.Element => (
	<M.Select
		options={[
			{
				id: "full",
				label: "Full-width Select",
				value: "full",
				disabled: true,
			},
			...bookOptions,
		]}
		defaultValue="full"
		fill
	/>
);

const Group = (): JSX.Element => {
	const select = <M.Select options={modelOptions} defaultValue="Posts" />;
	const input = <M.Input defaultValue="" placeholder="Type to search" />;
	const button = <M.Button iconLabel="Search" icon={GoSearch} />;
	const children: M.ButtonGroupItemProps[] = [
		{ fill: false, element: select },
		{ fill: true, element: input },
		{ fill: false, element: button },
	];
	return <M.ButtonGroup fill children={children} />;
};

export const GallerySelect = (): JSX.Element => (
	<Shot>
		<div className={s.rows}>
			<div className={s.cols}>
				<Column style={M.Select.styles.outset} />
				<Column style={M.Select.styles.flat} />
			</div>
			<Group />
			<Full />
		</div>
	</Shot>
);
