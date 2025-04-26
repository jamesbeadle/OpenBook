<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";
  import { initAuthWorker } from "$lib/services/worker.auth.services";
  import { authStore, type AuthStoreData } from "$lib/stores/auth-store";
  import '../app.css';
  import FullScreenSpinner from "$lib/components/shared/full-screen-spinner.svelte";
  import { authSignedInStore } from "$lib/derived/auth.derived";
  import Welcome from "$lib/components/home/welcome.svelte";
  import Dashboard from "$lib/components/dashboard/dashboard.svelte";
    import { get } from "svelte/store";

  interface Props { children: Snippet }
  let { children }: Props = $props();
    
  let worker: { syncAuthIdle: (auth: AuthStoreData) => void } | undefined;
  let isLoading = $state(true);

  const init = async () => {
    if (!browser) return;
    await authStore.sync();
  };

  onMount(async () => {
    if (browser) {
      document.querySelector('#app-spinner')?.remove();
    }
    await init();
    const identity = get(authStore).identity;
    worker = await initAuthWorker();
    isLoading = false;
  });
</script>

<svelte:window on:storage={authStore.sync} />

{#await init()}
  <div in:fade>
    <FullScreenSpinner />
  </div>
{:then _}
  {#if !$authSignedInStore}
      <Welcome />
  {:else}
    <Dashboard>
      {@render children()}
    </Dashboard>
  {/if}
{/await}
