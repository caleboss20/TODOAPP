import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid, TagIcon as TagIconSolid } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import star from "./assets/star.jpg";
import chicken from "./assets/chicken.png";
import burger from "./assets/burger.png";
import cookie from "./assets/cookie.jpg";
import yoghurt from "./assets/yoghurt.jpg";
import fries from "./assets/fries.png";
// ✅ Same stable IDs as DeliveryMainpage — no duplicates in cart
const foodItems = [
  {
    id: "chicken001",
    name: "Chicken",
    tagname: "Caleboss Special ",
    image: chicken,
    deliveryStats: "Free delivery",
    time: "40 mins",
    star: "4.5",
    price: "GH₵35.0",
    description: "Freshly seasoned chicken, grilled to perfection with rich spices for a satisfying bite every time.",
  },
  {
    id: "burger002",
    name: "Cheese Burger",
    tagname: "Street Food Favorite ",
    image: burger,
    deliveryStats: "Fast delivery",
    time: "20min",
    star: "4.5",
    price: "GH₵30.0",
    description: "Classic beef burger stacked with lettuce, cheese and sauce.",
  },
  {
    id: "cookies003",
    name: "Cookies",
    tagname: "Freshly Baked Daily ",
    image: cookie,
    deliveryStats: "Fast delivery",
    time: "20min",
    star: "4.5",
    price: "GH₵20.0",
    description: "Freshly baked cookies with chocolate chips and a soft center.",
  },
  {
    id: "yoghurt004",
    name: "Yoghurt",
    tagname: "Healthy & Creamy ",
    image: yoghurt,
    deliveryStats: "Free delivery",
    time: "20min",
    star: "4.8",
    price: "GH₵12.0",
    description: "Creamy Greek yoghurt topped with honey and fresh fruits.",
  },
  {
    id: "fries005",
    name: "Fries",
    tagname: "Crispy Golden Cut ",
    image: fries,
    deliveryStats: "Fast delivery",
    time: "20min",
    star: "4.7",
    price: "GH₵37.0",
    description: "Crispy golden fries seasoned with our secret spice blend.",
  },
];
const defaultHistory = ["Chicken", "Cheese Burger", "Fries", "Cookies", "Yoghurt"];
function SearchPage({ addToCart, buttonState, cart }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [liked, setLiked] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);
  const results = query.trim().length === 0
    ? foodItems
    : foodItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const openSheet = (item) => {
    const existing = cart?.find((c) => c.id === item.id);
    setQuantity(existing ? existing.quantity : 1);
    setSelectedItem(item);
  };
  const closeSheet = () => setSelectedItem(null);
  return (
    <div>
      {/* Header */}
      <div className="items-center flex justify-between p-4">
        <button onClick={() => navigate(-1)}>
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h2 className="font-medium text-xl">Search</h2>
        <div></div>
      </div>
      {/* Search input */}
      <div className="pl-4 pr-2">
        <div
          className="border-1 border-gray-200 bg-[#fafafa] py-3 mt-8 mb-4
           gap-3 w-full items-center px-4 flex gap-2 rounded-4xl"
        >
          <MagnifyingGlassIcon className="w-6 h-6 text-gray-700" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for food"
            className="text-lg w-full text-gray-700 border-none outline-none flex-1"
          />
          {query.length > 0 && (
            <button onClick={() => setQuery("")}>
              <XCircleIcon className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>
      </div>
      {/* History record */}
      {query.trim().length === 0 && (
        <div className="pl-6 pr-4 mb-4">
          <span className="
          font-medium text-lg text-gray-900 ml-1">History record</span>
          <div className="flex flex-wrap
           gap-4 mt-5">
            {defaultHistory.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-4 py-1.5 
                rounded-full border bg-gray-50 
                border-gray-300 text-sm 
                text-gray-700 "
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* 2 column image grid */}
      <div className="px-3 pb-10">
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-24 gap-3 text-center">
            <span className="text-5xl"></span>
            <p className="font-bold text-gray-800 text-lg">Sorry we do not have {query}</p>
            <p className="text-sm text-gray-400">We couldn't find "{query}". Try something else.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-13 px-4 mt-10">
            {results.map((item) => (
              <div
                key={item.id}
                onClick={() => openSheet(item)}
                className="relative rounded-2xl overflow-hidden cursor-pointer active:scale-95 transition-transform"
              >
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                <button
                  onClick={(e) => toggleLike(item.id, e)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"
                >
                  {liked[item.id] ? (
                    <HeartIconSolid className="w-4 h-4 text-red-500" />
                  ) : (
                    <HeartIcon className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
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
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="font-bold text-xl text-gray-600"
                  >
                    -
                  </button>
                  <span className="font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-7 h-7 rounded-full bg-gray-800 text-white font-bold flex items-center justify-center"
                  >
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
                <button className="flex gap-1 justify-center items-center mt-3 text-md font-semibold text-green-700 mt-4">
                  Customize
                </button>
              </div>
              <div className="flex justify-between items-center mt-8">
                <div className="flex flex-col mt-2 gap-2">
                  <p className="text-md text-gray-400">Total amount</p>
                  <p className="text-2xl font-bold text-gray-900">
                    GH₵{(parseFloat(selectedItem.price.replace("GH₵", "")) * quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => addToCart(selectedItem, quantity)}
                  className={`flex gap-2 px-8 py-4 mt-10 rounded-2xl font-bold transition-all duration-300
                    ${buttonState[selectedItem?.id] ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}`}
                >
                  {buttonState[selectedItem?.id]
                    ? <><p>Added</p><ShoppingCartIcon className="w-6 h-6" /></>
                    : "Add to cart"
                  }
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default SearchPage;