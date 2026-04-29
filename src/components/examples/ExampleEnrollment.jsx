/**
 * Example Enrollment Component using API
 * Shows how to handle form submission with file uploads
 */

import { useState } from "react";
import { enrollmentService } from "../../services/enrollmentService";
import { validationUtil } from "../../utils/validationUtil";

function ExampleEnrollment() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    programId: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file size (5MB max)
      if (!validationUtil.isValidFileSize(selectedFile, 5)) {
        setError("File size must be less than 5MB");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validate form
    if (!validationUtil.isValidName(formData.firstName)) {
      setError("Please enter a valid first name");
      return;
    }

    if (!validationUtil.isValidEmail(formData.email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!formData.programId) {
      setError("Please select a program");
      return;
    }

    setLoading(true);

    try {
      // Create enrollment
      const enrollmentResult =
        await enrollmentService.createEnrollment(formData);

      if (enrollmentResult.success) {
        const enrollmentId = enrollmentResult.data.id;

        // Upload requirements if file is provided
        if (file) {
          const requirementsFormData = new FormData();
          requirementsFormData.append("file", file);

          const uploadResult = await enrollmentService.submitRequirements(
            enrollmentId,
            requirementsFormData,
          );

          if (!uploadResult.success) {
            setError(
              "Enrollment created but file upload failed: " +
                uploadResult.error,
            );
          } else {
            setSuccess(true);
          }
        } else {
          setSuccess(true);
        }

        // Reset form
        if (success) {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            programId: "",
          });
          setFile(null);
        }
      } else {
        setError(enrollmentResult.error);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="enrollment-form">
      <h2>Enrollment Form</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {success && (
        <div className="alert alert-success">
          Enrollment submitted successfully!
        </div>
      )}

      <div className="form-group">
        <label htmlFor="firstName">First Name *</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleInputChange}
          disabled={loading}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name *</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleInputChange}
          disabled={loading}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={loading}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="programId">Program *</label>
        <select
          id="programId"
          name="programId"
          value={formData.programId}
          onChange={handleInputChange}
          disabled={loading}
          required
        >
          <option value="">Select a program</option>
          <option value="bsit">BSIT</option>
          <option value="bscs">BSCS</option>
          <option value="bsece">BSECE</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="requirements">Upload Requirements (Optional)</label>
        <input
          id="requirements"
          type="file"
          onChange={handleFileChange}
          disabled={loading}
          accept=".pdf,.doc,.docx,.jpg,.png"
        />
        {file && <p className="file-info">Selected: {file.name}</p>}
      </div>

      <button type="submit" disabled={loading} className="btn-submit">
        {loading ? "Submitting..." : "Submit Enrollment"}
      </button>
    </form>
  );
}

export default ExampleEnrollment;
