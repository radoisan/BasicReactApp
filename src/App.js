import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";

import { getWithExpiry } from "./utils";

import { useNavigate } from "react-router-dom";

const FIVE_MIN_EXPIRY = 1000 * 60 * 5;

function App() {
  const [counterExpired, setCounterExpired] = useState(false);

  const navigate = useNavigate();

  setTimeout(() => {
    setCounterExpired(true);
    navigate("/login");
  }, FIVE_MIN_EXPIRY);

  useEffect(() => {
    getWithExpiry("username");
    getWithExpiry("password");
    setCounterExpired(false);
  }, [counterExpired]);

  return (
    <div>
      <Layout>
        <Routes>
          {console.log("COUNTER: ", counterExpired)}
          <Route path="*" exact element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
//<Route path="api/product/:productId" element={} />
