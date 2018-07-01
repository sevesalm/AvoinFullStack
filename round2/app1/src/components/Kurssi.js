import React from "react";
import Otsikko from "./Otsikko";
import Sisalto from "./Sisalto";
import Yhteensa from "./Yhteensa";

const Kurssi = ({ kurssi: { nimi, osat } }) => (
  <div>
    <Otsikko title={nimi} />
    <Sisalto content={osat} />
    <Yhteensa content={osat} />
  </div>
);

export default Kurssi;
