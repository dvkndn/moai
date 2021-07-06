import { Meta } from "@storybook/react";
import { useState } from "react";
import { Button, DivPx, Switcher, Tab, Tabs } from "../../../core/src";
import { GalleryTab1, GalleryTab2 } from "../../../gallery/src";
import { Utils } from "../utils/utils";
import { TabComponent } from "./tab-fake";

const meta: Meta = {
	title: "Components/Tabs",
	component: Tabs,
	subcomponents: { Tab: TabComponent },
	argTypes: {
		noPadding: Utils.arg("boolean", "Visual"),
		fullHeight: Utils.arg("boolean", "Visual"),
		style: Utils.arg(Object.keys(Tabs.styles), "Visual"),
		children: Utils.arg(null, "Visual"),
		activeTab: Utils.arg(null, "Controlled"),
		setActiveTab: Utils.arg(null, "Controlled"),
		initialTab: Utils.arg(null, "Uncontrolled"),
	},
};

Utils.page.component(meta, {
	primary: "sticky",
	shots: [<GalleryTab1 key="1" />, <GalleryTab2 key="2" />],
});

export default meta;

interface Props {
	style?: string;
	noPadding?: boolean;
	fullHeight?: boolean;
}

const tabs: Tab[] = [
	{ id: "first", title: "First", pane: () => <p>1st</p> },
	{ id: "second", title: "Second", pane: () => <p>2nd</p> },
];

export const Primary = (props: Props): JSX.Element => (
	<div style={{ height: "150px" }}>
		<Tabs
			children={tabs}
			// eslint-disable-next-line
			style={(Tabs.styles as any)[props.style!]}
			noPadding={props.noPadding}
			fullHeight={props.fullHeight}
		/>
	</div>
);

Utils.story(Primary, { fixPrimary: true });

export const Basic = (): JSX.Element => (
	<Tabs>
		{[
			{ id: "first", title: "First", pane: () => <p>1st</p> },
			{ id: "second", title: "Second", pane: () => <p>2nd</p> },
		]}
	</Tabs>
);

Utils.story(Basic, {
	desc: `
Tabs can be used as both controlled or uncontrolled. If you don't need to
control the active tab state, it's best to use Tabs as an uncontrolled
component. You only need to provide the list of tabs via the \`tabs\` prop.
Each tab should have the following interface:

~~~ts
interface Tab {
	id: string;            // Unique id for the tab
	title: ReactNode;      // Title of the tab
	pane: () => ReactNode; // Function that returns the tab's content
}
~~~

The height of tabs depend on the content of the current tab. Use the
\`fullHeight\` prop to control the element's height. The default padding can
be removed via the \`noPadding\` prop.
`,
});

export const Controlled = (): JSX.Element => {
	const [tab, setTab] = useState("first");
	const FirstPane = (): JSX.Element => (
		<Button onClick={() => setTab("second")}>Next</Button>
	);
	const SecondPane = (): JSX.Element => (
		<Button onClick={() => setTab("first")}>Back</Button>
	);
	return (
		<div>
			<Switcher<string>
				value={tab}
				setValue={setTab}
				options={tabs.map((tab) => ({ value: tab.id, label: tab.id }))}
			/>
			<DivPx size={16} />
			<Tabs setActiveTab={setTab} activeTab={tab}>
				{[
					{ id: "first", title: "First", pane: FirstPane },
					{ id: "second", title: "Second", pane: SecondPane },
				]}
			</Tabs>
		</div>
	);
};

Utils.story(Controlled, {
	desc: `
[In most cases][1], Tabs should be used as an uncontrolled component. However,
you can also have a state for the active tab yourself, and give it to the Tabs
via the \`activeTab\` and \`setActiveTab\` props, and use it as a controlled
component.

You can control the active tab, from both outside and inside the tabs by
setting your state:

[1]: #basic
`,
});
