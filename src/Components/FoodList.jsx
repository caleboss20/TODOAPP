import React, { useState } from "react";
const CategoryList = () => {
  const [active, setActive] = useState(0);
  const categories = [
    {
      name: "Meat",
      image: "https://cdn-icons-png.flaticon.com/128/1046/1046784.png",
    },
    {
      name: "Fast Food",
      image: "https://cdn-icons-png.flaticon.com/128/3075/3075977.png",
    },
    {
      name: "Sushi",
      image: "https://cdn-icons-png.flaticon.com/128/3595/3595455.png",
    },
    {
      name: "Drinks",
      image: "https://cdn-icons-png.flaticon.com/128/2405/2405479.png",
    },
    {
      name: "Yoghurt",
      image: "https://cdn-icons-png.flaticon.com/128/3081/3081559.png",
    },
  ];
  return (
    <div
      className="
        flex gap-4 px-4 py-2 overflow-x-auto
        [scrollbar-width:none] [-ms-overflow-style:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
      {categories.map((item, index) => (
        <div
          key={index}
          onClick={() => setActive(index)}
          className={`
            min-w-[80px] h-[90px]
            flex flex-col items-center justify-center
            rounded-2xl cursor-pointer
            transition-all duration-300
            shadow-sm
            ${
              active === index
                ? "bg-yellow-400 text-black scale-105"
                : "bg-white text-gray-500"
            }
          `}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-8 h-8 object-contain"
          />
          <p className="text-xs mt-2 text-center">
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
};
export default CategoryList;