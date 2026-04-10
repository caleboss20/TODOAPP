import DeliveryNavbar from "./DeliveryNavbar";
import chicken from "./assets/chicken.png";
import fries from "./assets/fries.png";
import burger from "./assets/burger.png";
import yoghurt from "./assets/yoghurt.jpg";
import bowlchicken from "./assets/bowlchicken.jpg";
import cookie from "./assets/cookie.jpg";
import star from "./assets/star.jpg";
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, HeartIcon, PlusIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { TagIcon as TagIconSolid } from "@heroicons/react/24/solid";
import DeliveryBottomNavbar from "./DeliveryBottomNavbar";
const banners = [
  {
    label: "Easter Promo",
    discount: "30% Off",
    date: "02 - 06 April",
    image: burger,
    categoryIndex: 1,
    bg: "bg-yellow-400",
    labelColor: "text-gray-800",
    discountColor: "text-gray-100",
    dateColor: "text-gray-800",
  },
  {
    label: "Weekend Special",
    discount: "20% Off",
    date: "12 - 13 April",
    image: chicken,
    categoryIndex: 0,
    bg: "bg-violet-400",
    labelColor: "text-white",
    discountColor: "text-white",
    dateColor: "text-orange-100",
  },
  {
    label: "Combo Deal",
    discount: "Buy 2 Get 1",
    date: "Today Only",
    image:fries,
    categoryIndex: 5,
    bg: "bg-orange-500",
    labelColor: "text-white",
    discountColor: "text-white",
    dateColor: "text-emerald-100",
  },
];
function DeliveryMainpage() {
  const [active, setActive] = useState(0);
  const [liked, setLiked] = useState([false, false, false, false, false]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentBanner, setCurrentBanner] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  const openSheet = (item) => { setSelectedItem(item); setQuantity(1); };
  const closeSheet = () => setSelectedItem(null);
  const toggleLike = (index, e) => {
    e.stopPropagation();
    setLiked((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };
  const categories = [
    {
      name: "Chicken", tagname: "Caleboss special", image: chicken,
      deliveryStats: "Free delivery", time: "20 - 40 mins", star: "4.5", starimg: star,
      price: "GH₵35.0", description: "Freshly seasoned chicken, grilled to perfection with rich spices for a satisfying bite every time."
    },
    {
      name: "Burger", image: burger, time: "20min", star: "4.5", starimg: star,
      price: "GH₵30.0", description: "Classic beef burger stacked with lettuce, cheese and sauce.",
    },
    {
      name: "Cookies", image: cookie, time: "20min", star: "4.5", starimg: star,
      price: "GH₵20.0", description: "Freshly baked cookies with chocolate chips and a soft center.",
    },
    {
      name: "Fries", image: fries, time: "20min", star: "4.7", starimg: star,
      price: "GH₵37.0", description: "Crispy golden fries seasoned with our secret spice blend.",
    },
    {
      name: "Yoghurt", image: yoghurt, time: "20min", star: "4.8", starimg: star,
      price: "GH₵12.0", description: "Creamy Greek yoghurt topped with honey and fresh fruits.",
    },
    {
      name: "Chicken Combo", tagname: "Caleboss special", image: bowlchicken,
      deliveryStats: "Free delivery", time: "50 mins", star: "4.5", starimg: star,
      price: "GH₵210.0", description: "Freshly seasoned chicken, grilled to perfection with rich spices for a satisfying bite every time."
    },
  ];
  const banner = banners[currentBanner];
  return (
    <div className="pb-24">
      {/* ✅ Slide-in keyframe */}
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(70px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .banner-animate {
          animation: slideInRight 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
      <DeliveryNavbar />
      <div className="flex flex-col">
        <span className="font-medium text-black p-4 text-2xl">Discover</span>
        <div className="bg-white w-full p-4 rounded-2xl">
          {/* ✅ Banner — box stays still, bg transitions, content slides in from right */}
          <div
            className={`flex w-full pl-4 pt-6 pb-6 rounded-2xl overflow-hidden ${banner.bg}`}
            style={{ transition: "background-color 0.5s ease" }}
          >
            {/* Text slides in */}
            <div
              key={`text-${currentBanner}`}
              className="flex flex-col gap-3 banner-animate"
            >
              <span className={`font-medium text-lg ${banner.labelColor}`}>{banner.label}</span>
              <h2 className={`font-bold text-4xl ${banner.discountColor}`}>{banner.discount}</h2>
              <span className={`font-medium ${banner.dateColor}`}>{banner.date}</span>
              <button
                onClick={() => openSheet(categories[banner.categoryIndex])}
                className="py-2.5 bg-white rounded-xl mt-4 font-medium"
              >
                Order Now
              </button>
            </div>
            {/* Image slides in */}
            <div
              key={`img-${currentBanner}`}
              className="flex-1 ml-2 banner-animate"
            >
              <img src={banner.image} alt="" />
            </div>
          </div>
          {/* Dot indicators */}
          {/* <div className="flex justify-center gap-2 mt-3">
            {banners.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrentBanner(i)}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300
                  ${i === currentBanner ? "w-6 bg-yellow-500" : "w-2 bg-gray-300"}`}
              />
            ))}
          </div> */}
          {/* Category tabs */}
          <div className="flex gap-4 px-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((item, index) => (
              <div
                key={index}
                onClick={() => setActive(index)}
                className={`min-w-[80px] h-[110px] flex flex-col items-center justify-center
                  rounded-xl cursor-pointer transition-all duration-300 mt-10
                  ${active === index ? "bg-yellow-50 scale-105" : "bg-white text-gray-500"}`}
              >
                <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                <p className="mt-2 text-xs text-black text-center">{item.name}</p>
              </div>
            ))}
          </div>
          {/* Popular Near You */}
          <div className="mt-4 flex flex-col gap-4">
            <div className="w-full p-4 flex justify-between">
              <h2 className="font-medium text-gray-800">Popular Near You</h2>
              <span className="font-medium text-yellow-500">See all</span>
            </div>
            <div className="w-full pb-4 pl-4 flex flex-wrap gap-4">
              {categories.map((item, index) => (
                <div
                  key={index}
                  onClick={() => openSheet(item)}
                  className="relative pb-4 pt-7 bg-white w-[46%] flex flex-col items-center
                    rounded-2xl rounded-br-3xl cursor-pointer transition-all duration-300 mt-4"
                >
                  <button onClick={(e) => toggleLike(index, e)}>
                    {liked[index] ? (
                      <HeartIconSolid className="w-6 h-6 absolute top-2 right-2 text-red-500" />
                    ) : (
                      <HeartIcon className="w-6 h-6 absolute top-2 right-2 text-gray-400" />
                    )}
                  </button>
                  <img src={item.image} alt={item.name} className="w-22 h-22 object-contain" />
                  <p className="mt-2 text-md text-black font-bold text-center">{item.name}</p>
                  <div className="flex gap-10 items-center mt-1">
                    <span className="text-gray-800 text-sm">{item.time}</span>
                    <div className="flex gap-1 items-center">
                      <img src={item.starimg} alt="" className="w-5 h-5" />
                      <span className="text-gray-800 text-md">{item.star}</span>
                    </div>
                  </div>
                  <div className="w-full flex mt-3 justify-between p-2">
                    <span className="font-bold text-xl text-gray-800">{item.price}</span>
                    <div className="absolute bottom-0 right-0 bg-yellow-500 rounded-tl-3xl rounded-br-2xl w-10 h-10 flex items-center justify-center">
                      <PlusIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* BACKDROP */}
      <div
        onClick={closeSheet}
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300
          ${selectedItem ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />
      {/* BOTTOM SHEET */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl
          transition-transform duration-500 max-h-[95vh] overflow-y-auto
          ${selectedItem ? "translate-y-0" : "translate-y-full"}`}
        style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
      >
        {selectedItem && (
          <>
            <div className="bg-yellow-500 rounded-t-3xl relative flex justify-center items-end pb-16 pt-6 min-h-[260px]">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/30 rounded-full" />
              <div className="absolute top-8 left-5 right-5 flex justify-between">
                <div className="flex gap-3 items-center justify-center">
                  <button
                    onClick={closeSheet}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  >
                    <ChevronLeftIcon className="w-5 h-5 text-white" />
                  </button>
                  <span className="font-medium text-white">Back</span>
                </div>
                <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">
                  <HeartIcon className="w-5 h-5 text-white" />
                </button>
              </div>
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-52 h-52 object-contain drop-shadow-2xl absolute -bottom-10 z-10"
              />
              <div className="absolute -bottom-1 left-0 right-0 h-12 bg-white rounded-t-[2.5rem]" />
            </div>
            <div className="bg-white px-6 pt-16 pb-12">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedItem.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{selectedItem.tagname}</p>
                </div>
                <div className="flex items-center gap-4 bg-gray-100 rounded-full px-3 py-2">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="font-bold text-xl text-gray-600">−</button>
                  <span className="font-bold">{quantity}</span>
                  <button onClick={() => setQuantity((q) => q + 1)} className="w-7 h-7 rounded-full bg-gray-800 text-white font-bold flex items-center justify-center">
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex gap-10 mt-3 text-xs items-center text-gray-400">
                <div className="flex gap-2 items-center">
                  <img src={star} className="w-5 h-5" alt="" />
                  <span className="font-bold text-sm text-gray-800">{selectedItem.star}</span>
                </div>
                <div className="flex gap-1.5 items-center">
                  <TagIconSolid className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium text-md text-gray-700">{selectedItem.deliveryStats}</span>
                </div>
                <span className="font-bold text-sm text-gray-800">{selectedItem.time}</span>
              </div>
              <p className="text-md text-gray-800 mt-4 leading-relaxed">{selectedItem.description}</p>
              <div className="flex gap-2">
                <button className="flex gap-1 justify-center items-center mt-3 text-md font-semibold text-green-700 mt-4">Customize</button>
              </div>
              <div className="flex justify-between items-center mt-8">
                <div className="flex flex-col mt-2 gap-2">
                  <p className="text-md text-gray-400">Total amount</p>
                  <p className="text-3xl font-bold text-gray-900">
                    GH₵{(parseFloat(selectedItem.price.replace("GH₵", "")) * quantity).toFixed(2)}
                  </p>
                </div>
                <button className="bg-yellow-500 text-white px-8 py-4 mt-10 rounded-2xl font-bold">Add to cart</button>
              </div>
            </div>
          </>
        )}
      </div>
      <DeliveryBottomNavbar />
    </div>
  );
}
export default DeliveryMainpage;