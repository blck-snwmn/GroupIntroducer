import { Composition } from "remotion";
import { Introduction } from "./Composition";
import "./style.css";
import { data } from "./data";

export const RemotionRoot: React.FC = () => {
	const ITEM_NUMBER = data.reduce((acc, elm) => acc + elm.member.length, 0); // change your item number here
	const FRAM_PER_ITEM = 180;
	const FRAM_PER_TRANSITION = 30;
	const DURATION =
		(ITEM_NUMBER - 2) * FRAM_PER_ITEM +
		2 * (FRAM_PER_ITEM - FRAM_PER_TRANSITION) -
		(ITEM_NUMBER - 1) * FRAM_PER_TRANSITION;
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
