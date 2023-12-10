<script lang="ts">
  import { onMount } from 'svelte';
  import Layout from './Layout.svelte';
  import { Spinner } from '@dfinity/gix-components';
  import Logo from '$lib/icons/logo.svelte';

  let isLoggedIn = false;
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

<Layout>
  {#if isLoading}
    <Spinner />
  {:else}


  <div class="flex flex-col md:flex-row h-screen">
    <div class="relative md:w-1/2 w-full h-full overflow-hidden md:overflow-visible">
      <img src="home.png" alt="home" class="md:absolute md:right-0 h-full md:w-full w-full object-cover md:object-none object-middle" />    </div>
    <div class="md:flex-1 flex flex-col justify-center items-center p-4 md:p-12 mb-64 mt-64 md:mb-0 md:mt-0 space-y-4">
      <Logo className="w-24" />
      <p>Welcome Back</p>
      <p>Please connect to continue</p>
      <button>Connect</button>
      <button>Whitepaper</button>
      <p class="text-center">
        Welcome to OpenBook, the future of accounting at your fingertips! 
        Experience the ease of decentralised financial management, secure transaction management and real-time insights.
        Simplify your accounting journey with OpenBook!
      </p>
  </div>
</div>

    
  {/if}
</Layout>
