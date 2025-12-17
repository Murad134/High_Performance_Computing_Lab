import React from "react";
import ImageSlider from "../Components/ImageSlider"
import ReaserchInterest from "../Components/ResearchInterest";
import { Sparkles, ExternalLink, Award, BookOpen, Users, Brain, Database, TrendingUp } from "lucide-react";

function Home() {
  const publications = [
    {
      icon: <Brain className="w-6 h-6" />,
      category: "Machine Learning",
      color: "from-purple-400 to-indigo-500",
      title: "Deep Learning Architectures for Natural Language Processing",
      description: "A comprehensive analysis of transformer-based models and their applications in multilingual text understanding.",
      date: "December 2024",
      link: "/publication/research"
    },
    {
      icon: <Database className="w-6 h-6" />,
      category: "Data Science",
      color: "from-blue-400 to-cyan-500",
      title: "Big Data Analytics in Healthcare Systems",
      description: "Exploring advanced statistical methods and machine learning algorithms for patient outcome prediction.",
      date: "November 2024",
      link: "/publication/research"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      category: "High Performance Computing",
      color: "from-emerald-400 to-teal-500",
      title: "Scalable Cloud Architectures for Distributed Computing",
      description: "Investigating performance optimization strategies in modern cloud-based parallel computing systems.",
      date: "October 2024",
      link: "/publication/research"
    }
  ];

  return (

    <div className="pt-16">

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-cyan-300 text-white px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg text-red-500">
          Welcome to HPC Lab
        </h1>

        <p className="text-lg md:text-xl mb-8 max-w-3xl leading-relaxed text-blue-700">
          High Performance Computing • Artificial Intelligence • Data Science
        </p>

        <a
          href="/about"
          className="inline-block bg-yellow-400 text-blue-900 px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-yellow-500 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        >
          Learn More
        </a>
      </section>



      {/* Highlights */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {[
            { icon: <Award />, value: "15+", label: "Years of Experience", color: "indigo" },
            { icon: <BookOpen />, value: "50+", label: "Publications", color: "blue" },
            { icon: <Users />, value: "20+", label: "Students Supervised", color: "emerald" }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow hover:-translate-y-1 transition"
            >
              <div className={`w-16 h-16 flex items-center justify-center rounded-2xl mb-4 bg-${item.color}-600 text-white`}>
                {item.icon}
              </div>
              <h3 className={`text-4xl font-bold text-${item.color}-600`}>
                {item.value}
              </h3>
              <p className="text-gray-600">{item.label}</p>
            </div>
          ))}

        </div>
      </section>

      {/* About */}
      <section className="py-20 px-6 md:px-20 bg-indigo-50 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-600">
            About Me
          </h2>

          <p className="text-gray-700 text-lg mb-8">
            I am a professor at JUST specializing in High Performance Computing,
            Machine Learning, and Cloud Systems.
          </p>

          <a
            href="/about"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition"
          >
            Read More
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Image Slider */}
      <ImageSlider />

      {/* Research Interests */}
      <section className="py-20">
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-6 text-indigo-600">
          Research Interests
        </h2>
        <ReaserchInterest />
      </section>

      {/* Publications */}
      <section className="py-20 px-6 md:px-20 bg-gray-100">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-center text-4xl md:text-5xl font-bold mb-16">
            Featured Publications
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {publications.map((pub, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border hover:shadow-lg transition"
              >
                <div className={`p-6 bg-gradient-to-r ${pub.color} text-white`}>
                  <div className="flex items-center gap-2">
                    {pub.icon}
                    <span className="font-semibold">{pub.category}</span>
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-sm text-gray-500">{pub.date}</span>

                  <h3 className="text-xl font-bold mt-2 mb-3">
                    {pub.title}
                  </h3>

                  <p className="text-gray-600 mb-6">
                    {pub.description}
                  </p>

                  <a
                    href={pub.link}
                    className="inline-flex items-center gap-2 bg-indigo-500 text-white py-2 px-5 rounded-lg hover:bg-indigo-600 transition"
                  >
                    Read More
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/publication/research"
              className="inline-block border border-indigo-300 text-indigo-600 py-3 px-8 rounded-lg hover:bg-indigo-50 transition"
            >
              View All Publications
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;
