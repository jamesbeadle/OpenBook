<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import '../app.css';

  import { BusyScreen, Spinner, Toasts } from '@dfinity/gix-components';

  let isLoading = true;

  onMount(async () => {
    try {
      const spinner = document.querySelector('body > #app-spinner');
      spinner?.remove();
    } catch (error) {
      console.error('Error', error);
    } finally {
      isLoading = false;
    }
  });
</script>

<div class="flex flex-col h-screen justify-between default-text">
  <main class="page-wrapper">
    <slot />
  </main>
  <Toasts />
</div>

<BusyScreen />

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
