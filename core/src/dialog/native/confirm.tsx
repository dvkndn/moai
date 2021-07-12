import { Button } from "../../button/button";
import { DialogMain, DialogProps } from "../main/main";
import { DialogBody, DialogFooter } from "../sub/sub";
import { renderDialog } from "./native";

interface Props {
	children: React.ReactNode;
	onOk: () => void;
	onCancel: () => void;
	width?: DialogProps["width"];
}

export const ConfirmDialog = (props: Props): JSX.Element => (
	<DialogMain onEsc={props.onCancel} width={props.width}>
		<DialogBody children={props.children} />
		<DialogFooter>
			<Button minWidth onClick={props.onCancel} children="Cancel" />
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
 * Moai's alternative to window.confirm
 * See https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
 */
export const dialogConfirm = (
	message: React.ReactNode,
	options?: {
		width?: DialogProps["width"];
	}
): Promise<boolean> => {
	return new Promise((resolve) => {
		renderDialog((unmount) => (
			<ConfirmDialog
				onCancel={() => {
					resolve(false);
					unmount();
				}}
				onOk={() => {
					resolve(true);
					unmount();
				}}
				children={message}
				width={options?.width}
			/>
		));
	});
};
