import React, { useState, useEffect } from "react";
import "../styles/watchCart.css";

interface Prize {
  size: string;
  price: number;
}

interface Product {
  id: number;
  image: string;
  name: string;
  prizing: Prize[];
  rating: number;
  type: string;
  modelNumber: string;
  description: string;
  color: string;
}

interface CartItem {
  id: number;
  image: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    image: "../Resource/purple.jfif",
    name: "Classy Modern Smart watch",
    prizing: [
      { size: "XXS", price: 100 },
      { size: "XS", price: 200 },
      { size: "S", price: 300 },
      { size: "M", price: 400 },
    ],
    rating: 4,
    type: "watch",
    modelNumber: "NXd112455",
    description:
      "1 ATM Water Resistant, 1 Year Warranty on Watch Movement, 1 Year Warranty for Battery, 6 Months Warranty on Strap Against Any Manufacturing Defects from the Date of Purchase",
    color: "#816BFF",
  },
  {
    id: 2,
    image: "../Resource/cyan.jfif",
    name: "Super Classy Modern Smart watch",
    prizing: [
      { size: "XXS", price: 100 },
      { size: "XS", price: 200 },
      { size: "S", price: 300 },
      { size: "M", price: 400 },
    ],
    rating: 5,
    type: "watch",
    modelNumber: "NXd112455",
    description:
      "2 ATM Water Resistant, 1 Year Warranty on Watch Movement, 1 Year Warranty for Battery, 6 Months Warranty on Strap Against Any Manufacturing Defects from the Date of Purchase.",
    color: "#1FCEC9",
  },
  {
    id: 3,
    image: "../Resource/blue.jfif",
    name: "Ultra Classy Modern Smart watch",
    prizing: [
      { size: "XXS", price: 100 },
      { size: "XS", price: 200 },
      { size: "S", price: 300 },
      { size: "M", price: 400 },
    ],
    rating: 3,
    type: "watch",
    modelNumber: "NXd112455",
    description:
      "3 ATM Water Resistant, 1 Year Warranty on Watch Movement, 1 Year Warranty for Battery, 6 Months Warranty on Strap Against Any Manufacturing Defects from the Date of Purchase, Battery Type: CR2032.",
    color: "#4B97D3",
  },
  {
    id: 4,
    image: "../Resource/black.jfif",
    name: "Western Modern Smart watch",
    prizing: [
      { size: "XXS", price: 100 },
      { size: "XS", price: 200 },
      { size: "S", price: 300 },
      { size: "M", price: 400 },
    ],
    rating: 3,
    type: "watch",
    modelNumber: "NXd112455",
    description:
      "3 ATM Water Resistant, 1 Year Warranty on Watch Movement, 1 Year Warranty for Battery, 6 Months Warranty on Strap Against Any Manufacturing Defects from the Date of Purchase, Battery Type: CR2032.",
    color: "#000000",
  },
];

