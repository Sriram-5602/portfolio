
import React from 'react';

const Section = ({ id, title, children, className = '' }) => {
    return (
        <section id={id} className={`section ${className}`}>
            <div className="container">
                {title && <h2 className="section-title">{title}</h2>}
                {children}
            </div>
        </section>
    );
};

export default Section;
