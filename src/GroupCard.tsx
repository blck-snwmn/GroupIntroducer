import { Img } from "remotion";
import { memberSchema } from "./Introduction";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

const groupSchema = z.object({
  name: z.object({
    name: z.string(),
    nameEn: z.string().optional(),
  }).optional(),
  logo: z.string().url(),
  bgColor: zColor().optional(),
  member: z.array(memberSchema),
})

const groupsSchema = z.array(groupSchema);

export type Group = z.infer<typeof groupSchema>;

export type Groups = z.infer<typeof groupsSchema>;

export const GroupCard: React.FC<Group> = (group) => {
  let groupName = null;
  if (group.name) {
    const gn = group.name;
    const name = gn.nameEn ? `${gn.name}/${gn.nameEn}` : gn.name;
    groupName = <h1 className="items-center justify-center text-7xl">{name}</h1>
  }
  const bg = group.bgColor ? group.bgColor : "#ffffff";
  return (
    <div className="flex flex-col items-center justify-center w-full h-full"
      style={{ backgroundColor: bg }}
    >
      <div className="h-2/3 w-2/3 flex items-center justify-center">
        <Img src={group.logo} alt="Group Icon" className="w-auto h-full" />
      </div>
      {groupName}
    </div>
  )
}