import React, { useState, useEffect } from "react";
import { getCourses } from "../api/courses";

const StudentForm = ({ addStudent }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    profileImg: ""
  });
  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };
    fetchCourses();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email.match(/\S+@\S+\.\S+/)) newErrors.email = "Invalid email";
    if (!formData.course) newErrors.course = "Select a course";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addStudent(formData);
    setFormData({ name: "", email: "", course: "", profileImg: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      {errors.name && <p>{errors.name}</p>}

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      {errors.email && <p>{errors.email}</p>}

      <select
        value={formData.course}
        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
      >
        <option value="">Select course</option>
        {courses.map((c) => (
          <option key={c.id} value={c.name}>{c.name}</option>
        ))}
      </select>
      {errors.course && <p>{errors.course}</p>}

      <input
        type="text"
        placeholder="Image URL"
        value={formData.profileImg}
        onChange={(e) => setFormData({ ...formData, profileImg: e.target.value })}
      />

      <button type="submit">Add Student</button>
    </form>
  );
};

export default StudentForm;