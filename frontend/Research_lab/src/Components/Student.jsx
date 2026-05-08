import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import StudentCard from './CardComponents/StudentCard';
import AlumniCard from './CardComponents/AlumniCard';
import useUserRole from '../hooks/useUserRole';

function StudentList() {
  const { level, type } = useParams();
  const axiosSecure = useAxios();
  const { role } = useUserRole();
  console.log(role);
  const [searchRoll, setSearchRoll] = useState('');

  const { data = [], isLoading } = useQuery({
    queryKey: ['studentProjects'],
    queryFn: async () => (await axiosSecure.get('/studentproject')).data,
  });

  const isAlumni = type === 'alumni';

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesLevel =
        item.student?.studentLevel?.toLowerCase() === level?.toLowerCase();

      // 🔥 CHANGED HERE → stdntstatus
      const matchesType = isAlumni
        ? item.stdntstatus === 'completed'
        : item.stdntstatus === 'ongoing';

      const matchesSearch = searchRoll
        ? item.student?.roll?.includes(searchRoll)
        : true;

      return matchesLevel && matchesType && matchesSearch;
    });
  }, [data, level, searchRoll, isAlumni]);

  return (
    <div className="min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">
          {level?.toUpperCase()} - {isAlumni ? 'Alumni' : 'Current Students'}
        </h1>
      </header>

      {/* <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by Roll Number..."
          value={searchRoll}
          onChange={(e) => setSearchRoll(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div> */}

      {
        role === 'admin' && (
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search by Roll Number..."
              value={searchRoll}
              onChange={(e) => setSearchRoll(e.target.value)}
              className="w-full max-w-md border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )
      }

      {isLoading ? (
        <p className="text-center text-gray-500 italic">
          Loading records...
        </p>
      ) : filteredData.length === 0 ? (
        <div className="alert alert-info shadow-lg text-center">
          No {isAlumni ? 'alumni' : 'students'} found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredData.map((item) =>
            isAlumni ? (
              <AlumniCard key={item._id} item={item} />
            ) : (
              <StudentCard key={item._id} item={item} />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default StudentList;