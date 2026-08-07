import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/AboutScreen.css';

const TOPICS = [
  'Nature', 'Science', 'Philosophy', 'Simulation Theory',
  'Religion & God', 'Cosmos', 'Consciousness', 'Mysteries', 'Environment'
];

const SCIENTISTS = [
  {
    name: 'Albert Einstein',
    field: 'Reality, Space-Time, Imagination',
    quote: 'The important thing is not to stop questioning.',
    image: '/images/einstein.jpeg',
    influence: 'Einstein showed us space and time are not rigid — they bend, stretch, and warp. His theories opened the door to black holes, wormholes, and the realization that the universe is far stranger than we ever imagined.'
  },
  {
    name: 'Carl Sagan',
    field: 'Cosmos, Curiosity, Wonder',
    quote: 'Somewhere, something incredible is waiting to be known.',
    image: '/images/sagan.jpeg',
    influence: 'Sagan made the cosmos feel personal. He taught us that we are made of star stuff — that the universe is not separate from us, but flowing through our veins.'
  },
  {
    name: 'Roger Penrose',
    field: 'Consciousness, Mathematics, Black Holes',
    quote: 'The universe is not just a random accident. There is a deep mathematical order.',
    image: '/images/Roger Penrose.jpeg',
    influence: 'Penrose dared to ask if consciousness itself might be quantum. His work on black holes and mathematics of the mind sits at the heart of everything this blog explores.'
  },
  {
    name: 'Stephen Hawking',
    field: 'Black Holes, Cosmology, The Universe',
    quote: 'However difficult life may seem, there is always something you can do and succeed at.',
    image: '/images/stephen.jpeg',
    influence: 'Hawking took us to the edge of black holes and showed us that even the impossible can be understood. His work reminds us that the universe is both knowable and endlessly mysterious.'
  },
  {
    name: 'Nikola Tesla',
    field: 'Energy, Frequencies, Imagination',
    quote: 'If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.',
    image: '/images/tesla.jpeg',
    influence: 'Tesla lived between science and mystery. His ideas about free energy, resonance, and invisible forces shaping our world feel as relevant today as a century ago.'
  },
  {
    name: 'Richard Feynman',
    field: 'Curiosity, Deep Thinking, Quantum Physics',
    quote: 'I would rather have questions that can\'t be answered than answers that can\'t be questioned.',
    image: '/images/richard.jpeg',
    influence: 'Feynman approached the universe with childlike wonder and relentless honesty. He reminds us that real understanding begins not with certainty, but with the courage to say "I don\'t know."'
  }
];

