import JoinGameRoom from "../components/JoinGameRoom";
import PropTypes from 'prop-types';

export default function ServersRoom() {
  return <div>
    ServersRoom
    <JoinGameRoom id={0} currentPlayers={2} capacity={5} />
    </div>;
}
