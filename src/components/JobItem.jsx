import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function JobItem({ title, salary, location, level, _id }) {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <strong>Location:</strong> {location}
          <br />
          <strong>Salary:</strong> {salary}
          <br />
          <strong>Experience:</strong> {level}
        </Card.Text>
        <Link to={`/jobs/view/${_id}`} className="btn btn-primary">
          View More
        </Link>
      </Card.Body>
    </Card>
  );
}
