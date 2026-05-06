import React from "react";
import { BookOpen, ExternalLink, Calendar, Users, MapPin, Building, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

export default function Books() {
  const axios = useAxios();

  const { data: books = [], isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axios.get("/books");
      return res.data;
    },
  });

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-teal-700 font-medium">Loading Book Publications...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-red-600 font-medium">Failed to load book publications</p>
        </div>
      </div>
    );
  }

  // Group books by year
  const groupedBooks = books.reduce((acc, book) => {
    const year = book.year || "Unknown";
    if (!acc[year]) acc[year] = [];
    acc[year].push(book);
    return acc;
  }, {});

  // Sort years (latest first)
  const sortedYears = Object.keys(groupedBooks).sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Academic Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Book Publications
            </h1>
          </div>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Scholarly books and book chapters contributing to academic literature
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto rounded-full mt-6 shadow-sm"></div>
        </div>

        {/* Books by Year */}
        {sortedYears.map((year) => (
          <div key={year} className="mb-16">

            {/* Year Section Header */}
            <div className="flex items-center mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal-200 to-transparent"></div>

              <div className="mx-6 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl shadow-lg border border-teal-100">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                    {year}
                  </h2>
                  <span className="text-teal-100 text-sm font-medium">
                    ({groupedBooks[year].length} publication{groupedBooks[year].length !== 1 ? 's' : ''})
                  </span>
                </div>
              </div>

              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal-200 to-transparent"></div>
            </div>

            {/* Books Grid */}
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">

              {groupedBooks[year].map((book,) => (
                <div
                  key={book._id}
                  className="group bg-white border border-teal-100 rounded-2xl p-8 hover:shadow-2xl hover:shadow-teal-100/50 hover:border-teal-300 transition-all duration-500 hover:-translate-y-1"
                >

                  <div className="flex gap-6">

                    {/* Academic Icon */}
                    <div className="flex-shrink-0">
                      <div className="p-4 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <BookOpen className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight group-hover:text-teal-700 transition-colors duration-300">
                        {book.title}
                      </h3>

                      {/* Authors */}
                      <div className="flex items-start gap-2">
                        <Users className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-700 font-medium leading-relaxed">
                          {book.authors?.map((a) =>
                            typeof a === "string" ? a : a.name
                          ).join(", ")}
                        </p>
                      </div>

                      {/* Publication Details */}
                      <div className="flex flex-wrap gap-4 text-sm">

                        {/* Publisher */}
                        {book.publisher && (
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-cyan-600" />
                            <span className="text-slate-600 font-medium">{book.publisher}</span>
                          </div>
                        )}

                        {/* Conference */}
                        {book.conference && (
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-emerald-600" />
                            <span className="text-slate-600">{book.conference}</span>
                          </div>
                        )}

                        {/* Location */}
                        {book.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-amber-600" />
                            <span className="text-slate-600">{book.location}</span>
                          </div>
                        )}

                      </div>

                      {/* Publication Metadata */}
                      <div className="flex flex-wrap gap-3">
                        {book.isbn && (
                          <span className="px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-semibold border border-teal-200">
                            ISBN: {book.isbn}
                          </span>
                        )}

                        {book.pages && (
                          <span className="px-4 py-2 bg-cyan-50 text-cyan-700 rounded-full text-sm font-semibold border border-cyan-200">
                            Pages: {book.pages}
                          </span>
                        )}

                        {book.edition && (
                          <span className="px-4 py-2 bg-slate-50 text-slate-600 rounded-full text-sm font-semibold border border-slate-200">
                            {book.edition} Edition
                          </span>
                        )}
                      </div>

                      {/* Action Button */}
                      {book.link && (
                        <div className="pt-2">
                          <a
                            href={book.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl group/btn"
                          >
                            <span>View Publication</span>
                            <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      )}

                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Empty State */}
        {books.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-700 mb-2">No Book Publications Yet</h3>
            <p className="text-slate-500">Book publications will appear here once added to the system.</p>
          </div>
        )}

      </div>
    </div>
  );
}