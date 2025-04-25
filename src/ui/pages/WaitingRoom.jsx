import ExitButton from "../components/ExitButton";
import { useNavigate } from 'react-router-dom';

export default function WaitingRoom() {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/rooms'); 
  };

  return <div>
    <ExitButton onClick={handleExit}>Exit Room</ExitButton>
  </div>;
}
