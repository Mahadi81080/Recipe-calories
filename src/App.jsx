import { useEffect } from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const [foods, setfoods] = useState([]);
  useEffect(() => {
    fetch("Recips.json")
      .then((res) => res.json())
      .then((data) => setfoods(data));
  }, []);
  console.log(foods);
  return (
    <>
      <section className="flex justify-between gap-5">
        <div className="grid grid-cols-2 gap-4">
          {foods.map((food) => {
            const{recipe_name,recipe_image,short_description,ingredients,preparing_time,calories}=food;
            return (
              <div  key={food.id} className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                  <img
                    src={recipe_image}
                    alt="Recipe"
                    className="rounded-xl"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-xl font-semibold">{recipe_name}</h2>
                  <p className="text-base font-normal">{short_description}</p>
                  <div>
                    <h3 className="text-lg font-medium">Ingredients : {food.ingredients.length}</h3>
                    {
                      ingredients.map(ingredient=>{console.log(ingredient)})
                    }

                  </div>
                  <div className="card-actions">
                    <button className="btn bg-green-400 text-black rounded-full">Want to Cook</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div></div>
      </section>
    </>
  );
}

export default App;
