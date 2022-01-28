import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div>
      <Layout>
        <Routes>
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
