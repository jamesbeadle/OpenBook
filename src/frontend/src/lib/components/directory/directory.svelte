<script lang="ts">
  import { onMount } from 'svelte';
  import { profilesStore } from '$lib/stores/profile-store';
  import LogoIcon from '$lib/icons/logo-icon.svelte';
  import {
    directoryFilter,
    firstNameFitler,
    lastNameFitler,
    professionFilter,
    usernameFilter,
  } from '$lib/stores/filter-store';

  interface DirectoryDTO {
    totalEntries: bigint;
    profiles: any[]
  };

  let directoryResult: DirectoryDTO;
  let currentPage = 1;
  let totalPages = 1;
  let isLoading = true;

  async function fetchProfiles() {
    directoryResult = await profilesStore.getProfiles(
      $usernameFilter,
      $firstNameFitler,
      $lastNameFitler,
      $professionFilter,
      currentPage,
      $directoryFilter,
    );
    totalPages = Math.ceil(Number(directoryResult.totalEntries) / 25);
    isLoading = false;
  }

  $: {
    if ($directoryFilter !== '') {
      getProfiles();
    }
  }

  onMount(async () => {
    await getProfiles();
  });

  async function getProfiles() {
    try {
      await fetchProfiles();
    } catch (error) {
      console.error('Error loading directory:', error);
    } finally {
    }
  }

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      search();
    }
  }

  async function search() {
    currentPage = 1;
    $directoryFilter = '';
    await fetchProfiles();
  }

  async function goToPage(page: number) {
    currentPage = page;
    await fetchProfiles();
  }

  function blobToSrc(blob: Uint8Array | number[]): string {
    if (blob.length == 0) {
      return 'profile_placeholder.png';
    }
    return URL.createObjectURL(new Blob([new Uint8Array(blob)]));
  }
</script>

<h1>OpenBook Directory</h1>

{#if !isLoading}
  <div class="filters flex flex-col w-full h-full">
    <div class="flex flex-col md:flex-row md:space-x-4 mt-2 md:mt-4">
      <div class="w-full md:w-1/2 mb-2 md:mb-0">
        <input
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2"
          type="text"
          placeholder="Username"
          bind:value={$usernameFilter}
          on:keyup={handleKeyUp}
        />
      </div>
      <div class="w-full md:w-1/2 mb-2 md:mb-0">
        <input
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2"
          type="text"
          placeholder="First Name"
          bind:value={$firstNameFitler}
          on:keyup={handleKeyUp}
        />
      </div>
    </div>
    <div class="flex flex-col md:flex-row md:space-x-4 md:mt-4">
      <div class="w-full md:w-1/2 mb-2 md:mb-0">
        <input
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2"
          type="text"
          placeholder="Last Name"
          bind:value={$lastNameFitler}
          on:keyup={handleKeyUp}
        />
      </div>
      <div class="w-full md:w-1/2 mb-2 md:mb-0">
        <input
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2"
          type="text"
          placeholder="Profession"
          bind:value={$professionFilter}
          on:keyup={handleKeyUp}
        />
      </div>
    </div>
    <div class="flex flex-row mt-2 md:mt-4">
      <button class="book-btn" on:click={search}>Search</button>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
    {#each directoryResult.profiles as profile}
      <div
        class="card rounded-t-md shadow-md overflow-hidden m-4 directory-card"
      >
        <img
          class="w-full h-48 object-cover"
          src={blobToSrc(profile.profilePicture)}
          alt={profile.username}
        />
        <div class="p-4">
          <h2 class="text-lg font-bold">
            {profile.firstName}
            {profile.lastName}
          </h2>
          <p class="text-sm flex items-center">
            <LogoIcon className="w-2 mr-1" />
            {profile.username}
          </p>
          <p class="text-sm">{profile.profession}</p>
        </div>
      </div>
    {/each}
  </div>

  <div class="pagination flex items-center justify-center space-x-4">
    <button
      class="book-btn {currentPage === 1 ? 'disabled' : ''}"
      on:click={() => goToPage(currentPage - 1)}
      disabled={currentPage === 1}
    >
      &lt;
    </button>

    <span>Page {currentPage} / {totalPages}</span>

    <button
      class="book-btn {currentPage === totalPages ? 'disabled' : ''}"
      on:click={() => goToPage(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      &gt;
    </button>
  </div>
{/if}
