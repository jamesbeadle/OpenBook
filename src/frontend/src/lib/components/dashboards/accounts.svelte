<script lang="ts">
  import ExpandIcon from '$lib/icons/expand-icon.svelte';
  import IcpIcon from '$lib/icons/icp-icon.svelte';
  import Logo from '$lib/icons/logo-icon.svelte';
  import ValueIcon from '$lib/icons/side-nav/value-icon.svelte';

  let activeSection = 0;
  let sections = ['projects', 'contacts'];

  function selectSection(sectionIndex: number) {
    activeSection = sectionIndex;
  }
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
