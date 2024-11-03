<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { initAuthWorker } from "$lib/services/worker.auth.services";
  import { authStore, type AuthSignInParams, type AuthStoreData } from "$lib/stores/auth-store";
  import { authSignedInStore } from "$lib/derived/auth.derived";
  import { BusyScreen, Content, HeaderTitle, Layout, MenuItem, Spinner } from "@dfinity/gix-components";
  import LogoIcon from "$lib/icons/logo-icon.svelte";
  import MenuIcon from "$lib/icons/menu-icon.svelte";
  import '../app.css';

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


  function handleLogin() {
    let params: AuthSignInParams = {
      domain: import.meta.env.VITE_AUTH_PROVIDER_URL,
    };
    authStore.signIn(params);
  }


  function handleLogout() {
    authStore.signOut();
    goto("/");
  }


</script>

  <svelte:window on:storage={syncAuthStore} />
  {#await init()}
    <div in:fade>
      <Spinner />
    </div>
  {:then _}
  <div class="min-h-screen flex flex-col items-center justify-center bg-OpenBookDark space-y-4">
    <!-- Logo Section -->
    <img src="logo.png" alt="Logo" class="w-36" />
  
    <!-- Title -->
    <h1 class="text-4xl font-bold text-white">Welcome to OpenBook</h1>
  
    <!-- Subtitle -->
    <p class="text-lg text-white">
      Simplifying Business Management with Web3 Technologies
    </p>
  
    <!-- Connect Button -->
    <button
      on:click={handleLogin}
      class="book-btn text-white font-bold py-2 px-4 rounded-lg transition-all"
    >
      Connect
    </button>
  </div>
  {/await}

  <BusyScreen />
