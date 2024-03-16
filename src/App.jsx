import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import { CiTimer } from "react-icons/ci";
import { FaFire } from "react-icons/fa";
import Header from "./Components/Header/Header";
import Banner from "./Components/Banner/Banner";

function App() {
  const [foods, setfoods] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [cookCount, setCookCount] = useState(0);
  // let count = 0;
  useEffect(() => {
    fetch("Recips.json")
      .then((res) => res.json())
      .then((data) => setfoods(data));
  }, []);
  const handleAddCart = (food) => {
    // console.log(food)
    setCartItem([...cartItem, food]); 
    // const cookCount = document.getElementById("cook-count");
    // count = count + 1;
    // cookCount.innerText = count;
    setCookCount(cookCount + 1);
  };
  // console.log(cartItem);
  return (
    <>
      <Header></Header>
      <Banner></Banner>
      <section className="flex justify-between gap-8 mx-10">
        <div className="grid grid-cols-2 gap-4">
          {foods.map((food) => {
            const {
              recipe_name,
              recipe_image,
              short_description,
              ingredients,
              preparing_time,
              calories,
            } = food;
            return (
              <div key={food.id} className="card bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                  <img src={recipe_image} alt="Recipe" className="rounded-xl" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-xl font-semibold">
                    {recipe_name}
                  </h2>
                  <p className="text-base font-normal">{short_description}</p>
                  <hr />
                  <div className="py-3 space-y-2">
                    <h3 className="text-lg font-medium">
                      Ingredients : {food.ingredients.length}
                    </h3>

                    {ingredients.map((ingredient) => {
                      return (
                        <li key={ingredient.id} className="ml-4">
                          {ingredient}
                        </li>
                      );
                    })}
                  </div>
                  <div className="flex justify-between py-3">
                    <div className="flex items-center gap-2">
                      <span>
                        <CiTimer />
                      </span>
                      <h2 className="text-base font-normal">
                        {preparing_time}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>
                        <FaFire />
                      </span>
                      <h2 className="text-base font-normal">{calories}</h2>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddCart(food)}
                    className="btn bg-green-400 text-black rounded-full w-36"
                  >
                    Want to Cook
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border p-3 rounded-xl">
          <h1 className="text-2xl font-semibold text-center border-b border-gray-200 pb-3">
            Want to cook: <span  id="cook-count">{cookCount}</span>
          </h1>
          <div className="flex justify-center items-center gap-14 my-3 text-lg font-medium">
            <h3></h3>
            <h3>Name</h3>
            <h3>time</h3>
            <h3>Calories</h3>
            <h3></h3>
          </div>
          {cartItem.map((cart, index) => {
            const { recipe_name, preparing_time, calories } = cart;
            return (
              <div
                key={cart.id}
                className="bg-base-200 flex justify-center items-center gap-5 p-4 rounded-xl mb-3 text-base font-normal"
              >
                <h5>{index + 1}</h5>
                <h5>{recipe_name}</h5>
                <h5>{preparing_time}</h5>
                <h5>{calories}</h5>
                <button className="btn bg-green-400 text-black rounded-full w-28 text-base">
                  Preparing
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default App;
