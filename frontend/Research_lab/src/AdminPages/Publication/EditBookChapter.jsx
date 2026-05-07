import React, { useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function AddPublication() {
    const axios = useAxiosSecure();
    const queryClient = useQueryClient();
    const formRef = useRef(null);
    const [editingId, setEditingId] = useState(null);

    const { register, control, handleSubmit, reset, setValue } = useForm({
        defaultValues: { authors: [{ name: "" }] },
    });

    const { fields, append, remove, replace } = useFieldArray({ control, name: "authors" });

    // ── Fetch all books ──
    const { data: books = [], isLoading } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            const res = await axios.get("/books");
            return res.data;
        },
    });

    // ── Add ──
    const addMutation = useMutation({
        mutationFn: async (data) => {
            const res = await axios.post("/books", data);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({ title: "✅ Success!", text: "Book chapter added successfully.", icon: "success", confirmButtonColor: "#2563eb" });
            queryClient.invalidateQueries(["books"]);
            reset({ authors: [{ name: "" }] });
            setEditingId(null);
        },
        onError: (error) => {
            Swal.fire({ title: "❌ Error", text: error?.response?.data?.message || "Something went wrong!", icon: "error", confirmButtonColor: "#dc2626" });
        },
    });

    // ── Update ──
    const updateMutation = useMutation({
        mutationFn: async ({ id, data }) => {
            const res = await axios.put(`/books/${id}`, data);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({ title: "✅ Updated!", text: "Book chapter updated successfully.", icon: "success", confirmButtonColor: "#2563eb" });
            queryClient.invalidateQueries(["books"]);
            reset({ authors: [{ name: "" }] });
            setEditingId(null);
        },
        onError: (error) => {
            Swal.fire({ title: "❌ Error", text: error?.response?.data?.message || "Update failed!", icon: "error", confirmButtonColor: "#dc2626" });
        },
    });

    // ── Delete ──
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axios.delete(`/books/${id}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({ title: "Deleted!", text: "Book chapter removed.", icon: "success", confirmButtonColor: "#2563eb" });
            queryClient.invalidateQueries(["books"]);
        },
        onError: () => {
            Swal.fire({ title: "❌ Error", text: "Delete failed!", icon: "error", confirmButtonColor: "#dc2626" });
        },
    });

    // ── Submit ──
    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            year: Number(data.year),
            authors: data.authors.map((a) => a.name),
        };

        const isEdit = !!editingId;

        Swal.fire({
            title: isEdit ? "Update this book?" : "Add this book?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: isEdit ? "#f59e0b" : "#2563eb",
            cancelButtonColor: "#6b7280",
            confirmButtonText: isEdit ? "Yes, update!" : "Yes, add it!",
        }).then((result) => {
            if (result.isConfirmed) {
                isEdit
                    ? updateMutation.mutate({ id: editingId, data: formattedData })
                    : addMutation.mutate(formattedData);
            }
        });
    };

    // ── Edit ──
    const handleEdit = (book) => {
        setEditingId(book._id);
        setValue("title", book.title || "");
        setValue("year", book.year || "");
        setValue("publicationType", book.publicationType || "Conference Paper");
        setValue("publisher", book.publisher || "");
        setValue("conference", book.conference || "");
        setValue("location", book.location || "");
        setValue("link", book.link || "");
        const authorFields = Array.isArray(book.authors)
            ? book.authors.map((a) => ({ name: typeof a === "string" ? a : a.name }))
            : [{ name: "" }];
        replace(authorFields);
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // ── Delete ──
    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete this book?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete!",
        }).then((result) => {
            if (result.isConfirmed) deleteMutation.mutate(id);
        });
    };

    // ── Cancel Edit ──
    const handleCancelEdit = () => {
        setEditingId(null);
        reset({ authors: [{ name: "" }] });
    };

    const isPending = addMutation.isPending || updateMutation.isPending;

    return (
        <div className="min-h-screen ">
            <div className="mx-auto space-y-5">

                {/* ══════════ FORM ══════════ */}
                <div ref={formRef}>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
                        <section>
                            <div className="flex items-center justify-center  gap-2 mb-1">
                                <h3 className="text-xl text-blue-700 font-bold  uppercase tracking-widest">Basic Information</h3>
                            </div>
                            <div className="h-px bg-slate-100 mb-4" />
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm  font-semibold  mb-1">
                                        Book Title
                                    </label>
                                    <input
                                        {...register("title")}

                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold  mb-1">
                                        Year
                                    </label>
                                    <input
                                        {...register("year")}
                                        type="number"

                                        min="1900" max="2100"
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-700 font-semibold  mb-1">
                                        Publication Type
                                    </label>
                                    <select
                                        {...register("publicationType")}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    >
                                        <option value="Conference Paper">Conference Paper</option>
                                        <option value="Journal">Journal</option>
                                        <option value="Book Chapter">Book Chapter</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* ── 2. Publication Details ── */}
                        <section>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest">Publication Details</h3>
                            </div>
                            <div className="h-px bg-slate-100 mb-4" />
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold  mb-1">Publisher</label>
                                    <input
                                        {...register("publisher")}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold  mb-1">Conference / Book Title</label>
                                    <input
                                        {...register("conference")}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold  mb-1">Location</label>
                                    <input
                                        {...register("location")}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold  mb-1">Publication Link</label>
                                    <input
                                        {...register("link")}
                                        type="url"
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* ── 3. Authors ── */}
                        <section>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-sm font-bold text-blue-700 uppercase tracking-widest">Authors</h3>
                            </div>
                            <div className="h-px bg-slate-100 mb-4" />
                            <div className="space-y-3">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex items-end gap-3">
                                        <div className="flex-1">
                                            <label className="block text-sm font-semibold  mb-1">
                                                Author {index + 1}
                                            </label>
                                            <input
                                                {...register(`authors.${index}.name`)}
                                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                                                required
                                            />
                                        </div>
                                        {fields.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="w-9 h-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 border border-blue-100 text-sm font-bold transition"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => append({ name: "" })}
                                    className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 mt-1 transition"
                                >
                                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 font-bold text-base">+</span>
                                    Add Another Author
                                </button>
                            </div>
                        </section>

                        {/* ── Buttons ── */}
                        <div className="flex gap-3 pt-2 justify-end">
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={isPending}
                                className={`flex-1 py-3 rounded-xl font-bold text-sm text-white shadow transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${editingId
                                    ? "bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-800"
                                    : "bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600"
                                    }`}
                            >
                                {isPending ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                        </svg>
                                        {editingId ? "Updating..." : "Adding..."}
                                    </>
                                ) : editingId ? "✏️ Update Book Chapter" : "➕ Add Book Chapter"}
                            </button>
                        </div>

                    </form>
                </div>

                {/* ══════════ BOOK RECORDS ══════════ */}
                <div className="p-4 lg:p-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-blue-800">All Publications</h2>
                            <p className="text-slate-500 text-sm">
                                {books.length} publication{books.length !== 1 ? "s" : ""} found
                            </p>
                        </div>

                        <span className="self-start sm:self-auto px-4 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold rounded-full shadow">
                            {books.length} Total
                        </span>
                    </div>

                    {/* Loading */}
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : books.length === 0 ? (
                        /* Empty */
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                            <p className="text-5xl mb-3">📭</p>
                            <p className="text-slate-500 font-medium">
                                No publications added yet.
                            </p>
                            <p className="text-slate-400 text-sm mt-1">
                                Use the form above to add your first entry.
                            </p>
                        </div>
                    ) : (
                        /* 🔥 GRID */
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {books.map((book) => (
                                <div
                                    key={book._id}
                                    className={`group bg-white rounded-2xl border  shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${editingId === book._id
                                        ? "border-blue-400 ring-2 ring-blue-200"
                                        : "border-slate-100"
                                        }`}
                                >

                                    <div className="p-5 flex flex-col h-full">

                                        {/* Badge */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                                                {book.publicationType || "Publication"}
                                            </span>

                                            {editingId === book._id && (
                                                <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
                                                     Editing
                                                </span>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg font-bold text-slate-800 leading-snug mb-3 line-clamp-2 group-hover:text-blue-600 transition">
                                            Title : {book.title}
                                        </h3>

                                        {/* Meta */}
                                        <div className="space-y-2 text-sm mb-4">
                                            <p className="text-gray-600">
                                                📅 <span className="text-gray-600">Year:</span>{" "}
                                                <span className="font-semibold text-gray-800">
                                                    {book.year}
                                                </span>
                                            </p>

                                            {book.publisher && (
                                                <p className="text-gray-600 truncate">
                                                    🏢 <span className="text-gray-700">Publisher:</span>{" "}
                                                    <span className="font-medium text-gray-800">
                                                        {book.publisher}
                                                    </span>
                                                </p>
                                            )}

                                            {book.conference && (
                                                <p className="text-gray-600 line-clamp-2">
                                                    📖 <span className="text-gray-600">Venue:</span>{" "}
                                                    <span className="font-medium text-gray-800">
                                                        {book.conference}
                                                    </span>
                                                </p>
                                            )}
                                        </div>

                                        {/* Authors */}
                                        {book.authors?.length > 0 && (
                                            <div className="mb-4">
                                                <p className="text-xs font-semibold text-gray-700 uppercase mb-2">
                                                    Authors
                                                </p>

                                                <div className="flex flex-wrap gap-2">
                                                    {book.authors.slice(0, 4).map((author, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-2.5 py-0.5 bg-slate-100 text-gray-700 text-xs rounded-full"
                                                        >
                                                            {typeof author === "string"
                                                                ? author
                                                                : author.name}
                                                        </span>
                                                    ))}

                                                    {/* Extra count */}
                                                    {book.authors.length > 4 && (
                                                        <span className="text-xs text-gray-700">
                                                            +{book.authors.length - 4} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="mt-auto flex gap-2 pt-4 border-t border-slate-100">

                                            <button
                                                onClick={() => handleEdit(book)}
                                                className="flex-1 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm font-semibold transition"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(book._id)}
                                                disabled={deleteMutation.isPending}
                                                className="flex-1 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 text-sm font-semibold transition disabled:opacity-50"
                                            >
                                                Delete
                                            </button>

                                            {book.link && (
                                                <a
                                                    href={book.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="px-3 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 text-sm font-semibold transition"
                                                >
                                                    🔗
                                                </a>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}