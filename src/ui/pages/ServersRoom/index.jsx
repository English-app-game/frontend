import Nav from "./Nav";
import Main from "./Main";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { fetchRooms } from "../../../services/room/getRooms"; 
import useAuthRedirect from "@hooks/useAuthRedirect";



export default function ServersRoom() {
  useAuthRedirect();

  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const getRooms = async () => {
      try {
        const data = await fetchRooms();
        console.log("📦 Rooms from service:", data);
        setTimeout(() => {
          setRooms(data);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        console.error("Error loading rooms:", err);
        setIsLoading(false);
      }
    };

    getRooms();
  }, []);


  return (
    <div className="flex flex-col h-screen bg-secondary relative">
      {/* Fixed Header */}
      <Nav />

      {/* Scrollable Main Content */}
      <Main rooms={rooms} isLoading={ isLoading } />

      {/* Sticky Footer */}
      <Footer rooms={rooms} />
    </div>
  );
}
