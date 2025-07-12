import React from "react";

const StudentList = ({ students }) => {
  return (
    <div className="list">
      {students.map((student, idx) => (
        <div key={idx} className="card">
          <img src={student.profileImg || "https://via.placeholder.com/100"} alt="profile" />
          <h3>{student.name}</h3>
          <p>{student.email}</p>
          <p>{student.course}</p>
        </div>
      ))}
    </div>
  );
};

export default StudentList;