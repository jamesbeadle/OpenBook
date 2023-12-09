<script>
  let isOpen = false;

  function closeModal() {
    isOpen = false;
  }

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
</script>

<button
  type="button"
  class="flex w-1/2 md:w-40 justify-center mx-0 py-2 px-2 gap-2 rounded hover:bg-zinc-700"
  style="border-color: #2E323A; border-width: 1px;"
  on:click={() => (isOpen = true)}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M12.6665 7.33335H8.6665V3.33335C8.6665 3.15654 8.59627 2.98697 8.47124 2.86195C8.34622 2.73693 8.17665 2.66669 7.99984 2.66669C7.82303 2.66669 7.65346 2.73693 7.52843 2.86195C7.40341 2.98697 7.33317 3.15654 7.33317 3.33335V7.33335H3.33317C3.15636 7.33335 2.98679 7.40359 2.86177 7.52862C2.73674 7.65364 2.6665 7.82321 2.6665 8.00002C2.6665 8.17683 2.73674 8.3464 2.86177 8.47142C2.98679 8.59645 3.15636 8.66669 3.33317 8.66669H7.33317V12.6667C7.33317 12.8435 7.40341 13.0131 7.52843 13.1381C7.65346 13.2631 7.82303 13.3334 7.99984 13.3334C8.17665 13.3334 8.34622 13.2631 8.47124 13.1381C8.59627 13.0131 8.6665 12.8435 8.6665 12.6667V8.66669H12.6665C12.8433 8.66669 13.0129 8.59645 13.1379 8.47142C13.2629 8.3464 13.3332 8.17683 13.3332 8.00002C13.3332 7.82321 13.2629 7.65364 13.1379 7.52862C13.0129 7.40359 12.8433 7.33335 12.6665 7.33335Z"
      fill="white"
    />
  </svg>
  <p class="text-xs">Add Transaction</p>
</button>

{#if isOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
    on:click={handleOutsideClick}
  >
    <div class="w-3/4 p-6 bg-white rounded shadow-lg md:w-1/2 lg:w-1/3">
      <header class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">Click Outside of Modal</h2>
        <button class="text-gray-700" on:click={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </header>
      <div>
        <p class="text-gray-700">Modal content ...</p>
      </div>
    </div>
  </div>
{/if}
