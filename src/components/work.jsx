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

function Work({ onSubmit }) {
  const [isVisible, setIsVisible] = useState(false);
  const [works, setWorks] = useState([
    {
      companyName: "",
      location: "",
      position: "",
      startDate: "",
      endDate: "",
    },
  ]);

  const [errors, setErrors] = useState({});

  const toggleView = () => setIsVisible(prev => !prev);

  const addWork = () => {
    setWorks(prev => [
      ...prev,
      { companyName: "", location: "", position: "", startDate: "", endDate: "" },
    ]);
  };

  const deleteWork = (index) => {
    setWorks(prev => {
      const updated = prev.filter((_, i) => i !== index);
      onSubmit(updated); // update Display.jsx immediately
      return updated;
    });
  };

  const handleChange = (index, field, value) => {
    setWorks(prev =>
      prev.map((work, i) => (i === index ? { ...work, [field]: value } : work))
    );
  };

  const validateWork = () => {
    const newErrors = {};

    works.forEach((work, index) => {
      newErrors[index] = {};
      if (!work.companyName || work.companyName.trim().length < 5) {
        newErrors[index].companyName = "Company name required (min 5 chars)";
      }
      if (!work.location || work.location.trim().length < 5) {
        newErrors[index].location = "Location required (min 5 chars)";
      }
      if (!work.position || work.position.trim().length < 5) {
        newErrors[index].position = "Position required (min 5 chars)";
      }
      if (!work.startDate) newErrors[index].startDate = "Start date required";
      if (!work.endDate) newErrors[index].endDate = "End date required";
      if (work.startDate && work.endDate && work.startDate > work.endDate) {
        newErrors[index].endDate = "End date must be after start date";
      }
    });

    setErrors(newErrors);
    return Object.values(newErrors).every(errObj => Object.keys(errObj).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateWork()) {
      onSubmit(works); // send works to Display.jsx
      setIsVisible(false);
    }
  };

  return (
    <div id="workSection">
      <div id="header2">
        <h3>
          Work Experience{" "}
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
            {works.map((work, index) => (
              <div key={index} className="workForm">
                
                
     <h4>
  Work #{index + 1}
  {works.length > 1 && (
    <button
      type="button"
      onClick={() => deleteWork(index)}
      style={{ marginLeft: "10px", color: "red" }}
    >
      ✕
    </button>
  )}
</h4>


                <label>
                  Company Name:
                  <input
                  type="text"
                    value={work.companyName}
                    placeholder="Fortinos"
                    onChange={e =>
                      handleChange(index, "companyName", e.target.value)
                    }
                  />
                </label>

                {errors[index]?.companyName && (
  <div style={{ color: "red", fontSize: "12px" }}>
    {errors[index].companyName}
  </div>
)}

                <label>
                  Location:
                  <input
                  type="text"
                    value={work.location}
                    placeholder="Toronto, ON"
                    onChange={e =>
                      handleChange(index, "location", e.target.value)
                    }
                  />
                </label>

                {errors[index]?.location && (
  <div style={{ color: "red", fontSize: "12px" }}>
    {errors[index].location}
  </div>
)}

                <label>
                  Position:
                  <input
                  type="text"
                    value={work.position}
                    placeholder="Dietian"
                    onChange={e =>
                      
                      handleChange(index, "position", e.target.value)
                    }
                  />
                </label>

                {errors[index]?.position && (
  <div style={{ color: "red", fontSize: "12px" }}>
    {errors[index].position}
  </div>
)}

                <label>
                  Start Date:
                  <input
                  type="date"
                    value={work.startDate}
                    placeholder="2010"
                    onChange={e =>
                      handleChange(index, "startDate", e.target.value)
                    }
                  />
                </label>

                {errors[index]?.startDate && (
  <div style={{ color: "red", fontSize: "12px" }}>
    {errors[index].startDate}
  </div>
)}

                <label>
                  End Date:
                  <input
                    type="date"
                    placeholder="2023"
                    value={work.endDate}
                    onChange={e =>
                      handleChange(index, "endDate", e.target.value)
                    }
                  />
                </label>

                {errors[index]?.endDate && (
  <div style={{ color: "red", fontSize: "12px" }}>
    {errors[index].endDate}
  </div>
)}

                <hr />
              </div>
            ))}
<div id="addDelSect">
           <Button
  text="+ Add Work"
  
  color="green"
  borderColor="green"
  fontSize={12}
  width="120px"
  type="button"   // 🔥 THIS IS REQUIRED
  onClick={addWork}
/>

{/*
       <Button
  text="- Delete Education"
  color="green"
  borderColor="green"
  fontSize={12}
  width="120px"
  type="button"   // 🔥 THIS IS REQUIRED
  onClick={deleteWork}
/>
*/}
</div>

            <br /><br />

            <Button
              text="Update"
              color="blue"
              fontSize={12}
              width="70px"
              type="submit"
            />
          </form>
        </div>
      )}
    </div>
  );
}








export default Work;
