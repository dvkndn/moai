import React, { useState } from "react";
import {
	Button,
	DivPx,
	Tooltip,
	TooltipPane,
	TooltipProps,
} from "../core/src";
import { Utils } from "./utils";

export default {
	title: "Components/Tooltip",
	component: Tooltip,
	argTypes: {
		content: Utils.arg("text"),
		children: Utils.arg(null),
		placement: Utils.arg(null),
	},
};

interface Props {
	content: React.ReactNode;
	children: TooltipProps["children"];
	placement?: TooltipProps["placement"];
}

export const Primary = (props: Props): JSX.Element => {
	if (props.content === undefined) {
		props.content = "Hello Moai!";
	}

	return (
		<Tooltip content={props.content}>
			<span>Hover over me</span>
		</Tooltip>
	);
};

Utils.fixPrimary(Primary);

export const Pane = (): JSX.Element => {
	return (
		<>
			<TooltipPane children="Short Tooltip" />
			<DivPx size={8} />
			<TooltipPane children="Multi-line Tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
		</>
	);
};

Utils.desc(Pane)(
	`TooltipPane is a way to render Tooltip as a single inline element (non-floating).`
);

export const Positioning = (): JSX.Element => {
	const [position, setPosition] = useState(0);
	const placements: TooltipProps["placement"][] = [
		"top",
		"top-start",
		"top-end",

		"right",
		"right-start",
		"right-end",

		"bottom",
		"bottom-start",
		"bottom-end",

		"left",
		"left-start",
		"left-end",

		"auto",
		"auto-start",
		"auto-end",
	];
	const placement: TooltipProps["placement"] = placements[position];

	const containerStyle = {
		display: "flex",
		flexDirection: "column" as const,
		alignItems: "center",
		justifyContent: "center",
		height: 120,
	};

	return (
		<div style={containerStyle}>
			<Tooltip
				placement={placement}
				content={"Current position: " + placement}
			>
				<Button
					children="Change placement"
					onClick={() => {
						setPosition((position + 1) % placements.length);
					}}
				/>
			</Tooltip>
			<DivPx size={8} />
			<div children={"Current position: " + placement} />
		</div>
	);
};

Utils.desc(Positioning)(`
A tooltip is positioned in relation to its target. Tooltips have five primary standard positions: \`top\`, \`right\`, \`bottom\`, \`left\` and \`auto\`.
Each of primary position above have two more placements are: \`start\` and \`end\` could be written by connecting string with hyphen symbol (dash \`-\`).

[Reference](https://atomiks.github.io/tippyjs/v6/all-props/#placement) to the tippy's placement. 

Default value: \`top\`
`);

export const Customization = (): JSX.Element => {
	return (
		<Tooltip
			content={
				<img src="https://avatars.githubusercontent.com/u/76839396?s=64&v=4" />
			}
		>
			<span>How did Moai look like?</span>
		</Tooltip>
	);
};
