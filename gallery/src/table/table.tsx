import { Fragment, useState } from "react";
import * as M from "@moai/core";
import { Robot, ROBOTS } from "./robots";
import s from "./table.module.css";
import { GoSearch, GoMail } from "react-icons/go";

interface RowProps {
	robot: Robot;
}

type Column = (props: RowProps) => JSX.Element;

const SearchHeader = ({ children }: { children: string }): JSX.Element => (
	<div>
		<div>{children}</div>
		<M.DivPx size={8} />
		<M.Input icon={GoSearch} placeholder="Search" />
	</div>
);

const Overview: Column = ({ robot }: RowProps) => (
	<div className={s.overview}>
		<img
			width="32"
			height="32"
			src={robot.avatar}
			alt={`Image of ${robot.name.last}`}
			className="block"
			style={{ background: `${robot.color}20` }}
		/>
		<M.DivPx size={8} />
		<div>
			{robot.name.first} {robot.name.last}
		</div>
	</div>
);

const LastSeenHeader = (): JSX.Element => (
	<div>
		<div>Last seen</div>
		<M.DivPx size={8} />
		<M.Input type="date" placeholder="Search" />
	</div>
);

const Action: Column = ({ robot }: RowProps) => (
	<div className={s.actions}>
		{robot.deployed ? (
			<M.Button color={M.Button.color.highlight} children="Deploy" />
		) : (
			<>
				<M.Button children="Retreat" />
				<M.DivPx size={8} />
				<M.Button children="Upgrade" />
			</>
		)}
	</div>
);

// https://github.com/Marak/faker.js/blob/master/lib/locales/en/commerce/product_name.js#L21
const MATERIAL_TAGS = {
	Steel: M.Tag.colors.gray,
	Wooden: M.Tag.colors.yellow,
	Concrete: M.Tag.colors.green,
	Plastic: M.Tag.colors.blue,
	Cotton: M.Tag.colors.indigo,
	Granite: M.Tag.colors.purple,
	Rubber: M.Tag.colors.pink,
	Metal: M.Tag.colors.red,
	Soft: M.Tag.colors.gray,
	Fresh: M.Tag.colors.green,
	Frozen: M.Tag.colors.blue,
};

const MaterialsHeader = (): JSX.Element => (
	<div>
		<div>Materials</div>
		<M.DivPx size={8} />
		<M.Select
			options={[...Object.keys(MATERIAL_TAGS), "Filter: All"].map(
				M.Select.toStringOption
			)}
			defaultValue="Filter: All"
		/>
	</div>
);

const Materials: Column = ({ robot }: RowProps) => (
	<div className={s.materials}>
		{robot.materials.map((material, index) => (
			<Fragment key={material}>
				{index > 0 && <M.DivPx size={4} />}
				<M.Tag
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					color={(MATERIAL_TAGS as any)[material]}
					children={material}
				/>
			</Fragment>
		))}
	</div>
);

const LastSeen: Column = ({ robot }: RowProps) => (
	<div>{new Date(robot.lastSeen).toDateString()}</div>
);

const Note: Column = ({ robot }: RowProps) => (
	<M.Paragraph>
		<span>{robot.note}</span>
		<span>{` — ${robot.name.last}`}</span>
	</M.Paragraph>
);

const Mac: Column = ({ robot }: RowProps) => (
	<div className={s.mac}>
		<M.Button size={M.Button.sizes.small} icon={GoMail} iconLabel="Mail" />
		<M.DivPx size={8} />
		<div>{robot.MAC}</div>
	</div>
);

const getColumns = (): M.TableColumn<Robot>[] => [
	{
		title: <SearchHeader children="Bot" />,
		render: (robot) => <Overview robot={robot} />,
	},
	{
		title: <LastSeenHeader />,
		render: (robot) => <LastSeen robot={robot} />,
	},
	{
		title: <SearchHeader children="MAC" />,
		render: (robot) => <Mac robot={robot} />,
	},
	{
		title: <MaterialsHeader />,
		render: (robot) => <Materials robot={robot} />,
	},
	{
		title: <SearchHeader children="Email" />,
		render: "email",
	},
	{
		title: "Action",
		render: (robot) => <Action robot={robot} />,
	},
];

export const GalleryTable = (): JSX.Element => {
	const [selected, setSelected] = useState<Set<string>>(new Set());
	const table = (
		<M.Table
			rows={ROBOTS}
			columns={getColumns()}
			rowKey={(robot) => robot.id}
			expandable={{ render: (robot) => <Note robot={robot} /> }}
			selectable={{ selected, setSelected }}
			fixed={{ header: true, firstColumn: true }}
		/>
	);
	return (
		<div className={s.wrapper}>
			<M.Pane noPadding>
				<div className={s.container} children={table} />
			</M.Pane>
		</div>
	);
};
