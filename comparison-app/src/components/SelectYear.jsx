import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SelectYear = ({ selectedYear, uniqueYears, handleYearButtonClick }) => {
  return (
    <Row>
      <Col>
        <h3>Select the year</h3>
      </Col>
      <Col className="text-start">
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
      </Col>
    </Row>
  );
};

export default SelectYear;
