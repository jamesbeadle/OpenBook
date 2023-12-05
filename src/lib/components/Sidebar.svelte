<script>
  import menu from '../../lib/config/menu';
  import OrgName from '../../assets/orgname.svg';
  import store from '../../lib/config/store';
  import { onMount, afterUpdate } from 'svelte';

  let isSeleted = 0;
  let isHovered = 0;
  let isExpanded = -1;

  let navIndex = 0;
  let unsubscribe;

  onMount(() => {
    // Subscribe to changes in the Redux store

    unsubscribe = store.store.subscribe(() => {
      navIndex = store.store.getState().navIndex.value;
    });

    return unsubscribe; // Unsubscribe from the store on component cleanup
  });

  afterUpdate(() => {
    navIndex;
  });

  const collapse = () => {
    // @ts-ignore
    document.getElementById('sidebarContainer').classList.remove('w-60');
    // @ts-ignore
    document.getElementById('sidebarContent').classList.remove('px-8');
    // @ts-ignore
    document.getElementById('sidebarContent').classList.add('px-3');

    // @ts-ignore
    document.getElementById('mark').classList.remove('grid-cols-2');
    // @ts-ignore
    document.getElementById('mark').classList.add('grid-cols-1');
    // @ts-ignore
    document.getElementById('icon').classList.remove('justify-end');
    // @ts-ignore
    document.getElementById('icon').classList.add('justify-center');

    // @ts-ignore
    document.getElementById('sidebarContainer').dataset.expanded = '0';
    // @ts-ignore
    document.querySelectorAll('#link').forEach((link) => {
      console.log('ok');
      link.classList.add('sr-only');
    });
  };

  const expand = () => {
    // @ts-ignore
    document.getElementById('sidebarContainer').classList.add('w-60');
    // @ts-ignore
    document.getElementById('sidebarContent').classList.remove('px-3');
    // @ts-ignore
    document.getElementById('sidebarContent').classList.add('px-8');
    // @ts-ignore
    document.getElementById('mark').classList.remove('grid-cols-1');
    // @ts-ignore
    document.getElementById('icon').classList.remove('justify-center');
    // @ts-ignore
    document.getElementById('icon').classList.add('justify-end');
    // @ts-ignore
    document.getElementById('mark').classList.add('grid-cols-2');
    // @ts-ignore
    document.getElementById('sidebarContainer').dataset.expanded = '1';
    // @ts-ignore
    // document.getElementById('link').classList.remove("sr-only");
    document.querySelectorAll('#link').forEach((link) => {
      link.classList.remove('sr-only');
    });
  };

  const toggle = () => {
    // @ts-ignore
    if (document.getElementById('sidebarContainer').dataset.expanded === '1') {
      isExpanded = 1;
      collapse();
    } else {
      isExpanded = -1;
      expand();
    }
  };
</script>

<div
  id="container"
  class="flex border-r-2"
  style="background-color: #1A1A1D; color:rgb(140, 140, 140); border-color: #2E323A; border-width: 1px;"
