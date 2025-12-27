"use client";
import React, { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { toast } from "react-hot-toast";
import AppointmentImage from "@/assets/images/appointment/image.png";

// Import date picker styles
import "react-datepicker/dist/react-datepicker.css";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reasonOfVisit: string;
  specialist: { value: string; label: string } | null;
  selectedDate: Date | null;
  selectedTime: Date | null;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  reasonOfVisit?: string;
  specialist?: string;
  selectedDate?: string;
  selectedTime?: string;
}

const AppointmentForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reasonOfVisit: "",
    specialist: null,
    selectedDate: null,
    selectedTime: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const specialistOptions = [
    { value: "1", label: "Cardiologist" },
    { value: "2", label: "Neurologist" },
    { value: "3", label: "Orthopedic" },
    { value: "4", label: "Dermatologist" },
    { value: "5", label: "General Physician" },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.reasonOfVisit.trim()) {
      newErrors.reasonOfVisit = "Reason of visit is required";
    }

    if (!formData.specialist) {
      newErrors.specialist = "Please select a specialist";
    }

    if (!formData.selectedDate) {
      newErrors.selectedDate = "Please select an appointment date";
    }

    if (!formData.selectedTime) {
      newErrors.selectedTime = "Please select an appointment time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | Date | { value: string; label: string } | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Booking your appointment...");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Appointment booked successfully!", { id: loadingToast });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        reasonOfVisit: "",
        specialist: null,
        selectedDate: null,
        selectedTime: null,
      });
      setErrors({});
    } catch {
      toast.error("Failed to book appointment. Please try again.", {
        id: loadingToast,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const customSelectStyles = {
    control: (provided: Record<string, unknown>) => ({
      ...provided,
      border: `1px solid ${errors.specialist ? "#dc3545" : "#e0e0e0"}`,
      borderRadius: "8px",
      padding: "4px 12px",
      fontSize: "16px",
      minHeight: "48px",
      height: "48px",
      boxShadow: "none",
      "&:hover": {
        border: `1px solid ${errors.specialist ? "#dc3545" : "#ccc"}`,
      },
    }),
    valueContainer: (provided: Record<string, unknown>) => ({
      ...provided,
      height: "42px",
      display: "flex",
      alignItems: "center",
      overflow: "unset",
    }),
    input: (provided: Record<string, unknown>) => ({
      ...provided,
      margin: "0",
      paddingTop: "0",
      paddingBottom: "0",
    }),
    indicatorsContainer: (provided: Record<string, unknown>) => ({
      ...provided,
      height: "42px",
    }),
    placeholder: (provided: Record<string, unknown>) => ({
      ...provided,
      color: "#999",
    }),
    singleValue: (provided: Record<string, unknown>) => ({
      ...provided,
      color: "#333",
      fontSize: "16px",
    }),
    option: (
      provided: Record<string, unknown>,
      state: { isSelected: boolean; isFocused: boolean }
    ) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#007bff"
        : state.isFocused
        ? "#f8f9fa"
        : "white",
      color: state.isSelected ? "white" : "#333",
      "&:hover": {
        backgroundColor: "#f8f9fa",
      },
    }),
  };

  return (
    <div className="appointment__area pt-150 pb-150">
      <div className="container container-2xl">
        <div className="appointment__thumb">
          <Image
            src={AppointmentImage}
            alt="image"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="appointment__content">
          <h2
            className="h2 h2 section__header-title-v8 fade_up_anim"
            data-delay=".1"
          >
            Book online now!
          </h2>
          <p className="health fade_up_anim" data-delay=".2">
            Experience the Convenience of Modern Healthcare. Book Appointment
            Online Now!
          </p>
          <form onSubmit={handleSubmit} className="appointment__form">
            <div className="d-sm-flex align-items-center gap-4">
              <div className="w-100">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className={`fade_up_anim ${errors.firstName ? "error" : ""}`}
                  data-delay=".3"
                  style={{
                    borderColor: errors.firstName ? "#dc3545" : "#e0e0e0",
                    marginBottom: errors.firstName ? "5px" : "0",
                  }}
                />
                {errors.firstName && (
                  <small className="text-danger">{errors.firstName}</small>
                )}
              </div>
              <div className="w-100">
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className={`fade_up_anim ${errors.lastName ? "error" : ""}`}
                  data-delay=".4"
                  style={{
                    borderColor: errors.lastName ? "#dc3545" : "#e0e0e0",
                    marginBottom: errors.lastName ? "5px" : "0",
                  }}
                />
                {errors.lastName && (
                  <small className="text-danger">{errors.lastName}</small>
                )}
              </div>
            </div>

            <div className="d-sm-flex align-items-center gap-4">
              <div className="w-100">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`fade_up_anim ${errors.email ? "error" : ""}`}
                  data-delay=".5"
                  style={{
                    borderColor: errors.email ? "#dc3545" : "#e0e0e0",
                    marginBottom: errors.email ? "5px" : "0",
                  }}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>
              <div className="w-100">
                <input
                  type="text"
                  name="phone_name"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`fade_up_anim ${errors.phone ? "error" : ""}`}
                  data-delay=".6"
                  style={{
                    borderColor: errors.phone ? "#dc3545" : "#e0e0e0",
                    marginBottom: errors.phone ? "5px" : "0",
                  }}
                />
                {errors.phone && (
                  <small className="text-danger">{errors.phone}</small>
                )}
              </div>
            </div>

            <div className="">
              <input
                type="text"
                name="reason_of_visit"
                placeholder="Reason of Visit"
                value={formData.reasonOfVisit}
                onChange={(e) =>
                  handleInputChange("reasonOfVisit", e.target.value)
                }
                className={`fade_up_anim ${
                  errors.reasonOfVisit ? "error" : ""
                }`}
                data-delay=".7"
                style={{
                  borderColor: errors.reasonOfVisit ? "#dc3545" : "#e0e0e0",
                  marginBottom: errors.reasonOfVisit ? "5px" : "0",
                }}
              />
              {errors.reasonOfVisit && (
                <small className="text-danger">{errors.reasonOfVisit}</small>
              )}
            </div>

            <div
              className="d-flex align-items-center position-relative z-3 gap-4 fade_up_anim"
              data-delay=".8"
            >
              <div className="w-100">
                <Select
                  options={specialistOptions}
                  value={formData.specialist}
                  onChange={(value) => handleInputChange("specialist", value)}
                  placeholder="Select Specialist"
                  styles={customSelectStyles}
                  className="w-100"
                  classNamePrefix="react-select"
                  isSearchable={false}
                />
                {errors.specialist && (
                  <small className="text-danger">{errors.specialist}</small>
                )}
              </div>
            </div>

            <div
              className="d-sm-flex align-items-center gap-4 input-date-time fade_up_anim position-relative z-2"
              data-delay=".9"
            >
              <div className="w-100">
                <DatePicker
                  selected={formData.selectedTime}
                  onChange={(time: Date | null) =>
                    handleInputChange("selectedTime", time)
                  }
                  showTimeSelect={true}
                  showTimeSelectOnly={true}
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  placeholderText="Select time"
                  className={`form-control w-100 ${
                    errors.selectedTime ? "error" : ""
                  }`}
                  wrapperClassName="w-100"
                />
                {errors.selectedTime && (
                  <small className="text-danger">{errors.selectedTime}</small>
                )}
              </div>
              <div className="w-100">
                <DatePicker
                  selected={formData.selectedDate}
                  onChange={(date: Date | null) =>
                    handleInputChange("selectedDate", date)
                  }
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select date"
                  minDate={new Date()}
                  className={`form-control w-100 ${
                    errors.selectedDate ? "error" : ""
                  }`}
                  wrapperClassName="w-100"
                />
                {errors.selectedDate && (
                  <small className="text-danger">{errors.selectedDate}</small>
                )}
              </div>
            </div>

            <div
              className="text-center text-sm-start fade_up_anim"
              data-delay="1"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="common-btn__variation8--extend"
                style={{ opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? "Booking..." : "Request For An Appointment"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 15"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.6047 5.59423C17.0639 6.64489 18.83 7 20 7V8C18.83 8 17.0639 8.35511 15.6047 9.40577C14.1709 10.4381 13 12.163 13 15H12C12 11.837 13.3291 9.81193 15.0203 8.59423C15.3337 8.36859 15.6584 8.17142 15.9878 8H0V7H15.9878C15.6584 6.82858 15.3337 6.63141 15.0203 6.40577C13.3291 5.18807 12 3.16296 12 0H13C13 2.83704 14.1709 4.56193 15.6047 5.59423Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
