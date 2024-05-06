import { loadFont } from "@remotion/google-fonts/NotoSansJP";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import type { ReactElement } from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { z } from "zod";
import { IntroductionCard, type Members } from "./Introduction";
import { data } from "./data";
import { GroupCard, type Groups } from "./GroupCard";
const { fontFamily } = loadFont();

const memberFrameSchema = z.object({
	framePerItem: z.number(),
	framePerTransition: z.number(),
});

const groupFrameSchema = z.object({
	framePerGroup: z.number(),
});

const configSchema = groupFrameSchema.merge(memberFrameSchema);

type MemberConfig = z.infer<typeof memberFrameSchema>;
type Config = z.infer<typeof configSchema>;

export const Introduction: React.FC<Config> = (cfg) => {
	const transtions = makeTransition(cfg, data);

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

function makeTransition(cfg: Config, gs: Groups): ReactElement[] {
	return gs.reduce((acc, elm) => {
		acc.push(
			<TransitionSeries.Sequence durationInFrames={cfg.framePerGroup}>
				<GroupCard name={elm.name} logo={elm.logo} member={elm.member} bgColor={elm.bgColor} />
			</TransitionSeries.Sequence>,
		);
		acc.push(...makeMemberTransition(cfg, elm.member));
		return acc;
	}, [] as ReactElement[]);
}

function makeMemberTransition(
	cfg: MemberConfig,
	mems: Members,
): ReactElement[] {
	const separator = (
		<TransitionSeries.Transition
			presentation={wipe()}
			timing={linearTiming({ durationInFrames: cfg.framePerTransition })}
		/>
	);

	return mems
		.map((item) => (
			<IntroductionCard
				key={item.name}
				bgColor={item.bgColor}
				icon={item.icon}
				name={item.name}
				description={item.description}
			/>
		))
		.reduce((accumulator: ReactElement[], currentComponent, currentIndex) => {
			let dif = cfg.framePerItem;
			if (currentIndex === 0 || currentIndex === mems.length - 1) {
				dif -= cfg.framePerTransition;
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
		}, []);
}
