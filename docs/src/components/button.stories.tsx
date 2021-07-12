import { Meta } from "@storybook/react";
import { GoPlus } from "react-icons/go";
import { Button, Dialog } from "../../../core/src";
import { GalleryButton1 } from "../../../gallery/src";
import { GalleryButton2 } from "../../../gallery/src";
import { Utils } from "../utils/utils";

const meta: Meta = {
	title: "Components/Button",
	component: Button,
	argTypes: {
		busy: Utils.arg("boolean", "Visual"),
		disabled: Utils.arg("boolean", "Visual"),
		fill: Utils.arg("boolean", "Visual"),
		highlight: Utils.arg("boolean", "Visual"),
		minWidth: Utils.arg("boolean", "Visual"),
		selected: Utils.arg("boolean", "Visual"),
		size: Utils.arg(Button.sizes, "Visual"),
		style: Utils.arg(Button.styles, "Visual"),
		color: Utils.arg(Button.color, "Visual"),

		children: Utils.arg(null, "Content"),
		icon: Utils.arg(null, "Content"),
		iconLabel: Utils.arg(null, "Content"),
		iconRight: Utils.arg(null, "Content"),

		type: Utils.arg(null, "Button"),
		forwardedRef: Utils.arg(null, "Button"),
		onClick: Utils.arg(null, "Button"),
		onFocus: Utils.arg(null, "Button"),
		onBlur: Utils.arg(null, "Button"),
		autoFocus: Utils.arg(null, "Button"),
		dangerouslySetTabIndex: Utils.arg(null, "Button"),

		target: Utils.arg(null, "Link"),
		href: Utils.arg(null, "Link"),
		download: Utils.arg(null, "Link"),
	},
};

Utils.page.component(meta, {
	primary: "sticky",
	shots: [<GalleryButton1 key="1" />, <GalleryButton2 key="2" />],
});

export default meta;

interface Props {
	style?: string;
	size?: string;
	color?: string;
	fill?: boolean;
	highlight?: boolean;
	selected?: boolean;
	busy?: boolean;
	iconRight?: boolean;
	disabled?: boolean;
}

export const Primary = (props: Props): JSX.Element => (
	<Button
		onClick={() => Dialog.alert("Hello")}
		children="Say Hi"
		// eslint-disable-next-line
		style={(Button.styles as any)[props.style!]}
		// eslint-disable-next-line
		size={(Button.sizes as any)[props.size!]}
		// eslint-disable-next-line
		color={(Button.color as any)[props.color!]}
		fill={props.fill}
		highlight={props.highlight}
		selected={props.selected}
		busy={props.busy}
		iconRight={props.iconRight}
		disabled={props.disabled}
	/>
);

export const Basic = (): JSX.Element => (
	<Button onClick={() => alert("Hi")}>Say Hi</Button>
);
Utils.story(Basic, {
	desc: `
Moai buttons closely follow the interface and behaviour of the [HTML
\`button\`][1] element. To get started, you only need to provide a label via
\`children\` and a handler via \`onClick\`:

[1]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
`,
});

export const Icon = (): JSX.Element => (
	// Icons are imported from external libraries, like:
	// import { GoPlus } from "react-icons/go";

	<div style={{ display: "flex", gap: 8 }}>
		{/* Basic usage with icon */}
		<Button icon={GoPlus} children="Add" />

		{/* Icon on the right side */}
		<Button icon={GoPlus} children="Add" iconRight />

		{/* Require "iconLabel" because there is no "children" */}
		<Button icon={GoPlus} iconLabel="Add" />

		{/* Square icon button */}
		<Button icon={GoPlus} iconLabel="Add" size={Button.sizes.mediumIcon} />
	</div>
);

Utils.story(Icon, {
	desc: `
Icons can be used in buttons via the \`icon\` prop. This follows our [Icon
standard][1], which supports any SVG icons. The icon is on the left side by
default, with the \`iconRight\` prop to move it to the right.

It's [intentional][3] that [screen readers][2] would skip the icon and only
announce the label of a button (i.e. the text inside the \`children\` prop).
If your button doesn't have a \`children\` defined (i.e. icon-only buttons),
provide the \`iconLabel\` prop so screen readers can announce it.

Out of the box, icon-only buttons look like rectangles due to the unequal
paddings. To make them squares, set the \`size\` prop to one with an \`Icon\`
suffix, like \`Button.sizes.mediumIcon\`.

[1]: /docs/guides-icons--primary
[2]: https://en.wikipedia.org/wiki/Screen_reader
[3]: https://www.sarasoueidan.com/blog/accessible-icon-buttons/#icon-sitting-next-to-text
`,
});

export const Link = (): JSX.Element => (
	<Button
		highlight
		href="https://moaijs.com"
		target="_blank"
		children="Go to Moaijs.com"
	/>
);

Utils.story(Link, {
	desc: `
Buttons with \`href\` prop are rendered as [HTML \`a\`][1] elements instead of
the usual \`button\`. This helps you have links that look like buttons (e.g.
with strong appearance to attract attention) but still preserve all [built-in
behaviours][3] of links.

For example, you can right click the below button to copy the URL or open it
in a new tab:

[1]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
[2]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
[3]: https://www.nngroup.com/articles/command-links
`,
});

export const Danger = (): JSX.Element => (
	<Button color={Button.color.danger} children="Danger" />
);
