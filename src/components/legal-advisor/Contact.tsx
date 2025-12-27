"use client";

import React, { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { contactContent } from "@/content/legal-advisor/home/contact";
import ArrowRightIconThree from "@/icons/ArrowRightIconThree";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const validateForm = useCallback(() => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name.');
      document.getElementById('name')?.focus();
      return false;
    }

    if (!formData.email.trim()) {
      toast.error('Please enter your email address.');
      document.getElementById('email')?.focus();
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      document.getElementById('email')?.focus();
      return false;
    }

    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number.');
      document.getElementById('phone')?.focus();
      return false;
    }

    const phoneRegex = /^01[3-9][0-9]{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Please enter a valid phone number (must start with 01 and be 11 digits).');
      document.getElementById('phone')?.focus();
      return false;
    }

    if (!formData.message.trim()) {
      toast.error('Please enter your message.');
      document.getElementById('message')?.focus();
      return false;
    }

    return true;
  }, [formData]);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Sending message...');

    try {
      // TODO: Add actual API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Message sent successfully! We will get back to you soon.', { id: toastId });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch {
      // TODO: Add proper error logging service
      toast.error('Failed to send message. Please try again.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm]);

  return (
    <div className="contact-la__area pb-150">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-xl-8 p-xxl-0">
            <h3 className="h3 contact-la__title fade_up_anim" data-delay=".2">
              {contactContent.sectionHeader.title}
            </h3>
            <form onSubmit={handleSubmit} className="contact-la__form pt-100" noValidate>
              <input
                type="text"
                name="name"
                id="name"
                placeholder={contactContent.form.namePlaceholder}
                value={formData.name}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="fade_up_anim"
                data-delay=".4"
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder={contactContent.form.emailPlaceholder}
                value={formData.email}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="fade_up_anim"
                data-delay=".6"
              />
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder={contactContent.form.phonePlaceholder}
                value={formData.phone}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="fade_up_anim"
                data-delay=".8"
              />
              <textarea
                name="message"
                id="message"
                placeholder={contactContent.form.messagePlaceholder}
                value={formData.message}
                onChange={handleInputChange}
                disabled={isSubmitting}
                rows={5}
                className="fade_up_anim"
                data-delay="1"
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="common-btn__variation4 bg-white-hover fade_up_anim"
                data-delay="1.2"
              >
                <span>{isSubmitting ? 'Sending...' : contactContent.form.submitText}</span>
                <ArrowRightIconThree />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
