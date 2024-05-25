import { Img } from "remotion";
import { z } from "zod";

export const scene = z.object({
	logo: z.string().url(),
});

type Scene = z.infer<typeof scene>;

export const Scene: React.FC<Scene> = (scene) => {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full bg-white">
			<div className="h-2/3 w-2/3 flex items-center justify-center">
				<Img src={scene.logo} alt="Group Icon" className="w-auto h-full" />
			</div>
		</div>
	);
};
