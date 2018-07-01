import React from "react";

const Yhteensa = ({ content }) => (
  <p>
    yhteensä {content.reduce((prev, curr) => prev + curr.tehtavia, 0)} tehtävää
  </p>
);

export default Yhteensa;
