<script lang="ts">
  import { onMount } from 'svelte';
  import Layout from './Layout.svelte';
  import { Spinner } from '@dfinity/gix-components';

  let isLoggedIn = false;
  let isLoading = true;

  onMount(async () => {
    try {
    } catch (error) {
      console.error('Error fetching homepage data:', error);
    } finally {
      isLoading = false;
    }
  });
</script>

<Layout>
  {#if isLoading}
    <Spinner />
  {:else}
    <h1>Welcome to OpenBook</h1>
  {/if}
</Layout>
