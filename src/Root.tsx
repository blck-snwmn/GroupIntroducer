import { Composition } from "remotion";
import { Introduction } from "./Composition";
import "./style.css";
import { input } from "./data";

export const RemotionRoot: React.FC = () => {
	const FRAME_PER_SCENE = 180;
	const GROUP_NUMBER = input.groups.length;
	const FRAME_PER_GROUP = 180;
	const FRAME_PER_GROUP_TRANSITION = 15;
	const ITEM_NUMBER = input.groups.reduce((acc, elm) => acc + elm.member.length, 0); // change your item number here
	const FRAM_PER_ITEM = 180;
	const FRAM_PER_TRANSITION = 30;
	const DURATION =
		FRAME_PER_SCENE * 2 +
		GROUP_NUMBER * FRAME_PER_GROUP -
		GROUP_NUMBER * 2 * FRAME_PER_GROUP_TRANSITION +
		(ITEM_NUMBER - 2) * FRAM_PER_ITEM +
		2 * (FRAM_PER_ITEM - FRAM_PER_TRANSITION) -
		(ITEM_NUMBER - 1 + GROUP_NUMBER) * FRAM_PER_TRANSITION;
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
					framePerGroup: FRAME_PER_GROUP,
					framePerGroupTransition: FRAME_PER_GROUP_TRANSITION,
					framePerItem: FRAM_PER_ITEM,
					framePerTransition: FRAM_PER_TRANSITION,
					totalFrame: DURATION,
					framePerScene: FRAME_PER_SCENE,
				}}
			/>
		</>
	);
};
