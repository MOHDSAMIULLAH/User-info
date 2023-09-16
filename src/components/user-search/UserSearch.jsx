import React, { useState, useEffect } from "react";
import SearchHistory from "../search-history/SearchHistory";
import './usersearch.css'

function UserSearch() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    // Load search history from local storage on component mount
    const storedSearchHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    );
    setSearchHistory(storedSearchHistory);

    // Fetch users from the API
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .then((users) => setFilteredUsers(users)); // Initialize filtered users with all users
  }, []);

  // useEffect(() => {
  //   const filtered = users.filter((user) =>
  //     user.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredUsers(filtered);
  // }, [searchTerm, users]);

  // console.log("users"+ users);
  console.log("filteredUsers"+filteredUsers);

  const handleSearch = () => {
    // Perform the search logic
    const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()));
  setFilteredUsers(filtered);
  console.log("filteredUsers"+filteredUsers);
    // Add the search term to the searchHistory state
    const newSearchHistory = [...searchHistory, searchTerm];
    setSearchHistory(newSearchHistory);

    // Update local storage with the new search history
    localStorage.setItem("searchHistory", JSON.stringify(newSearchHistory));
    setSearchTerm("");
  };

  const handleSortByName = () => {
    const sortedUsers = [...users].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return sortAscending
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
    setUsers(sortedUsers);
    setSortAscending(!sortAscending);
  };

  return (
    <div className="container">
      <div className="first">
        <h1>User Information</h1>
        <input
          type="text"
          placeholder="Search by name..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button onClick={handleSearch}>Search</button>
        <ul>
          {searchTerm &&
            users
              .filter((user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user) => <li key={user.id}>{user.name}</li>)}
        </ul>

        <div className="result">
          <ul>
            <h2>Search Result</h2>
            {filteredUsers && filteredUsers.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <hr />
      <SearchHistory searchHistory={searchHistory} />
      <hr />
      <div className="info">
        <h1>User Information Table</h1>
        <button onClick={handleSortByName}>
          Sort by Name {sortAscending ? "A-Z" : "Z-A"}
        </button>

        <table>
          <thead>
            <th>id</th>
            <th>name</th>
            <th>username</th>
            <th>email</th>
            <th>phone</th>
            {/* <td>address</td> */}
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserSearch;
