import { loadFont } from "@remotion/google-fonts/NotoSansJP";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { wipe } from "@remotion/transitions/wipe";
import type { ReactElement } from "react";
import {
	AbsoluteFill,
	Audio,
	interpolate,
	staticFile,
	useCurrentFrame,
} from "remotion";
import { z } from "zod";
import { GroupCard, groupsSchema, type Groups } from "./GroupCard";
import { IntroductionCard, type Members } from "./Introduction";
import { input } from "./data";
import { Scene, scene } from "./Scene";
const { fontFamily } = loadFont();

const memberFrameSchema = z.object({
	framePerItem: z.number(),
	framePerTransition: z.number(),
});

const groupFrameSchema = z.object({
	framePerGroup: z.number(),
	framePerGroupTransition: z.number(),
});

const SceneFrameSchema = z.object({
	framePerScene: z.number(),
});

const configSchema = groupFrameSchema.
	merge(memberFrameSchema).
	merge(SceneFrameSchema).
	merge(
		z.object({
			totalFrame: z.number(),
		}),
	);

type MemberConfig = z.infer<typeof memberFrameSchema>;
type Config = z.infer<typeof configSchema>;

const sceneInput = z.object({
	start: scene,
	groups: groupsSchema,
	end: scene,
})

export type SceneInput = z.infer<typeof sceneInput>;

export const Introduction: React.FC<Config> = (cfg) => {
	const start = <TransitionSeries.Sequence durationInFrames={cfg.framePerScene}>
		<Scene logo={input.start.logo} />
	</TransitionSeries.Sequence>
	const end = <TransitionSeries.Sequence durationInFrames={cfg.framePerScene}>
		<Scene logo={input.end.logo} />
	</TransitionSeries.Sequence>

	const t = makeTransition(cfg, input.groups);

	const transtions = [start, ...t, end];

	const frame = useCurrentFrame();
	const value = interpolate(
		frame,
		[0, cfg.totalFrame - 240, cfg.totalFrame],
		[0.5, 0.5, 0],
		{ extrapolateLeft: "clamp" },
	);

	return (
		<AbsoluteFill
			className="items-center justify-center"
			style={{ fontFamily }}
		>
			<Audio src={staticFile("sound.mp3")} volume={value} loop />
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
			<TransitionSeries.Transition
				presentation={clockWipe({
					height: 720,
					width: 1280,
				})}
				timing={linearTiming({ durationInFrames: cfg.framePerGroupTransition })}
			/>,
			<TransitionSeries.Sequence durationInFrames={cfg.framePerGroup}>
				<GroupCard
					name={elm.name}
					logo={elm.logo}
					member={elm.member}
					bgColor={elm.bgColor}
				/>
			</TransitionSeries.Sequence>,
			<TransitionSeries.Transition
				presentation={clockWipe({
					height: 720,
					width: 1280,
				})}
				timing={linearTiming({ durationInFrames: cfg.framePerGroupTransition })}
			/>,
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
