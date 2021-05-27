import React from "react";
import Table from "react-bootstrap/Table";

const HeroWorkTable = ({ data }) => {
  const bioInfo = data["biography"];

  const getBaseOperation = () => {
    const bases = data["work"].base;

    return bases;
  };

  const getAliases = () => {
    const aliases = bioInfo.aliases;

    return aliases.join(", ");
  };

  const getFullName = () => {
    const fullName = bioInfo["full-name"];
    return fullName;
  };

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Aliases</th>
          <th>Bases of Operation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{getFullName()}</td>
          <td>{getAliases()}</td>
          <td>{getBaseOperation()}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default HeroWorkTable;
