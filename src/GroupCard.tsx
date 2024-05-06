import { Img } from "remotion";
import { memberSchema } from "./Introduction";
import { z } from "zod";

const groupSchema = z.object({
  name: z.string(),
  icon: z.string().url(),
  member: z.array(memberSchema),
})

const groupsSchema = z.array(groupSchema);

export type Group = z.infer<typeof groupSchema>;

export type Groups = z.infer<typeof groupsSchema>;

export const GroupCard: React.FC<Group> = (group) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white"
    // style={{ backgroundColor: "#27c7ff" }}
    >
      <Img src={group.icon} alt="Group Icon" className="h-2/3" />
      <h1 className="items-center justify-center text-7xl">{group.name}</h1>
    </div>
  )
}