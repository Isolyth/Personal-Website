<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  // Props
  export let height = 100;
  export let zoom = 4;

  let canvas: HTMLCanvasElement;
  let positions: boolean[][] = [];
  let animationFrame: number;
  let ctx: CanvasRenderingContext2D | null;
  let width: number;
  let gameWidth: number;
  let gameHeight: number;

  // Create initial random state
  function createInitialState(): boolean[][] {
    const state: boolean[][] = [];
    for (let y = 0; y < gameHeight; y++) {
      const row: boolean[] = [];
      for (let x = 0; x < gameWidth; x++) {
        row.push(Math.random() < 0.3); // 30% chance of being alive
      }
      state.push(row);
    }
    return state;
  }

  // Check if a cell is alive
  function isAlive(state: boolean[][], x: number, y: number): boolean {
    return state[y] && state[y][x] === true;
  }

  // Count neighbors for a cell
  function countNeighbors(state: boolean[][], x: number, y: number): number {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (!(i === 0 && j === 0)) {
          const newY = (y + i + gameHeight) % gameHeight;
          const newX = (x + j + gameWidth) % gameWidth;
          if (isAlive(state, newX, newY)) {
            count += 1;
          }
        }
      }
    }
    return count;
  }

  // Calculate next state
  function step(state: boolean[][]): boolean[][] {
    const newState: boolean[][] = [];
    
    for (let y = 0; y < gameHeight; y++) {
      const newRow: boolean[] = [];
      for (let x = 0; x < gameWidth; x++) {
        const alive = isAlive(state, x, y);
        const count = countNeighbors(state, x, y);
        
        if (alive) {
          newRow.push(count === 2 || count === 3);
        } else {
          newRow.push(count === 3);
        }
      }
      newState.push(newRow);
    }
    
    return newState;
  }

  // Draw the current state
  function draw() {
    if (!ctx || !canvas) return;
    
    ctx.save();
    ctx.scale(zoom, zoom);
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    
    // Set color with some transparency for a subtle effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    
    for (let y = 0; y < gameHeight; y++) {
      for (let x = 0; x < gameWidth; x++) {
        if (isAlive(positions, x, y)) {
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
    
    ctx.restore();
  }

  // Animation loop
  function animate() {
    positions = step(positions);
    draw();
    animationFrame = requestAnimationFrame(animate);
  }

  function handleResize() {
    if (!canvas || !browser) return;
    
    // Get the parent element's width
    const parentWidth = canvas.parentElement?.offsetWidth || 0;
    width = parentWidth;
    
    // Update game dimensions
    gameWidth = Math.floor(width / zoom);
    gameHeight = Math.floor(height / zoom);
    
    // Update canvas size
    const dpr = browser ? (window.devicePixelRatio || 1) : 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    
    // Reset positions with new dimensions
    positions = createInitialState();
  }

  onMount(() => {
    if (!browser) return;

    if (canvas) {
      ctx = canvas.getContext('2d');
      
      // Initial setup
      handleResize();
      
      // Add resize listener
      window.addEventListener('resize', handleResize);
      
      animate();
    }

    return () => {
      if (browser) {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
        window.removeEventListener('resize', handleResize);
      }
    };
  });
</script>

<canvas
  bind:this={canvas}
  style="width: 100%; height: {height}px;"
/>

<style>
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }
</style>
