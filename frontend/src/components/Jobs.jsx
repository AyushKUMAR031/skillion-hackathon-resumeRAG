import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import JobDescriptionModal from './JobDescriptionModal';

function Jobs() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        const data = await response.json();
        setJobs([...jobs, data.job]);
        setTitle('');
        setDescription('');
        toast.success('Job created successfully');
      } else {
        toast.error('Failed to create job');
      }
    } catch (error) {
      console.error('Error creating job:', error);
      toast.error('Error creating job');
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs`);
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        } else {
          toast.error('Failed to fetch jobs');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error('Error fetching jobs');
      }
    };

    fetchJobs();
  }, []);

  const handleShowModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  return (
    <section className="content-section jobs-section">
      <Container>
        <Row>
          <Col md={6}>
            <div className="content-bx jobs-bx">
              <h2>Create Job</h2>
              <form onSubmit={handleCreateJob}>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Job Title"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Job Description"
                  rows="6"
                ></textarea>
                <button type="submit">Create Job</button>
              </form>
            </div>
          </Col>
          <Col md={6}>
            <div className="content-bx jobs-bx">
              <h2>Existing Jobs</h2>
              <ul>
                {jobs.map((job) => (
                  <li key={job._id}>
                    <button onClick={() => handleShowModal(job)}>{job.title}</button>
                    <Link to={`/candidates/${job._id}`}>View Candidates</Link>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
      <JobDescriptionModal show={showModal} handleClose={handleCloseModal} job={selectedJob} />
    </section>
  );
}

export default Jobs;
