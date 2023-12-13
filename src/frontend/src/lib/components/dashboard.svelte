<script lang="ts">
  import { page } from "$app/stores";
  import { authStore, type AuthSignInParams } from "$lib/stores/auth-store";
  import { userStore } from "$lib/stores/user-store";
  import { toastsError } from "$lib/stores/toasts-store";
  import { onMount, onDestroy } from "svelte";
  import { goto } from "$app/navigation";
  import { authSignedInStore, authIsAdmin } from "$lib/derived/auth.derived";
  import { userGetProfilePicture } from "$lib/derived/user.derived";
  import Logo from '$lib/icons/logo-icon.svelte';
  import Owner from './dashboards/owner.svelte';
  import Accounts from './dashboards/accounts.svelte';
  import Sales from './dashboards/sales.svelte';
  import ExpandIcon from '$lib/icons/expand-icon.svelte';
  import WalletIcon from "$lib/icons/wallet-icon.svelte";

  let activeTitle = "OpenBook";
  let activeRole = -1;
  let menuOpen = false;
  let showProfileDropdown = false;
  let unsubscribeLogin: () => void;

  $: currentBorder = (route: string) =>
    $page.url.pathname === route ? "active-border" : "";

  onMount(async () => {
    if (typeof window !== "undefined") {
      document.addEventListener("click", closeDropdownOnClickOutside);
    }
    try {
      //await userStore.sync();
      //await authStore.sync();
    } catch (error) {
      toastsError({
        msg: { text: "Error syncing authentication." },
        err: error,
      });
      console.error("Error syncing authentication:", error);
    }
  });

  onDestroy(() => {
    unsubscribeLogin?.();
    if (typeof window !== "undefined") {
      document.removeEventListener("click", closeDropdownOnClickOutside);
    }
  });


  function toggleMenu() {
      menuOpen = !menuOpen;
    }

    function handleLogin() {
      let params: AuthSignInParams = {
        domain: import.meta.env.VITE_AUTH_PROVIDER_URL,
      };
      authStore.signIn(params);
    }

    function handleLogout() {
      authStore.signOut();
      goto("/");
      showProfileDropdown = false;
    }

    function toggleProfileDropdown(event: Event) {
      event.stopPropagation();
      showProfileDropdown = !showProfileDropdown;
    }

    function closeDropdownOnClickOutside(event: MouseEvent) {
      const target = event.target;
      if (target instanceof Element) {
        if (
          !target.closest(".profile-dropdown") &&
          !target.closest(".profile-pic")
        ) {
          showProfileDropdown = false;
        }
      }
    }

</script>

<div class="flex h-full w-full">
  {#if activeRole == -1}
      <nav class="p-4 h-full side-nav flex flex-col">
          <a href="/">
              <Logo className="w-6" />
          </a>
          <div class="pull-down">
            <ExpandIcon fill="#555555" />
          </div>
      </nav>
  {/if}
  {#if activeRole == 0}
      <Owner />
  {/if}
  {#if activeRole == 1}
      <Accounts />
  {/if}
  {#if activeRole == 1}
      <Sales />
  {/if}
  <main class="flex-1">
    <div class="w-full p-4 top-bar flex justify-between items-center">
      <h1>{activeTitle}</h1>
      <div class="profile-image">
        <div class="relative inline-block">
          <button
            on:click={toggleProfileDropdown}
            class={`h-full flex items-center border rounded-full ${currentBorder(
              "/profile"
            )}`}
          >
            <img
              src={$userGetProfilePicture}
              alt="Profile"
              class="h-12 rounded-full profile-pic"
              aria-label="Toggle Profile"
            />
          </button>
          <div
            class={`absolute right-0 top-full w-48 bg-black rounded-b-md rounded-l-md shadow-lg z-50 profile-dropdown ${
              showProfileDropdown ? "block" : "hidden"
            }`}
          >
            <ul class="">
              <li>
                <a
                  href="/profile"
                  class="flex items-center h-full w-full nav-underline"
                >
                  <span class="flex items-center h-full w-full">
                    <img
                      src={$userGetProfilePicture}
                      alt="logo"
                      class="w-8 h-8 my-2 ml-4 mr-2 rounded-full"
                    />
                    <p class="w-full min-w-[125px] max-w-[125px] truncate">
                      Profile
                    </p>
                  </span>
                </a>
              </li>
              <li>
                <button
                  class="flex items-center justify-center px-4 pb-2 pt-1 text-white rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 nav-button"
                  on:click={handleLogout}
                >
                  Disconnect
                  <WalletIcon className="ml-2 h-6 w-6 mt-1" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="p-4 px-8">
      {#if activeRole == -1}
        <p>Welcome to OpenBook, the future of business management. To get started create an organisation here:</p>
        <button class="book-btn mt-4">New Organisation</button>
      {/if}
      {#if activeRole == 0}
        <Owner />
      {/if}
      {#if activeRole == 1}
        <Accounts />
      {/if}
      {#if activeRole == 1}
        <Sales />
      {/if}
    </div>
  </main>
</div>
