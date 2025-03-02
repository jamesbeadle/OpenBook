<script lang="ts">
    import type { OrganisationDTO } from "../../../../../declarations/backend/backend.did";

  
    let organisations: OrganisationDTO[] = [];
  </script>
  
  <div class="overflow-x-auto">
    <p class="mb-4 text-xl">Organisations</p>
    <table class="min-w-full bg-white border border-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organisation</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Count</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Members</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        {#each organisations as org}
          <tr class="hover:bg-gray-50">
            <!--
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{org.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{org.projectCount}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{org.teamMemberCount}</td>-->
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="relative">
                <button
                  class="p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  on:click={() => console.log('click')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
                <!-- Dropdown menu for CRUD actions -->
                <div class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div class="py-1">
                    <button
                      on:click={() => console.log('click')}
                      class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      on:click={() => console.log('click')}
                      class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>