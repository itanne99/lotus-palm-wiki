import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import ApiCalls from "./App_Logic";

function App() {
  const apiCalls = new ApiCalls();
  const [formData, setFormData] = useState({
    Name: "",
    Tags: "",
    Specialty: "",
    Phone: "",
    ContactEmail: "",
    "Recommended By": "",
    Comments: "",
    Website: "",
  });
  const [tagDropDown, setTagDropDown] = useState(apiCalls.getTableTags());

  useEffect(() => {
    console.log(apiCalls.getTableTags());
  }, []);

  useEffect(() => {
    console.log("formData:", formData);
  }, [formData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  const generateFormGroups = () => {
    const formatKey = (key) => {
      // Convert key to user-friendly format
      return key.replace(/([A-Z])/g, " $1").trim(); // Insert space before capital letters
    };

    return Object.keys(formData).map((key) => (
      <Form.Group key={key} controlId={`form${key}`}>
        <Form.Label>{formatKey(key)}:</Form.Label>
        {key === "Tags" ? (
          <Form.Control
            as="select"
            value={formData.Tags}
            onChange={(e) => setFormData({ ...formData, Tags: e.target.value })}
          >
            <option value="">Select a Tag</option>
            {tagDropDown.map((tag) => (
              <option key={tag.id} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </Form.Control>
        ) : (
          <Form.Control
            type={key === "ContactEmail" ? "email" : "text"}
            value={formData[key]}
            onChange={(e) =>
              setFormData({ ...formData, [key]: e.target.value })
            }
          />
        )}
      </Form.Group>
    ));
  };

  return (
    <Form onSubmit={handleSubmit}>
      {generateFormGroups()}
      <Form.Group className="mt-2">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}

export default App;
