<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css';

  import { BusyScreen, Toasts } from '@dfinity/gix-components';
  import { authStore } from '$lib/stores/auth-store';
  let isLoading = true;

  onMount(async () => {
    try {
      const images = document.images;
      const promises = Array.from(images).map((img) => {
        if (img.complete) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve);
        });
      });

      await Promise.all(promises);

      await authStore.sync();
      // Remove spinner
      const spinner = document.querySelector('body > #app-spinner');
      spinner?.remove();
    } catch (error) {
      console.error('Error', error);
    } finally {
      isLoading = false;
    }
  });
</script>

{#if !isLoading}
  <div class="flex flex-col h-screen justify-between default-text">
    <main class="page-wrapper">
      <div class="flex flex-col md:flex-row h-full">
        <slot />
      </div>
    </main>
    <Toasts />
  </div>
{/if}

<BusyScreen />

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
