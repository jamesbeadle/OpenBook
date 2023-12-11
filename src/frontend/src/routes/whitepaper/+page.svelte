<script lang="ts">
  import Mvp from '$lib/components/whitepaper/mvp.svelte';
  import Team from '$lib/components/whitepaper/team.svelte';
  import Value from '$lib/components/whitepaper/value.svelte';
  import Vision from '$lib/components/whitepaper/vision.svelte';
  import BalanceIcon from '$lib/icons/balance-icon.svelte';
  import CreditorsIcon from '$lib/icons/creditors-icon.svelte';
  import DebtorsIcon from '$lib/icons/debtors-icon.svelte';
  import FinancingIcon from '$lib/icons/financing-icon.svelte';
  import IcpIcon from '$lib/icons/icp-icon.svelte';
  import Logo from '$lib/icons/logo-icon.svelte';
  import MvpIcon from '$lib/icons/mvp-icon.svelte';
  import ProfitIcon from '$lib/icons/profit-icon.svelte';
  import TeamIcon from '$lib/icons/team-icon.svelte';
  import ValueIcon from '$lib/icons/value-icon.svelte';
  import RoadmapIcon from '$lib/icons/roadmap-icon.svelte';
  import Layout from '../Layout.svelte';
  import Roadmap from '$lib/components/whitepaper/roadmap.svelte';

  let activeSection = 'vision';

  function selectSection(section: string) {
    activeSection = section;
  }
</script>

<Layout>
  <div class="flex h-full">
    <nav class="p-4 h-full side-nav flex flex-col">
      <a href="/">
        <Logo className="w-6" />
      </a>
      <button on:click={() => selectSection('vision')}>
        <IcpIcon
          className="side-nav-icon"
          fill={activeSection == 'vision' ? '#FFFFFF' : '#8C8C8C'}
        />
      </button>
      <button on:click={() => selectSection('value')}>
        <ValueIcon
          className="side-nav-icon"
          fill={activeSection == 'value' ? '#FFFFFF' : '#8C8C8C'}
        />
      </button>
      <button on:click={() => selectSection('roadmap')}>
        <RoadmapIcon
          className="side-nav-icon"
          fill={activeSection == 'roadmap' ? '#FFFFFF' : '#8C8C8C'}
        />
      </button>
      <button on:click={() => selectSection('mvp')}>
        <MvpIcon
          className="side-nav-icon"
          fill={activeSection == 'mvp' ? '#FFFFFF' : '#8C8C8C'}
        />
      </button>
      <button on:click={() => selectSection('team')}>
        <TeamIcon
          className="side-nav-icon"
          fill={activeSection == 'team' ? '#FFFFFF' : '#8C8C8C'}
        />
      </button>
    </nav>
    <main class="flex-1">
      <div class="w-full p-4 top-bar">
        <h1>OpenBook Whitepaper</h1>
      </div>
      <div class="p-4">
        {#if activeSection == 'vision'}
          <Vision />
        {/if}
        {#if activeSection == 'roadmap'}
          <Roadmap />
        {/if}
        {#if activeSection == 'value'}
          <Value />
        {/if}
        {#if activeSection == 'mvp'}
          <Mvp />
        {/if}
        {#if activeSection == 'team'}
          <Team />
        {/if}
      </div>
    </main>
  </div>
</Layout>

<style>
  .side-nav {
    background-color: #1a1a1d;
    border-right: 1px solid #2e323a;
  }
</style>
