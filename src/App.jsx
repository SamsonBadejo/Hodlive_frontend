import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sermons from "./pages/Sermons";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Donate from "./pages/Donate";
import Ministries from "./pages/Ministries";
import Layout from "./pages/Layout/Layout";
import AddSermon from "./pages/Admin/AddSermon";
import AddEvent from "./pages/Admin/AddEvent";
import Messages from "./pages/Admin/Messages";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Admin/Login";
import AdminLayout from "./pages/Admin/AdminLayout";
import { Toaster } from "react-hot-toast";
import Event from "./pages/Event";
import AllSermons from "./pages/Admin/AllSermons";
import AllEvent from "./pages/Admin/AllEvent";

import "primereact/resources/themes/saga-blue/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css
import "primeicons/primeicons.css"; // icons

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/sermons" element={<Sermons />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/ministries" element={<Ministries />} />
            <Route path="/tithes" element={<Donate />} />
            <Route path="/gallery" element={<Gallery />} />{" "}
            <Route path="/events" element={<Event />} />
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminLayout />
                </PrivateRoute>
              }
            >
              <Route path="add-sermon" element={<AddSermon />} />
              <Route path="add-event" element={<AddEvent />} />
              <Route path="messages" element={<Messages />} />
              <Route path="all-sermons" element={<AllSermons />} />
              <Route path="all-events" element={<AllEvent />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontSize: "0.875rem" },
        }}
      />
    </>
  );
};

export default App;
