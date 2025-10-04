import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${id}/match`, {
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
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, [id]);

  return (
    <section className="candidates" id="candidates">
        <Container>
            <Row>
                <Col>
                    <h2>Top Candidates</h2>
                    {candidates.map((candidate, index) => (
                        <div key={index}>
                        <h3>Resume ID: {candidate.resume_id}</h3>
                        <p>Score: {candidate.score}</p>
                        <p>Evidence: {candidate.evidence}</p>
                        <p>Missing Requirements: {candidate.missing_requirements.join(', ')}</p>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    </section>
  );
}

export default Candidates;
