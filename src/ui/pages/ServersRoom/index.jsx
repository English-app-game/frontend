import Nav from "./Nav";
import Main from "./Main";
import Footer from "./Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// rooms temp data
const rooms = Array.from({ length: 50 }, (_, index) => index);

export default function ServersRoom() {

  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-secondary relative">
      {/* Fixed Header */}
      <Nav />

      {/* Scrollable Main Content */}
      <Main rooms={rooms} />

      {/* Sticky Footer */}
      <Footer rooms={rooms} />
    </div>
  );
}
