<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  import DashboardHeader from '$lib/components/dashboard-header.svelte';
  import Owner from '$lib/components/dashboards/owner.svelte';
  import Accounts from '$lib/components/dashboards/accounts.svelte';
  import Sales from '$lib/components/dashboards/sales.svelte';

  import ExpandIcon from '$lib/icons/expand-icon.svelte';
  import IcpIcon from '$lib/icons/icp-icon.svelte';
  import Logo from '$lib/icons/logo-icon.svelte';
  import ValueIcon from '$lib/icons/value-icon.svelte';
  import ProfileDetail from './profile/profile-detail.svelte';

  let activeSection = 0;
  let sections = ['projects', 'contacts'];

  function selectSection(sectionIndex: number) {
    activeSection = sectionIndex;
  }

  let activeRole = -1;
  let isLoading = true;
  $: currentRoute = $page.url.pathname;

  onMount(async () => {
    console.log(currentRoute);
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
  {#if activeRole === 0}
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
  {/if}

  <div class="pull-down">
    <ExpandIcon fill="#555555" />
  </div>
</nav>
<div class="w-full">
  <DashboardHeader />
  <div class="flex-1 overflow-y-auto p-4">
    {#if currentRoute === '/profile'}
      <ProfileDetail />
    {/if}
    {#if activeRole === 0}
      <Owner />
    {/if}
    {#if activeRole === 1}
      <Accounts />
    {/if}
    {#if activeRole === 2}
      <Sales />
    {/if}
    {#if activeRole < 0 && currentRoute === '/'}
      <p class="text-2xl">Welcome to OpenBook</p>
      <p>
        OpenBook is a decentralised business management tool for organisations
        of all sizes:
      </p>
      <button class="book-btn mt-4">Create Organisation</button>
      <button class="book-btn mt-4 disabled">Find Existing</button>
    {/if}
  </div>
</div>
