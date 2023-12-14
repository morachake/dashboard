import React, { useState } from 'react';
import { Input, Card, Button } from 'reactstrap';
import axios from 'axios';

export default function ImageUpload({ onImageUpload }) {
    const [uploadFile, setUploadFile] = useState("");
    const [uploadError, setUploadError] = useState("");
    const [cloudinaryImage, setCloudinaryImage] = useState("");
    const handleUpload = (e) => {
        e.preventDefault();
        if (!uploadFile) {
            setUploadError("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", uploadFile);
        formData.append("upload_preset", "msa_county");

        axios.post("https://api.cloudinary.com/v1_1/digem679d/image/upload", formData)
            .then((res) => {
                onImageUpload(res.data.url); // Call the callback function with the image URL
                setCloudinaryImage(res.data.url);
            })
            .catch((err) => {
                console.error("Error during submission:", err.message);
                setUploadError("Failed to upload image. Please try again.");
            });
    };

    return (
        <Card style={{ margin: '20px' }}>
        <label htmlFor="afterImages" style={{ display: 'block', marginBottom: '10px' }}>Upload Current Condition Image</label>
        <Card >
            <Input
                id="afterImages"
                name="after_images"
                type="file"
                onChange={(event) => setUploadFile(event.target.files[0])}
                style={{ marginBottom: '10px' }}
            />
            <Button onClick={handleUpload} style={{ display: 'block' }} color='primary'>Upload</Button>
        </Card>
        {uploadError && <p className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{uploadError}</p>}
        <Card style={{ width: '18rem', marginTop: '5' }}>
            {cloudinaryImage && 
                <img src={cloudinaryImage} alt="Uploaded" style={{ width: '100%', height: 'auto' }} />
            }
        </Card>
    </Card>
    
    );
}
