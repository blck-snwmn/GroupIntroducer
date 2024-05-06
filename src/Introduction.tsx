import { zColor } from "@remotion/zod-types";
import { loadDefaultJapaneseParser } from "budoux";
import { Img } from "remotion";
import { z } from "zod";
const parser = loadDefaultJapaneseParser();

const memberSchema = z.object({
	icon: z.string().url(),
	name: z.string(),
	description: z.string(),
	bgColor: zColor(),
});

const groupSchema = z.array(
	z.object({
		groupName: z.string(),
		member: z.array(memberSchema),
	}),
);

export type Group = z.infer<typeof groupSchema>;

type Member = z.infer<typeof memberSchema>;

export type Members = Member[];

export const IntroductionCard: React.FC<Member> = ({
	icon,
	name,
	description,
	bgColor,
}) => {
	const d = parser.translateHTMLString(description);
	return (
		<div
			className="flex rounded-xl h-2/3 w-5/6 p-5"
			style={{ backgroundColor: bgColor }}
		>
			<div className="flex flex-col items-center justify-center w-2/6">
				<Img src={icon} alt="Profile Icon" className="rounded-full" />
				<h2 className="text-3xl mt-5">{name}</h2>
			</div>
			<div className="flex justify-center w-4/6 py-3 pl-5">
				<div
					className="text-xl/loose bg-slate-50 p-2 rounded-xl"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: This is a trusted source
					dangerouslySetInnerHTML={{ __html: d }}
				/>
			</div>
		</div>
	);
};
