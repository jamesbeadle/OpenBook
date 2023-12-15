<script lang="ts">
    import { onMount } from 'svelte';
  import type { ProfileDTO } from '../../../../../declarations/backend/backend.did';
  
    let profiles: ProfileDTO[] = [];
    let currentPage = 1;
    let totalPages = 1;
  
    let filters = {
      username: '',
      firstName: '',
      lastName: '',
      profession: ''
    };
  
    // Fetch profiles from the directory service
    async function fetchProfiles() {
      // Replace with your actual directory service call
      // Update profiles, currentPage, totalPages based on the response
    }
  
    // Call fetchProfiles on mount and when filters change
    onMount(fetchProfiles);
  
    function handleFilterChange() {
      currentPage = 1;
      fetchProfiles();
    }
  
    function goToPage(page: number) {
      currentPage = page;
      fetchProfiles();
    }
  </script>
  
  <h1>OpenBook Directory</h1>
  
  <div class="filters">
    <input type="text" placeholder="Username" bind:value={filters.username} on:input={handleFilterChange} />
    <input type="text" placeholder="First Name" bind:value={filters.firstName} on:input={handleFilterChange} />
    <input type="text" placeholder="Last Name" bind:value={filters.lastName} on:input={handleFilterChange} />
    <input type="text" placeholder="Profession" bind:value={filters.profession} on:input={handleFilterChange} />
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
      {#each profiles as profile}
        <tr>
          <td><img src="{profile.imageUrl}" alt="{profile.name}" /></td>
          <td>{profile.firstName} {profile.lastName}</td>
          <td>{profile.profession}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  
  <div class="pagination">
    {#each Array(totalPages) as _, page (page + 1)}
      <button on:click={() => goToPage(page + 1)} disabled={page + 1 === currentPage}>
        {page + 1}
      </button>
    {/each}
  </div>
  
  <style>
    /* Add your TailwindCSS styles here */
  </style>
  