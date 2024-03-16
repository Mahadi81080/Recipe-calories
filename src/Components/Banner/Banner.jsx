const Banner = () => {
  return (
    <section className="mx-10 mb-5">
      <div className="bg-[url('https://i.postimg.cc/cCkxJcg7/Rectangle-1.jpg')] bg-cover bg-center h-[500px] text-center flex justify-center items-center rounded-xl">
        <div className="space-y-5">
          <h3 className="text-3xl lg:text-5xl font-gramond font-extrabold text-white">
            Discover an exceptional cooking <br /> class tailored for you!
          </h3>
          <p className="font-poppins text-white w-2/3 mx-auto text-xs lg:text-lg">
            Learn and Master Basic Programming, Data Structures, Algorithm, OOP,
            Database and solve 500+ coding problems to become an exceptionally
            well world-class Programmer.
          </p>
          <button className="btn bg-green-400 text-black rounded-full text-base px-8 lg:mr-5">
          Explore Now
          </button>
          <button className="btn btn-outline text-white rounded-full px-8">Our Feedback</button>
        </div>
      </div>
      <div className="py-16 text-center space-y-2">
          <h3 className="text-4xl text-black font-extrabold font-gramond">
          Our Recipes
          </h3>
          <p className="max-w-3xl mx-auto font-poppins">
          Lorem ipsum dolor sit amet consectetur. Proin et feugiat senectus vulputate netus pharetra rhoncus. Eget urna volutpat curabitur elementum mauris aenean neque. 
          </p>
        </div>
    </section>
  );
};

export default Banner;
