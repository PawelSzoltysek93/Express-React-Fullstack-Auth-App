import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    user && (
      <div className="max-w-md mx-auto mt-10 dark:text-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-xl mb-4">Welcome, {user.name}</h2>
        <img
          src={`http://localhost:5000${user.avatar}`}
          alt="Avatar"
          className="w-24 h-24 rounded-full mb-4"
        />

        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Job:</strong> {user.job}
        </p>
        <p>
          <strong>Date of Birth:</strong> {user.dob}
        </p>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    )
  );
}
