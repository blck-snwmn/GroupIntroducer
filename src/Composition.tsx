import { AbsoluteFill, staticFile } from 'remotion';
import { Logo } from './Logo';
import { Subtitle } from './Subtitle';
import { Title } from './Title';
import { z } from 'zod';
import { zColor } from '@remotion/zod-types';
import { ProfileCard } from './profile';
import { IntroductionCard, introductionCardSchema } from './Introduction';
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import { ReactElement } from 'react';

type IntroductionCards = z.infer<typeof introductionCardSchema>[];
const data: IntroductionCards = [

];

function toTransitions(components: ReactElement[]): ReactElement[] {
	const separator = <TransitionSeries.Transition
		presentation={wipe()}
		timing={linearTiming({ durationInFrames: 30 })}
	/>
	return components.reduce((accumulator: ReactElement[], currentComponent, currentIndex) => {
		accumulator.push(
			<TransitionSeries.Sequence durationInFrames={90}>
				{currentComponent}
			</TransitionSeries.Sequence>
		);

		if (currentIndex < components.length - 1) {
			accumulator.push(separator);
		}

		return accumulator;
	}, []);
}

export const Introduction: React.FC = () => {
	const ics = data.map((item, index) => (
		<IntroductionCard
			key={index}
			bgColor={item.bgColor}
			icon={item.icon}
			name={item.name}
			description={item.description}
		/>
	));
	const transtions = toTransitions(ics);

	return (
		<AbsoluteFill className="bg-gray-100 items-center justify-center">
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
