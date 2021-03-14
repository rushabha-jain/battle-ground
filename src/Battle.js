import React from "react";
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle
} from "react-icons/fa";
import PropTypes from "prop-types";
import ThemeContext from "./contexts/theme";
import { Link } from "react-router-dom";

function PlayerPreview({ username, label, onReset }) {
  const { theme } = React.useContext(ThemeContext);
  return (
    <div className="column player">
      <h3 className="player-label">{label}</h3>
      <div className={`row bg-${theme}`}>
        <div className="player-info">
          <img
            src={`http://github.com/${username}.png?size=200`}
            alt={`Profile of ${username}`}
            className="avatar-small"
          />
          <a href={`http://github.com/${username}`} className="link">
            {username}
          </a>
        </div>
        <button className="btn-clear flex-center" onClick={onReset}>
          <FaTimesCircle color="rgb(194, 57, 42)" size={26} />
        </button>
      </div>
    </div>
  );
}

function PlayerInput(props) {
  const [playerName, setPlayerName] = React.useState("");
  const { theme } = React.useContext(ThemeContext);
  const handleSubmit = event => {
    event.preventDefault();
    props.onSubmit(playerName);
  };

  return (
    <form className="column player" onSubmit={handleSubmit}>
      <label className="player-label" htmlFor="username">
        {props.label}
      </label>
      <div className="row player-inputs">
        <input
          type="text"
          value={playerName}
          id="username"
          className={`input-${theme}`}
          onChange={e => {
            setPlayerName(e.target.value);
          }}
        />
        <button
          type="submit"
          disabled={playerName === ""}
          className={`btn btn-${theme === "light" ? "dark" : "light"}`}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

function Instructions(props) {
  const { theme } = React.useContext(ThemeContext);
  return (
    <div className="instructions-container">
      <h1 className="center-text header-lg">Instructions</h1>
      <ol className="grid center-text battle-instructions container-sm">
        <li>
          <h3 className="header-sm">Enter two github users</h3>
          <FaUserFriends
            className={`bg-${theme}`}
            color="rgb(255, 191, 116)"
            size={140}
          />
        </li>
        <li>
          <h3 className="header-sm">Battle</h3>
          <FaFighterJet className={`bg-${theme}`} color="#727272" size={140} />
        </li>
        <li>
          <h3 className="header-sm">See the winners</h3>
          <FaTrophy
            className={`bg-${theme}`}
            color="rgb(255, 215, 0)"
            size={140}
          />
        </li>
      </ol>
    </div>
  );
}

export default function Battle(props) {
  const [playerOne, setPlayerOne] = React.useState(null);
  const [playerTwo, setPlayerTwo] = React.useState(null);

  // Purpose of render is to process data from props and state and return the UI
  return (
    <React.Fragment>
      <Instructions />
      <div className="players-container">
        <h1 className="header-lg center-text">Players</h1>
        <div className="row space-around">
          {!playerOne ? (
            <PlayerInput
              label="Player 1"
              onSubmit={playerName => setPlayerOne(playerName)}
            />
          ) : (
            <PlayerPreview
              username={playerOne}
              label="Player One"
              onReset={() => setPlayerOne(null)}
            />
          )}
          {!playerTwo ? (
            <PlayerInput
              label="Player 2"
              onSubmit={playerName => setPlayerTwo(playerName)}
            />
          ) : (
            <PlayerPreview
              username={playerTwo}
              label="Player Two"
              onReset={() => setPlayerTwo(null)}
            />
          )}
        </div>
        {playerOne && playerTwo && (
          <Link
            to={{
              pathname: "/battle/results",
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
            }}
            className="btn btn-dark btn-space"
          >
            Battle
          </Link>
        )}
      </div>
    </React.Fragment>
  );
}
