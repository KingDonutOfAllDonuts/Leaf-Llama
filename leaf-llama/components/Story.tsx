import Image from 'next/image';
import React from 'react'
import { Timeline } from './Timeline';

const Story = () => {
  const data = [
    {
      title: "2022",
      content: (
        <div>
          <h2 className='text-xl text-green-950 font-semibold' >The Seed Is Planted</h2>
          <p className="text-neutral-800 text-xs md:text-sm font-normal mb-8">
            Inspired by the growing need of vegetarian plant-based dining, we embarked on our journey to create a vegetarian restaurant named Leaf Llama.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
                src="/timeline/open.jpg"
                alt="startup template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <Image
                src="/timeline/restaurant.jpg"
                alt="startup template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <h2 className='text-xl text-green-950 font-semibold' >Our customers</h2>
          <p className="text-neutral-800 text-xs md:text-sm font-normal mb-8">
            With a modest pop-up stall our first customers started coming in, we would like to introduce you to our first customers:
          </p>
          <div className="grid grid-cols-2 gap-4">
              <Image
                src="/timeline/llama1.jpg"
                alt="startup template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <Image
                src="/timeline/llama2.jpg"
                alt="startup template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <Image
                src="/timeline/llama3.jpg"
                alt="startup template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <h2 className='text-xl text-green-950 font-semibold' >Today and Beyond</h2>
          <p className="text-neutral-800 text-xs md:text-sm font-normal mb-8">
            Leaf Llama continues to thrive, powered by a community of passionate individuals who believe in a future where food is flavorful, sustainable, and nourishing for all. With every meal, it inspires a deeper connection to the earth—and each other.
          </p>
          <div className="grid grid-cols-2 gap-4">
              <Image
                src="/salads/caesar.jpg"
                alt="startup template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <Image
                src="/salads/fruit.jpg"
                alt="startup template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <Image
                src="/salads/strawberry.jpg"
                alt="startup template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <Image
                src="/salads/vegetable.jpg"
                alt="startup template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full" id={"story"}>
      <Timeline data={data} />
    </div>
  );
}

export default Story