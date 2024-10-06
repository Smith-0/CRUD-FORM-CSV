import React, { useContext, useEffect, useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RosterContext } from "../context/RosterContext";
import { downloadSampleCSV, parseCSVFile } from "../utils/CSVUtils";

const PlayerForm: React.FC = () => {
  const { state, dispatch } = useContext(RosterContext);
  const { selectedPlayer } = state;

  const fileInputRef = useRef<HTMLInputElement | null>(null); // To reset file input
  const [csvError, setCsvError] = useState<string | null>(null); // Error alert state
  const [successAlert, setSuccessAlert] = useState<boolean>(false); // Success alert state

  useEffect(() => {
    // Log selectedPlayer if needed
  }, [selectedPlayer]);

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      parseCSVFile(file, (data: any) => {
        const expectedHeaders = ["Name", "Position", "Number"];
        const headers = Object.keys(data[0]);

        const isValidFormat = expectedHeaders.every((header) =>
          headers.includes(header)
        );

        // Error handling
        if (!isValidFormat) {
          setCsvError(
            "Invalid CSV format. Please ensure the headers are 'Name', 'Position', and 'Number'."
          );
          // Clear input field on error
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          // Set alert to close after 3 seconds
          setTimeout(() => {
            setCsvError(null);
          }, 5000);
          return;
        }

        // Clear previous errors and set success state
        setCsvError(null);

        // Adding players from the CSV
        data.forEach((row: any) => {
          const newPlayer = {
            id: Date.now() + Math.random(),
            name: row.Name || "",
            position: row.Position || "",
            number: Number(row.Number) || 0,
          };

          dispatch({ type: "ADD_PLAYER", payload: newPlayer });
        });

        // Clear file input after processing
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        // Show success alert for 3 seconds
        setSuccessAlert(true);
        setTimeout(() => {
          setSuccessAlert(false);
        }, 5000);
      });
    }
  };

  const closeAlert = () => {
    setCsvError(null);
    setSuccessAlert(false);
  };

  return (
    <Formik
      initialValues={{
        name: selectedPlayer?.name || "",
        position: selectedPlayer?.position || "",
        number: selectedPlayer?.number || "",
      }}
      enableReinitialize
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        position: Yup.string().required("Required"),
        number: Yup.number().required("Required").min(1, "Invalid number"),
      })}
      onSubmit={(values, { resetForm }) => {
        const newPlayer = {
          id: selectedPlayer ? selectedPlayer.id : Date.now(),
          ...values,
          number: Number(values.number),
        };

        if (selectedPlayer) {
          dispatch({ type: "EDIT_PLAYER", payload: newPlayer });
        } else {
          dispatch({ type: "ADD_PLAYER", payload: newPlayer });
        }

        resetForm();
        dispatch({ type: "CLEAR_SELECTED_PLAYER" });
      }}
    >
      {({ isSubmitting }) => (
        <Form className="mt-4">
          <div className="form-group mb-3">
            <label htmlFor="name">Player Name</label>
            <Field
              name="name"
              type="text"
              className="form-control"
              placeholder="Enter player name"
            />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="position">Position</label>
            <Field
              name="position"
              type="text"
              className="form-control"
              placeholder="Enter player position"
            />
            <ErrorMessage
              name="position"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="number">Jersey Number</label>
            <Field
              name="number"
              type="number"
              className="form-control"
              placeholder="Enter jersey number"
            />
            <ErrorMessage
              name="number"
              component="div"
              className="text-danger"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {selectedPlayer ? "Update Player" : "Add Player"}
          </button>

          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={downloadSampleCSV}
          >
            Download Sample CSV
          </button>

          <div className="form-group mt-3">
            <label htmlFor="csvUpload" className="form-label">
              Upload CSV to Add Players
            </label>
            <input
              ref={fileInputRef} // Reference to reset input
              type="file"
              className="form-control"
              accept=".csv"
              onChange={handleCSVUpload}
            />
          </div>

          {/* Success Alert */}
          {successAlert && (
            <div className="alert alert-success alert-dismissible mt-2">
              Players successfully added from CSV!
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeAlert}
              ></button>
            </div>
          )}

          {/* Error Alert */}
          {csvError && (
            <div className="alert alert-danger alert-dismissible mt-2">
              {csvError}
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeAlert}
              ></button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default PlayerForm;
