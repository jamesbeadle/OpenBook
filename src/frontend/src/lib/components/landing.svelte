<script lang="ts">
    import Logo from '$lib/icons/logo-icon.svelte';
    import { authStore, type AuthSignInParams } from "$lib/stores/auth.store";
  
    function handleLogin() {
      let params: AuthSignInParams = {
        domain: import.meta.env.VITE_AUTH_PROVIDER_URL,
      };
      authStore.signIn(params);
    }
  
  </script>

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
  <div class="flex flex-row space-x-2">
    <button on:click={handleLogin} class="book-btn min-w-[150px]">Connect</button>
    <a href="/whitepaper" class="book-btn min-w-[150px]">Whitepaper</a>    
  </div>
  <p class="text-center">
    Welcome to OpenBook, the future of business management at your
    fingertips! Experience the ease of decentralised business
    management, secure transaction management and real-time insights.
  </p>
</div>
</div>
