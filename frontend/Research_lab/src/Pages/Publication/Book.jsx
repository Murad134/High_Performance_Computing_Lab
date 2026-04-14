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

  // 🔥 Group books by year
  const groupedBooks = books.reduce((acc, book) => {
    const year = book.year || "Unknown";
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(book);
    return acc;
  }, {});

  // 🔥 Sort years (latest first)
  const sortedYears = Object.keys(groupedBooks).sort((a, b) => b - a);

  if (isLoading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center py-20 text-red-500">Error loading data</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <h2 className="text-3xl font-extrabold text-slate-800 mb-10 tracking-tight">
        📚 Book Chapters
      </h2>

      {sortedYears.map((year) => (
        <div key={year} className="mb-12">

          {/* 🔥 Year Divider (Styled) */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>

            <h3 className="px-4 py-1 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow">
              {year}
            </h3>

            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          </div>

          {/* Books List */}
          <div className="space-y-6">
            {groupedBooks[year].map((book) => (
              <div
                key={book._id}
                className="group p-5 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Title */}
                <h4 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition">
                  {book.title}
                </h4>

                {/* Authors */}
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {book.authors?.map((a) =>
                    typeof a === "string" ? a : a.name
                  ).join(", ")}
                </p>

                {/* Info */}
                <p className="text-sm text-slate-500 mt-2">
                  {book.publisher && (
                    <span className="font-medium">{book.publisher}</span>
                  )}
                  {book.conference && (
                    <>
                      {" "}
                      · <span>{book.conference}</span>
                    </>
                  )}
                  {book.location && (
                    <>
                      {" "}
                      · <span>{book.location}</span>
                    </>
                  )}
                </p>

                {/* Bottom Section */}
                <div className="flex items-center justify-between mt-4">

                  {/* Year badge */}
                  <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded">
                    {book.year}
                  </span>

                  {/* Link */}
                  {book.link && (
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                    >
                      View →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}