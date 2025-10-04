import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Jobs() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [jobs, setJobs] = useState([]);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/jobs', {
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
      } else {
        console.error('Failed to create job');
      }
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  useEffect(() => {
    // Fetch existing jobs (dummy data for now)
    const dummyJobs = [
      { _id: 'job1', title: 'Frontend Developer' },
      { _id: 'job2', title: 'Backend Developer' },
    ];
    setJobs(dummyJobs);
  }, []);

  return (
    <section className="jobs" id="jobs">
        <Container>
            <Row>
                <Col>
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
                        ></textarea>
                        <button type="submit">Create Job</button>
                    </form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                    <h2>Existing Jobs</h2>
                    <ul>
                        {jobs.map((job) => (
                        <li key={job._id}>
                            <Link to={`/candidates/${job._id}`}>{job.title}</Link>
                        </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>
    </section>
  );
}

export default Jobs;
