
import Select from 'react-select';
import { Row, Col, Input, FormGroup, Card, Label, Button, CardBody, CardHeader } from 'reactstrap';
export const Certandloc = ({
    handleImageUpload,
    formData,
    handleCertificateItemChange,
    validateCertificateData,
    removeCertificateItem,
    addCertificateItem,
    addLocation,
    validateLocation,
    handleLocationChange,
    locationErrors,
    wards,
    removeLocation,
    subCountyWards,
    caption,
    
}) => {

    const subCountyOptions = Object.keys(subCountyWards).map(key => ({ value: key, label: key }));

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

            <Card 
                body
                className="my-2"
            >
                 <CardHeader style={{ alignItems: 'center', padding: '10px' }}>          
                        <Button color='primary' onClick={addLocation}>Add locations</Button>
                </CardHeader>
                    
              <CardBody>
                   {formData.locations.map((location, index) => (
                       <Row lg={4} md={6} xs={12} key={index} style={{ alignItems: 'center' }}>
                            <Col md={6} lg={4}>
                                <Label for={`subcounty-${index}`}>Sub-County</Label>
                                <Input
                                    id={`subcounty-${index}`}
                                    name={`subcounty-${index}`}
                                    type="select"
                                    value={location.subcounty}
                                    onChange={(e) => handleLocationChange(index, 'subcounty', e.target.value)}
                                >
                                    <option value="">Select Sub-County</option>
                                    <option value="all">All</option>
                                    <option value="Mvita">Mvita</option>
                                    <option value="Likoni">Likoni</option>
                                    <option value="Changamwe">Changamwe</option>
                                    <option value="Kisauni">Kisauni</option>
                                    <option value="Nyali">Nyali</option>
                                    <option value="Jomvu">Jomvu</option>
                                </Input>
                                {locationErrors[index]?.subcounty && (
                                    <div className="text-danger">{locationErrors[index].subcounty}</div>
                                )}
                            </Col>
                            <Col md={6} lg={4}>
                                <Label for={`ward-${index}`}>Ward</Label>
                                <Input
                                    id={`ward-${index}`}
                                    name={`ward-${index}`}
                                    type="select"
                                    value={location.ward}
                                    disabled={location.subcounty === 'all'}  // Disable ward input if 'all' is selected
                                    onChange={(e) => handleLocationChange(index, 'ward', e.target.value)}
                                >
                                    <option value="">Select Ward</option>
                                    {location.subcounty && location.subcounty !== 'all' && 
                                        subCountyWards[location.subcounty].map((ward, wardIndex) => (
                                            <option key={wardIndex} value={ward}>{ward}</option>
                                    ))}
                                </Input>
                                {locationErrors[index]?.ward && (
                                    <div className="text-danger">{locationErrors[index].ward}</div>
                                )}
                            </Col>
                            {index > 0 && (
                                <Col md={6} lg={4} style={{marginTop:30}}>
                                    <Button color="danger" onClick={() => removeLocation(index)}>
                                        Remove
                                    </Button>
                                </Col>
                            )}
                        </Row>
                    ))}
                </CardBody> 
                
            </Card>
        </div>
    )
}