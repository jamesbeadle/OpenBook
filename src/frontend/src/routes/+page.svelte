<script lang="ts">
  import { onMount } from 'svelte';
  import Layout from './Layout.svelte';
  import { Spinner } from '@dfinity/gix-components';
  import Logo from '$lib/icons/logo-icon.svelte';

  let isLoggedIn = false;
  let isLoading = true;
  let isDisabled = true;

  onMount(async () => {
    try {
    } catch (error) {
      console.error('Error fetching homepage data:', error);
    } finally {
      isLoading = false;
    }
  });
</script>

<Layout>
  {#if isLoading}
    <Spinner />
  {:else}
    <div class="flex flex-col md:flex-row h-screen">
      <div
        class="relative md:w-auto w-full h-full overflow-hidden md:overflow-visible"
      >
        <img
          src="home.png"
          alt=""
          class="hidden-image aspect-w-16 md:h-full w-full md:w-auto object-cover object-middle"
        />
      </div>
      <div
        class="md:flex-1 flex flex-col justify-center items-center p-4 md:p-12 my-16 md:my-2"
      >
        <div
          class="md:flex-1 flex flex-col justify-center items-center p-4 md:p-12 my-16 md:my-2 space-y-8"
        >
          <Logo className="w-24" />
          <p>Welcome Back</p>
          <p class="hidden">Please connect to continue</p>
          <a href="/whitepaper" class="book-btn min-w-[150px]">Whitepaper</a>
          <button
            disabled={isDisabled}
            class="hidden book-btn min-w-[150px] {isDisabled ? 'disabled' : ''}"
            >Connect (soon)</button
          >
          <p class="text-center">
            Welcome to OpenBook, the future of business management at your
            fingertips! Experience the ease of decentralised financial
            management, secure transaction management and real-time insights.
          </p>
        </div>
      </div>
    </div>
  {/if}
</Layout>
