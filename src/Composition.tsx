import { AbsoluteFill } from 'remotion';
import { Logo } from './Logo';
import { Subtitle } from './Subtitle';
import { Title } from './Title';
import { z } from 'zod';
import { zColor } from '@remotion/zod-types';
import { ProfileCard } from './profile';

export const myCompSchema = z.object({
	titleText: z.string(),
	titleColor: zColor(),
	logoColor: zColor(),
});

export const Profile: React.FC<z.infer<typeof myCompSchema>> = ({
	titleText: propOne,
	titleColor: propTwo,
	logoColor: propThree,
}) => {
	return (
		<AbsoluteFill className="bg-gray-100 items-center justify-center">
			<ProfileCard
				name={"John Doe"}
				hobby={"Programming"}
				favoriteFood={"海鮮丼ああああああああああ いいいいいいいい"}
				favoriteMovie={"SFやファンタジーああああああああああいいいいいいいい"}
				iconUrl="https://avatars.githubusercontent.com/u/44711725?v=4"
				favoritePlace={"日本の京都の祇園地区"}
			/>
		</AbsoluteFill>
	);
};
