<script lang="ts">
  import { onMount } from 'svelte';
  import Layout from './Layout.svelte';
  import { Spinner } from '@dfinity/gix-components';
  import Landing from '$lib/components/landing.svelte';
  import { authSignedInStore } from '$lib/derived/auth.derived';
  import { authStore } from '$lib/stores/auth-store';
  import Dashboard from '$lib/components/dashboard.svelte';

  let isLoading = true;

  onMount(async () => {
    try {
      await authStore.sync();
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
    <div class="flex flex-col md:flex-row h-screen">
      {#if $authSignedInStore}
        <Dashboard />
      {:else}
        <Landing />
      {/if}
    </div>
  {/if}
</Layout>
