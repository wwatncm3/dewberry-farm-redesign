import { useState, useEffect } from 'react'
import './App.css'

function WelcomePopup({ onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose} aria-label="Close popup">&times;</button>
        <div className="popup-accent"></div>
        <div className="popup-body">
          <p className="popup-tag">Now Open</p>
          <h2>It&rsquo;s Tulip Season!</h2>
          <p>Our largest u-pick season yet. $15 adults (includes 3 tulips), $5 kids. Pre-purchase tickets online &mdash; we limit guests for the best experience.</p>
          <div className="popup-actions">
            <a href="#events" onClick={onClose} className="btn btn-primary">Get Tickets</a>
            <button className="btn btn-ghost" onClick={onClose}>Just Browsing</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    const timer = setTimeout(() => setShowPopup(true), 2500)
    return () => { window.removeEventListener('scroll', handleScroll); clearTimeout(timer) }
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="app">
      {showPopup && <WelcomePopup onClose={() => setShowPopup(false)} />}

      <div className="petals" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="petal" style={{
            '--delay': `${i * 1.5}s`,
            '--x': `${Math.random() * 100}%`,
            '--size': `${12 + Math.random() * 16}px`,
            '--duration': `${8 + Math.random() * 10}s`,
            '--drift': `${-40 + Math.random() * 80}px`,
          }}></div>
        ))}
      </div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <button className="logo" onClick={() => scrollTo('hero')}>
            <span className="logo-text">Dewberry Farm</span>
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
            <span></span><span></span><span></span>
          </button>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><a onClick={() => scrollTo('hero')}>Home</a></li>
            <li><a onClick={() => scrollTo('events')}>Tickets/Events</a></li>
            <li><a onClick={() => scrollTo('tulips')}>U-Pick Tulips</a></li>
            <li><a onClick={() => scrollTo('sunflowers')}>U-Pick Sunflowers</a></li>
            <li><a onClick={() => scrollTo('photography')}>Photography</a></li>
            <li className="nav-more" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
              <a className="more-trigger">More</a>
              {moreOpen && (
                <ul className="dropdown">
                  <li><a onClick={() => { scrollTo('weddings'); setMoreOpen(false) }}>Weddings</a></li>
                  <li><a onClick={() => { scrollTo('animals'); setMoreOpen(false) }}>Farm Animals</a></li>
                  <li><a onClick={() => { scrollTo('gallery'); setMoreOpen(false) }}>Gallery</a></li>
                  <li><a onClick={() => { scrollTo('info'); setMoreOpen(false) }}>Location</a></li>
                  <li><a onClick={() => { scrollTo('contact'); setMoreOpen(false) }}>Contact Us</a></li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* ===== HOME / HERO ===== */}
      <section id="hero" className="hero">
        <img src="/images/tulip-fields-wide.png" alt="" className="hero-image" width="1920" height="1080" fetchpriority="high" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-tag">Est. 1925 &mdash; Kernersville, NC</p>
          <h1>Dewberry<br />Farm</h1>
          <p className="hero-sub">
            A private residence and working farm on 20 acres. U-pick flowers, seasonal festivals,
            farm animals, photography, weddings &amp; more &mdash; in the heart of the Piedmont Triad.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => scrollTo('events')}>2026 Tickets &amp; Events</button>
            <button className="btn btn-outline" onClick={() => scrollTo('about')}>Our Story</button>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src="/images/farm-sign.png" alt="Dewberry Farm wooden entrance sign" className="about-img" width="800" height="960" loading="lazy" />
            </div>
            <div className="about-text">
              <p className="section-tag">Our Story</p>
              <h2>Three Generations of Growing</h2>
              <p>
                Dewberry Manor at Dewberry Farm is a private residence and working farm that sits on 20 acres.
                In the family since 1925, the farm was originally 100 acres and ran as a sugar cane farm
                that supplied molasses for the local community and grew tobacco.
              </p>
              <p>
                Dewberry Farm hosts private and public events, U-Pick Tulips in the Spring, Mother&rsquo;s Day Tea,
                U-Pick Sunflowers in Summer and Fall as well as elopements and micro weddings.
                Dewberry Farm has been hosting events since 2011 and would be honored to be a part of your special day.
              </p>
              <p className="about-tagline">Rooted in 3 generations &mdash; from tobacco fields to flowers, learning, and connection.</p>
              <div className="about-stats">
                <div className="stat"><span className="stat-number">20</span><span className="stat-label">Acres</span></div>
                <div className="stat"><span className="stat-number">1925</span><span className="stat-label">Established</span></div>
                <div className="stat"><span className="stat-number">5.0</span><span className="stat-label">Star Rating</span></div>
                <div className="stat"><span className="stat-number">100%</span><span className="stat-label">Recommend</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TICKETS / EVENTS ===== */}
      <section id="events" className="events">
        <div className="container">
          <p className="section-tag center">2026 Season</p>
          <h2 className="section-title">Tickets &amp; Events</h2>
          <p className="section-desc">
            U-pick tulips, sunflowers, lavender, and the summer cutting garden. Fresh grown produce,
            flower workshops, fall festival, Christmas pictures, Santa on the Farm, and our sip, soup &amp; lighted walking trail.
          </p>
          <div className="notice-bar">
            All tickets must be pre-purchased online. We limit guests for the best experience. Allow 1&ndash;2 hours per visit. All tickets are non-refundable &mdash; farm stays open rain or shine.
          </div>
          <div className="events-grid">
            <div className="event-card tulip-card">
              <div className="event-season">Spring &mdash; Now Open</div>
              <h3>U-Pick Tulips</h3>
              <p>Our largest tulip season yet. Walk the rows and hand-pick your own fresh bouquet.</p>
              <div className="event-pricing">
                <span>$15 adults <small>(includes 3 tulips)</small></span>
                <span>$5 children <small>(ages 2+)</small></span>
                <span>$1.50 per additional tulip</span>
                <span>$2.00 tulip bulb + stem</span>
              </div>
              <button className="btn btn-primary" onClick={() => scrollTo('tulips')}>Learn More</button>
            </div>
            <div className="event-card sunflower-card">
              <div className="event-season">Coming June 2026</div>
              <h3>U-Pick Sunflowers</h3>
              <p>17 varieties of bouquet sunflowers, zinnias, dahlias and other cut flowers.</p>
              <div className="event-pricing">
                <span>$13.50 adults <small>(includes 3 sunflowers)</small></span>
                <span>$5 children</span>
                <span>$1.50 additional sunflower</span>
                <span>$0.50 zinnias &bull; $2.00 dahlias</span>
                <span>$15 fill-a-cup <small>(16oz)</small></span>
              </div>
              <button className="btn btn-primary" onClick={() => scrollTo('sunflowers')}>Learn More</button>
            </div>
            <div className="event-card lavender-card">
              <div className="event-season">Summer</div>
              <h3>Lavender &amp; Cutting Garden</h3>
              <p>Fresh lavender, zinnias, and a full cutting garden. Build your own custom arrangement.</p>
              <span className="event-badge">New for 2026</span>
            </div>
            <div className="event-card produce-card">
              <div className="event-season">Summer</div>
              <h3>Fresh Produce</h3>
              <p>Farm-grown vegetables and herbs added to our u-pick experience. Food and flowers.</p>
              <span className="event-badge">New for 2026</span>
            </div>
            <div className="event-card workshop-card">
              <div className="event-season">Various Dates</div>
              <h3>Flower Workshops</h3>
              <p>Hands-on arranging classes right on the farm. Learn from local florists.</p>
              <span className="event-badge">Check Dates</span>
            </div>
            <div className="event-card holiday-card">
              <div className="event-season">November &ndash; December</div>
              <h3>Holiday on the Farm</h3>
              <p>Christmas pictures, Santa on the Farm, fall festival, and our sip, soup &amp; lighted walking trail.</p>
              <span className="event-badge">Seasonal</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== U-PICK TULIPS ===== */}
      <section id="tulips" className="tulips">
        <div className="container">
          <div className="feature-grid">
            <div className="feature-visual tulip-visual">
              <img src="/images/tulips-close.png" alt="Rows of colorful tulips at Dewberry Farm" className="feature-img" width="600" height="600" loading="lazy" />
            </div>
            <div className="feature-text">
              <p className="section-tag">Spring &mdash; Now Open</p>
              <h2>U-Pick Tulips</h2>
              <p>
                Our largest u-pick tulip season to date opened March 19, 2026. Walk the rows, pick your
                favorites, and take home a fresh bouquet straight from the field. Dress for the weather
                and wear comfortable shoes &mdash; the farm has hilly terrain, grass, and gravel.
              </p>
              <div className="feature-details">
                <div className="detail-item"><strong>Admission</strong><p>$15 adults (3 tulips included), $5 children (2+)</p></div>
                <div className="detail-item"><strong>Extra Stems</strong><p>$1.50 per tulip, $2.00 per bulb + stem</p></div>
                <div className="detail-item"><strong>Tickets</strong><p>Pre-purchase required. 2-hour time slots.</p></div>
                <div className="detail-item"><strong>Hours</strong><p>Mon&ndash;Fri close at 7:00pm, Sat&ndash;Sun close at 7:30pm</p></div>
                <div className="detail-item"><strong>Note</strong><p>Non-refundable. Farm open rain or shine.</p></div>
              </div>
              <a href="#events" className="btn btn-primary">Buy Tickets</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== U-PICK SUNFLOWERS ===== */}
      <section id="sunflowers" className="sunflowers">
        <div className="container">
          <div className="feature-grid reverse">
            <div className="feature-visual sunflower-visual">
              <svg viewBox="0 0 200 280" className="flower-illustration" aria-hidden="true">
                <path d="M100 270 L100 150" stroke="#3a6b35" strokeWidth="3" fill="none" />
                <path d="M100 190 Q65 180 50 200" stroke="#3a6b35" strokeWidth="2.5" fill="none" />
                <circle cx="100" cy="90" r="25" fill="#8B6914" opacity="0.6" />
                {Array.from({ length: 14 }).map((_, i) => {
                  const angle = (i * 360 / 14) * Math.PI / 180
                  const x = 100 + Math.cos(angle) * 45
                  const y = 90 + Math.sin(angle) * 45
                  return <ellipse key={i} cx={x} cy={y} rx="12" ry="6"
                    fill="#f4a020" opacity="0.7"
                    transform={`rotate(${i * 360/14 + 90}, ${x}, ${y})`} />
                })}
              </svg>
            </div>
            <div className="feature-text">
              <p className="section-tag">Coming June 2026</p>
              <h2>U-Pick Sunflowers</h2>
              <p>
                17 varieties of bouquet sunflowers, zinnias, dahlias, and other cut flowers.
                Bring your own clippers and something to carry your blooms. The fields are golden
                and gorgeous &mdash; a favorite for families and photographers.
              </p>
              <div className="feature-details">
                <div className="detail-item"><strong>Admission</strong><p>$13.50 adults (3 sunflowers included), $5 children</p></div>
                <div className="detail-item"><strong>Extra Stems</strong><p>Sunflowers $1.50, zinnias $0.50, dahlias $2.00</p></div>
                <div className="detail-item"><strong>Fill-a-Cup</strong><p>$15 for a 16oz cup &mdash; fill it with any flowers</p></div>
                <div className="detail-item"><strong>Tickets</strong><p>Pre-purchase required. 2-hour time slots.</p></div>
                <div className="detail-item"><strong>Bring</strong><p>Clippers and a container for your flowers</p></div>
              </div>
              <a href="#events" className="btn btn-primary">Buy Tickets</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PHOTOGRAPHY ===== */}
      <section id="photography" className="photography">
        <div className="container">
          <p className="section-tag center">Book a Session</p>
          <h2 className="section-title">Photography</h2>
          <p className="section-desc">
            Some of the most beautiful backdrops in the Triad. Professional photo sessions available
            during events &mdash; reservations required with a $50 deposit.
          </p>
          <div className="photo-rules">
            <div className="rule-card">
              <h4>Booking</h4>
              <p>Reservations required. $50 deposit due upon booking. Check in at the ticket window upon arrival and receive your lanyard.</p>
            </div>
            <div className="rule-card">
              <h4>On the Farm</h4>
              <p>Enter at the main entrance (green gate). Sessions cannot be split between dates or shared with other photographers. Other photographers may be on the farm during your session.</p>
            </div>
            <div className="rule-card">
              <h4>Rules</h4>
              <p>All props and items must be removed after your session. $100 cleanup fee for items left behind. $500 minimum charge per tree damaged. Stay in designated areas only.</p>
            </div>
          </div>
          <div className="photo-grid">
            {[
              { title: 'Tulip Fields', desc: 'Rows of vibrant spring color for stunning portrait sessions.' },
              { title: 'Sunflower Golden Hour', desc: 'Late afternoon light through 17 varieties of sunflowers.' },
              { title: 'The Barn', desc: 'Rustic wood, warm light, and southern character.' },
              { title: 'Cherry Tree Lane', desc: 'A natural aisle of blossoms for ceremony and portrait shots.' },
              { title: 'Lower Meadow', desc: 'Rolling hills, wildflowers, and a charming bridge crossing.' },
              { title: 'English Garden', desc: 'Curated blooms and quiet corners for intimate portraits.' },
            ].map((item, i) => (
              <div key={i} className="photo-card">
                <div className="photo-placeholder">
                  <span className="photo-number">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WEDDINGS ===== */}
      <section id="weddings" className="weddings">
        <div className="container">
          <div className="wedding-banner three-col">
            <div className="wedding-text">
              <p className="section-tag">Private Events</p>
              <h2>Micro Weddings &amp; Elopements</h2>
              <p>
                Starting in 2026, we are offering micro weddings and elopements. Elopements include
                a ceremony location within the tulip field for up to 16 guests, followed by time in a
                private reception area.
              </p>
              <ul className="wedding-includes">
                <li>Ceremony location in the tulip field</li>
                <li>Up to 16 guests</li>
                <li>Private reception area</li>
                <li>Bridal dressing room</li>
                <li>Prep kitchen</li>
                <li>Sound system &amp; dance floor</li>
                <li>Use of the grounds for 6 hours</li>
              </ul>
              <button className="btn btn-primary" onClick={() => scrollTo('contact')}>Inquire About Weddings</button>
            </div>
            <div className="wedding-image-wrap">
              <img src="/images/wedding-ceremony.png" alt="Wedding ceremony setup at Dewberry Farm" className="wedding-img" width="800" height="533" loading="lazy" />
            </div>
            <div className="wedding-stats">
              <div className="w-stat"><span>16</span><p>Max Guests</p></div>
              <div className="w-stat"><span>6 hrs</span><p>Venue Access</p></div>
              <div className="w-stat"><span>5.0</span><p>Star Rating</p></div>
              <div className="w-stat"><span>48</span><p>Reviews</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FARM ANIMALS ===== */}
      <section id="animals" className="animals">
        <div className="container">
          <p className="section-tag center">Meet the Residents</p>
          <h2 className="section-title">Farm Animals</h2>
          <div className="animals-grid">
            <div className="animal-card">
              <div className="animal-placeholder horse-bg"></div>
              <h4>Gimp</h4>
              <p>Light brown Dunn quarter-horse</p>
            </div>
            <div className="animal-card">
              <div className="animal-placeholder horse-bg"></div>
              <h4>Taz</h4>
              <p>Brown, white &amp; black Tri Paint quarter-horse</p>
            </div>
            <div className="animal-card">
              <div className="animal-placeholder horse-bg"></div>
              <h4>Shaker</h4>
              <p>Blonde Palomino/Paint quarter-horse</p>
            </div>
            <div className="animal-card">
              <div className="animal-placeholder donkey-bg"></div>
              <h4>Mini Donkey</h4>
              <p>Resident mini donkey &amp; farm favorite</p>
            </div>
            <div className="animal-card">
              <div className="animal-placeholder cow-bg"></div>
              <h4>Highland Cow</h4>
              <p>Our fluffy Scottish Highland</p>
            </div>
            <div className="animal-card">
              <div className="animal-placeholder goat-bg"></div>
              <h4>Goats, Sheep &amp; Ponies</h4>
              <p>Friendly farm friends for the whole family</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section id="gallery" className="gallery">
        <div className="container">
          <p className="section-tag center">See the Farm</p>
          <h2 className="section-title">Gallery</h2>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="/images/tulip-fields-wide.png" alt="Tulip fields at Dewberry Farm" width="600" height="400" loading="lazy" />
            </div>
            <div className="gallery-item">
              <img src="/images/tulips-close.png" alt="Close up of tulip rows" width="600" height="400" loading="lazy" />
            </div>
            <div className="gallery-item">
              <img src="/images/wedding-ceremony.png" alt="Wedding ceremony at Dewberry Farm" width="600" height="400" loading="lazy" />
            </div>
            <div className="gallery-item">
              <img src="/images/farm-sign.png" alt="Dewberry Farm entrance sign" width="600" height="400" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOCATION / INFO ===== */}
      <section id="info" className="info">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <h3>Directions</h3>
              <p>Located right off of Old Valley School Rd, on a private gravel road. In the heart of the Triad &mdash; minutes from Winston-Salem, Greensboro, and High Point.</p>
              <p className="info-address">2585 Dewberry Farm Lane<br />Kernersville, NC 27284</p>
            </div>
            <div className="info-card">
              <h3>Hours</h3>
              <p>Dewberry Farm is a private farm open to the public during our ticketed events only. Mon&ndash;Fri close at 7:00pm, Sat&ndash;Sun close at 7:30pm.</p>
              <p className="info-link">Check our ticket page for dates &amp; availability.</p>
            </div>
            <div className="info-card">
              <h3>Before You Visit</h3>
              <p>Dress for the weather and wear comfortable shoes. The farm has hilly terrain, grass, and gravel. Wheelchairs and strollers can access most areas. Allow 1&ndash;2 hours per visit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <p className="section-tag">Get in Touch</p>
              <h2>Visit the Farm</h2>
              <p>Questions about events, tickets, photography, or private bookings? We&rsquo;d love to hear from you.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <strong>Address</strong>
                  <p>2585 Dewberry Farm Lane<br/>Kernersville, NC 27284</p>
                </div>
                <div className="contact-item">
                  <strong>Phone</strong>
                  <p>(336) 971-4684</p>
                </div>
                <div className="contact-item">
                  <strong>Email</strong>
                  <p>dewberrymanor@gmail.com</p>
                </div>
              </div>
              <div className="social-links">
                <a href="https://www.instagram.com/dewberryfarms/" target="_blank" rel="noopener noreferrer" className="social-btn">Instagram</a>
                <a href="https://www.facebook.com/Dewberryflowerfarmandoutdoorvenue/" target="_blank" rel="noopener noreferrer" className="social-btn">Facebook</a>
              </div>
            </div>
            <div className="contact-form-wrap">
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <h3>Send a Message</h3>
                <div className="form-row">
                  <input type="text" name="firstName" placeholder="First name&hellip;" autoComplete="given-name" required />
                  <input type="text" name="lastName" placeholder="Last name&hellip;" autoComplete="family-name" required />
                </div>
                <input type="email" name="email" placeholder="Email address&hellip;" autoComplete="email" required />
                <input type="tel" name="phone" placeholder="Phone number&hellip;" autoComplete="tel" inputMode="tel" />
                <select name="interest" defaultValue="" aria-label="What are you interested in">
                  <option value="" disabled>What are you interested in?</option>
                  <option>U-Pick Tulips</option>
                  <option>U-Pick Sunflowers</option>
                  <option>Lavender / Cutting Garden</option>
                  <option>Photography Session</option>
                  <option>Wedding / Elopement</option>
                  <option>Fall Festival</option>
                  <option>Holiday Events</option>
                  <option>Private Event</option>
                  <option>Other</option>
                </select>
                <textarea name="message" placeholder="Tell us more&hellip;" rows={4}></textarea>
                <button type="submit" className="btn btn-primary full-width">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3>Dewberry Farm</h3>
              <p>A working farm in Kernersville, NC. Flowers, events, animals, and family since 1925.</p>
            </div>
            <div className="footer-links">
              <h4>Visit</h4>
              <a onClick={() => scrollTo('hero')}>Home</a>
              <a onClick={() => scrollTo('events')}>Tickets &amp; Events</a>
              <a onClick={() => scrollTo('tulips')}>U-Pick Tulips</a>
              <a onClick={() => scrollTo('sunflowers')}>U-Pick Sunflowers</a>
              <a onClick={() => scrollTo('photography')}>Photography</a>
            </div>
            <div className="footer-links">
              <h4>More</h4>
              <a onClick={() => scrollTo('weddings')}>Weddings</a>
              <a onClick={() => scrollTo('animals')}>Farm Animals</a>
              <a onClick={() => scrollTo('about')}>Our Story</a>
              <a onClick={() => scrollTo('info')}>Directions &amp; Hours</a>
              <a onClick={() => scrollTo('contact')}>Contact</a>
            </div>
            <div className="footer-links">
              <h4>Connect</h4>
              <a href="https://www.instagram.com/dewberryfarms/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/Dewberryflowerfarmandoutdoorvenue/" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.theknot.com/marketplace/dewberry-farm-inc-kernersville-nc-614392" target="_blank" rel="noopener noreferrer">The Knot</a>
              <a href="https://www.weddingwire.com/biz/dewberry-farm-inc-kernersville/b8acd05394792248.html" target="_blank" rel="noopener noreferrer">WeddingWire</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Dewberry Farm. All rights reserved.</p>
            <p>2585 Dewberry Farm Lane, Kernersville, NC 27284 &bull; (336) 971-4684</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
