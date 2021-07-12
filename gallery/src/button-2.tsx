import { useState } from "react";
import * as Go from "react-icons/go";
import { Button, ButtonProps } from "@moai/core";
import { Shot } from "./shot/shot";
import s from "./styles.module.css";

const ss = Button.sizes;
const icon = Button.sizes.mediumIcon;

const Row1 = (props: ButtonProps): JSX.Element => (
	<div className={s.cols}>
		<Button
			{...props}
			color={Button.color.highlight}
			icon={Go.GoChevronLeft}
			children="Back"
		/>
		<Button {...props} icon={Go.GoChevronRight} children="Next" />
		<Button {...props} icon={Go.GoSearch} iconLabel="Search" />
		<Button {...props} icon={Go.GoSearch} iconLabel="Search" size={icon} />
	</div>
);

const Busy = (): JSX.Element => {
	const [busy, setBusy] = useState(false);
	const fetch = () => {
		setBusy(true);
		window.setTimeout(() => void setBusy(false), 1000);
	};
	return <Button minWidth children="Fetch" busy={busy} onClick={fetch} />;
};

const Toggle = (): JSX.Element => {
	const [selected, setSelected] = useState(false);
	const toggle = () => setSelected(!selected);
	return (
		<Button
			minWidth
			children="Toggle"
			selected={selected}
			onClick={toggle}
		/>
	);
};

const Row2 = (): JSX.Element => (
	<div className={s.cols}>
		<div className={[s.col, s.rows].join(" ")}>
			<Button icon={Go.GoPlus} size={ss.large} children="Large" />
			<Button icon={Go.GoPlus} size={ss.medium} children="Medium" />
			<Button icon={Go.GoPlus} size={ss.small} children="Small" />
		</div>
		<div className={[s.col, s.rows].join(" ")}>
			<Toggle />
			<Busy />
			<Button
				target="_blank"
				href="https://moaijs.com"
				children="Link"
				minWidth
			/>
		</div>
	</div>
);

export const GalleryButton2 = (): JSX.Element => (
	<Shot>
		<div className={s.rows}>
			<Row1 />
			<Row1 disabled />
			<Row2 />
		</div>
	</Shot>
);
