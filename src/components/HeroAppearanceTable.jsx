import React from "react";
import Table from "react-bootstrap/Table";

const HeroAppearanceTable = ({ data }) => {
  const heroAppearance = data["appearance"];

  const getMeasure = (stat) => {
    const measure = heroAppearance[stat];

    return measure.join(" - ");
  };

  const getColor = (bodyPart) => {
    const color = heroAppearance[bodyPart];

    return color;
  };

  return (
    <Table striped bordered size="sm">
      <tbody>
        <tr>
          <th>Weight</th>
          <td>{getMeasure("weight")}</td>
        </tr>
        <tr>
          <th>Height</th>
          <td>{getMeasure("height")}</td>
        </tr>
        <tr>
          <th>Eye Color</th>
          <td>{getColor("eye-color")}</td>
        </tr>
        <tr>
          <th>Hair Color</th>
          <td>{getColor("hair-color")}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default HeroAppearanceTable;
