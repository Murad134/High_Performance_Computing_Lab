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
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Heading Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal-600 mb-4">
            Featured Publications
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our latest research publications and academic contributions
          </p>
        </div>

        {/* Publications Grid - Equal Height Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {latestJournals.map((pub) => (
            <div
              key={pub._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
            >
              {/* HEADER */}
              <div className="p-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span className="font-semibold text-sm">
                    {pub.journalName || "Journal"}
                  </span>
                </div>
              </div>

              {/* CONTENT - Flex grow to fill space */}
              <div className="p-6 flex flex-col flex-1">

                {pub.month && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full w-fit mb-3">
                    {pub.month} {pub.year}
                  </span>
                )}

                <h3 className="text-lg font-bold mb-3 line-clamp-2 text-gray-800 leading-tight flex-shrink-0">
                  {pub.title}
                </h3>

                {/* AUTHORS */}
                <p className="text-sm text-gray-600 mb-3 flex-shrink-0">
                  {pub.authors?.map((a) => a.name).join(", ")}
                </p>

                {/* ABSTRACT - Flex grow to fill remaining space */}
                <p className="text-gray-700 mb-4 line-clamp-3 text-sm leading-relaxed flex-1">
                  {pub.abstract || "No abstract available"}
                </p>

                {/* BUTTON - Always at bottom */}
                <div className="mt-auto">
                  <a
                    href={getLink(pub)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors duration-200 text-sm font-medium"
                  >
                    Read More
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW ALL */}
        <div className="text-center">
          <a
            href="/research/publications/journal"
            className="inline-block bg-teal-600 text-white py-3 px-8 rounded-lg hover:bg-teal-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
          >
            View All Publications
          </a>
        </div>

      </div>
    </section>
  );
};

export default Journal;