const AboutScreen = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="about-screen">
      <Navbar />

      {/* ============ HERO — contained card like articles page ============ */}
      <section className="about-hero-section" id="about">
        <div
          className="about-hero-inner"
          style={{ '--about-hero-bg': "url('/images/aboutback.jpeg')" }}
        >
          <div className="about-hero-overlay"></div>
          <div className="about-hero-content">
            <span className="about-hero-badge">About The Rabbit Hole</span>
            <h1 className="about-hero-heading">Where Curiosity<br />Falls Down the Rabbit Hole</h1>
            <p className="about-hero-sub">
              A space for the endlessly curious — exploring consciousness, the cosmos,<br />
              hidden patterns, and the questions that keep us up at night.
            </p>
          </div>
        </div>
      </section>

      {/* ============ THE STORY ============ */}
      <section className="about-story-section" id="author-story">
        <div className="about-container">
          <div className="about-story-grid">
            <div className="about-story-text">
              <span className="about-label">The Story</span>
              <h2 className="about-title">Behind The Rabbit Hole</h2>
              <p className="about-paragraph">
                I didn't start this space with answers — I started it with a notebook full of questions I was too curious to let go of. Some nights it's simulation theory, some nights it's wondering how a black hole actually works, and some nights it's just sitting quietly with how strange it is to exist at all.
              </p>
              <p className="about-paragraph">
                I'm a Muslim, and my faith is genuinely one of the calmest, steadiest parts of my life. But being sure of what I believe has never stopped me from being endlessly curious about how other people make sense of the universe, their minds, and the things that keep them up at night.
              </p>
              <p className="about-paragraph">
                The Rabbit Hole started as a personal habit — reading one strange, wonderful question a week and writing down what I found. My hope is simple: that you leave each post a little more curious, and a little kinder, than when you arrived.
              </p>
              <div className="about-signature">— Ramsha Abid</div>
            </div>
            <div className="about-story-image">
              <img src="/images/about1.jpeg" alt="Ramsha Abid" />
              <div className="about-story-image-border"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MY JOURNEY — In Frames ============ */}
      <div className="about-journey-wrapper">
        <section className="about-journey-section">
          <div className="about-container">
            <div className="about-journey-header">
            <span className="about-label">My Journey</span>
            <h2 className="about-title">In Frames</h2>
            <p className="about-journey-desc">A glimpse into the spaces, places, and moments that shaped this path.</p>
          </div>
          <div className="about-journey-grid">
            <div className="about-journey-card about-journey-card-featured">
              <div className="about-journey-img">
                <img src="https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Reading" />
              </div>
              <div className="about-journey-overlay">
                <span className="about-journey-label">Always Reading</span>
                <p className="about-journey-desc-small">Getting lost in books about consciousness, the cosmos, and the nature of reality.</p>
              </div>
            </div>
            <div className="about-journey-card">
              <div className="about-journey-img">
                <img src="https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Stargazing" />
              </div>
              <div className="about-journey-overlay">
                <span className="about-journey-label">Lost in the Stars</span>
              </div>
            </div>
            <div className="about-journey-card">
              <div className="about-journey-img">
                <img src="https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Nature" />
              </div>
              <div className="about-journey-overlay">
                <span className="about-journey-label">Finding Patterns</span>
              </div>
            </div>
            <div className="about-journey-card">
              <div className="about-journey-img">
                <img src="https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Writing" />
              </div>
              <div className="about-journey-overlay">
                <span className="about-journey-label">Writing by Moonlight</span>
              </div>
            </div>
            </div>
          </div>
        </section>
      </div>

      {/* ============ INSPIRED BY — scientists cards ============ */}
      <section className="about-scientists-section">
        <div className="about-container">
          <div className="about-scientists-header">
            <span className="about-label">Inspiration</span>
            <h2 className="about-title">The Thinkers Who Shape This Space</h2>
            <p className="about-scientists-desc">
              Every rabbit hole begins somewhere. These are the minds whose questions and ideas
              continue to light the way — explorers of reality, consciousness, and the unknown.
            </p>
          </div>

          <div className="about-scientists-grid">
            {SCIENTISTS.map((scientist, index) => (
              <div key={index} className="about-scientist-card">
                <div className="about-scientist-img">
                  <img src={scientist.image} alt={scientist.name} />
                </div>
                <div className="about-scientist-body">
                  <h3 className="about-scientist-name">{scientist.name}</h3>
                  <span className="about-scientist-field">{scientist.field}</span>
                  <p className="about-scientist-influence">{scientist.influence}</p>
                  <blockquote className="about-scientist-quote">
                    <span className="about-quote-icon">"</span> {scientist.quote}
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TOPICS ============ */}
      <div className="about-topics-wrapper">
        <section className="about-topics-section">
          <div className="about-narrow">
            <div className="about-topics-header">
            <span className="about-label">Explore</span>
            <h2 className="about-title">What You'll Find Here</h2>
            <p className="about-paragraph-center">
              The Rabbit Hole covers whatever question happened to keep me up that week — from the mathematics hiding in a sunflower to whether we're living in a simulation.
            </p>
          </div>
          <div className="about-topic-tags">
            {TOPICS.map((topic) => (
              <Link key={topic} to={`/articles?category=${encodeURIComponent(topic)}`} className="about-topic-tag">
                {topic}
              </Link>
            ))}
            </div>
          </div>
        </section>
      </div>

      {/* ============ SUBSCRIBE ============ */}
      <div className="about-newsletter-wrapper">
        <section className="about-newsletter-section" id="subscribe">
          <div className="about-newsletter-inner">
            <div className="about-newsletter-icon">✉️</div>
            <h2 className="about-newsletter-title">Join the Journey</h2>
            <p className="about-newsletter-text">Subscribe to receive weekly insights, exclusive content, and early access to new articles.</p>
            <form className="about-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                className="about-newsletter-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="about-newsletter-btn">Subscribe</button>
            </form>
          </div>
        </section>
      </div>

      {/* ============ FOOTER ============ */}
      <Footer />
    </div>
  );
};

export default AboutScreen;