import { Composition } from "remotion";
import { Introduction } from "./Composition";
import "./style.css";

export const RemotionRoot: React.FC = () => {
	const ITEM_NUMBER = 5; // change your item number here
	const FRAM_PER_ITEM = 120;
	const FRAM_PER_TRANSITION = 30;
	const DURATION = ITEM_NUMBER * FRAM_PER_ITEM - (ITEM_NUMBER + 1) * FRAM_PER_TRANSITION;

	return (
		<>
			<Composition
				id="Introductions"
				component={Introduction}
				durationInFrames={DURATION}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					titleText: "Welcome to Remotion with Tailwind CSS",
					titleColor: "#000000",
					logoColor: "#00bfff",
				}}
			/>
		</>
	);
};
