<script lang="ts">
    import { onMount } from 'svelte';
    import Layout from '../Layout.svelte';
    import { authStore } from '$lib/stores/auth-store';
    import { authSignedInStore } from '$lib/derived/auth.derived';
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

        let tasks = [
        {
        id: '1',
        title: 'Task 1',
        status: 'In Progress',
        visibility: 'Public',
        milestones: 3,
        comments: 5,
        tags: ['urgent', 'new'],
        startDate: '2023-03-01',
        endDate: '2023-03-15',
        completedDate: null,
        },
        // Add more tasks as needed
    ];

    const formatDateRange = (start, end) => {
        const startDate = new Date(start).toLocaleDateString();
        const endDate = new Date(end).toLocaleDateString();
        return `${startDate} - ${endDate}`;
    };
  </script>
  
  <Layout>
    {#if $authSignedInStore}

        <div class="overflow-x-auto">
        <table class="min-w-full table-auto">
            <thead class="border-b">
            <tr>
                <th class="text-left p-4">ID</th>
                <th class="text-left p-4">Title</th>
                <th class="text-left p-4">Status</th>
                <th class="text-left p-4">Visibility</th>
                <th class="text-left p-4">Milestones</th>
                <th class="text-left p-4">Comments</th>
                <th class="text-left p-4">Tags</th>
                <th class="text-left p-4">Dates</th>
            </tr>
            </thead>
            <tbody>
            {#each tasks as task}
                <tr class="border-b">
                <td class="p-4">{task.id}</td>
                <td class="p-4">{task.title}</td>
                <td class="p-4">{task.status}</td>
                <td class="p-4">
                    <span class={`icon ${task.visibility}`}></span> <!-- Implement the icon based on your project needs -->
                </td>
                <td class="p-4">{task.milestones}</td>
                <td class="p-4">{task.comments}</td>
                <td class="p-4">
                    {#each task.tags as tag}
                    <span class="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{tag}</span>
                    {/each}
                </td>
                <td class="p-4">
                    {#if task.completedDate}
                    Completed: {new Date(task.completedDate).toLocaleDateString()}
                    {:else}
                    {formatDateRange(task.startDate, task.endDate)}
                    {/if}
                </td>
                </tr>
            {/each}
            </tbody>
        </table>
        </div>
      
    {/if}
  </Layout>

  <style>
    @media (max-width: 640px) {
      .mobile-stack {
        display: block !important;
      }
      .mobile-stack > * {
        margin-bottom: 0.5rem !important;
      }
    }
  </style>
  