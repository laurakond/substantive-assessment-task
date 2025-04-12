import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const SelectYear = ({ selectedYear, uniqueYears, handleYearButtonClick }) => {
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
              <Dropdown.Item
                key={index}
                onClick={() => handleYearButtonClick(year)}
              >
                {year}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SelectYear;
