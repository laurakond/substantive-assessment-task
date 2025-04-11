import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const SelectYear = ({ selectedYear, uniqueYears, handleYearClick }) => {
  return (
    <div>
      <h2>Select the year</h2>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedYear}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {uniqueYears
            .sort((a, b) => a - b)
            .map((year, index) => (
              <Dropdown.Item key={index} onClick={() => handleYearClick(year)}>
                {year}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SelectYear;
