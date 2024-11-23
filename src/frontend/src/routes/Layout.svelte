<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";
  import { initAuthWorker } from "$lib/services/worker.auth.services";
  import { authStore, type AuthStoreData } from "$lib/stores/auth-store";
  import '../app.css';
  import FullScreenSpinner from "$lib/components/shared/full-screen-spinner.svelte";
  import { authSignedInStore } from "$lib/derived/auth.derived";
  import Welcome from "$lib/components/home/welcome.svelte";
  import Dashboard from "$lib/components/dashboard/dashboard.svelte";

  let worker: { syncAuthIdle: (auth: AuthStoreData) => void } | undefined;
  const init = async () => await Promise.all([syncAuthStore()]);
  const syncAuthStore = async () => {
    if (!browser) {
      return;
    }

    try {
      await authStore.sync();
    } catch (err: unknown) {
      console.error("Error syncing auth store", err);
    }
  };

  onMount(async () => {
    worker = await initAuthWorker();
  });

  $: worker, $authStore, (() => worker?.syncAuthIdle($authStore))();

  $: (() => {
    if (!browser) {
      return;
    }

    if ($authStore === undefined) {
      return;
    }

    const spinner = document.querySelector("body > #app-spinner");
    spinner?.remove();
  })();

</script>

<svelte:window on:storage={syncAuthStore} />
{#await init()}
  <div in:fade>
    <FullScreenSpinner />
  </div>
{:then _}
  {#if !$authSignedInStore}
      <Welcome />
  {:else}
    <Dashboard>
      <slot></slot>
    </Dashboard>
  {/if}
{/await}
