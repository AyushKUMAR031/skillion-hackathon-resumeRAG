import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import FullResumeModal from './FullResumeModal';
import { toast } from 'react-toastify';

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/${id}/match`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ top_n: 5 }),
        });

        if (response.ok) {
          const data = await response.json();
          setCandidates(data.matchedCandidates);
        } else {
          console.error('Failed to fetch candidates');
          toast.error('Failed to fetch candidates');
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
        toast.error('Error fetching candidates');
      }
    };

    fetchCandidates();
  }, [id]);

  const handleShowModal = async (resumeId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/resumes/${resumeId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedResume(data.text);
        setShowModal(true);
      } else {
        console.error('Failed to fetch resume');
        toast.error('Failed to fetch resume');
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
      toast.error('Error fetching resume');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedResume('');
  };

  return (
    <section className="content-section candidates-section">
        <Container>
            <Row>
                <Col>
                    <div className="content-bx">
                        <h2>Top Candidates</h2>
                        {candidates.map((candidate, index) => (
                            <div key={index} className="candidate-item">
                                <h3>{candidate.filename}</h3>
                                <p><strong>Score:</strong> {candidate.score.toFixed(4)}</p>
                                <p><strong>Evidence:</strong> {candidate.evidence}</p>
                                <p><strong>Missing Requirements:</strong> {candidate.missing_requirements.join(', ')}</p>
                                <button onClick={() => handleShowModal(candidate.resume_id)}>View Full Resume</button>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
        <FullResumeModal show={showModal} handleClose={handleCloseModal} resumeText={selectedResume} />
    </section>
  );
}

export default Candidates;