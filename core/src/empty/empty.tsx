import s from "./empty.module.css";
import cloudSVG from "./empty1.svg";

interface EmptyProps {
	message: string;
	action?: React.ReactNode;
}

export const Empty = (props: EmptyProps): JSX.Element => {
	const { message, action } = props;
	return (
		<div className={s.container}>
			<img src={cloudSVG} width="184" height="112" alt="Clould image" />
			<p className={s.messageText}>{message}</p>
			{action}
		</div>
	);
};
