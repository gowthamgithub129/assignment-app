// Import necessary libraries
import React, { useEffect, useState } from 'react';

// User signup component
const Signup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profession, setProfession] = useState('');
  
  // Function to handle form submission
  const handleSignup = () => {
    // Store user data in local storage
    const userData = { name, password, email, phone, profession };
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  return (
    <div>
      <h2>User Signup</h2>
      <form onSubmit={handleSignup}>
        <label>Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /></label><br />
        <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label><br />
        <label>Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></label><br />
        <label>Phone: <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} /></label><br />
        <label>
          Profession:
          <select value={profession} onChange={(e) => setProfession(e.target.value)}>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
            <option value="Tester">Tester</option>
            <option value="Engineer">Engineer</option>
          </select>
        </label><br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

// User login component
const Login = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle login
  const handleLogin = () => {
    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (userData.name === name && userData.password === password) {
        onLogin(); // Trigger login callback
      } else {
        alert('Invalid Credentials');
      }
    } else {
      alert('User not found');
    }
  };

  return (
    <div>
      <h2>User Login</h2>
      <form onSubmit={handleLogin}>
        <label>Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /></label><br />
        <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

// MovieList component
const MovieList = () => {
  const [movieList, setMovieList] = useState([]);

  // Function to fetch movie data from the API
  const fetchMovies = async () => {
    try {
      const response = await fetch('https://hoblist.com/api/movieList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: 'movies',
          language: 'kannada',
          genre: 'all',
          sort: 'voting',
        }),
      });
      const data = await response.json();
      setMovieList(data.result);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Movie List</h2>
      <ul>
        {movieList.map((movie) => (
          <li key={movie.id}>{movie.movie}</li>
        ))}
      </ul>
    </div>   
   
  );
};

// CompanyInfo component
const CompanyInfo = ({click}) => {
  return (
    <div>
      <h2>Company Info</h2>
      <p>
        Company: Geeksynergy Technologies Pvt Ltd<br />
        Address: Sanjayanagar, Bengaluru-56<br />
        Phone: XXXXXXXXX09<br />
        Email: XXXXXX@gmail.com
      </p>
    </div>
  );
};

// App component
const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Callback function to be triggered upon successful login
  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {!isLoggedIn && <Signup />}
      {!isLoggedIn && <Login onLogin={handleLogin} />}
      {isLoggedIn && <MovieList />}
      <CompanyInfo />
    </div>
  );
};

export default App;
