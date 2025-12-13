import { useLoaderData } from "react-router-dom";

const MemberDetails = () => {
  const member = useLoaderData();

  return (
    <div className="mt-16 px-4">
      <div className="card w-full max-w-md  rounded-lg">
        <div className="card-body space-y-3">
          
          {/* Title */}
          <h2 className="card-title text-accent text-2xl font-bold">
            {member.name}
          </h2>

          {/* Student Info */}
          <div className="flex items-center gap-3">
            <div>
              <p className="font-semibold">Student Name : {member.studentName}</p>
              <p className="text-sm text-gray-500">Student Level : {member.studentLevel}</p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Type:</span> {member.type}
            </p>
            <p>
              <span className="font-semibold">Session:</span> {member.session}
            </p>
            <p>
              <span className="font-semibold">Roll:</span> {member.roll}
            </p>
            <p>
              <span className="font-semibold">Department:</span> {member.department}
            </p>
            <p>
              <span className="font-semibold">Technologies:</span>{" "}
              {member.technologies?.join(", ")}
            </p>
            <p>
              <span className="font-semibold">Duration:</span>{" "}
              {member.startDate} → {member.endDate}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mt-4 leading-relaxed">
           Details :  {member.details}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
