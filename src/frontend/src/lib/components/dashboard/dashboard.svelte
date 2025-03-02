<script>
  import { onMount } from "svelte";

  import CollapseIcon from "$lib/icons/collapse-icon.svelte";
  import ExpandIcon from "$lib/icons/expand-icon.svelte";
  import ProjectsIcon from "$lib/icons/side-nav/projects-icon.svelte";

  import ExpandedNavItems from "../shared/expanded-nav-items.svelte";
  import CloseIcon from "$lib/icons/close-icon.svelte";
  import { authStore } from "$lib/stores/auth-store";
  import { page } from "$app/stores";
  import LogoIcon from "$lib/icons/logo-icon.svelte";

  let isMenuOpen = false;
  let isProfilePanelOpen = false;

  const menuItems = [
    { icon: ProjectsIcon, title: 'Projects', links: ['Members', 'Projects'], route: '/projects' }
  ];

  onMount(() => {});
</script>

<div class="flex h-screen">
  <div
    class={`bg-BrandGray border-r border-r-BrandAltGray text-white ${
      isMenuOpen ? "absolute w-full h-full" : "w-16"
    } transition-all`}
  >
    <div
      class={`p-4 ${
        isMenuOpen ? "flex justify-between items-center" : "flex flex-col items-center"
      }`}
    >
      <a href="/" class={`flex items-center ${isMenuOpen ? "" : "flex-col"} mb-2`}>
        <LogoIcon className="w-5" />
        {#if isMenuOpen}
          <p class="ml-2">OpenBook</p>
        {/if}
      </a>
      <button
        on:click={() => (isMenuOpen = !isMenuOpen)}
        class={`mt-4 hover:bg-BrandAltGray rounded-lg px-2 ${isMenuOpen ? "ml-auto" : ""}`}
      >
        {#if isMenuOpen}
          <CollapseIcon className="w-6" />
        {:else}
          <ExpandIcon className="w-6" />
        {/if}
      </button>
    </div>
    <ul class="space-y-2">
      {#each menuItems as item}
        <a href={item.route}>
          <li
            class={`mx-2 rounded cursor-pointer hover:bg-BrandAltGray ${
              isMenuOpen ? "w-full" : "flex items-center justify-center"
            }`}
          >
            {#if isMenuOpen}
              <ExpandedNavItems
                icon={item.icon}
                title={item.title}
                links={item.links}
              />
            {:else}
              {#if $page.url.pathname == item.route}
                <svelte:component this={item.icon} className="w-4 py-2" fill='white' />
              {:else}
                <svelte:component this={item.icon} className="w-4 py-2" />
              {/if}
            {/if}
          </li>
        
        </a>
      {/each}
    </ul>
  </div>

  <div class="flex flex-col flex-1">
    <div class="bg-BrandGray border-b border-b-BrandAltGray px-4 py-2 flex justify-between items-center">
      <div>
        <h1 class="text-xl font-bold">OpenBook</h1>
      </div>
      <div>
        <button
          class="rounded-full bg-blue-500 text-white w-10 h-10 flex items-center justify-center"
          on:click={() => (isProfilePanelOpen = !isProfilePanelOpen)}
        >
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            class="rounded-full w-full h-full object-cover"
          />
        </button>
      </div>
    </div>

    <main class="flex-1 p-4">
      <slot />
    </main>

     {#if isProfilePanelOpen}
     <button
        aria-label="profile-close"
       class="fixed inset-0 bg-black bg-opacity-50 z-40"
       on:click={() => (isProfilePanelOpen = false)}
     ></button>
   {/if}

   <div
     class={`fixed top-0 right-0 bg-BrandAltGray h-full w-64 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
       isProfilePanelOpen ? "translate-x-0" : "translate-x-full"
     }`}
   >
     <div class="p-4">
       <div class="flex justify-between items-center">
         <h2 class="text-lg font-bold">Profile</h2>
         <button
           class="hover:bg-BrandGray rounded-full w-8 h-8 flex items-center justify-center"
           on:click={() => (isProfilePanelOpen = false)}
         >
           <CloseIcon className="w-8 p-2" />
         </button>
       </div>
       <ul class="mt-4 space-y-4">
         <li class="cursor-pointer hover:bg-BrandGray p-2 rounded">
           <span>Settings</span>
         </li>
         <li class="cursor-pointer hover:bg-BrandGray p-2 rounded">
           <span>Notifications</span>
         </li>
         <li class="cursor-pointer hover:bg-BrandGray p-2 rounded">
            <button on:click={() => authStore.signOut()}>Logout</button>
          <span></span>
         </li>
       </ul>
     </div>
   </div>
  </div>
</div>
