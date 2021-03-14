import React from "react";
import PropTypes from "prop-types";

export default function Loading({ text='Loading', speed=300 }) {
  const [content, setContent] = React.useState(text);
  
  React.useEffect(() => {
    const clearIntervalId = setInterval(() => {
      content === text + "..."
        ? setContent(text)
        : setContent(prevContent => prevContent + ".");
    }, speed);
    return () => {
      console.log(':: Clearning Interval ::');
      clearInterval(clearIntervalId);
    }
  }, [text, speed]);

  return (
    <p
      style={{
        fontSize: "35px",
        position: "absolute",
        left: 0,
        right: 0,
        textAlign: "center",
        marginTop: "20px"
      }}
    >
      {content}
    </p>
  );
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number
};
