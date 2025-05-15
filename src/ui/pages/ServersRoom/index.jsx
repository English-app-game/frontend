import Nav from "./Nav";
import Main from "./Main";
import Footer from "./Footer";
import useAuthRedirect from "../hooks/useAuthRedirect";

// rooms temp data
const rooms = Array.from({ length: 50 }, (_, index) => index);

export default function ServersRoom() {

  useAuthRedirect();
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
