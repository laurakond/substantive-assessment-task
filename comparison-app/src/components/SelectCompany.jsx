import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SelectCompany = ({
  selectedProviderName,
  uniqueProviderNames,
  handleCompanyButtonClick,
}) => {
  return (
    <Row>
      <Col>
        <h4>Select the company</h4>
      </Col>
      <Col>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedProviderName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {uniqueProviderNames.map((providerName, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => handleCompanyButtonClick(providerName)}
              >
                {providerName}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default SelectCompany;
