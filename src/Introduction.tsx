import { z } from 'zod';
import { zColor } from '@remotion/zod-types';
import { Img } from 'remotion';

export const introductionCardSchema = z.object({
  icon: z.string().url(),
  name: z.string(),
  description: z.string(),
  bgColor: zColor(),
});

export const IntroductionCard: React.FC<z.infer<typeof introductionCardSchema>> = ({
  icon,
  name,
  description,
  bgColor
}) => {
  const desc = description.replace(/\n/g, '<br />')
  return (
    <div className='flex p-5 rounded-xl' style={{ backgroundColor: bgColor }}>
      <div className='flex flex-col items-center w-64 mx-10'>
        <Img
          src={icon}
          alt="Profile Icon"
          className='rounded-full'
        />
        <h2 className='text-2xl'>{name}</h2>
      </div >
      <div className='text-base/loose w-96'>
        {desc}
      </div>
    </div >
  )
}