const WatchCart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    setSelectedProduct(products[0]);
  }, []);

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const addToCart = () => {
    if (!selectedProduct || !selectedSize) {
      alert("Please select a color and size.");
      return;
    }

    if (quantity <= 0) {
      alert("Please increment the quantity to add to cart.");
      return;
    }

    const cartItem: CartItem = {
      id: Date.now(),
      image: selectedProduct.image,
      name: selectedProduct.name,
      color: selectedProduct.color,
      size: selectedSize,
      quantity,
    };

    setCart([...cart, cartItem]);
    setQuantity(0);
  };

  const increaseQuantity = () => {
    if (!selectedProduct || !selectedSize) {
      alert("Please select a color and size.");
      return;
    }

    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (!selectedProduct || !selectedSize) {
      alert("Please select a color and size.");
      return;
    }

    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    let totalQuantity = 0;

    cart.forEach((item) => {
      const product = products.find((product) => product.color === item.color);
      if (product) {
        const price =
          product.prizing.find((prize) => prize.size === item.size)?.price || 0;
        totalPrice += price * item.quantity;
        totalQuantity += item.quantity;
      }
    });

    return { totalPrice, totalQuantity };
  };

  const { totalPrice, totalQuantity } = calculateTotalPrice();

  return (
    <div className="min-h-screen min-w-screen overflow-hidden p-[20px] md:p-[50px]">
      <div className="flex justify-around items-center">
        <div>
          <div className="flex md:flex-row flex-col justify-between items-center">
            <div className="md:mr-28 mr-[50px]">
              {selectedProduct && (
                <img
                  src={selectedProduct.image}
                  alt="Watch image"
                  className="rounded-lg bg-gray-100 lg:max-w-[630px] lg:max-h-[730px]"
                />
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-[#364A63] text-[40px] sm:pr-12">
                {selectedProduct.name}
              </p>
              <section
                aria-labelledby="information-heading"
                className="my-30px"
              >
                <div>
                  <h4 className="sr-only">Reviews</h4>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`size-5 shrink-0 ${
                            i < selectedProduct.rating
                              ? "text-[#FFD200]"
                              : "text-gray-200"
                          }`}
                          viewBox="0 0 18 19"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M16.4633 7.75627C16.374 7.48702 16.1438 7.28827 15.8625 7.24627L15.8588 7.24552L11.5845 6.62077L9.67275 2.74777C9.53475 2.51602 9.285 2.36377 9 2.36377C8.715 2.36377 8.466 2.51602 8.3295 2.74402L8.32725 2.74777L6.4155 6.62077L2.14125 7.24552C1.776 7.30027 1.5 7.61152 1.5 7.98802C1.5 8.19877 1.587 8.38852 1.7265 8.52502L4.8195 11.5378L4.08975 15.7925C4.083 15.8308 4.07925 15.8743 4.07925 15.9193C4.07925 16.3333 4.41525 16.6693 4.82925 16.6693C4.95675 16.6693 5.0775 16.637 5.1825 16.5808L5.17875 16.583L9.00075 14.5723L12.8228 16.583C12.924 16.637 13.044 16.6693 13.1723 16.6693C13.5863 16.6693 13.9223 16.3333 13.9223 15.9193C13.9223 15.8743 13.9185 15.8308 13.911 15.788L13.9118 15.7925L13.182 11.5378L16.275 8.52502C16.4145 8.38852 16.5015 8.19877 16.5015 7.98802C16.5015 7.90552 16.488 7.82527 16.4633 7.75102L16.4648 7.75627H16.4633Z" />
                        </svg>
                      ))}
                    </div>
                    <p>({selectedProduct.rating} Reviews)</p>
                  </div>
                </div>
              </section>
              <p className="text-[#8091A7] text-[20px] line-through">99</p>

              <p className="text-[#6576FF] text-[24px] font-[700]">79</p>
              <p
                className="my-[30px] text-[#8091A7] text-[18px]"
                id="watchDescription"
              >
                {selectedProduct.description}
              </p>
              <div className="flex">
                <div>
                  <p className="text-[#8091A7] text-[14px]">Type</p>
                  <p
                    className="watchType text-[#364A63] text-[16px] font-bold"
                    id="type"
                  >
                    {selectedProduct.type}
                  </p>
                </div>
                <div className="ml-[20px]">
                  <p className="text-[#8091A7] text-[14px]">Model Number</p>
                  <p
                    className="watchModel text-[#364A63] text-[16px] font-bold"
                    id="modelNumber"
                  >
                    {selectedProduct.modelNumber}
                  </p>
                </div>
              </div>
              <section aria-labelledby="options-heading" className="mt-10">
                <h3 id="options-heading" className="sr-only"></h3>
                <form id="productForm">
                  <fieldset aria-label="Choose a color">
                    <legend className="text-[#364A63] text-[18px] font-bold">
                      Band Color
                    </legend>
                    <div className="mt-4 flex items-center gap-x-3">
                      {["#816BFF", "#1FCEC9", "#4B97D3", "#000000"].map(
                        (color) => (
                          <label
                            key={color}
                            aria-label={color}
                            className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-${color} focus:outline-none ${
                              selectedProduct.color === color
                                ? "bg-gray-200"
                                : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name="color-choice"
                              value={color}
                              className="sr-only"
                              checked={selectedProduct.color === color}
                              onChange={() =>
                                setSelectedProduct(
                                  products.find(
                                    (product) => product.color === color
                                  )!
                                )
                              }
                            />
                            <span
                              aria-hidden="true"
                              className={`w-[16px] h-[16px] rounded-full border border-${color} bg-${color}`}
                            ></span>
                          </label>
                        )
                      )}
                    </div>
                  </fieldset>
                </form>
              </section>
              <fieldset className="mt-10" aria-label="Choose a size">
                <legend className="text-[#364A63] text-[18px] font-bold">
                  Wrist Size
                </legend>
                <div className="lg:max-w-[75%]">
                  <div className="mt-4 grid grid-cols-4 gap-4" id="sizeOptions">
                    {selectedProduct.prizing.map((prize) => (
                      <label
                        key={prize.size}
                        className={`relative flex items-center justify-center rounded-md border py-[18px] px-[8px] uppercase hover:bg-gray-50 focus:outline-none cursor-pointer ${
                          selectedSize === prize.size ? "bg-gray-200" : ""
                        }`}
                        onClick={() => handleSizeChange(prize.size)}
                      >
                        <input
                          type="radio"
                          name="size-choice"
                          value={prize.size}
                          className="sr-only"
                        />
                        <span className="text-[13px]">
                          <span
                            className={`mr-[5px] font-bold size-text ${
                              selectedSize === prize.size
                                ? "text-[#6576FF]"
                                : "text-[#364A63]"
                            }`}
                          >
                            {prize.size}
                          </span>
                          <span className="text-[#8091A7]">${prize.price}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </fieldset>
              <div className="flex flex-row items-center mt-6">
                <div id="counter" className="flex items-start">
                  <div>
                    <button
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-[#8091A7] ring-1 ring-inset ring-[#DBDFEA] hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      type="button"
                      onClick={decreaseQuantity}
                    >
                      <svg
                        width="15"
                        height="20"
                        viewBox="0 0 14 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      ></svg>
                    </button>

                    <div className="lg:max-w-[75%]">
                      <div
                        className="mt-4 grid grid-cols-4 gap-4"
                        id="sizeOptions"
                      >
                        {selectedProduct.prizing.map((prize) => (
                          <label
                            key={prize.size}
                            className={`relative flex items-center justify-center rounded-md border py-[18px] px-[8px] uppercase hover:bg-gray-50 focus:outline-none cursor-pointer ${
                              selectedSize === prize.size ? "bg-gray-200" : ""
                            }`}
                            onClick={() => handleSizeChange(prize.size)}
                          >
                            <input
                              type="radio"
                              name="size-choice"
                              value={prize.size}
                              className="sr-only"
                            />
                            <span className="text-[13px]">
                              <span
                                className={`mr-[5px] font-bold size-text ${
                                  selectedSize === prize.size
                                    ? "text-[#6576FF]"
                                    : "text-[#364A63]"
                                }`}
                              >
                                {prize.size}
                              </span>
                              <span className="text-[#8091A7]">
                                ${prize.price}
                              </span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-row items-center mt-6">
                      <div id="counter" className="flex items-start">
                        <div>
                          <button
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-[#8091A7] ring-1 ring-inset ring-[#DBDFEA] hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            type="button"
                            onClick={decreaseQuantity}
                          >
                            <svg
                              width="15"
                              height="20"
                              viewBox="0 0 14 2"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.1607 1.675H1.03926C0.825977 1.675 0.642318 1.60391 0.488281 1.46172C0.346094 1.30768 0.275 1.12402 0.275 0.910742C0.275 0.70931 0.346094 0.5375 0.488281 0.395312C0.642318 0.241276 0.825977 0.164257 1.03926 0.164257H13.1607C13.374 0.164257 13.5518 0.241276 13.6939 0.395312C13.848 0.5375 13.925 0.70931 13.925 0.910742C13.925 1.12402 13.848 1.30768 13.6939 1.46172C13.5518 1.60391 13.374 1.675 13.1607 1.675Z"
                                fill="#8091A7"
                              />
                            </svg>
                          </button>
                        </div>
                        <div>
                          <span
                            id="quantity"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-[#8091A7] ring-1 ring-inset ring-[#DBDFEA] hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            {quantity}
                          </span>
                        </div>
                        <div>
                          <button
                            className="relative hidden items-center px-4 py-2 text-sm font-semibold text-[#8091A7] ring-1 ring-inset ring-[#DBDFEA] hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                            type="button"
                            onClick={increaseQuantity}
                          >
                            <svg
                              width="15"
                              height="20"
                              viewBox="0 0 14 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.1607 6.16426C13.374 6.16426 13.5518 6.24128 13.6939 6.39531C13.848 6.5375 13.925 6.70931 13.925 6.91074C13.925 7.12402 13.848 7.30768 13.6939 7.46172C13.5518 7.60391 13.374 7.675 13.1607 7.675H7.86426V12.9893C7.86426 13.1907 7.78724 13.3684 7.6332 13.5225C7.49102 13.6646 7.31328 13.7357 7.1 13.7357C6.88672 13.7357 6.70306 13.6646 6.54902 13.5225C6.40684 13.3684 6.33574 13.1907 6.33574 12.9893V7.675H1.03926C0.825977 7.675 0.642318 7.60391 0.488281 7.46172C0.346094 7.30768 0.275 7.12402 0.275 6.91074C0.275 6.70931 0.346094 6.5375 0.488281 6.39531C0.642318 6.24128 0.825977 6.16426 1.03926 6.16426H6.33574V0.849999C6.33574 0.636718 6.40684 0.458984 6.54902 0.316796C6.70306 0.16276 6.88672 0.0857416 7.1 0.0857416C7.31328 0.0857416 7.49102 0.16276 7.6332 0.316796C7.78724 0.458984 7.86426 0.636718 7.86426 0.849999V6.16426H13.1607Z"
                                fill="#8091A7"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <button
                        id="addToBag"
                        type="button"
                        onClick={addToCart}
                        className="mx-4 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Add to Cart
                      </button>
                      <span>
                        <svg
                          width="19"
                          height="16"
                          viewBox="0 0 19 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.5 15.3729C9.39102 15.3729 9.28809 15.3547 9.19121 15.3184C9.10645 15.2699 9.02773 15.2154 8.95508 15.1549L2.39785 8.59766C1.96191 8.14961 1.6168 7.63496 1.3625 7.05371C1.1082 6.46035 0.981055 5.83066 0.981055 5.16465C0.981055 4.48652 1.1082 3.85684 1.3625 3.27559C1.6168 2.68223 1.96191 2.16758 2.39785 1.73164C2.83379 1.28359 3.34844 0.932422 3.9418 0.678125C4.53516 0.423828 5.16484 0.296679 5.83086 0.296679C6.49687 0.296679 7.12656 0.423828 7.71992 0.678125C8.31328 0.932422 8.82793 1.28359 9.26387 1.73164L9.5 1.96777L9.73613 1.71348C10.1721 1.27754 10.6807 0.932422 11.2619 0.678125C11.8553 0.423828 12.485 0.296679 13.151 0.296679C13.1631 0.296679 13.1691 0.296679 13.1691 0.296679C13.1813 0.296679 13.1873 0.296679 13.1873 0.296679C13.8533 0.296679 14.477 0.423828 15.0582 0.678125C15.6516 0.932422 16.1662 1.28359 16.6021 1.73164C17.0381 2.16758 17.3832 2.68223 17.6375 3.27559C17.8918 3.85684 18.0189 4.48652 18.0189 5.16465C18.0189 5.83066 17.8918 6.46035 17.6375 7.05371C17.3832 7.63496 17.0381 8.14961 16.6021 8.59766L10.0449 15.1549C9.97227 15.2154 9.8875 15.2699 9.79063 15.3184C9.70586 15.3547 9.60898 15.3729 9.5 15.3729ZM5.83086 1.85879C4.92266 1.85879 4.1416 2.17969 3.4877 2.82148C2.8459 3.46328 2.525 4.24434 2.525 5.16465C2.525 5.6127 2.60977 6.04258 2.7793 6.4543C2.96094 6.85391 3.19707 7.19902 3.4877 7.48965L9.5 13.502L15.5123 7.48965C15.8029 7.19902 16.033 6.85391 16.2025 6.4543C16.3842 6.04258 16.475 5.6127 16.475 5.16465C16.475 4.70449 16.3842 4.27461 16.2025 3.875C16.033 3.47539 15.8029 3.12422 15.5123 2.82148C15.2096 2.51875 14.8584 2.28262 14.4588 2.11309C14.0592 1.94355 13.6354 1.85879 13.1873 1.85879C13.1752 1.85879 13.1691 1.85879 13.1691 1.85879C12.709 1.85879 12.2791 1.94355 11.8795 2.11309C11.4799 2.28262 11.1348 2.51875 10.8441 2.82148H10.826L10.0449 3.60254C9.97227 3.6752 9.8875 3.73574 9.79063 3.78418C9.70586 3.82051 9.60898 3.83867 9.5 3.83867C9.39102 3.83867 9.28809 3.82051 9.19121 3.78418C9.10645 3.73574 9.02773 3.6752 8.95508 3.60254L8.17402 2.82148C7.87129 2.51875 7.52012 2.28262 7.12051 2.11309C6.7209 1.94355 6.29102 1.85879 5.83086 1.85879Z"
                            fill="#6576FF"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-2xl font-bold">Cart Items</h2>
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2">Image</th>
                      <th className="py-2">Name</th>
                      <th className="py-2">Color</th>
                      <th className="py-2">Size</th>
                      <th className="py-2">Quantity</th>
                      <th className="py-2">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr
                        key={item.id}
                        className="bg-white border-b transition duration-300 text-[#364A63] ease-in-out hover:bg-gray-100"
                      >
                        <td className="py-6 whitespace-nowrap">
                          <img
                            src={item.image}
                            alt={item.color}
                            className="w-[36px] height-[36px] rounded-lg"
                          />
                        </td>
                        <td className="py-6 whitespace-nowrap">{item.name}</td>
                        <td className="py-6 whitespace-nowrap">{item.color}</td>
                        <td className="py-6 whitespace-nowrap">{item.size}</td>
                        <td className="py-6 whitespace-nowrap">
                          {item.quantity}
                        </td>
                        <td className="py-6 whitespace-nowrap">
                          $
                          {item.quantity *
                            (products
                              .find((product) => product.color === item.color)
                              ?.prizing.find(
                                (prize) => prize.size === item.size
                              )?.price || 0)}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-white border-t transition duration-300 text-[#364A63] ease-in-out hover:bg-gray-100">
                      <td
                        className="py-6 whitespace-nowrap font-bold"
                        colSpan={4}
                      >
                        Total
                      </td>
                      <td className="font-extrabold py-6 whitespace-nowrap">
                        {totalQuantity}
                      </td>
                      <td className="font-extrabold py-6 whitespace-nowrap">
                        ${totalPrice.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchCart;
