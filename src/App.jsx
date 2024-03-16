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
  const [currenCount, setCurrentCount] = useState(0);
  const [currentCartItem, setCurrentCartItem] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [time, setTime] = useState(0);
  const [calori,setCalories]=useState(0);

  // let count = 0;
  useEffect(() => {
    fetch("Recips.json")
      .then((res) => res.json())
      .then((data) => setfoods(data));
  }, []);
  const handleAddCart = (food) => {
    const isExist = cartItem.find((item) => item.recipe_id == food.recipe_id);
    if (!isExist) {
      setCartItem([...cartItem, food]);
      setCookCount(cookCount + 1);
    } else {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  };
  // console.log(cartItem);

  const handleDelete = (recipe_id, preparing_time,calories) => {
    const newCartItem = cartItem.filter((item) => item.recipe_id !== recipe_id);
    const deletedItem = cartItem.find((item) => item.recipe_id === recipe_id);
    setCartItem(newCartItem);
    setCookCount(cookCount - 1);
    setCurrentCount(currenCount + 1);
    setCurrentCartItem([...currentCartItem, deletedItem]);
    setTime(time + parseInt(preparing_time));
    setCalories(calori + parseInt(calories))
  };
  return (
    <>
      <div>
        {showToast && (
          <div className="toast  toast-top toast-end">
            <div className="alert alert-warning">
              <span>Item exist to cart.........!</span>
            </div>
          </div>
        )}{" "}
      </div>

      <Header></Header>
      <Banner></Banner>
      <section className="flex lg:justify-between flex-col lg:flex-row  lg:gap-8 gap-3 lg:mx-10 mx-5">
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
                    <h3 className=" text-base lg:text-lg font-medium">
                      Ingredients : {food.ingredients.length}
                    </h3>

                    {ingredients.map((ingredient) => {
                      return (
                        <li key={ingredient.id} className=" ml-3 lg:ml-4">
                          {ingredient}
                        </li>
                      );
                    })}
                  </div>
                  <div className="flex flex-col lg:flex-row lg:justify-between py-3">
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
                    className="btn bg-green-400 text-black rounded-full w-28 lg:w-36"
                  >
                    Want to Cook
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border p-3 rounded-xl">
          <div>
            <h1 className="text-2xl font-semibold text-center border-b border-gray-200 pb-3">
              Want to cook: <span id="cook-count">{cookCount}</span>
            </h1>
            <div className="flex justify-center items-center gap-14 my-3 text-lg font-medium">
              <h3></h3>
              <h3>Name</h3>
              <h3>time</h3>
              <h3>Calories</h3>
              <h3></h3>
            </div>
            {cartItem.map((cart, index) => {
              const { recipe_id, recipe_name, preparing_time, calories } = cart;
              return (
                <div
                  key={cart.id}
                  className="bg-base-200 flex justify-center items-center gap-5 p-4 rounded-xl mb-3 text-base font-normal"
                >
                  <h5>{index + 1}</h5>
                  <h5>{recipe_name}</h5>
                  <h5>{preparing_time}</h5>
                  <h5>{calories}</h5>
                  <button
                    onClick={() => handleDelete(recipe_id, preparing_time,calories)}
                    className="btn bg-green-400 text-black rounded-full w-28 text-base"
                  >
                    Preparing
                  </button>
                </div>
              );
            })}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-center border-b border-gray-200 pb-3">
              Currently cooking: <span>{currenCount}</span>
            </h1>
            <div className="flex justify-center items-center gap-14 my-3 text-lg font-medium">
              <h3></h3>
              <h3>Name</h3>
              <h3>time</h3>
              <h3>Calories</h3>
              <h3></h3>
            </div>
            {currentCartItem.map((currentcart, index) => {
              const { recipe_name, preparing_time, calories } = currentcart;
              return (
                <div
                  key={currentcart.id}
                  className="bg-base-200 flex justify-center items-center gap-5 p-4 rounded-xl mb-3 text-base font-normal"
                >
                  <h5>{index + 1}</h5>
                  <h5>{recipe_name}</h5>
                  <h5>{preparing_time}</h5>
                  <h5>{calories}</h5>
                </div>
              );
            })}
            <div className="flex justify-center items-center gap-14 my-3 text-xs font-normal mt-5">
              <h3 className="border border-info p-4 rounded-xl shadow-md ">
                Total Time: <span>{time} min</span>
              </h3>
              <h3 className="border border-info p-4 rounded-xl shadow-md">Total Calories:<span>{calori}</span></h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
