import React from 'react';
import { portfolioData } from '../data/portfolio';
import { ArrowRight, Calendar } from 'lucide-react';
import Section from './Section';
import './Blog.css';

const Blog = () => {
    const { blogPosts } = portfolioData;

    return (
        <Section id="blog" title="Recent Posts">
            <div className="blog-grid">
                {blogPosts.map((post, index) => (
                    <a key={index} href={post.link} className="blog-card" target="_blank" rel="noopener noreferrer">
                        <div className="blog-image">
                            <img src={post.image} alt={post.title} />
                            <div className="blog-overlay">
                                <span className="read-more">Read Article <ArrowRight size={16} /></span>
                            </div>
                        </div>
                        <div className="blog-content">
                            <div className="blog-meta">
                                <Calendar size={14} />
                                <span>{post.date}</span>
                            </div>
                            <h3 className="blog-title">{post.title}</h3>
                            <p className="blog-excerpt">{post.excerpt}</p>
                        </div>
                    </a>
                ))}
            </div>
        </Section>
    );
};

export default Blog;
