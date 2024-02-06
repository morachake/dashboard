import Select from 'react-select';
import { Row, Col, Input, FormGroup, Card, Label, Button, CardBody, CardHeader } from 'reactstrap';
import { useEffect, useState } from 'react';

export default function Location ({
    handleImageUpload,
    formData,
    handleCertificateItemChange,
    validateCertificateData,
    removeCertificateItem,
    addCertificateItem,
    wards,
    subCountyWards,
    caption,
    onLocationChange,
    index
    
})  {
    const [selectedLocation,setSelectedLocation]= useState([])
    const generateLocationOptions =() =>{
        const locationOptions = Object.keys(subCountyWards).map((subCounty) =>{
            const wards = subCountyWards[subCounty].map((ward) =>({value:ward,label:ward, subCounty}))
            return {label:subCounty,options : wards}
        });
        return locationOptions
    }
    const customStyles ={
        control:(provider) =>({
            ...provider,
            width :'100%',
            marginBottom:10
        })
    }

    const handleSelectLocation = (selectedOptions) => {
  

        const selectedLocationData = selectedOptions.map((option, idx) => ({
            subCounty: option.subCounty,
            ward: option.value,
            key: `${option.subCounty}-${option.value}-${idx}`
        }));

   

        setSelectedLocation(selectedOptions);
        
        onLocationChange(selectedOptions);
    };  


    return (
        <div>
            <Card
                body
                className="my-2"
            >
                <CardHeader style={{ alignItems: 'center', padding: '10px' }}>
                    <Button type="button" size="md" color='primary' onClick={addCertificateItem}>
                        {caption}
                    </Button>
                </CardHeader>

            </Card>

            <Card body className="my-2">
                <Label for={`subcounty-${index}`}>Sub-County</Label>
               <Select
                    options={generateLocationOptions()}
                    isMulti
                    value={selectedLocation}
                    onChange={handleSelectLocation}
                    styles={customStyles}
                    // menuIsOpen={true}
                    onMenuClose={() => {}}
                />

            </Card>
        </div>
    );
};
