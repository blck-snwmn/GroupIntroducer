import { zColor } from "@remotion/zod-types";
import { Img } from "remotion";
import { z } from "zod";

const introductionCardSchema = z.object({
	icon: z.string().url(),
	name: z.string(),
	description: z.string(),
	bgColor: zColor(),
});

type IntroductionCard = z.infer<typeof introductionCardSchema>;

export type IntroductionCards = IntroductionCard[];

export const IntroductionCard: React.FC<IntroductionCard> = ({
	icon,
	name,
	description,
	bgColor,
}) => {
	return (
		<div className="flex rounded-xl h-2/3 w-5/6 p-5" style={{ backgroundColor: bgColor }}>
			<div className="flex flex-col items-center justify-center w-2/6">
				<Img src={icon} alt="Profile Icon" className="rounded-full" />
				<h2 className="text-3xl mt-5">{name}</h2>
			</div>
			<div className="flex justify-center w-4/6 py-3 pl-5">
				<div className="text-xl/loose bg-slate-50 p-2 rounded-xl ">
					{description}
				</div>
			</div>
		</div>
	);
};
