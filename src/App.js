import { Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log(isAuthenticated);
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
//<Route path="api/product/:productId" element={} />
