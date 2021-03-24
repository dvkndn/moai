import { ChangeEventHandler, ForwardedRef } from "react";
import { border } from "../border/border";
import flat from "../button/flat.module.css";
import outset from "../button/outset.module.css";
import { Icon } from "../icon/icon";
import { coreIcons } from "../icons/icons";
import { outline } from "../outline/outline";
import s from "./select.module.css";

export type SelectStyle = {
	select: string;
};

export interface SelectSize {
	select: string;
	icon: string;
}

const getClassNames = <T,>(props: SelectProps<T>) => {
	const style = props.style ?? Select.styles.outset;
	const size = props.size ?? Select.sizes.medium;
	const width = props.fill ? s.fill : "";
	return {
		select: [s.select, style.select, size.select, outline.normal].join(" "),
		container: [s.container, width].join(" "),
		icon: [s.icon, size.icon].join(" "),
	};
};

export interface SelectOption<T> {
	/**
	 * The value of the option. This is a [generic][1] type so you can use
	 * Moai's Select for not only string but anything.
	 *
	 * [1]: https://www.typescriptlang.org/docs/handbook/2/generics.html
	 */
	value: T;
	/**
	 * The id of the option. This should be unique across the option list.
	 */
	id: string;
	/**
	 * The label of the option to be displayed in the option menu.
	 */
	label: string;
	/**
	 * Whether the option is disabled.
	 */
	disabled?: boolean;
}

export interface SelectProps<T> {
	/**
	 * The option list of this select. See "SelectOption" tab for detail.
	 */
	options: SelectOption<T>[];
	/**
	 * Initial value of the select in uncontrolled mode
	 */
	defaultValue?: T;
	/**
	 * [Reference][1] to the `select` element. Usually useful in uncontrolled mode.
	 *
	 * [1]: https://reactjs.org/docs/forwarding-refs.html
	 */
	forwardedRef?: ForwardedRef<HTMLSelectElement>;
	/**
	 * Value of the selected option in controlled mode
	 */
	value?: T;
	/**
	 * Callback to set the value in controlled mode
	 */
	setValue?: (value: T) => void;
	/**
	 * Style of the select. Choose one from `Select.styles`.
	 */
	style?: SelectStyle;
	/**
	 * Size of the select. Choose one from `Select.sizes`.
	 */
	size?: SelectSize;
	/**
	 * By default, the width of a select is based on its longest option to
	 * avoid changing layout when users switching between options.
	 *
	 * Set the `fill` prop to `true` to let the select expands to fill its
	 * container instead. This helps you to control the select's width. (By
	 * setting the width of its container.)
	 */
	fill?: boolean;
	/**
	 * Whether the select is disabled
	 */
	disabled?: boolean;
	required?: boolean;
}

const renderOption = <T,>(option: SelectOption<T>): JSX.Element => (
	<option
		key={option.id}
		value={option.id}
		disabled={option.disabled}
		children={option.label}
	/>
);

const findId = <T,>(props: SelectProps<T>, value?: T): string | undefined => {
	return props.options.find((o) => o.value === value)?.id;
};

const onChange = <T,>(
	props: SelectProps<T>
): ChangeEventHandler<HTMLSelectElement> => (event): void => {
	if (props.setValue === undefined) return;
	const id = event.target.value;
	const option = props.options.find((o) => o.id === id);
	if (!option) throw Error(`Option not found: "${id}"`);
	props.setValue(option.value);
};

export const Select = <T,>(props: SelectProps<T>) => {
	const cls = getClassNames(props);
	const value = findId(props, props.value);
	const defaultValue = findId(props, props.defaultValue);
	return (
		<div className={cls.container}>
			<select
				className={cls.select}
				disabled={props.disabled}
				children={props.options.map(renderOption)}
				// Uncontrolled
				defaultValue={defaultValue}
				ref={props.forwardedRef}
				// Controlled
				value={value}
				required={props.required}
				onChange={onChange(props)}
			/>
			<span className={cls.icon}>
				<Icon display="block" path={coreIcons.caret} />
			</span>
		</div>
	);
};

Select.styles = {
	outset: {
		select: [border.radius, outset.main].join(" "),
	} as SelectStyle,
	flat: {
		select: [flat.main].join(" "),
	} as SelectStyle,
};

Select.sizes = {
	medium: {
		select: s.mediumSelect,
		icon: s.mediumIcon,
	} as SelectSize,
	small: {
		select: s.smallSelect,
		icon: s.smallIcon,
	} as SelectSize,
};

Select.toStringOption = (text: string): SelectOption<string> => ({
	value: text,
	id: text,
	label: text,
});
