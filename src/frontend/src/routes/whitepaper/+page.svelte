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

  let activeSection = 0;
  let sections = ['vision', 'value', 'roadmap', 'mvp', 'team'];

  function selectSection(sectionIndex: number) {
    activeSection = sectionIndex;
  }

  function nextSection() {
    activeSection =
      activeSection + 1 > sections.length - 1 ? 0 : activeSection + 1;
  }

  function priorSection() {
    activeSection =
      activeSection - 1 < 0 ? sections.length - 1 : activeSection - 1;
  }
</script>

<Layout>
  <div class="flex h-full">
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
      <button on:click={() => selectSection(2)}>
        <RoadmapIcon
          className="side-nav-icon"
          fill={activeSection == 2 ? '#FFFFFF' : '#8C8C8C'}
        />
      </button>
      <button on:click={() => selectSection(3)}>
        <MvpIcon
          className="side-nav-icon"
          fill={activeSection == 3 ? '#FFFFFF' : '#8C8C8C'}
        />
      </button>
      <button on:click={() => selectSection(4)}>
        <TeamIcon
          className="side-nav-icon"
          fill={activeSection == 4 ? '#FFFFFF' : '#8C8C8C'}
        />
      </button>
    </nav>
    <main class="flex-1">
      <div class="w-full p-4 top-bar">
        <h1>OpenBook Whitepaper</h1>
      </div>
      <div class="p-4">
        {#if activeSection == 0}
          <Vision />
        {/if}
        {#if activeSection == 1}
          <Roadmap />
        {/if}
        {#if activeSection == 2}
          <Value />
        {/if}
        {#if activeSection == 3}
          <Mvp />
        {/if}
        {#if activeSection == 4}
          <Team />
        {/if}
      </div>
      <div class="flex flex-row space-x-4 mx-4">
        <button
          on:click={priorSection}
          disabled={activeSection == 0}
          class="book-btn {activeSection == 0 ? 'disabled' : ''}"
          >&lt; Prior Section</button
        >
        <button
          on:click={nextSection}
          disabled={activeSection == sections.length - 1}
          class="book-btn {activeSection == sections.length - 1
            ? 'disabled'
            : ''}">Next Section &gt;</button
        >
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
