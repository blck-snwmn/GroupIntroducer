import { z } from 'zod';
import { zColor } from '@remotion/zod-types';
import { Img } from 'remotion';

const myCompSchema = z.object({
  icon: z.string().url(),
  name: z.string(),
  description: z.string(),
  // titleColor: zColor(),
  // logoColor: zColor(),
});

export const IntroductionCard: React.FC<z.infer<typeof myCompSchema>> = ({
  icon,
  name,
  description,
}) => {
  const desc = description.replace(/\n/g, '<br />')
  return (
    <div className='flex bg-slate-300 p-5 rounded-xl'>
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
