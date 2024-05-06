import { Img } from "remotion";
import type { Group } from "./Introduction";

export const GroupCard: React.FC<Group> = (group) => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-white"
    // style={{ backgroundColor: "#27c7ff" }}
    >
      <Img src={group.icon} alt="Group Icon" className="w-52 rounded-full" />
      <h1 className="items-center justify-center text-8xl">{group.name}</h1>
    </div>
  )
}