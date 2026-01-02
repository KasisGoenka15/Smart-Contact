import React, { useState } from 'react';
import { Send, AlertCircle, CheckCircle2, Mail, User, Phone, MessageSquare } from 'lucide-react';

function Contact() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const validate = (name, value) => {
        switch (name) {
            case 'fullName':
                if (!value.trim()) return 'Full name is required';
                if (value.trim().length < 3) return 'Name must be at least 3 characters';
                return '';
            case 'email':
                if (!value.trim()) return 'Email is required';
                if (!/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email';
                return '';
            case 'phone':
                if (!value.trim()) return 'Phone number is required';
                if (!/^\d+$/.test(value)) return 'Phone must contain only numbers';
                if (value.length < 10) return 'Phone must be at least 10 digits';
                return '';
            case 'message':
                if (!value.trim()) return 'Message is required';
                if (value.trim().length < 10) return 'Message must be at least 10 characters';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        const error = validate(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        let isValid = true;

        Object.keys(formData).forEach(key => {
            const error = validate(key, formData[key]);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);

        if (isValid) {
            setIsSubmitting(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));

                const response = await fetch('http://localhost:5000/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    setSubmitSuccess(true);
                    setFormData({ fullName: '', email: '', phone: '', message: '' });
                    setTimeout(() => setSubmitSuccess(false), 5000);
                } else {
                    const data = await response.json();
                    console.error("Backend error:", data);
                    alert("Something went wrong. Please try again.");
                }
            } catch (error) {
                console.error('Submission error:', error);
                alert("Failed to connect to server.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const inputStyle = (hasError) => ({
        paddingLeft: '3rem'
    });

    const iconWrapperStyle = {
        position: 'absolute',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--text-muted)',
        pointerEvents: 'none'
    };

    return (
        <div style={{
            maxWidth: '540px',
            margin: '0 auto',
            padding: '2rem 0 4rem',
            position: 'relative'
        }}>
            {/* Background decoration */}
            <div style={{
                position: 'absolute',
                top: '-100px',
                right: '-200px',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                pointerEvents: 'none',
                zIndex: -1
            }} />

            {/* Header */}
            <div className="animate-fade-in-up" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h1 style={{
                    fontSize: '2.25rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.02em'
                }}>
                    Get in Touch
                </h1>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.05rem'
                }}>
                    Have a question? We'd love to hear from you.
                </p>
            </div>

            {/* Success Message */}
            {submitSuccess && (
                <div className="success-message">
                    <CheckCircle2 size={20} />
                    <span><strong>Success!</strong> Your message has been sent.</span>
                </div>
            )}

            {/* Form Card */}
            <form
                onSubmit={handleSubmit}
                className="glass-card animate-fade-in-up animate-delay-1"
                style={{
                    padding: '2.5rem',
                    opacity: 0,
                    animationFillMode: 'forwards'
                }}
            >
                {/* Full Name */}
                <div className="form-group">
                    <label className="form-label" htmlFor="fullName">Full Name</label>
                    <div style={{ position: 'relative' }}>
                        <span style={iconWrapperStyle}>
                            <User size={18} />
                        </span>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            className="form-input"
                            style={inputStyle(errors.fullName)}
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                        />
                    </div>
                    {errors.fullName && (
                        <div className="error-message">
                            <AlertCircle size={14} /> {errors.fullName}
                        </div>
                    )}
                </div>

                {/* Email */}
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <div style={{ position: 'relative' }}>
                        <span style={iconWrapperStyle}>
                            <Mail size={18} />
                        </span>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            style={inputStyle(errors.email)}
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                        />
                    </div>
                    {errors.email && (
                        <div className="error-message">
                            <AlertCircle size={14} /> {errors.email}
                        </div>
                    )}
                </div>

                {/* Phone */}
                <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number</label>
                    <div style={{ position: 'relative' }}>
                        <span style={iconWrapperStyle}>
                            <Phone size={18} />
                        </span>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="form-input"
                            style={inputStyle(errors.phone)}
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="1234567890"
                        />
                    </div>
                    {errors.phone && (
                        <div className="error-message">
                            <AlertCircle size={14} /> {errors.phone}
                        </div>
                    )}
                </div>

                {/* Message */}
                <div className="form-group">
                    <label className="form-label" htmlFor="message">Message</label>
                    <div style={{ position: 'relative' }}>
                        <span style={{ ...iconWrapperStyle, top: '1.25rem', transform: 'none' }}>
                            <MessageSquare size={18} />
                        </span>
                        <textarea
                            id="message"
                            name="message"
                            className="form-textarea"
                            style={{ paddingLeft: '3rem' }}
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="How can we help you?"
                        ></textarea>
                    </div>
                    {errors.message && (
                        <div className="error-message">
                            <AlertCircle size={14} /> {errors.message}
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                        width: '100%',
                        marginTop: '0.5rem',
                        fontSize: '1rem'
                    }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <span style={{
                                width: '18px',
                                height: '18px',
                                border: '2px solid rgba(255,255,255,0.3)',
                                borderTopColor: 'white',
                                borderRadius: '50%',
                                animation: 'spin 0.8s linear infinite'
                            }} />
                            Sending...
                        </>
                    ) : (
                        <>
                            Send Message
                            <Send size={18} />
                        </>
                    )}
                </button>
            </form>

            {/* Inline keyframes for spinner */}
            <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}

export default Contact;
