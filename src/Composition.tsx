import { loadFont } from "@remotion/google-fonts/NotoSansJP";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import type { ReactElement } from "react";
import { AbsoluteFill } from "remotion";
import { IntroductionCard } from "./Introduction";
import { data } from "./data";
const { fontFamily } = loadFont();

function toTransitions(components: ReactElement[]): ReactElement[] {
	const separator = (
		<TransitionSeries.Transition
			presentation={wipe()}
			timing={linearTiming({ durationInFrames: 30 })}
		/>
	);
	return components.reduce(
		(accumulator: ReactElement[], currentComponent, currentIndex) => {
			accumulator.push(
				<TransitionSeries.Sequence durationInFrames={90}>
					{currentComponent}
				</TransitionSeries.Sequence>,
			);

			if (currentIndex < components.length - 1) {
				accumulator.push(separator);
			}

			return accumulator;
		},
		[],
	);
}

export const Introduction: React.FC = () => {
	const ics = data.map((item, index) => (
		<IntroductionCard
			key={item.name}
			bgColor={item.bgColor}
			icon={item.icon}
			name={item.name}
			description={item.description}
		/>
	));
	const transtions = toTransitions(ics);

	return (
		<AbsoluteFill
			className="items-center justify-center"
			style={{ fontFamily }}
		>
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
