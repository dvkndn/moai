import { Button } from "../../button/button";
import { DialogMain, DialogProps } from "../main/main";
import { DialogBody, DialogFooter } from "../sub/sub";
import { renderDialog } from "./native";

interface Props {
	children: React.ReactNode;
	onOk: () => void;
	width?: DialogProps["width"];
}

export const AlertDialog = (props: Props): JSX.Element => (
	<DialogMain onEsc={props.onOk} width={props.width}>
		<DialogBody children={props.children} />
		<DialogFooter>
			<Button
				minWidth
				autoFocus
				color={Button.color.highlight}
				onClick={props.onOk}
				children="OK"
			/>
		</DialogFooter>
	</DialogMain>
);

/**
 * Moai's alternative to window.alert
 * See https://developer.mozilla.org/en-US/docs/Web/API/Window/alert
 */
export const dialogAlert = (
	message: React.ReactNode,
	options?: {
		width?: DialogProps["width"];
	}
): Promise<void> => {
	return new Promise((resolve) => {
		renderDialog((unmount) => (
			<AlertDialog
				onOk={() => {
					resolve();
					unmount();
				}}
				children={message}
				width={options?.width}
			/>
		));
	});
};
