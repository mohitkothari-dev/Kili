import React, { useState, useEffect } from 'react';

const FeatureList = ({ elements }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % elements.length);
    }, 4000); // Adjust the interval duration as needed (e.g., 2000 milliseconds for 2 seconds)

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount

  }, [elements.length]); // Re-run effect when the number of elements changes

  return (
    <div>
      {elements.map((element, index) => (
        <div
          key={index}
          style={{ display: index === currentIndex ? 'block' : 'none' }}
        >
          {element}
        </div>
      ))}
    </div>
  );
};

export default FeatureList;
