import React, { forwardRef } from "react";
import { IconType } from "react-icons";
import { border } from "../border/border";
import { DivPx } from "../div/div";
import { Icon } from "../icon/icon";
import { outline } from "../outline/outline";
import { ProgressCircle, ProgressCircleColor } from "../progress/circle";
import s from "./button.module.css";
import flat from "./flat.module.css";
import outset from "./outset.module.css";

interface ButtonColor {
	className: {
		outset: string;
		flat: string;
	};
	busy: {
		outset: ProgressCircleColor;
		flat: ProgressCircleColor;
	};
}

interface ButtonBusyStyle {
	className: string;
	color: ProgressCircleColor;
}

export interface ButtonStyle {
	main: string;
	selected: string;
	busy: ButtonBusyStyle;
}

export interface ButtonSize {
	main: string;
	iconSize: number;
	iconMargin: number;
}

export interface ButtonProps {
	// Props for the "button" tag

	/**
	 * The [HTML `type`][1] attribute. This set the behaviour of the button.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type
	 */
	type?: "submit" | "button" | "reset";
	/**
	 * The [HTML `disabled`][1] attribute. If set to `true`, this prevents
	 * users from interacting with the button.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-disabled
	 */
	disabled?: boolean;
	/**
	 * The [HTML `autoFocus`][1] attribute. If set to `true`, the button is
	 * focused when it is first rendered.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-autofocus
	 */
	autoFocus?: boolean;
	/**
	 * The [HTML `tabIndex`][1] attribute. It's not recommended to set this
	 * value manually:
	 *
	 * > Avoid using tabindex values greater than 0. Doing so makes it difficult
	 * > for people who rely on assistive technology to navigate and operate page
	 * > content. Instead, write the document with the elements in a logical sequence.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
	 */
	dangerouslySetTabIndex?: number;

	// Props for the "a" tag

	/**
	 * The [HTML `href`][1] attribute. This set the URL that the (link) button
	 * links to. The Button will then be rendered as an HTML `a` element.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href
	 */
	href?: string;
	/**
	 * The [HTML `target`][1] attribute. Require the `href` attribute.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target
	 */
	target?: string;
	/**
	 * The [HTML `download`][1] attribute. Require the `href` attribute.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download
	 */
	download?: string;

	// Visual props for both "button" and "a"

	/**
	 * If set to `true`, the button looks like it is pressed, e.g. with
	 * a darker background.
	 */
	selected?: boolean;
	/**
	 * If set to `true`, the button is highlighted, e.g. with
	 * a highlight background.
	 */
	/** @deprecated */
	highlight?: boolean;
	color?: ButtonColor;
	/**
	 * If set to `true`, the button's width is 100% of its container.
	 */
	fill?: boolean;
	/**
	 * The style of the button, e.g. border and background color. Choose one
	 * from `Button.styles`.
	 */
	style?: ButtonStyle;
	/**
	 * The size of the button. This controls the padding and font size. Choose
	 * one from Button.size. The ones with "Icon" suffix makes icon-only
	 * buttons squares.
	 */
	size?: ButtonSize;
	/**
	 * If set to `true`, the button will have a min-width so they are not too
	 * short. Too short buttons look ugly when placed next to long ones, e.g.
	 * the "Cancel" and "Ok" pair in a dialog.
	 */
	minWidth?: boolean;
	/**
	 * The content to render inside the button.
	 */
	children?: React.ReactNode;
	/**
	 * The icon in the button. See the [Icons guide][1] to learn more.
	 *
	 * [1]: /docs/guides-icons--primary
	 */
	icon?: IconType;
	/**
	 * If set to `true`, place the icon on the right side of the button.
	 */
	iconRight?: boolean;
	/**
	 * The accessible label of the icon. This is required when there is no
	 * "children" (i.e. icon-only buttons) to help screen readers announce the
	 * button correctly.
	 */
	iconLabel?: string;
	/**
	 * Render a loading icon on top of the button.
	 */
	busy?: boolean;

	// Event handlers
	/**
	 * The [HTML `onclick`][1] event handler.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick
	 */
	onClick?: React.MouseEventHandler;
	/**
	 * The [HTML `onfocus`][1] event handler.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onfocus
	 */
	onFocus?: React.FocusEventHandler;
	/**
	 * The [HTML `onblur`][1] event handler.
	 *
	 * [1]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onblur
	 */
	onBlur?: React.FocusEventHandler;
}

// Button can renders both "button" and "a"
type ButtonElement = HTMLButtonElement | HTMLAnchorElement;

// This is actually ReturnType<typeof forwardRef>, but we don't know how to
// provide the type parameter to forwardRef. This is required to re-type the
// Button component so that we can attach "Button.sizes" and "Button.styles"
type ButtonPropsWithRef = ButtonProps & React.RefAttributes<ButtonElement>;

// Re-type the Button component since React's forwardRef returned type cannot
// be extended with property like "Button.sizes"
interface ButtonComponent
	extends React.ForwardRefExoticComponent<ButtonPropsWithRef> {
	sizes: {
		large: ButtonSize;
		largeIcon: ButtonSize;
		medium: ButtonSize;
		mediumIcon: ButtonSize;
		small: ButtonSize;
		smallIcon: ButtonSize;
	};
	styles: {
		outset: ButtonStyle;
		flat: ButtonStyle;
	};
	color: {
		highlight: ButtonColor;
		danger: ButtonColor;
	};
}

