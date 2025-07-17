import React, { useState } from "react";
import { useNavigate } from "react-router";
// NIE importuj useAuth — bo nie będziesz wołać login()

function Register() {
  const [form, setForm] = useState({
    name: "",
    password: "",
    dob: "",
    email: "",
    job: "",
  });
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (avatar) data.append("avatar", avatar);

    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: data,
    });

    if (res.ok) {
      // NIE logujemy od razu!
      navigate("/"); // bo "/" to twój Login
    } else {
      alert("Registration failed");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 dark:text-white dark:bg-gray-800 p-4 rounded shadow"
    >
      <h2 className="text-xl mb-4">Register</h2>
      {["name", "email", "password", "job", "dob"].map((field) => (
        <input
          key={field}
          name={field}
          type={field === "password" ? "password" : "text"}
          placeholder={field}
          value={form[field]}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded dark:bg-gray-700"
        />
      ))}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-700"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Register
      </button>
    </form>
  );
}

export default Register;
