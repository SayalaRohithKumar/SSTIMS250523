// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/feedback';

function App() {
    const [formData, setFormData] = useState({ name: '', message: '', rating: 0 });
    const [feedbacks, setFeedbacks] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRating = (value) => {
        setFormData({ ...formData, rating: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_URL, formData);
            setFormData({ name: '', message: '', rating: 0 });
            fetchFeedbacks();
        } catch (err) {
            console.error('Submit error:', err);
        }
    };

    const fetchFeedbacks = async () => {
        try {
            const res = await axios.get(API_URL);
            setFeedbacks(res.data);
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.heading}>Submit Feedback</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <textarea
                        name="message"
                        placeholder="Your feedback"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        style={styles.textarea}
                    />
                    <div style={styles.ratingContainer}>
                        <label style={styles.ratingLabel}>Rating:</label>
                        <div style={styles.stars}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    style={{
                                        ...styles.star,
                                        color: formData.rating >= star ? '#FFD700' : '#ccc',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleRating(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>
                    <button type="submit" style={styles.button}>Submit</button>
                </form>
            </div>

            <div style={styles.feedbackSection}>
                <h3 style={styles.subheading}>Feedbacks</h3>
                <button type="button" onClick={fetchFeedbacks} style={styles.refreshButton}>
                    View Feedbacks
                </button>
                <ul style={styles.list}>
                    {feedbacks.map((fb) => (
                        <li key={fb._id} style={styles.listItem}>
                            <strong>{fb.name}</strong>: {fb.message}
                            <div style={{ marginTop: '0.3rem' }}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i} style={{ color: i < fb.rating ? '#FFD700' : '#ccc' }}>
                                        ★
                                    </span>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        padding: '2rem',
        background: 'linear-gradient(135deg, #e0f7fa, #80deea)',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formContainer: {
        backgroundColor: '#ffffffcc',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        marginBottom: '2rem',
        width: '100%',
        maxWidth: '500px',
    },
    heading: {
        textAlign: 'center',
        color: '#00796b',
        marginBottom: '1rem',
    },
    subheading: {
        color: '#004d40',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '0.5rem',
        marginBottom: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    textarea: {
        padding: '0.5rem',
        height: '100px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        resize: 'vertical',
        marginBottom: '1rem',
    },
    button: {
        backgroundColor: '#00796b',
        color: 'white',
        border: 'none',
        padding: '0.75rem',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'background-color 0.3s',
    },
    refreshButton: {
        marginTop: '1rem',
        marginBottom: '1rem',
        backgroundColor: '#00695c',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    feedbackSection: {
        width: '100%',
        maxWidth: '600px',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    listItem: {
        backgroundColor: '#ffffffdd',
        marginBottom: '0.5rem',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    ratingContainer: {
        marginBottom: '1rem',
    },
    ratingLabel: {
        fontWeight: 'bold',
        marginRight: '0.5rem',
    },
    stars: {
        display: 'inline-block',
    },
    star: {
        fontSize: '3rem',
        marginRight: '0.3rem',
        cursor: 'pointer',
    },
};

export default App;
