import React from "react";
import ReactDOM from "react-dom";

const Otsikko = ({ title }) => <h1>{title}</h1>;

const Osa = ({ name, count }) => (
  <p>
    {name} {count}
  </p>
);
const Sisalto = ({ content }) => (
  <div>
    <Osa name={content[0].nimi} count={content[0].tehtavia} />
    <Osa name={content[1].nimi} count={content[1].tehtavia} />
    <Osa name={content[2].nimi} count={content[2].tehtavia} />
  </div>
);

const Yhteensa = props => (
  <p>
    yhteensä {props.content.reduce((acc, current) => acc + current.tehtavia, 0)}{" "}
    tehtävää
  </p>
);

const App = () => {
  const kurssi = {
    nimi: "Half Stack -sovelluskehitys",
    osat: [
      {
        nimi: "Reactin perusteet",
        tehtavia: 10
      },
      {
        nimi: "Tiedonvälitys propseilla",
        tehtavia: 7
      },
      {
        nimi: "Komponenttien tila",
        tehtavia: 14
      }
    ]
  };

  return (
    <div>
      <Otsikko title={kurssi.nimi} />
      <Sisalto content={kurssi.osat} />
      <Yhteensa content={kurssi.osat} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
