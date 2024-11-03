<script lang="ts">
    import Layout from "../Layout.svelte";
    import { onMount } from 'svelte';

    type Organization = {
        id: number;
        name: string;
        created: string;
        status: string;
        logo: string;
    };

    let organizations: Organization[] = [
        { id: 1, name: 'Waterway Labs', created: '2024-07-01', status: 'Active', logo: 'https://via.placeholder.com/150' }
    ];

    const addOrganization = () => {
        const newOrg: Organization = {
            id: organizations.length + 1,
            name: `Org ${organizations.length + 1}`,
            created: new Date().toISOString().split('T')[0],
            status: 'Active',
            logo: 'https://via.placeholder.com/150'
        };
        organizations = [...organizations, newOrg];
    };
</script>

<Layout>
    <div class="container mx-auto mt-4">
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold">Organisations</h1>
            <button 
                class="bg-OpenBookGreen hover:bg-OpenBookDarkGreen text-white font-bold py-2 px-4 rounded"
                on:click={addOrganization}
            >
                Add Organisation
            </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {#each organizations as org}
                <div class="max-w-sm rounded overflow-hidden shadow-lg bg-OpenBookLightGray pb-4">
                    <img class="w-full" src={org.logo} alt="{org.name} logo">
                    <div class="px-4 py-4">
                        <div class="font-bold text-xl mb-2">{org.name}</div>
                        <p class="text-white text-base">
                            ID: {org.id}<br>
                            Created: {org.created}<br>
                            Status: {org.status}
                        </p>
                    </div>
                    <div class="px-4 py-2">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            View
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</Layout>
