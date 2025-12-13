// import React from "react";

// export default function EditProfAbout() {
//     return (
//         <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-50 to-purple-50 shadow-xl rounded-2xl p-10">
//             <h2 className="text-3xl font-extrabold text-indigo-700 mb-10 text-center tracking-wide">
//                 Edit Professor Information
//             </h2>

//             <form className="space-y-12">
//                 {/* Head of Lab */}
//                 <div>
//                     <h3 className="text-2xl font-semibold text-indigo-600 mb-6 border-b pb-2">
//                         Head of Lab
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Picture */}
//                         <div className="form-control md:col-span-2">
//                             <label className="label font-medium text-gray-700">Picture URL</label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter Head of Lab Picture URL"
//                                 className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400"
//                             />
//                         </div>
//                         {/* Name */}
//                         <div className="form-control">
//                             <label className="label font-medium text-gray-700">Name</label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter Head of Lab Name"
//                                 className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400"
//                             />
//                         </div>
//                         {/* Study Section */}
//                         <div className="form-control">
//                             <label className="label font-medium text-gray-700">Study Section</label>
//                             <input
//                                 type="text"
//                                 placeholder="e.g. B.Sc. (Engg.), M.Sc. (Engg.)"
//                                 className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400"
//                             />
//                         </div>
//                         {/* Department */}
//                         <div className="form-control">
//                             <label className="label font-medium text-gray-700">Department Name</label>
//                             <input
//                                 type="text"
//                                 placeholder="Dept. of Computer Science and Engineering"
//                                 className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400"
//                             />
//                         </div>
//                         {/* University */}
//                         <div className="form-control">
//                             <label className="label font-medium text-gray-700">University Name</label>
//                             <input
//                                 type="text"
//                                 placeholder="Jashore University of Science and Technology"
//                                 className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Deputy Head of Lab */}
//                 <div>
//                     <h3 className="text-2xl font-semibold text-purple-600 mb-6 border-b pb-2">
//                         Deputy Head of Lab
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Picture */}
//                         <div className="form-control md:col-span-2">
//                             <label className="label font-medium text-gray-700">Picture URL</label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter Deputy Head Picture URL"
//                                 className="input input-bordered w-full focus:ring-2 focus:ring-purple-400"
//                             />
//                         </div>
//                         {/* Name */}
//                         <div className="form-control">
//                             <label className="label font-medium text-gray-700">Name</label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter Deputy Head Name"
//                                 className="input input-bordered w-full focus:ring-2 focus:ring-purple-400"
//                             />
//                         </div>
//                         {/* Study Section */}
//                         <div className="form-control">
//                             <label className="label font-medium text-gray-700">Study Section</label>
//                             <input
//                                 type="text"
//                                 placeholder="e.g. B.Sc. (Engg.), M.Sc. (Engg.)"
//                                 className="input input-bordered w-full focus:ring-2 focus:ring-purple-400"
//                             />
//                         </div>
//                         {/* Department */}
//                         <div className="form-control">
//                             <label className="label font-medium text-gray-700">Department Name</label>
//                             <input
//                                 type="text"
//                                 placeholder="Dept. of Computer Science and Engineering"
//                                 className="input input-bordered w-full focus:ring-2 focus:ring-purple-400"
//                             />
//                         </div>
//                         {/* University */}
//                         <div className="form-control">
//                             <label className="label font-medium text-gray-700">University Name</label>
//                             <input
//                                 type="text"
//                                 placeholder="Jashore University of Science and Technology"
//                                 className="input input-bordered w-full focus:ring-2 focus:ring-purple-400"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="form-control mt-8">
//                     <button
//                         type="submit"
//                         className="btn btn-primary w-full text-white font-semibold tracking-wide hover:scale-105 transition-transform duration-200"
//                     >
//                         Save Changes
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }

import React from "react";

export default function EditProfAbout() {
    return (
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-50 to-purple-50 shadow-xl rounded-2xl p-10">
            <h2 className="text-3xl font-extrabold text-indigo-700 mb-10 text-center tracking-wide">
                Edit Professor Information
            </h2>

            <form className="space-y-12">
                {/* Head of Lab */}
                <div>
                    <h3 className="text-2xl font-semibold text-indigo-600 mb-6 border-b pb-2">
                        Head of Lab
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Picture */}
                        <div className="form-control md:col-span-2">
                            <label className="label font-medium text-gray-700">Picture URL</label>
                            <input
                                type="text"
                                placeholder="Enter Head of Lab Picture URL"
                                className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        {/* Name */}
                        <div className="form-control">
                            <label className="label font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                placeholder="Enter Head of Lab Name"
                                className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        {/* Study Section */}
                        <div className="form-control">
                            <label className="label font-medium text-gray-700">Study Section</label>
                            <input
                                type="text"
                                placeholder="e.g. B.Sc. (Engg.), M.Sc. (Engg.)"
                                className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        {/* Department */}
                        <div className="form-control">
                            <label className="label font-medium text-gray-700">Department Name</label>
                            <input
                                type="text"
                                placeholder="Dept. of Computer Science and Engineering"
                                className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        {/* University */}
                        <div className="form-control">
                            <label className="label font-medium text-gray-700">University Name</label>
                            <input
                                type="text"
                                placeholder="Jashore University of Science and Technology"
                                className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Deputy Head of Lab */}
                <div>
                    <h3 className="text-2xl font-semibold text-purple-600 mb-6 border-b pb-2">
                        Deputy Head of Lab
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Picture */}
                        <div className="form-control md:col-span-2">
                            <label className="label font-medium text-gray-700">Picture URL</label>
                            <input
                                type="text"
                                placeholder="Enter Deputy Head Picture URL"
                                className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
                            />
                        </div>
                        {/* Name */}
                        <div className="form-control">
                            <label className="label font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                placeholder="Enter Deputy Head Name"
                                className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
                            />
                        </div>
                        {/* Study Section */}
                        <div className="form-control">
                            <label className="label font-medium text-gray-700">Study Section</label>
                            <input
                                type="text"
                                placeholder="e.g. B.Sc. (Engg.), M.Sc. (Engg.)"
                                className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
                            />
                        </div>
                        {/* Department */}
                        <div className="form-control">
                            <label className="label font-medium text-gray-700">Department Name</label>
                            <input
                                type="text"
                                placeholder="Dept. of Computer Science and Engineering"
                                className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
                            />
                        </div>
                        {/* University */}
                        <div className="form-control">
                            <label className="label font-medium text-gray-700">University Name</label>
                            <input
                                type="text"
                                placeholder="Jashore University of Science and Technology"
                                className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="form-control mt-8">
                    <button
                        type="submit"
                        className="btn w-full bg-indigo-600 text-white font-semibold tracking-wide hover:bg-indigo-700 hover:scale-105 transition-transform duration-200 border border-blue-300 px-2"
                    >
                        Save Changes
                    </button>
                </div>
            </form >
        </div >
    );
}
