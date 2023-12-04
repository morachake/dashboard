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
        <Card>
            <label>Upload Current Condition Image</label>
            <form>
                <Input
                    id="afterImages"
                    name="after_images"
                    type="file"
                    onChange={(event) => setUploadFile(event.target.files[0])}
                />
                <Button onClick={handleUpload}>Upload</Button>
            </form>
            {uploadError && <p className="error-message">{uploadError}</p>}
            <Card style={{width:'10rem'}}>
                {cloudinaryImage && 
                <img src={cloudinaryImage} alt="Uploaded" />
                
                }
            </Card>
        </Card>
    );
}
