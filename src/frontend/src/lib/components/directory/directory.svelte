<script lang="ts">
  import { onMount } from 'svelte';
  import type { DirectoryDTO } from '../../../../../declarations/backend/backend.did';
  import { profilesStore } from '$lib/stores/profile-store';

  let directoryResult: DirectoryDTO;
  let currentPage = 1;
  let totalPages = 1;

  let filters = {
    username: '',
    firstName: '',
    lastName: '',
    profession: '',
  };

  async function fetchProfiles() {
    directoryResult = await profilesStore.getProfiles(
      filters.username,
      filters.firstName,
      filters.lastName,
      filters.profession,
      currentPage,
    );
  }

  onMount(fetchProfiles);

  function handleFilterChange() {
    currentPage = 1;
    fetchProfiles();
  }

  function goToPage(page: number) {
    currentPage = page;
    fetchProfiles();
  }

  function blobToSrc(blob: Uint8Array | number[]): string {
    if (blob.length == 0) {
      return 'profile_placeholder.png';
    }
    return URL.createObjectURL(new Blob([new Uint8Array(blob)]));
  }
</script>

<h1>OpenBook Directory</h1>

<div class="filters">
  <input
    type="text"
    placeholder="Username"
    bind:value={filters.username}
    on:input={handleFilterChange}
  />
  <input
    type="text"
    placeholder="First Name"
    bind:value={filters.firstName}
    on:input={handleFilterChange}
  />
  <input
    type="text"
    placeholder="Last Name"
    bind:value={filters.lastName}
    on:input={handleFilterChange}
  />
  <input
    type="text"
    placeholder="Profession"
    bind:value={filters.profession}
    on:input={handleFilterChange}
  />
</div>

<table>
  <thead>
    <tr>
      <th>Image</th>
      <th>Name</th>
      <th>Profession</th>
    </tr>
  </thead>
  <tbody>
    {#each directoryResult.profiles as profile}
      <tr>
        <td
          ><img
            src={blobToSrc(profile.profilePicture)}
            alt={profile.username}
          /></td
        >
        <td>{profile.firstName} {profile.lastName}</td>
        <td>{profile.profession}</td>
      </tr>
    {/each}
  </tbody>
</table>

<div class="pagination">
  {#each Array(directoryResult.totalEntries) as _, page (page + 1)}
    <button
      on:click={() => goToPage(page + 1)}
      disabled={page + 1 === currentPage}
    >
      {page + 1}
    </button>
  {/each}
</div>
