<script>
    // Add any necessary logic here if needed
</script>

<style>
    .page-content {
        padding: 1.5rem;
        text-align: center;
        margin: 0 auto;
        width: 80%;
        max-width: 1200px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .content-box {
        background-color: var(--background-surface);
        padding: 1.2rem;
        border-radius: 8px;
        margin-top: 1rem;
        width: 100%;
    }

    .nested-box {
        background-color: var(--background-overlay);
        padding: 1rem;
        border-radius: 6px;
        margin-top: 1rem;
    }

    .accent-text {
        color: var(--accent-color);
        font-weight: bold;
    }
</style>

<div class="page-content">
    <p>Placehloder!!</p>
    
    <div class="content-box">
        <h2>Theme Demonstration</h2>
        <p>This box uses the <span class="accent-text">surface background</span> color.</p>
        
        <div class="nested-box">
            <h3>Nested Content</h3>
            <p>This inner box uses the <span class="accent-text">overlay background</span> color.</p>
            <p>Here's a <a href="/example">sample link</a> to demonstrate link styling.</p>
        </div>
    </div>
</div>
