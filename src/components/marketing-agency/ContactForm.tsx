"use client";
import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { 
  ContactFormData, 
  ContactFormErrors, 
  ContactFormProps
} from '@/types/marketing-agency/contact-form';

const ContactForm: React.FC<ContactFormProps> = ({ title, onSubmit }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return 'El nombre es obligatorio';
    if (name.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) return 'El nombre solo puede contener letras y espacios';
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    if (!phone.trim()) return 'El teléfono es obligatorio';
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    const phoneRegex = /^(\+?34?[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{3})$|^(\+?[1-9]\d{1,14})$/;
    if (!phoneRegex.test(phone) && cleanPhone.length < 9) {
      return 'Por favor, introduzca un número de teléfono válido (al menos 9 dígitos)';
    }
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return 'El email es obligatorio';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Por favor, introduzca un email válido';
    return undefined;
  };

  const validateMessage = (message: string): string | undefined => {
    if (!message.trim()) return 'El mensaje es obligatorio';
    if (message.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres';
    if (message.trim().length > 500) return 'El mensaje debe tener menos de 500 caracteres';
    return undefined;
  };

  const handleInputChange = useCallback((field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);
  
  const handleInputBlur = useCallback((field: keyof ContactFormData) => {
    let error: string | undefined;
    
    switch (field) {
      case 'name':
        error = validateName(formData.name);
        break;
      case 'phone':
        error = validatePhone(formData.phone);
        break;
      case 'email':
        error = validateEmail(formData.email);
        break;
      case 'message':
        error = validateMessage(formData.message);
        break;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  }, [formData]);
  
  const validateForm = useCallback((): boolean => {
    const newErrors: ContactFormErrors = {
      name: validateName(formData.name),
      phone: validatePhone(formData.phone),
      email: validateEmail(formData.email),
      message: validateMessage(formData.message)
    };

    setErrors(newErrors);
    const errorMessages = Object.values(newErrors).filter(error => error !== undefined);
    if (errorMessages.length > 0) {
      const errorText = errorMessages.join('\n• ');
      toast.error(`Por favor, corrija los siguientes errores:\n• ${errorText}`, {
        duration: 6000,
        style: {
          whiteSpace: 'pre-line',
        }
      });
    }
    return errorMessages.length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // TODO: Add form submission logic here
      }
      toast.success('¡Gracias! Su mensaje ha sido enviado correctamente.');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch {
      // TODO: Add error handling logic here
      toast.error('Lo sentimos, ha ocurrido un error al enviar su mensaje. Por favor, inténtelo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onSubmit, validateForm]);

  return (
    <div className="footer-eight__body-content footer-eight__body-form">
      <h4 className="h4 footer-eight__body-title">{title}</h4>
      
      <form onSubmit={handleSubmit} className="footer-eight__body-contact-form" noValidate>
        <div className="form-group">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nombre y apellidos"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onBlur={() => handleInputBlur('name')}
            className={errors.name ? 'error' : ''}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            onBlur={() => handleInputBlur('phone')}
            className={errors.phone ? 'error' : ''}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={() => handleInputBlur('email')}
            className={errors.email ? 'error' : ''}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <textarea
            id="message"
            name="message"
            placeholder="¿En qué podemos ayudarle?"
            rows={4}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            onBlur={() => handleInputBlur('message')}
            className={errors.message ? 'error' : ''}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;