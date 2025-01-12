
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../components/Login/Login";
import AddEditProduct from "../common/AddEditProduct";
import PrivateRouter from "./PrivateRouter";
import Logout from "../common/Logout";
import Register from "../pages/register/Register";
import Main from "../pages/productlist/productList";
import Sidebarr from "../pages/sidebar/sidebar";
import Indexx from "../pages/productnew";
import Index from "../pages/productsale";
import Chart from "../pages/chart";


const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sidebar" element={
            <PrivateRouter>
              <Sidebarr />
            </PrivateRouter>
          } />
          <Route
            path="/productlist"
            element={
              <PrivateRouter>
                <Main />
              </PrivateRouter>
            }
          />
          <Route
            path="/productsale"
            element={
              <PrivateRouter>
                <Index />
              </PrivateRouter>
            }
          />
          <Route
            path="/productnew"
            element={
              <PrivateRouter>
                <Indexx />
              </PrivateRouter>
            }
          />
          <Route
            path="/chart"
            element={
              <PrivateRouter>
                <Chart />
              </PrivateRouter>
            }
          />
          <Route
            path="/chart"
            element={
              <PrivateRouter>
                <Indexx />
              </PrivateRouter>
            }
          />
          <Route
            path="/addProduct"
            element={
              <PrivateRouter>
                <AddEditProduct />
              </PrivateRouter>
            }
          />
          <Route
            path="/editProduct/:id"
            element={
              <PrivateRouter>
                <AddEditProduct />
              </PrivateRouter>
            }
          />
          <Route path="/admin/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
