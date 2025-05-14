import Nav from "./Nav";
import Main from "./Main";
import Footer from "./Footer";
import useAuthRedirect from "@hooks/useAuthRedirect";
import { useState, useEffect } from "react";


export default function ServersRoom() {

  useAuthRedirect();
   const [rooms, setRooms] = useState([]);

   useEffect(()=>{
      const fetchRooms = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/rooms"); 
        const data = await res.json();
        console.log("📦 Rooms from backend:", data); // 🔹first check

        setRooms(data);
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
      }
    };

    fetchRooms();

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
