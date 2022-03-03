import { React, useState } from "react";
import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Multiselect from "multiselect-react-dropdown";
import "./MentorForm.css";
//const {postStudentApplication} = require("../../../axios.js");
import Axios from "axios";
// import FormGroup from "react-bootstrap/esm/FormGroup";

const StudentForm = () => {
  const dbOptions = [
    { value: "SQL (PostgreSQL, MySQL etc.)" },
    { value: "noSQL (MongoDB, Firestore, DynamoDB etc.)" },
    { value: "Graph Databases (Neo4j)" },
    { value: "None" },
  ];
  const platOptions = [
    { value: "AWS" },
    { value: "Google cloud Platform" },
    { value: "Firebase" },
    { value: "Heroku" },
    { value: "Netlify" },
    { value: "Azure" },
    { value: "None" },
  ];

  const init_student = {
      "student_num": "1234567890",
      "email": "sadsad@mail.utoronto.ca",
      "cgpa": 1.8,
      "full_name": "sdasdasdsa",
      "program": "asdasd",
      "year": 2,
      "resume_path": "dasdasd",
      "frameworks": "dasdsad",
      "languages": "adasdsa",
      "databases": {"sql":true},
      "platforms": {"none":true},
      "have_group": false,
      "group_members": "",
      "project_idea": false,
      "idea_description": "",
      "additional": "sadas"
  }

  const [db, setDB] = useState(dbOptions);
  const [plat, setPlat] = useState(platOptions);
  const [student, setStudent] = useState(init_student);

  // 
//   const handleCheckUserId=(e)=>{
//     setStudent({...student,'user_id':e.target.value})
//   }
  // 
  const handleCheckStudentNum=(e)=>{
    setStudent({...student,'student_num':e.target.value});
  }

  // 
  const handleCheckEmail=(e)=>{
    setStudent({...student,'email':e.target.value});
  }

  // 
  const handleCheckCGPA=(e)=>{
    setStudent({...student,'cgpa':e.target.value});
  }

  // 
  const handleCheckFullName=(e)=>{
    setStudent({...student,'full_name':e.target.value});
  }

  // 
  const handleCheckProgram=(e)=>{
    setStudent({...student,'program':e.target.value});
  }

  // 
  const handleCheckYear=(e)=>{
    setStudent({...student,'year':e.target.value});
  }

  // 
  const handleCheckResume=(e)=>{
    setStudent({...student,'resume_path':e.target.value});
  }

  // 
  const handleCheckFrameworks=(e)=>{
    setStudent({...student,'frameworks':e.target.value});
  }

  // 
  const handleCheckLanguages=(e)=>{
    setStudent({...student,'languages':e.target.value});
  }

  // 
  const handleCheckDatabases=(e)=>{
    setStudent({...student,'databases':e.target.value});
  }

  // ];
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      student_num: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log(values);
    },
  });

  //http://localhost:5000
  const createStudentApplication = (e) => {
    console.log("SENDING STUDENT APPLICATION");
    Axios.post("/applications/studentSubmit", student
    ).then((response) => {
        console.log(response);
    });
    e.preventDefault();
  }

  return (
    <>
      <h1 className="app-header">Student Application</h1>
      <Form className="app-container">
        <div className="common-form">
          <Form.Group as={Row} className="mb-3" controlId="full-name">
            <Col style={{ textAlign: "center" }} sm={20}>
              <h3>Individual Information</h3>
            </Col>
            <Col>
              <Form.Label column sm={10}>
                Full Name
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="email" placeholder="Full Name" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                Student Number
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="number" placeholder="Student Number" id="student" value={student['student_num']} onChange={handleCheckStudentNum} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="email">
            <Col>
              <Form.Label column sm={10}>
                UofT email Address
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="email" placeholder="UofT email address" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="cgpa">
            <Col>
              <Form.Label column sm={10}>
                CGPA
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="number" placeholder="CGPA" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="POST">
            <Col>
              <Form.Label column sm={10}>
                Program of Study
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="text" placeholder="Program of Study" />
            </Col>
          </Form.Group>

          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Form.Label as="legend" column sm={10}>
                What year of study will you be as of Winter 2021
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Second Year"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="radio"
                  label="Third Year"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  type="radio"
                  label="Fourth Year or above"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                />
              </Col>
            </Form.Group>
          </fieldset>

          <Form.Group as={Row} className="mb-3" controlId="resume">
            <Col>
              <Form.Label column sm={10}>
                Resume
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="file" placeholder="Your answer" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column sm={10}>
              Do you have a group of 4 members
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="Yes"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
              <Form.Check
                type="radio"
                label="No"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="exp">
            <Col>
              <Form.Label column sm={10}>
                Group member names
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" />
            </Col>
          </Form.Group>
        </div>

        <div className="common-form">
          <Form.Group as={Row} className="mb-3" controlId="languages">
            <Col style={{ textAlign: "center" }} sm={20}>
              <h3>Technical Knowledge</h3>
            </Col>
            <Col>
              <Form.Label column sm={10}>
                What programming languages have you worked with
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="framworks">
            <Col>
              <Form.Label column sm={10}>
                Which Frameworks have you worked with?
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="frameworks">
            <Col>
              <Form.Label column sm={10}>
                What databases have you used?
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Multiselect options={db} displayValue="value" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="platforms">
            <Col>
              <Form.Label column sm={10}>
                What Platforms are you familiar with
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Multiselect options={plat} displayValue="value" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="links">
            <Col>
              <Form.Label column sm={10}>
                Provide us with your Github, Devpost, Portfolio, etc. links
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" />
            </Col>
          </Form.Group>
        </div>

        <div className="common-form">
          <Form.Group as={Row} className="mb-3" controlId="radio-idea">
            <Col style={{ textAlign: "center" }} sm={20}>
              <h3>Project Ideas</h3>
            </Col>
            <Col>
              <Form.Label column sm={10}>
                Do you/does your group have a project idea?
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Check
                type="radio"
                label="Yes"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
              <Form.Check
                type="radio"
                label="No"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="idea">
            <Col>
              <Form.Label column sm={10}>
                If yes, please describe your idea below
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" />
            </Col>
          </Form.Group>
        </div>

        <div className="common-form">
          <Form.Group as={Row} className="mb-3" controlId="additional-info">
            <Col style={{ textAlign: "center" }} sm={20}>
              <h3>Additional Information</h3>
            </Col>
            <Col>
              <Form.Label column sm={10}>
                Is there anything else you'd like us to know
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" />
            </Col>
          </Form.Group>

          {/* <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
            <Col sm={{ span: 10, offset: 5 }}>
              <Form.Check label="Remember me" />
            </Col>
          </Form.Group> */}
        </div>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 5 }}>
            <Button
              className="submit"
              variant="outline-success"
              size="lg"
              type="submit"
              onClick={createStudentApplication}
            >
              Apply!
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};
export default StudentForm;
