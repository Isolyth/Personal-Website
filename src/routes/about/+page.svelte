<script>
  // About page component
</script>

<div class="about-container">
  <h1>About Me</h1>
  <section class="bio">
    <p>
      placeholder
    </p>
  </section>

  <section class="skills">
    <h2>placeholder</h2>
  </section>
</div>

<style>
  .about-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  h1 {
    color: var(--text-color);
    margin-bottom: 2rem;
  }

  .bio {
    margin-bottom: 2rem;
  }

  .bio p {
    line-height: 1.6;
    color: var(--text-color);
  }

  h2 {
    color: var(--text-color);
    margin-bottom: 1rem;
  }

  .skills ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .skills li {
    color: var(--text-color);
    padding: 0.5rem 1rem;
    background-color: var(--background-surface);
    border-radius: 4px;
    text-align: center;
  }
</style>
