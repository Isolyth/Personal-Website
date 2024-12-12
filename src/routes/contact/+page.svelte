<script lang="ts">
  import { Mail } from 'lucide-svelte'; // Import the Mail icon
  let email: string = '';
  let isLoading: boolean = false;
  let error: string | null = null;

  async function fetchEmail(): Promise<void> {
    if (email) return; // Don't fetch if we already have it
    
    isLoading = true;
    try {
      const response = await fetch('/api/email');
      const data: { email: string } = await response.json();
      email = data.email;
    } catch (e) {
      error = 'Failed to load email';
      console.error(e);
    } finally {
      isLoading = false;
    }
  }

  async function copyEmail(): Promise<void> {
    if (!email) await fetchEmail();
    if (email) {
      await navigator.clipboard.writeText(email);
    }
  }
</script>

<div class="contact-container">
  <h1>Contact Me</h1>
  
  <div class="contact-boxes">
    <div class="contact-box">
      <div class="icon">
        <img src="/icons/bluesky.svg" alt="Bluesky icon" />
      </div>
      <div class="content">
        <h2>Bluesky</h2>
        <p>Follow me on Bluesky</p>
        <a href="https://bsky.app/profile/isolyth.dev" target="_blank" rel="noopener noreferrer">
          @isolyth.dev
        </a>
      </div>
    </div>

    <div class="contact-box">
      <div class="icon">
        <Mail size={48} color="var(--text-color)" /> <!-- Replace img with Mail component -->
      </div>
      <div class="content">
        <h2>Email</h2>
        {#if !email}
          <button class="reveal-btn" on:click={fetchEmail} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Reveal Email'}
          </button>
        {:else}
          <p>{email}</p>
          <button class="copy-btn" on:click={copyEmail}>Copy to Clipboard</button>
        {/if}
        {#if error}
          <p class="error">{error}</p>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .contact-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  h1 {
    color: var(--text-color);
    margin-bottom: 2rem;
    text-align: center;
  }

  .contact-boxes {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .contact-box {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    background-color: var(--background-surface);
    border-radius: 8px;
    transition: transform 0.2s ease;
  }

  .contact-box:hover {
    transform: translateY(-2px);
  }

  .icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    margin-right: 1.5rem;
    display: flex; /* Added to center the Lucide icon */
    align-items: center; /* Added to center the Lucide icon */
    justify-content: center; /* Added to center the Lucide icon */
  }

  .icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .content {
    flex-grow: 1;
  }

  .content h2 {
    color: var(--text-color);
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
  }

  .content p {
    color: var(--text-color);
    margin: 0;
    opacity: 0.8;
  }

  .content a {
    color: var(--link-color);
    text-decoration: none;
    display: inline-block;
    margin-top: 0.5rem;
  }

  .content a:hover {
    text-decoration: underline;
  }

  button {
    background-color: var(--background-overlay);
    color: var(--text-color);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: background-color 0.2s ease;
  }

  button:hover:not(:disabled) {
    background-color: var(--link-color);
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .error {
    color: #ff5555;
    margin-top: 0.5rem;
    font-size: 0.9rem;
  }
</style>
