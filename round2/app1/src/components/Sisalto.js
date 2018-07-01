import React from "react";
import Osa from "./Osa";

const Sisalto = ({ content }) => (
  <div>
    {content.map(item => (
      <Osa name={item.nimi} count={item.tehtavia} key={item.id} />
    ))}
  </div>
);

export default Sisalto;
