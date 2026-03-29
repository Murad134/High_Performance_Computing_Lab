import React from "react";
import { FileText, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const Journal = () => {
  const axiosInstance = useAxios();

  const { data: journals = [], isLoading, isError } = useQuery({
    queryKey: ["journals"],
    queryFn: async () => {
      const res = await axiosInstance.get("/journals");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10 text-lg">Loading journals...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load journals
      </p>
    );
  }

  // ✅ CLEAN + SORT + LATEST 3
  const latestJournals = [...journals]
    .map((item) => ({
      ...item,
      // clean bad data (remove ",)
      title: item.title?.replace(/",/g, "").replace(/"$/, ""),
      doi: item.doi?.replace(/",/g, "").replace(/"$/, ""),
      articleUrl: item.articleUrl?.replace(/",/g, "").replace(/"$/, ""),
      year: Number(item.year),
    }))
    .sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return new Date(b.created_at) - new Date(a.created_at);
    })
    .slice(0, 3);

  // link finder
  const getLink = (pub) => {
    if (pub.doi) return `https://doi.org/${pub.doi}`;
    if (pub.pdfUrl) return pub.pdfUrl;
    if (pub.articleUrl) return pub.articleUrl;
    return "#";
  };

  return (
    <section className="py-20 px-6 md:px-20">
      <div className="mx-auto">

        <h2 className="text-center text-4xl md:text-5xl font-bold mb-16">
          Featured Publications
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {latestJournals.map((pub,) => (
            <div
              key={pub._id}
              className="bg-white rounded-2xl border hover:shadow-lg transition"
            >
              {/* HEADER */}
              <div className="p-6 bg-teal-400 text-white">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span className="font-semibold">
                    {pub.journalName || "Journal"}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">

                {pub.month && (
                    <span className="text-sm text-gray-500">
                        {pub.month} {pub.year}
                    </span>
                )}                    
                <h3 className="text-lg font-bold mt-2 mb-2 line-clamp-2">
                  {pub.title}
                </h3>

                {/* AUTHORS */}
                <p className="text-sm text-gray-500 mb-2">
                  {pub.authors?.map((a) => a.name).join(", ")}
                </p>

                {/* ABSTRACT */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {pub.abstract || "No abstract available"}
                </p>

                <a
                  href={getLink(pub)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-teal-400 text-white py-2 px-5 rounded-lg hover:bg-teal-600 transition"
                >
                  Read More
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW ALL */}
        <div className="mt-12 text-center">
          <a
            href="/research/publications/journal"
            className="inline-block border border-indigo-300 text-indigo-600 py-3 px-8 rounded-lg hover:bg-indigo-50 transition"
          >
            View All Publications
          </a>
        </div>

      </div>
    </section>
  );
};

export default Journal;