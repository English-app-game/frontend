import ExitButton from "../../../components/ExitButton";
import { ROUTES } from "../../../../routes/routes_consts";
import { useNavigate } from "react-router-dom";

const RoomHeader = () => {
    const navigate = useNavigate();

    const handleExit = () => {
        navigate(ROUTES.ROOMS_LIST);
    };

    return (
        <>
            <div className="absolute top-4 left-4">
                <ExitButton onClick={handleExit} className="bg-rose-300 border-4 border-orange-600 hover:bg-rose-400">EXIT ROOM</ExitButton>
            </div>
            <h1 className="text-4xl font-extrabold text-teal-600 mb-10 uppercase drop-shadow-md text-center">WAITING ROOM</h1>
        </>
    );
};

export default RoomHeader;
