<script lang="ts">
  import { page } from '$app/stores';
  import { authStore, type AuthSignInParams } from '$lib/stores/auth-store';
  import { toastsError } from '$lib/stores/toasts-store';
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { userGetProfilePicture } from '$lib/derived/user.derived';
  import WalletIcon from '$lib/icons/wallet-icon.svelte';

  let showProfileDropdown = false;
  let unsubscribeLogin: () => void;
  export let activeTitle = 'OpenBook';

  $: currentBorder = (route: string) =>
    $page.url.pathname === route ? 'active-border' : '';

  onMount(async () => {
    if (typeof window !== 'undefined') {
      document.addEventListener('click', closeDropdownOnClickOutside);
    }
    try {
    } catch (error) {
      toastsError({
        msg: { text: 'Error syncing authentication.' },
        err: error,
      });
      console.error('Error syncing authentication:', error);
    }
  });

  onDestroy(() => {
    unsubscribeLogin?.();
    if (typeof window !== 'undefined') {
      document.removeEventListener('click', closeDropdownOnClickOutside);
    }
  });

  function handleLogout() {
    authStore.signOut();
    goto('/');
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
        !target.closest('.profile-dropdown') &&
        !target.closest('.profile-pic')
      ) {
        showProfileDropdown = false;
      }
    }
  }
</script>

<div class="w-full p-4 top-bar flex justify-between items-center">
  <h1>{activeTitle}</h1>
  <div class="relative inline-block">
    <button
      on:click={toggleProfileDropdown}
      class={`h-full flex items-center border rounded-full ${currentBorder(
        '/profile',
      )}`}
    >
      <img
        src={$userGetProfilePicture}
        alt="Profile"
        class="h-8 rounded-full profile-pic"
        aria-label="Toggle Profile"
      />
    </button>
    <div
      class={`absolute right-0 top-full w-48 bg-black rounded-b-md rounded-l-md shadow-lg z-50 profile-dropdown ${
        showProfileDropdown ? 'block' : 'hidden'
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
              <p class="w-full min-w-[125px] max-w-[125px] truncate">Profile</p>
            </span>
          </a>
        </li>
        <li>
          <button
            class="flex items-center justify-center px-4 pb-2 pt-1 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 nav-button"
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
