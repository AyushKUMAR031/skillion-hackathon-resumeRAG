import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from 'react-toastify';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    const toastId = toast.loading("Uploading file...");

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/resumes`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.update(toastId, { render: "File uploaded successfully", type: "success", isLoading: false, autoClose: 5000 });
        console.log(data);
        setFile(null);
        setFileName("No file chosen");
      } else {
        toast.update(toastId, { render: "File upload failed", type: "error", isLoading: false, autoClose: 5000 });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.update(toastId, { render: "Error uploading file", type: "error", isLoading: false, autoClose: 5000 });
    }
  };

  return (
    <section className="content-section">
      <Container>
        <Row className="d-flex justify-content-center">
          <Col md={8}>
            <div className="content-bx">
              <h2>Upload Resume</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="file-upload" className="custom-file-upload">
                  Choose File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <span className="file-name">{fileName}</span>
                <button type="submit">Upload</button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default FileUpload;
