<script lang="ts">
    import { onMount } from 'svelte';
    import Dashboard from '$lib/components/dashboard.svelte';
  
    import DashboardHeader from '$lib/components/dashboard-header.svelte';
    import Owner from '$lib/components/dashboards/owner.svelte';
    import Accounts from '$lib/components/dashboards/accounts.svelte';
    import Sales from '$lib/components/dashboards/sales.svelte';
  
    import ExpandIcon from '$lib/icons/expand-icon.svelte';
      import IcpIcon from '$lib/icons/icp-icon.svelte';
      import Logo from '$lib/icons/logo-icon.svelte';
      import ValueIcon from '$lib/icons/value-icon.svelte';
    
      let activeSection = 0;
      let sections = ['projects', 'contacts'];
    
      function selectSection(sectionIndex: number) {
        activeSection = sectionIndex;
      }
    let activeTitle = "OpenBook";
    let activeRole = -1;
    let isLoading = true;
  
    onMount(async () => {
      try {
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      } finally {
        isLoading = false;
      }
    });
</script>
<nav class="p-4 h-full side-nav flex flex-col">
    <a href="/">
        <Logo className="w-6" />
    </a>
    <button on:click={() => selectSection(0)}>
        <IcpIcon
            className="side-nav-icon"
            fill={activeSection == 0 ? '#FFFFFF' : '#8C8C8C'}
        />
    </button>
    <button on:click={() => selectSection(1)}>
        <ValueIcon
            className="side-nav-icon"
            fill={activeSection == 1 ? '#FFFFFF' : '#8C8C8C'}
        />
    </button>
    <div class="pull-down">
        <ExpandIcon fill="#555555" />
    </div>
</nav>
<div class="w-full">
    <DashboardHeader /> 
</div>
{#if activeRole == 0}
  <Owner />
{/if}
{#if activeRole == 1}
  <Accounts />
{/if}
{#if activeRole == 2}
  <Sales />
{/if}
  