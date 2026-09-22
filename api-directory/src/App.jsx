import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch users
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        const data = await response.json();

        setUsers(data);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  // Filter users
  const searchResults = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <h1>User Directory</h1>

      <input
        type="text"
        placeholder="Search user..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {loading ? (
        <h3>Loading users...</h3>
      ) : (
        <div>
          {searchResults.map((user) => (
            <div key={user.id}>
              <h2>{user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p>Website: {user.website}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;