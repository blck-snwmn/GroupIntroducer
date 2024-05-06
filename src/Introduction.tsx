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
  return (
    <div className='flex p-3 rounded-xl' style={{ backgroundColor: bgColor }}>
      <div className='flex flex-col items-center w-64 mr-5'>
        <Img
          src={icon}
          alt="Profile Icon"
          className='rounded-full'
        />
        <h2 className='text-2xl'>{name}</h2>
      </div >
      <div className='text-base/loose w-96 bg-slate-50 p-2 rounded-xl'>
        {description}
      </div>
    </div >
  )
}
