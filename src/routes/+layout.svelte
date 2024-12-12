<script>
  import '$lib/styles/theme.css';
</script>

<header>
    <h1>My Personal Website</h1>
</header>
<nav>
    <a href="/">Home</a>
    <!-- Portfolio button with hover functionality -->
    <div class="portfolio-wrapper">
      <a href="/portfolio" class="portfolio-main">Portfolio</a>
      <div class="portfolio-expanded">
        <a href="/portfolio/software" class="portfolio-option">Software</a>
        <a href="/portfolio/hardware" class="portfolio-option">Hardware/IT</a>
      </div>
    </div>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
</nav>

<main>
  <slot />
</main>

<footer>
  <p>© {new Date().getFullYear()} Isolyth. All rights reserved.</p>
</footer>

<style>
  :global(html), :global(body) {
    margin: 0;
    padding: 0;
    height: 100vh;
    overflow-y: auto;
  }

  header {
    background-color: var(--background-overlay);
    color: var(--text-color);
    width: 100%;
    text-align: center;
    padding: 1rem 0;
    margin: 0;
  }

  nav {
    display: flex;
    justify-content: center;
    background-color: var(--background-surface);
    width: 100%;
    margin: 0;
  }

  nav a {
    color: var(--link-color);
    padding: 0.8rem 1.2rem;
    text-decoration: none;
    transition: background-color 0.2s ease;
  }

  nav a:hover {
    background-color: var(--background-overlay);
  }

  /* Portfolio button styles */
  .portfolio-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 120px; /* Fixed initial width */
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }

  .portfolio-main {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    opacity: 1;
    transition: opacity 0.3s ease;
    white-space: nowrap;
  }

  .portfolio-expanded {
    position: absolute;
    left: 0;
    width: 300px;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    opacity: 0;
    visibility: hidden;
    transform: translateX(20px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .portfolio-option {
    padding: 0.8rem 1.2rem;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Hover effects */
  .portfolio-wrapper:hover {
    width: 300px;
  }

  .portfolio-wrapper:hover .portfolio-main {
    opacity: 0;
    pointer-events: none;
  }

  .portfolio-wrapper:hover .portfolio-expanded {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }

  .portfolio-wrapper:hover .portfolio-option {
    opacity: 1;
    transform: translateY(0);
  }

  /* Individual hover effects for option buttons */
  .portfolio-option:hover {
    background-color: var(--background-overlay);
  }

  /* Stagger the animation of the option buttons */
  .portfolio-wrapper:hover .portfolio-option:nth-child(1) {
    transition-delay: 0.1s;
  }

  .portfolio-wrapper:hover .portfolio-option:nth-child(2) {
    transition-delay: 0.2s;
  }

  main {
    flex: 1;
    width: 100%;
  }

  footer {
    background-color: var(--background-surface);
    color: var(--text-color);
    text-align: center;
    padding: 0.8rem;
    width: 100%;
  }

  footer p {
    margin: 0;
    font-size: 0.9rem;
  }

  /* Layout wrapper */
  :global(body) {
    display: flex;
    flex-direction: column;
  }
</style>
