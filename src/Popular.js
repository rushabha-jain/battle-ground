import React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "./api";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle
} from "react-icons/fa";
import Card from "./Card";
import Loading from "./Loading";

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "JavaScript", "Ruby", "CSS", "Java", "Python"];
  return (
    <ul className="flex-center">
      {languages.map(language => (
        <li key={language}>
          <button
            className="btn-clear nav-link"
            onClick={() => {
              onUpdateLanguage(language);
            }}
            style={
              language === selected
                ? {
                    color: "rgb(187, 46, 31)"
                  }
                : null
            }
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
};

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const {
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues
        } = repo;
        const { login, avatar_url } = owner;
        return (
          <Card
            key={html_url}
            header={`#${index + 1}`}
            name={login}
            avatar={avatar_url}
            url={html_url}
          >
            <ul className="card-list">
              <li>
                <FaUser color="rgb(255, 191, 116)" size={22} />
                <a href={`https://github.com/${login}`}>{login}</a>
              </li>
              <li>
                <FaStar color="rgb(255, 215, 0)" size={22} />
                {stargazers_count.toLocaleString()} stars
              </li>
              <li>
                <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                {forks.toLocaleString()} forks
              </li>
              <li>
                <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                {open_issues.toLocaleString()} issues
              </li>
            </ul>
          </Card>
        );
      })}
    </ul>
  );
}

const popularReducer = (state, action) => {
  if (action.type === "success") {
    return { ...state, [action.selectedLanguage]: action.repos, error: null };
  } else if (action.type === 'failure') {
    return { ...state, error: action.message }
  } else {
    throw new Error('Invalid action for popular reduer!');
  }
};

export default function Popular() {
  const [selectedLanguage, setSelectedLanguage] = React.useState("All");

  const [state, dispatch] = React.useReducer(popularReducer, {
    error: null
  });

  const fetchedRepos = React.useRef([]);

  React.useEffect(() => {
    if (!fetchedRepos.current.includes(selectedLanguage)) {
      fetchedRepos.current.push(selectedLanguage);
      // Fetch the data for selected language
      fetchPopularRepos(selectedLanguage)
        .then(repos => {
          // Set the state
          dispatch({ type: "success", selectedLanguage, repos });
        })
        .catch(error => {
          dispatch({ type: "error", message: error.message });
        });
    }
  }, [selectedLanguage]);

  const isLoading = !state[selectedLanguage] && state.error === null;

  return (
    <React.Fragment>
      <LanguagesNav
        selected={selectedLanguage}
        onUpdateLanguage={setSelectedLanguage}
      />
      {isLoading && <Loading text="Fetching Repos" />}
      {state[selectedLanguage] && <ReposGrid repos={state[selectedLanguage]} />}
    </React.Fragment>
  );
}
