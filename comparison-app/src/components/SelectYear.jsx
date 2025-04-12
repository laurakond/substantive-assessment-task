import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const SelectYear = ({ selectedYear, uniqueYears, handleYearButtonClick }) => {
  return (
    <div className="mt-4">
      <h3>Select the year</h3>
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
