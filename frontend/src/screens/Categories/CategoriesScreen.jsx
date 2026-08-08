import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/Categories.css';

const CategoriesScreen = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [backendCategories, setBackendCategories] = useState([]);
  const [articleCounts, setArticleCounts] = useState({});
  const navigate = useNavigate();

  // Generate a topic-specific icon based on category name
  const getCategoryIcon = (name) => {
    const n = name.toLowerCase();
    const has = (...words) => words.some((w) => n.includes(w));

    if (has('nature','plant','tree','animal','forest','garden','flower','ecosystem','wildlife','bird')) return '🌿';
    if (has('science','physics','chemistry','biology','lab','research','experiment')) return '🔬';
    if (has('philosophy','think','logic','mind','wisdom','existential','meaning')) return '🧠';
    if (has('simulation','virtual','matrix','digital','holograph','program','code','ai')) return '🔗';
    if (has('religion','god','faith','spirit','prayer','divine','soul','sacred')) return '🏛️';
    if (has('cosmos','space','galaxy','universe','star','planet','astronom','astro','solar','mars','moon','orbit')) return '🪐';
    if (has('consciousness','awareness','brain','mindful','perception','self','senses')) return '👁️';
    if (has('mystery','secret','paranormal','unknown','cryptid','monster','ufo','alien','haunted','ghost')) return '🔺';
    if (has('environment','climate','earth','planet','sustain','ocean','weather','pollution','green')) return '🌍';
    if (has('technology','robot','computer','internet','machine','invention','engineering','innovation')) return '🤖';
    if (has('quantum','particle','atom','wave','mechanics')) return '⚛️';
    if (has('energy','sound','vibration','frequency','spiritual','healing','meditation','yoga')) return '✨';
    if (has('calm','peace','mindful','zen','relax','stillness','quiet')) return '🧘';
    if (has('history','ancient','archaeology','civilization','pyramid','dinosaur','medieval','empire')) return '🏺';
    if (has('psychology','emotion','mental','therapy','behavior','dream')) return '💭';
    if (has('mathematics','math','numbers','geometry','pattern','sequence','fractal','algorithm')) return '📐';
    if (has('astrology','zodiac','horoscope','aurora','northern')) return '♈';
    if (has('myth','legend','folklore','fairy','dragon','fantasy','greek','norse')) return '🐉';
    if (has('music','sound','art','culture','literature','poetry','film','cinema')) return '🎨';
    if (has('food','nutrition','cooking','recipe','diet','coffee','tea')) return '🍃';
    if (has('health','medicine','disease','virus','brain health','wellness','fitness')) return '🩺';
    if (has('travel','adventure','explore','mountain','island','sea','desert','journey')) return '🌍';
    if (has('human','behavior','society','culture','people')) return '💭';
    if (has('reality','dimension','paradox')) return '🌀';
    if (has('lifestyle','daily','habit','productivity')) return '⏳';
    if (has('business','econom','money','finance','market')) return '💼';
    if (has('politics','law','justice','government')) return '⚖️';
    if (has('photography','visual','photo','color')) return '🎥';
    if (has('education','learning','school','study','knowledge')) return '📚';
    if (has('books','reading','writing','story')) return '📖';
    if (has('future','innovation','futur','prediction','dystopia','utopia')) return '🔮';
    if (has('medical','doctor','disease','virus','healthcare')) return '🩺';
    if (has('nuclear','power','electric')) return '⚡';
    if (has('love','relationship','emotion','feel')) return '💖';
    return '✨'; // thematic fallback
  };

  const categories = [
    {
      id: 1,
      icon: '🌿',
      title: 'Nature',
      articles: 146,
      description: 'Exploring the beauty, mysteries and hidden patterns of the natural world.',
      image: 'https://images.pexels.com/photos/414199/pexels-photo-414199.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'nature'
    },
    {
      id: 2,
      icon: '🔬',
      title: 'Science',
      articles: 198,
      description: 'Discoveries, theories and breakthroughs that shape our understanding.',
      image: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=800',
      color: 'science'
    },
    {
      id: 3,
      icon: '🧠',
      title: 'Philosophy',
      articles: 156,
      description: 'Timeless wisdom, deep questions and profound thinking about life.',
      image: 'https://images.pexels.com/photos/26887007/pexels-photo-26887007.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'philosophy'
    },
    {
      id: 4,
      icon: '🔗',
      title: 'Simulation Theory',
      articles: 89,
      description: 'Are we living in a simulation? Exploring theories and mind-bending possibilities.',
      image: 'https://images.pexels.com/photos/30547593/pexels-photo-30547593.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'simulation'
    },
    {
      id: 5,
      icon: '🏛️',
      title: 'Religion & God',
      articles: 132,
      description: 'Sacred texts, spiritual teachings and the concept of the divine.',
      image: 'https://images.pexels.com/photos/161276/moscow-cathedral-mosque-prospekt-mira-ramadan-sky-161276.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'religion'
    },
    {
      id: 6,
      icon: '🪐',
      title: 'Cosmos',
      articles: 121,
      description: 'The universe, galaxies, space exploration and wonders beyond our world.',
      image: 'https://images.pexels.com/photos/23522813/pexels-photo-23522813.png?auto=compress&cs=tinysrgb&w=800',
      color: 'cosmos'
    },
    {
      id: 7,
      icon: '👁️',
      title: 'Consciousness',
      articles: 110,
      description: 'The nature of mind, self-awareness and human consciousness.',
      image: 'https://images.pexels.com/photos/12707034/pexels-photo-12707034.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'consciousness'
    },
    {
      id: 8,
      icon: '🔺',
      title: 'Mysteries',
      articles: 97,
      description: 'Unsolved mysteries, strange phenomena and secrets of existence.',
      image: 'https://images.pexels.com/photos/64766/stonehenge-england-united-kingdom-place-of-worship-64766.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'mysteries'
    },
    {
      id: 9,
      icon: '🌍',
      title: 'Environment',
      articles: 104,
      description: 'Our planet, climate change, sustainability and life on Earth.',
      image: 'https://images.pexels.com/photos/8542547/pexels-photo-8542547.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'environment'
    }
  ];

  // Fetch categories from backend and merge with static ones
  useEffect(() => {
    const fetchBackendCategories = async () => {
      try {
        let backendCats = [];

        // 1. Try the categories endpoint
        try {
          const res = await fetch('https://rabbit-hole-blog-production.up.railway.app/api/articles/categories');
          const data = await res.json();
          if (res.ok && Array.isArray(data)) backendCats = data;
        } catch (e) {
          console.error('Categories endpoint failed:', e);
        }

        // 2. Also derive categories from articles (always reliable)
        try {
          const res = await fetch('https://rabbit-hole-blog-production.up.railway.app/api/articles');
          const articleData = await res.json();
          if (res.ok && Array.isArray(articleData)) {
            // Count articles per category for accurate display
            const counts = {};
            articleData.forEach((a) => {
              if (a.category) {
                counts[a.category] = (counts[a.category] || 0) + 1;
              }
            });
            setArticleCounts(counts);

            // Use the article's image for the category card
            const seenCats = new Set();
            const articleCats = articleData
              .filter((a) => a.category && !seenCats.has(a.category) && seenCats.add(a.category))
              .map((a) => ({ name: a.category, image: a.image || '' }));
            backendCats = [...backendCats, ...articleCats];
          }
        } catch (e) {
          console.error('Articles endpoint failed:', e);
        }

        // 3. Deduplicate by name
        const seen = new Set();
        const unique = backendCats.filter((c) => {
          if (seen.has(c.name)) return false;
          seen.add(c.name);
          return true;
        });

        // 4. Filter out categories that already exist in static list
        const staticNames = categories.map((c) => c.title);
        const newOnes = unique.filter((c) => !staticNames.includes(c.name));
        setBackendCategories(newOnes);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchBackendCategories();
  }, []);

  // Merge static + backend categories into one list
  const allCategories = [
    ...categories.map((c) => ({
      ...c,
      // Use real article count if available, otherwise keep static count
      articles: articleCounts[c.title] !== undefined ? articleCounts[c.title] : c.articles,
    })),
    ...backendCategories.map((c, i) => ({
      id: 100 + i,
      icon: getCategoryIcon(c.name),
      title: c.name,
      articles: articleCounts[c.name] || 0,
      description: `Explore articles in the ${c.name} category.`,
      image: c.image || 'https://images.pexels.com/photos/256514/pexels-photo-256514.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'custom',
    })),
  ];

  const visibleCategories = allCategories.filter((category) =>
    `${category.title} ${category.description}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCategory = (title) => navigate(`/articles?category=${encodeURIComponent(title)}`);

  return (
    <div className="categories-screen">
      <Navbar />

      {/* ============ HERO SECTION — image contained to the same
          max-width as the rest of the page, not full-bleed, with
          navbar clearance (same pattern as the Articles page hero) ============ */}
      <section className="categories-hero">
        <div
          className="categories-hero-inner"
          style={{ backgroundImage: `url(/images/categories22.jpeg)` }}
        >
          <div className="categories-hero-overlay"></div>

          <span className="categories-eyebrow">EXPLORE TOPICS</span>
          <h1 className="categories-hero-title">
            <span className="title-white">Dive into Ideas</span>
            <span className="title-gradient">That Expand Reality</span>
          </h1>
          <p className="categories-hero-desc">
            From the tiniest leaf to the farthest galaxy, from ancient wisdom to futuristic theories—explore every dimension of curiosity.
          </p>
        </div>
      </section>

      {/* ============ CATEGORIES GRID ============ */}
      <section className="categories-grid-section">
        <div className="container-fluid">
          <div className="row g-4">
            {visibleCategories.map((category) => (
              <div key={category.id} className="col-lg-4 col-md-6 col-sm-12">
                <div
                  className={`category-card ${hoveredCard === category.id ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredCard(category.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => openCategory(category.title)}
                  onKeyDown={(event) => event.key === 'Enter' && openCategory(category.title)}
                  role="link"
                  tabIndex={0}
                  style={{ backgroundImage: `url(${category.image})` }}
                >
                  <div className="category-card-overlay"></div>

                  <div className="category-card-content">
                    <div className="category-icon">{category.icon}</div>

                    <h3 className="category-title">{category.title}</h3>

                    <p className="category-articles">{category.articles} Articles</p>

                    <p className="category-desc">{category.description}</p>

                    <Link to={`/articles?category=${encodeURIComponent(category.title)}`} className="category-explore-btn" onClick={(event) => event.stopPropagation()}>
                      Explore {category.title}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ QUOTE SECTION ============ */}
      <section className="categories-quote-section">
        <div className="container-fluid">
          <div className="quote-banner">
            <img src="/images/categories2.jpeg" alt="Quote Background" className="quote-banner-img" />
            <div className="quote-banner-overlay"></div>
            <div className="quote-banner-content">
              <span className="quote-mark-start">"</span>
              <p className="quote-text">The important thing is not to stop questioning. Curiosity has its own reason for existing.</p>
              <div className="quote-author">— Albert Einstein</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <Footer />
    </div>
  );
};

export default CategoriesScreen;