import { loadFont } from "@remotion/google-fonts/NotoSansJP";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import type { ReactElement } from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { IntroductionCard, Members } from "./Introduction";
import { data } from "./data";
const { fontFamily } = loadFont();

export const Introduction: React.FC = () => {
	const transtions = data.flatMap((item, index) =>
		makeMemberTransition(item.member),
	);

	return (
		<AbsoluteFill
			className="items-center justify-center"
			style={{ fontFamily }}
		>
			<Audio src={staticFile("sound.mp3")} volume={0.05} loop />
			<TransitionSeries>
				{transtions}
				{/*
				<TransitionSeries.Sequence durationInFrames={60}>
					<Component/>
				</TransitionSeries.Sequence>
				<TransitionSeries.Transition
					presentation={wipe()}
					timing={linearTiming({ durationInFrames: 30 })}
				/>
				<TransitionSeries.Sequence durationInFrames={60}>
					<Component/>
				</TransitionSeries.Sequence> 
			*/}
			</TransitionSeries>
		</AbsoluteFill>
	);
};

function makeMemberTransition(mems: Members): ReactElement[] {
	const separator = (
		<TransitionSeries.Transition
			presentation={wipe()}
			timing={linearTiming({ durationInFrames: 30 })}
		/>
	);

	return mems.map((item) => (
		<IntroductionCard
			key={item.name}
			bgColor={item.bgColor}
			icon={item.icon}
			name={item.name}
			description={item.description}
		/>
	)).reduce(
		(accumulator: ReactElement[], currentComponent, currentIndex) => {
			let dif = 180;
			if (currentIndex === 0 || currentIndex === mems.length - 1) {
				dif -= 30;
			}
			accumulator.push(
				<TransitionSeries.Sequence durationInFrames={dif}>
					{currentComponent}
				</TransitionSeries.Sequence>,
			);

			if (currentIndex < mems.length - 1) {
				accumulator.push(separator);
			}

			return accumulator;
		},
		[],
	);
}
