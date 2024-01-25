import { Button } from 'primereact/button';
import React, { useState } from 'react';
import Select from 'react-select';

const subCountyWards = {
  Mvita: ["Mji Wa Kale/Makadara", "Tudor", "Tononoka", "Shimanzi/Ganjoni", "Majengo"],
  Likoni: ["Mtongwe", "Shika Adabu", "Bofu", "Likoni", "Timbwani"],
  Changamwe: ["Port Reitz", "Kipevu", "Airport", "Miritini", "Chaani"],
  Kisauni: ["Mjambere", "Junda", "Bamburi", "Mwakirunge", "Mtopanga", "Magogoni", "Shanzu"],
  Nyali: ["Frere Town", "Ziwa la Ng’ombe", "Mkomani", "Kongowea", "Kadzandani"],
  Jomvu: ["Jomvu Kuu", "Magongo", "Mikindini"]
}

const Location = () => {
  const [selectedLocation, setSelectedLocation] = useState([]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '100%',
      marginBottom: 10,
    }),
  };

  const handleLocationChange = (selectedOptions) => {
    setSelectedLocation(selectedOptions);
  };

  const submit = () => {
    console.log(selectedLocation);
    // Clear selectedLocation after logging
    setSelectedLocation([]);
  }

  const generateLocationOptions = () => {
    const locationOptions = Object.keys(subCountyWards).map((subCounty) => {
      const wards = subCountyWards[subCounty].map((ward) => ({ value: ward, label: ward, subCounty }));
      return { label: subCounty, options: wards };
    });
    return locationOptions;
  };

  return (
    <div>
      <label>Select Sub-County and Ward:</label>
      <Select
        options={generateLocationOptions()}
        isMulti
        value={selectedLocation}
        onChange={handleLocationChange}
        styles={customStyles}
      />
      <Button onClick={submit}>Submit</Button>
    </div>
  );
}

export default Location;
