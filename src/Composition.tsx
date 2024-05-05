import { AbsoluteFill } from 'remotion';
import { Logo } from './Logo';
import { Subtitle } from './Subtitle';
import { Title } from './Title';
import { z } from 'zod';
import { zColor } from '@remotion/zod-types';
import { ProfileCard } from './profile';
import { IntroductionCard } from './Introduction';


export const Introduction: React.FC = () => {
	return (
		<AbsoluteFill className="bg-gray-100 items-center justify-center">
			<IntroductionCard
				name={"John Doe"}
				icon="https://avatars.githubusercontent.com/u/44711725?v=4"
				description="he is a software engineer. he like writing code and solving problems.he is a software engineer. he like writing code and solving problems.he is a software engineer. he like writing code and solving problems.he is a software engineer. he like writing code and solving problems.he is a software engineer. he like writing code and solving problems.he is a software engineer. he like writing code and solving problems."
			/>
		</AbsoluteFill>
	);
};
