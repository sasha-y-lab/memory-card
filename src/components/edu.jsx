import { useState } from "react";

function Button(props) {
  return (
    <button
      type={props.type || "button"}
      style={{
        color: props.color,
        fontSize: props.fontSize + "px",
        width: props.width,
      }}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

function Education({ onSubmit }) {
  const [isVisible, setIsVisible] = useState(false);

  const [educations, setEducations] = useState([
    { schoolName: "", location: "", degree: "", graduationDate: "", yesGraduated: false },
  ]);

  const [errors, setErrors] = useState({}); // ✅ missing

  const toggleView = () => setIsVisible(prev => !prev);

  const addEducation = () => {
    setEducations(prev => [
      ...prev,
      { schoolName: "", location: "", degree: "", graduationDate: "", yesGraduated: false },
    ]);
  };

  const deleteEducation = (index) => {
    setEducations(prev => {
      const updated = prev.filter((_, i) => i !== index);
      onSubmit(updated);
      return updated;
    });
  };

  const handleChange = (index, field, value) => {
    setEducations(prev =>
      prev.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu))
    );
  };

  // ✅ Validation inside component
  const validateEducation = () => {
    const newErrors = {};

    educations.forEach((edu, index) => {
      newErrors[index] = {};

      if (!edu.schoolName || edu.schoolName.trim().length < 5) {
        newErrors[index].schoolName = "School name required (min 5 chars)";
      }
      if (!edu.location || edu.location.trim().length < 5) {
        newErrors[index].location = "Location required (min 5 chars)";
      }
      if (!edu.degree || edu.degree.trim().length < 5) {
        newErrors[index].degree = "Degree required (min 5 chars)";
      }
      if (!edu.graduationDate) {
        newErrors[index].graduationDate = "Graduation date required";
      }
    });

    setErrors(newErrors);

    return Object.values(newErrors).every(errObj => Object.keys(errObj).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEducation()) {
      onSubmit(educations);
      setIsVisible(false);
    }
  };

  return (
    <div id="educationSection">
      <div id="header2">
        <h3>
          Educational History{" "}
          <Button
            text={isVisible ? "Hide" : "View"}
            color="blue"
            fontSize={12}
            width="70px"
            onClick={toggleView}
          />
        </h3>
      </div>

      {isVisible && (
        <div id="formbox">
          <form onSubmit={handleSubmit}>
            {educations.map((edu, index) => (
              <div key={index} className="educationForm">
                <h4>
                  Education #{index + 1}
                  {educations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => deleteEducation(index)}
                      style={{ marginLeft: "10px", color: "red" }}
                    >
                      ✕
                    </button>
                  )}
                </h4>

                <label>
                  School Name:
                  <input
                    type="text"
                    value={edu.schoolName}
                    placeholder="Colburt High"
                    onChange={e => handleChange(index, "schoolName", e.target.value)}
                  />
                </label>
                {errors[index]?.schoolName && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors[index].schoolName}
                  </div>
                )}

                <label>
                  Location:
                  <input
                    type="text"
                    value={edu.location}
                    placeholder="Toronto, ON"
                    onChange={e => handleChange(index, "location", e.target.value)}
                  />
                </label>
                {errors[index]?.location && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors[index].location}
                  </div>
                )}

                <label>
                  Degree:
                  <input
                    type="text"
                    value={edu.degree}
                    placeholder="Bachelor of Arts"
                    onChange={e => handleChange(index, "degree", e.target.value)}
                  />
                </label>
                {errors[index]?.degree && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors[index].degree}
                  </div>
                )}

                <label>
                  Graduation Date:
                  <input
                    type="date"
                    value={edu.graduationDate}
                    placeholder="2010"
                    onChange={e => handleChange(index, "graduationDate", e.target.value)}
                  />
                </label>
                {errors[index]?.graduationDate && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors[index].graduationDate}
                  </div>
                )}

                <label>
                  Graduated?
                  <input
                    type="checkbox"
                    checked={edu.yesGraduated}
                    onChange={e => handleChange(index, "yesGraduated", e.target.checked)}
                  />
                </label>

                <hr />
              </div>
            ))}

            <div id="addDelSect">
              <Button
                text="+ Add Education"
                color="green"
                borderColor="green"
                fontSize={12}
                width="120px"
                type="button"
                onClick={addEducation}
              />
            </div>

            <br />
            <Button text="Update" color="blue" fontSize={12} width="70px" type="submit" />
          </form>
        </div>
      )}
    </div>
  );
}

export default Education;
