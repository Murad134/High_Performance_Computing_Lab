import React from "react";
import ImageSlider from "../Pages/ImageSlider";
import ResearchInterest from "../Components/ResearchInterest";
function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r bg-purple-500 text-white py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Welcome to HPC Lab
        </h1>
        <p className="text-lg md:text-xl mb-6">
          High Performance Computing • Artificial Intelligence • Data Science
        </p>
        <a
          href="/about"
          className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
          Learn More
        </a>
      </section>

      {/* Quick Highlights */}
      <section className="py-16 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-3xl font-bold text-indigo-600">15+</h3>
          <p className="mt-2 text-gray-600">Years of Experience</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-3xl font-bold text-indigo-600">50+</h3>
          <p className="mt-2 text-gray-600">Publications</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-3xl font-bold text-indigo-600">20+</h3>
          <p className="mt-2 text-gray-600">Students Supervised</p>
        </div>
      </section>

      {/* About Snapshot */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          I am a professor at JUST specializing in High Performance Computing,
          Machine Learning, and Cloud Systems. My research focuses on scalable
          architectures and impactful applications.
        </p>
        <a
          href="/about"
          className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Read More
        </a>
      </section>
      <div>
        <h2 className="text-3xl font-bold text-center mb-8"> Awards & some Achievements pictures</h2>
        <ImageSlider />
      </div>
      {/* Research Interests */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">
          Research Interests
        </h2>
        <ResearchInterest />
      </section>

      {/* Featured Publications */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Publications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">
              Research Paper Title 1
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Short description of the research paper goes here.
            </p>
            <a href="/publication/research" className="text-indigo-600 hover:underline">
              Read More →
            </a>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">
              Research Paper Title 2
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Short description of the research paper goes here.
            </p>
            <a href="/publication/research" className="text-indigo-600 hover:underline">
              Read More →
            </a>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">
              Research Paper Title 3
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Short description of the research paper goes here.
            </p>
            <a href="/publication/research" className="text-indigo-600 hover:underline">
              Read More →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
