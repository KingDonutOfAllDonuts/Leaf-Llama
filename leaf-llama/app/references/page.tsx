import Navbar from "@/components/Navbars/Navbar";
import React from "react";
const references = [
  {
    image: "/salad-model.png",
    source: "Sketchfab Model by alban",
    license: "CC Attribution https://sketchfab.com/alban",
  },
  {
    image: "/salads/vegetable.jpg",
    source: "Unsplash",
    license: "Unsplash License",
  },
  {
    image: "/salads/strawberry.jpg",
    source: "Unsplash",
    license: "Unsplash License",
  },
  {
    image: "/smoothies/banana.jpg",
    source: "Unsplash",
    license: "Unsplash License",
  },

  {
    image: "/salads/salad.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/salads/fruit.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/smoothies/blueberry.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/smoothies/vanilla.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/smoothies/strawberry.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/smoothies/chocolate.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/sides/muffin.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/sides/fries.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/salads/potato.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/cloud.png",
    source: "pngfile",
    license: "Free",
  },
  {
    image: "/leaf.png",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/salads/caesar.jpg",
    source: "Unsplash",
    license: "Unsplash License",
  },
  {
    image: "/sides/garlicRoastedPotatoes.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/sides/fries.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/sides/muffin.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/others/burger.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/others/pasta.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/others/pizza.jpg",
    source: "Pexels",
    license: "Pexels License",
  },

  {
    image: "/account/Apple.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/account/Broccoli.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/account/Lettuce.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/account/Potato.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/account/Carrot.jpg",
    source: "Pexels",
    license: "Pexels License",
  },

  {
    image: "/account/Apple.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/account/Broccoli.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/account/Lettuce.jpg",
    source: "Pexels",
    license: "Pexels License",
  },

  {
    image: "/Farm.mp4",
    source: "Freepik",
    license: "Free",
    video: true,
  },
  {
    image: "/TruckRoad.mp4",
    source: "Freepik",
    license: "Free",
    video: true,
  },
  {
    image: "/Planting.mp4",
    source: "Freepik",
    license: "Free",
    video: true,
  },

  {
    image: "/Wash.mp4",
    source: "Freepik",
    license: "Free",
    video: true,
  },
  {
    image: "/Mixing.mp4",
    source: "Freepik",
    license: "Free",
    video: true,
  },
  {
    image: "/Making.mp4",
    source: "Freepik",
    license: "Free",
    video: true,
  },

  {
    image: "/Researching.mp4",
    source: "Freepik",
    license: "Free",
    video: true,
  },
  {
    image: "/Spinning.mp4",
    source: "Freepik",
    license: "Free",
    video: true,
  },
  {
    image: "/Trees.mp4",
    source: "Freepik",
    license: "Free",
    video: true,
  },

  {
    image: "/timeline/llama1.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/timeline/llama2.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/timeline/llama3.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/timeline/open.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
  {
    image: "/timeline/restaurant.jpg",
    source: "Pexels",
    license: "Pexels License",
  },
];

const References = () => {
  return (
    <div className="w-full relative flex flex-col">
      <Navbar />
      <div className="mt-[85px] px-10">
        <h1 className="w-full text-center text-5xl p-10 font-kaushan bg-white">
          References
        </h1>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-green-200">
              <tr>
                <th className="p-3 border-b border-gray-300">Image</th>
                <th className="p-3 border-b border-gray-300 border-l">
                  Source
                </th>
              </tr>
            </thead>
            <tbody>
              {references.map((reference, index) => (
                <tr key={index} className="even:bg-gray-100">
                  <td className="p-3 border-b border-gray-300">
                    {reference.video ? (
                      <video
                        autoPlay
                        muted
                        playsInline
                        src={reference.image}
                        className="h-24 w-auto"
                      />
                    ) : (
                      <img
                        src={reference.image}
                        alt={reference.source}
                        className="h-24 w-auto"
                      />
                    )}
                  </td>
                  <td className="p-3 border-b border-gray-300 border-l">
                    <p>
                      <strong>{reference.source}</strong>
                    </p>
                    <p>{reference.license}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default References;
