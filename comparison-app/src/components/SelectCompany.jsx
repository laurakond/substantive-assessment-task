import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const SelectCompany = ({
  selectedProviderName,
  uniqueProviderNames,
  handleCompanyButtonClick,
}) => {
  return (
    <div>
      <h3>Select the company</h3>
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
    </div>
  );
};

export default SelectCompany;
