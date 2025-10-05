import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

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
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("http://localhost:5000/api/resumes", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert("File uploaded successfully");
        console.log(data);
        setFile(null);
        setFileName("No file chosen");
      } else {
        alert("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
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