>
  <aside
    class="min-h-screen w-60 overflow-y"
    id="sidebarContainer"
    data-expanded="1"
    data-controller="sidebar"
  >
    <div
      class="sticky top-0 h-screen w-full px-8 py-6 overflow-auto"
      id="sidebarContent"
    >
      <div class="mb-20 grid h-10 grid-cols-2" id="mark">
        <div class="h-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="32"
            viewBox="0 0 22 32"
            fill="none"
          >
            <path
              d="M22 25.6327V30.9227C20.6322 30.1004 18.987 29.6243 17.2174 29.6243C15.773 29.6243 14.4148 29.9417 13.2191 30.5044C12.3917 30.8939 11.6409 31.3989 11 32C10.3591 31.3989 9.60826 30.8939 8.78087 30.5044C7.58522 29.9417 6.22696 29.6243 4.78261 29.6243C3.01304 29.6243 1.36783 30.1004 0 30.9227V25.6327C0.86087 25.1133 1.82696 24.7334 2.86957 24.5266C3.48652 24.4016 4.12739 24.3342 4.78261 24.3342C5.27043 24.3342 5.75348 24.3727 6.21739 24.44C8.08261 24.719 9.74696 25.5365 11 26.7099C12.253 25.5365 13.9174 24.719 15.7826 24.44C16.2465 24.3727 16.7296 24.3342 17.2174 24.3342C17.8726 24.3342 18.5135 24.4016 19.1304 24.5266C20.173 24.7334 21.1391 25.1133 22 25.6327Z"
              fill="#66E094"
            />
            <path
              d="M11 0C4.92609 0 0 4.95341 0 11.061C0 17.1686 4.92609 22.122 11 22.122C17.0739 22.122 22 17.1686 22 11.061C22 4.95341 17.0739 0 11 0ZM11 16.832C7.82913 16.832 5.26087 14.2495 5.26087 11.061C5.26087 7.87256 7.82913 5.29005 11 5.29005C14.1709 5.29005 16.7391 7.87256 16.7391 11.061C16.7391 14.2495 14.1709 16.832 11 16.832Z"
              fill="white"
            />
          </svg>
        </div>
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="flex h-15 cursor-pointer justify-end align-middle"
          id="icon"
        >
          <button
            class="h-15 w-6 justify-center flex cursor-pointer"
            data-action="click->sidebar#toggle"
            on:click={() => toggle()}
          >
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              on:mouseenter={() => {
                isHovered = -5;
              }}
              on:mouseout={() => {
                isHovered = isSeleted;
              }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d={isExpanded === 1
                  ? 'M13 5l7 7-7 7M5 5l7 7-7 7'
                  : 'M11 19l-7-7 7-7m8 14l-7-7 7-7'}
                fill={isHovered == -5 ? '#F3F3F3' : '#8C8C8C'}
              />
            </svg>
          </button>
        </div>
      </div>
      <nav>
        <ul class="flex flex-col gap-3 space-y-2 overflow-hidden">
          {#each menu as m}
            <li class="h-6 hover:text-gray-200">
              <!-- svelte-ignore a11y-mouse-events-have-key-events -->
              <button
                style="width: 100%;"
                on:click={() => (
                  (isSeleted = m.index),
                  (isHovered = m.index),
                  store.store.dispatch(
                    store.navIndexSlice.actions.setNavIndex(m.index),
                  )
                )}
                on:mouseenter={() => {
                  isHovered = m.index;
                }}
                on:mouseout={() => {
                  isHovered = isSeleted;
                }}
              >
                <a href={m.url} class="flex h-6 items-center gap-2">
                  {@html isHovered === m.index || isSeleted === m.index
                    ? m.svg
                    : m.svghover}
                  <span
                    id="link"
                    style="font-size: 16px; color: {isHovered == m.index ||
                    isSeleted === m.index
                      ? '#F3F3F3'
                      : '#8C8C8C'}"
                  >
                    {m.name}
                  </span>
                </a>
              </button>
            </li>
          {/each}
        </ul>
      </nav>
      <div class="absolute bottom-6 h-10 grid-cols-2 align-bottom" id="mark">
        <div class="flex h-6 items-center hover:text-gray-200">
          <!-- svelte-ignore a11y-invalid-attribute -->
          <div class="flex h-6 items-center gap-2">
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
              class="h-8 w-8 p-0.5 rounded-full border-solid border-2"
              style="border-color: {isHovered === -2 ? '#4ade80' : '#1A1A1D'};"
              on:mouseenter={() => {
                isHovered = -2;
              }}
              on:mouseleave={() => {
                isHovered = isSeleted;
              }}
            >
              <img class="h-6 w-6" src={OrgName} alt="Logo" />
            </div>
            <span id="link">Org Name</span>
          </div>
        </div>
      </div>
    </div>
  </aside>
</div>
