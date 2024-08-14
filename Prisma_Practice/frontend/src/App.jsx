
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex justify-center py-4 bg-white shadow-md">
        <Link
          to="/signup"
          className="px-4 py-2 mx-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="px-4 py-2 mx-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Login
        </Link>
      </div>
    </Router>
  );
};

export default App;
