import { Nav } from "../../components/Nav";
import Main from "./Main";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { fetchRooms } from "../../../services/room/getRooms"; 
import { IoGameControllerOutline } from "react-icons/io5";
import { STATISTICS } from "../../../routes/routes_consts";
import { RoomStatus } from "../../../consts/gameTypes";



export default function ServersRoom() {

  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
    const getRooms = async () => {
      try {
        const data = await fetchRooms();
        console.log("📦 Rooms from service:", data);
        
        // Filter out rooms that are currently playing
        const availableRooms = data.filter(room => 
        !room.isPrivate && room.currentStatus === RoomStatus.WAITING 
        );
        
        setRooms(availableRooms);
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading rooms:", err);
        setIsLoading(false);
      }
    };

    getRooms(); 

    const interval = setInterval(() => {
      getRooms(); 
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="flex flex-col h-screen bg-secondary relative">
      {/* Fixed Header */}
      <Nav HeaderText={"Join a game room"} HeaderIcon={IoGameControllerOutline} page={STATISTICS} pageText={"Statistics"}/>

      {/* Scrollable Main Content */}
      <Main rooms={rooms} isLoading={ isLoading } />

      {/* Sticky Footer */}
      <Footer rooms={rooms} />
    </div>
  );
}
