import Nav from "./Nav";
import Main from "./Main";
import Footer from "./Footer";

// rooms temp data
const rooms = Array.from({ length: 8 }, (_, index) => index);

export default function ServersRoom() {
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
