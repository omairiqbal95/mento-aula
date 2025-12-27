'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { NewsletterForm as NewsletterFormType } from '@/types/financial-advisor/footer';
import EmailIcon from '@/icons/EmailIcon';
import ArrowRightIcon from '@/icons/ArrowRightIcon';
import toast from 'react-hot-toast';

interface NewsletterFormProps {
  newsletter: NewsletterFormType;
}

const NewsletterForm = ({ newsletter }: NewsletterFormProps) => {
  const [email, setEmail] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = email.trim() && isAgreed;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter your email address.');
      document.getElementById('contact-email')?.focus();
      return;
    }

    if (!isAgreed) {
      toast.error('Please agree to the privacy policy.');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Subscribing...');

    try {
      // TODO: Add newsletter subscription API call here
      toast.success('Successfully subscribed to newsletter!', { id: toastId });
      setEmail('');
      setIsAgreed(false);
    } catch {
      toast.error('Failed to subscribe. Please try again.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="newsletter" onSubmit={handleSubmit}>
      <ul className="custom-ul">
        <li className="reset">
          <div className="newsletter-email">
            <EmailIcon />
            <input
              type="email"
              name="contact-email"
              id="contact-email"
              placeholder={newsletter.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              type="submit"
              disabled={isSubmitting || !isFormValid}
              style={{ cursor: (isSubmitting || !isFormValid) ? 'not-allowed' : 'pointer' }}
            >
              <ArrowRightIcon />
            </button>
          </div>
        </li>
        <li className="reset">
          <div className="newsletter-agreement">
            <input 
              type="checkbox" 
              id="agree" 
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
            />
            <label htmlFor="agree">
              {newsletter.agreementText}{' '}
              <Link href={newsletter.privacyPolicyHref}>
                {newsletter.privacyPolicyText}
              </Link>
            </label>
          </div>
        </li>
      </ul>
    </form>
  );
};

export default NewsletterForm;