const getColor = (props: ButtonProps) => {
	if (props.highlight !== undefined && props.color !== undefined)
		throw Error(
			"highlight and color cannot be defined at the same time. Use color only"
		);
	let color = props.color;
	if (props.highlight) color = Button.color.highlight;
	return props.style ? color?.className.flat : color?.className.outset;
};

const getClass = (props: ButtonProps) => {
	const size = props.size ?? Button.sizes.medium;
	const style = props.style ?? Button.styles.outset;
	const color = getColor(props);
	const classes = [s.button, size.main, style.main, outline.normal, color];
	if (props.fill) classes.push(s.fill);
	if (props.minWidth) classes.push(s.minWidth);
	if (props.selected) classes.push(style.selected);
	if (props.busy) classes.push(style.busy.className);
	if (props.icon && props.iconRight) classes.push(s.iconRight);
	return classes.join(" ");
};

const getProgressColor = (props: ButtonProps): ProgressCircleColor => {
	const style = props.style ?? Button.styles.outset;
	return props.color
		? props.style
			? props.color.busy.flat
			: props.color.busy.outset
		: style.busy.color;
};

export const ButtonChildren = (props: ButtonProps): JSX.Element => {
	const size = props.size ?? Button.sizes.medium;
	return (
		<>
			{props.busy && (
				<span className={s.busy}>
					<ProgressCircle
						size={size.iconSize}
						value="indeterminate"
						color={getProgressColor(props)}
					/>
				</span>
			)}
			{props.icon && (
				<span className={s.icon}>
					<Icon
						size={size.iconSize}
						component={props.icon}
						display="block"
					/>
				</span>
			)}
			{props.icon && props.children && <DivPx size={size.iconMargin} />}
			{props.children && <span className={s.text}>{props.children}</span>}
		</>
	);
};

const isIconSize = (s?: ButtonSize): boolean =>
	s === Button.sizes.largeIcon ||
	s === Button.sizes.mediumIcon ||
	s === Button.sizes.smallIcon;

const buttonTests: [(props: ButtonProps) => boolean, string][] = [
	[
		(p) => p.minWidth === true && isIconSize(p.size),
		'Buttons that are icon-sized cannot have "minWidth" set',
	],
	[
		(p) => p.icon === undefined && p.children === undefined,
		'Button must have either "icon" or "children" defined so users can see it',
	],
	[
		(p) => p.iconLabel === undefined && p.children === undefined,
		'Button must have either "children" or "iconLabel" defined so screen reader can read it',
	],
];

const validateButton = (props: ButtonProps): void => {
	for (let i = 0; i < buttonTests.length; i++) {
		const failed = buttonTests[i][0](props);
		if (failed) throw Error(buttonTests[i][1]);
	}
};

// This is the main implementation of Button, but not the exported interface
// since it's missing the ref. See Button for the exported component.
const buttonRender = (
	props: ButtonProps,
	ref: React.ForwardedRef<ButtonElement>
): JSX.Element => {
	validateButton(props);
	const common = {
		// We need "any" because we can't type check the parameter type of
		// ref to yield error if an anchor ref is passed to a button :(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		ref: ref as any,
		className: getClass(props),
		children: <ButtonChildren {...props} />,
		"aria-label": props.iconLabel,
	};
	return props.href ? (
		<a
			{...common}
			href={props.href}
			target={props.target}
			download={props.download}
			rel="noopener noreferrer"
		/>
	) : (
		<button
			{...common}
			onClick={props.onClick}
			onFocus={props.onFocus}
			onBlur={props.onBlur}
			disabled={props.disabled || props.busy}
			autoFocus={props.autoFocus}
			type={props.type ?? "button"}
			tabIndex={props.dangerouslySetTabIndex}
		/>
	);
};

/**
 * A button triggers an action or event, such as submitting a form, opening
 * a dialog or canceling an operation. Moai's buttons can also be used as
 * [links][1] (e.g. to navigate pages).
 *
 * [1]: #link
 */
export const Button = forwardRef(buttonRender) as ButtonComponent;

Button.styles = {
	outset: {
		main: [border.radius, outset.main].join(" "),
		selected: outset.selected,
		busy: {
			className: outset.busy,
			color: ProgressCircle.colors.neutral,
		},
	},
	flat: {
		main: [flat.main].join(" "),
		selected: flat.selected,
		busy: {
			className: flat.busy,
			color: ProgressCircle.colors.neutral,
		},
	},
};

Button.color = {
	highlight: {
		className: {
			outset: outset.highlight,
			flat: flat.highlight,
		},
		busy: {
			outset: ProgressCircle.colors.inverse,
			flat: ProgressCircle.colors.highlight,
		},
	},
	danger: {
		className: {
			outset: outset.danger,
			flat: flat.danger,
		},
		busy: {
			outset: ProgressCircle.colors.inverse,
			flat: ProgressCircle.colors.highlight,
		},
	},
};

Button.sizes = (() => {
	const largeIcon = { iconSize: 20, iconMargin: 12 };
	const mediumIcon = { iconSize: 16, iconMargin: 8 };
	const smallIcon = { iconSize: 12, iconMargin: 4 };
	return {
		large: { main: s.large, ...largeIcon },
		largeIcon: { main: s.largeIcon, ...largeIcon },
		medium: { main: s.medium, ...mediumIcon },
		mediumIcon: { main: s.mediumIcon, ...mediumIcon },
		small: { main: s.small, ...smallIcon },
		smallIcon: { main: s.smallIcon, ...smallIcon },
	};
})();
