import React from "react";
import { battle } from "./api";
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaUser
} from "react-icons/fa";
import Card from "./Card";
import Loading from "./Loading";
import Tooltip from "./Tooltip";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(255, 191, 116)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <Tooltip text={`User's Location`}>
          <li>
            <FaCompass color="rgb(144, 115, 255)" size={22} />
            {profile.location}
          </li>
        </Tooltip>
      )}
      {profile.company && (
        <Tooltip text={`User's Company`}>
          <li>
            <FaBriefcase color="#795548" size={22} />
            {profile.company}
          </li>
        </Tooltip>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {profile.followers} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {profile.following} following
      </li>
    </ul>
  );
}

const battleReducer = function (state, action) {
  if (action.type === 'success') {
    return {
      winner: action.winner,
      loser: action.loser,
      error: null,
      loading: false
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      loading: false,
      error: action.message
    }
  } else {
    return new Error('Invalid battle action!');
  }
}


export default function Results() {
  const [state, dispatch] = React.useReducer(battleReducer, {
    winner: null,
    loser: null,
    loading: true,
    error: null
  });

  const { search } = useLocation();
  const { playerOne, playerTwo } = queryString.parse(search);

  React.useEffect(() => {
    battle([playerOne, playerTwo])
      .then(players => {
        dispatch({ type: 'success', winner: players[0], loser: players[1] });
      })
      .catch(error => {
        dispatch({ type: 'error', message: error.message });
      });
  }, [playerOne, playerTwo]);

  const { winner, loser, loading, error } = state;

  if (loading) {
    return <Loading text="Battling" />;
  }
  if (error) {
    return <p className="center-text error">{error}</p>;
  }
  return (
    <React.Fragment>
      <div className="grid space-around container-sm">
        <Card
          header={winner.score === loser.score ? "Tie" : "Winner"}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          name={winner.profile.login}
          url={winner.profile.html_url}
        >
          <ProfileList profile={winner.profile} />
        </Card>
        <Card
          header={winner.score === loser.score ? "Tie" : "Loser"}
          subheader={`Score: ${loser.score.toLocaleString()}`}
          avatar={loser.profile.avatar_url}
          name={loser.profile.login}
          url={loser.profile.html_url}
        >
          <ProfileList profile={loser.profile} />
        </Card>
      </div>
      <Link className="btn btn-dark btn-space" to="/battle">
        Reset
      </Link>
    </React.Fragment>
  );
}
