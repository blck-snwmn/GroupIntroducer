import { Groups } from "./GroupCard";
import { SceneInput } from "./Composition";

const data: Groups = [
	{
		name: {
			name: "グループ名",
			nameEn: "your group name",
		},
		logo: "https://example.com/your_group_icon1.jpg",
		member: [
			{
				bgColor: "#FFFFFF",
				icon: "https://example.com/your_member_icon1.jpg",
				name: "your member name",
				description: "your member description",
			},
			{
				bgColor: "#FFFFFF",
				icon: "https://example.com/your_member_icon2.jpg",
				name: "your member name",
				description: "your member description",
			},
		],
	},
];

export const input: SceneInput = {
	start: {
		logo: "https://example.com/your_start_logo.jpg",
	},
	groups: data,
	end: {
		logo: "https://example.com/your_end_logo.jpg",
	},
}

