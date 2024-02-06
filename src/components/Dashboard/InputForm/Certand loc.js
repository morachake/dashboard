import Select from 'react-select';
import { Row, Col, Input, FormGroup, Card, Label, Button, CardBody, CardHeader } from 'reactstrap';
import { useEffect, useState } from 'react';

export default function Certandloc ({
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

                <CardBody>
                    {formData.certificates.map((certificate, index) => (
                            <Row lg={4} md={6} xs={12} style={{alignItems:'center'}} key={index}>
                                <Col md={6} lg={4}>
                                    <FormGroup>
                                        <Label for={`certificateNumber-${index}`}>Certificate Number</Label>
                                        <Input
                                            id={`certificateNumber-${index}`}
                                            name="certificate_number"
                                            placeholder="Certificate Number"
                                            type="text"
                                            value={certificate.certificate_number}
                                            onChange={(e) => handleCertificateItemChange(e, index)}
                                        />
                                        {/* Display validation error if any */}
                                        {validateCertificateData(certificate).certificate_number && (
                                            <div className="text-danger">
                                                {validateCertificateData(certificate).certificate_number}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col md={6} lg={4}>
                                    <FormGroup>
                                        <Label for={`amountCertified-${index}`}>Amount Certified</Label>
                                        <Input
                                            id={`amountCertified-${index}`}
                                            name="amount_certified"
                                            placeholder="Amount Certified"
                                            type="text"
                                            value={certificate.amount_certified}
                                            onChange={(e) => handleCertificateItemChange(e, index)}
                                        />
                                        {validateCertificateData(certificate).amount_certified && (
                                            <div className="text-danger">
                                                {validateCertificateData(certificate).amount_certified}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                            {index > 0 && (
                                <Col>
                                    <Button type="button" color='danger'  onClick={() => removeCertificateItem(index)}>
                                        Remove 
                                    </Button>
                                </Col>

                          )} 
                            </Row>
                    ))}
                </CardBody>
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
