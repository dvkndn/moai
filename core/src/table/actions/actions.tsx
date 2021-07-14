// Eslint incorrectly recognize "renderActions"
/* eslint-disable react/prop-types */

import { TableExpandableControl } from "./expandable/control";
import { TableSelectableControl } from "./selectable/control";
import { TableColumn, TableProps, TableState } from "../table";
import s from "./actions.module.css";

const renderActions = <R,>(props: TableProps<R>, state: TableState) => (
	_row: R,
	_index: number,
	rowKey: string
): JSX.Element => (
	<div className={s.container}>
		{props.selectable !== undefined && (
			<TableSelectableControl
				rowKey={rowKey}
				selectable={props.selectable}
			/>
		)}
		{props.expandable !== undefined && (
			<TableExpandableControl
				rowKey={rowKey}
				expandable={state.expandable}
			/>
		)}
	</div>
);

export const getTableActionsColumn = <R,>(
	props: TableProps<R>,
	state: TableState
): TableColumn<R> => ({
	className: s.fitContent,
	title: "",
	render: renderActions(props, state),
});

export const isTableActionsExist = <R,>(props: TableProps<R>): boolean => {
	return [props.expandable, props.selectable].some((i) => i !== undefined);
};

/**
 * @TODO: Calculate this dynamically
 */
export const getTableActionsColumnWidth = <R,>({
	expandable,
	selectable,
}: TableProps<R>): number => {
	if (!expandable && !selectable) return 0;
	const base = 16 + 8; // initial padding
	const expanded = expandable ? 24 : 0; // width of toggle button
	const selected = selectable ? 20 : 0; // width of checkbox
	const padding = expandable && selectable ? 16 : 0; // in-between padding
	return base + expanded + selected + padding;
};
