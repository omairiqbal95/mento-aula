"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import EmailIcon from "@/icons/EmailIcon";
import ArrowRightIconOne from "@/icons/ArrowRightIconOne";

interface NewsletterWidgetProps {
  title: string;
  placeholder: string;
  buttonText: string;
}

const NewsletterWidget = ({ title, placeholder, buttonText }: NewsletterWidgetProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Subscribing...');

    try {
      toast.success('Successfully subscribed to newsletter!', { id: toastId });
      setEmail('');
    } catch {
      toast.error('Failed to subscribe. Please try again.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="widget__item widget__newsletter" onSubmit={handleSubmit}>
      <h6 className="h6 widget__title">{title}</h6>
      <div className="input-groups">
        <div className="input-fields">
          <input
            type="email"
            className="form-control"
            placeholder={placeholder}
            aria-label="Email bar"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <EmailIcon width="24" height="24" />
        </div>
        <button 
          className="common-btn border-light w-100 justify-content-center" 
          type="submit"
          disabled={isSubmitting}
        >
          <span>{isSubmitting ? 'Subscribing...' : buttonText}</span>
          <ArrowRightIconOne />
        </button>
      </div>
    </form>
  );
};

export default NewsletterWidget;
