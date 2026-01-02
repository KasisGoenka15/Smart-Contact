import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Smartphone, Zap, Sparkles } from 'lucide-react';

function Home() {
    return (
        <div style={{ paddingBottom: '4rem' }}>
            {/* Hero Section */}
            <section style={{
                textAlign: 'center',
                padding: '6rem 0 5rem',
                position: 'relative'
            }}>
                {/* Decorative blur orbs */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    pointerEvents: 'none'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '15%',
                    width: '250px',
                    height: '250px',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(50px)',
                    pointerEvents: 'none'
                }} />

                {/* Badge */}
                <div
                    className="animate-fade-in-up"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '50px',
                        marginBottom: '1.5rem',
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)'
                    }}
                >
                    <Sparkles size={16} style={{ color: 'var(--primary-color)' }} />
                    <span>Modern • Secure • Fast</span>
                </div>

                {/* Headline */}
                <h1
                    className="animate-fade-in-up animate-delay-1"
                    style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        marginBottom: '1.5rem',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        lineHeight: 1.1
                    }}
                >
                    <span style={{ color: 'var(--text-primary)' }}>Connect with</span>
                    <br />
                    <span style={{
                        background: 'var(--accent-gradient)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Your Audience
                    </span>
                </h1>

                {/* Subtext */}
                <p
                    className="animate-fade-in-up animate-delay-2"
                    style={{
                        fontSize: '1.125rem',
                        color: 'var(--text-secondary)',
                        maxWidth: '550px',
                        margin: '0 auto 2.5rem',
                        lineHeight: 1.7
                    }}
                >
                    Seamlessly collect and manage inquiries with our beautifully crafted contact forms.
                    Built for performance, designed for elegance.
                </p>

                {/* CTA Button */}
                <div className="animate-fade-in-up animate-delay-3">
                    <Link
                        to="/contact"
                        className="btn btn-primary"
                        style={{
                            fontSize: '1.05rem',
                            padding: '1rem 2rem'
                        }}
                    >
                        Get Started
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section style={{ marginTop: '3rem' }}>
                <h2
                    className="animate-fade-in"
                    style={{
                        textAlign: 'center',
                        marginBottom: '3rem',
                        fontSize: '1rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'var(--text-muted)'
                    }}
                >
                    Why Choose Us
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {[
                        {
                            icon: Shield,
                            title: 'Enterprise Security',
                            description: 'Your data is protected with industry-leading encryption and security protocols.',
                            delay: '1'
                        },
                        {
                            icon: Smartphone,
                            title: 'Fully Responsive',
                            description: 'Flawless experience across all devices — desktop, tablet, and mobile.',
                            delay: '2'
                        },
                        {
                            icon: Zap,
                            title: 'Lightning Fast',
                            description: 'Optimized for speed with instant form submissions and real-time validation.',
                            delay: '3'
                        }
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className={`glass-card animate-fade-in-up animate-delay-${feature.delay}`}
                            style={{
                                opacity: 0,
                                animationFillMode: 'forwards'
                            }}
                        >
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '48px',
                                height: '48px',
                                background: 'var(--accent-gradient)',
                                borderRadius: '12px',
                                marginBottom: '1.25rem'
                            }}>
                                <feature.icon size={24} color="white" />
                            </div>
                            <h3 style={{
                                marginBottom: '0.75rem',
                                fontSize: '1.25rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)'
                            }}>
                                {feature.title}
                            </h3>
                            <p style={{
                                color: 'var(--text-secondary)',
                                lineHeight: 1.6,
                                fontSize: '0.95rem'
                            }}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;
