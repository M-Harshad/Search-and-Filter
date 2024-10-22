import React, { useState, useEffect } from 'react';

// Define the structure of the user data
interface User {
  id: number;
  name: string;
  email: string;
}

const SearchBar: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [debouncedInput, setDebouncedInput] = useState<string>(input);
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);


  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);


    return () => {
      clearTimeout(timerId);
    };
  }, [input]);


  useEffect(() => {

    const fetchUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data: User[] = await response.json();
      setData(data); // Save the fetched users
    };

    fetchUsers();
  }, []);


  useEffect(() => {
    if (debouncedInput) {
      const filtered = data.filter(
        (user) =>
          user.name.toLowerCase().includes(debouncedInput.toLowerCase()) ||
          user.email.toLowerCase().includes(debouncedInput.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [debouncedInput, data]);

  // Handle search input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value); // Update query when user types
  };



  return (
<div className="bg-gray-600 min-h-screen flex flex-col justify-center items-center">
  <form className="w-full max-w-md relative">
    <input
      type="text"
      value={input}
      onChange={handleInputChange}
      placeholder="Search by name or email..."
      className="w-full p-3 text-lg border border-gray-300 rounded-lg shadow-md"
    />
    <button
      type="submit"
      className="absolute right-0 top-0 h-full px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-300"
    >
      Search
    </button>

    {/* Dropdown for filtered data */}
    {filteredData.length > 0 && (
      <ul className="absolute w-full bg-white shadow-lg border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto z-10">
        {filteredData.map((user) => (
          <li
            key={user.id}
            className="p-3 hover:bg-gray-100 cursor-pointer"
          >
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    )}
  </form>
</div>

  );
};

export default SearchBar;
