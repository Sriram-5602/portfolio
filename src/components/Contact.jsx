
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState(''); // '', 'submitting', 'success', 'error'

    // REPLACE THIS WITH YOUR ACTUAL FORMSPREE FORM ID
    const FORM_ID = "xyzvaaqd";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus('error');
        }
    };

    return (
        <div className="contact-container">
            {status === 'success' ? (
                <div className="success-message">
                    <div className="success-icon">🎉</div>
                    <h3>Message Sent!</h3>
                    <p>Thanks for reaching out. I'll get back to you soon.</p>
                    <button onClick={() => setStatus('')} className="btn-reset">Send another</button>
                </div>
            ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your Name"
                            disabled={status === 'submitting'}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                            disabled={status === 'submitting'}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="What's on your mind?"
                            rows="5"
                            disabled={status === 'submitting'}
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-btn" disabled={status === 'submitting'}>
                        {status === 'submitting' ? (
                            <span>Sending...</span>
                        ) : (
                            <>
                                <Send size={18} />
                                Send Message
                            </>
                        )}
                    </button>

                    {status === 'error' && (
                        <p className="error-msg">Oops! Something went wrong. Please try again.</p>
                    )}
                </form>
            )}
        </div>
    );
};

export default Contact;
