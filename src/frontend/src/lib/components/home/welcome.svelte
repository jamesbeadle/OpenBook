<script>
    import LogoIcon from "$lib/icons/logo-icon.svelte";
    import { authStore } from "$lib/stores/auth-store";

</script>
<div class="flex flex-col md:flex-row h-screen">
    <div class="block md:hidden h-1/4 bg-cover bg-center">
      <img src="/home.jpg" alt="Home" class="object-cover h-full w-full" />
    </div>
  
    <div class="flex-grow md:w-1/2 bg-black text-white flex flex-col justify-center items-center p-8">
      <LogoIcon className="w-24 mb-8" />
      <h1 class="text-3xl font-bold mb-4">OpenBook</h1>
      <p class="text-lg mb-6">Decentralised business management.</p>
      <button on:click={() => authStore.signIn({ domain: import.meta.env.VITE_AUTH_PROVIDER_URL })} class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded">
        Connect
      </button>
      <footer class="text-sm text-gray-400 mt-10 text-center">
        Developed by <a href="https://waterwaylabs.xyz" class="underline" target="_blank">Waterway Labs</a>. 
      </footer>
    </div>
  
    <div class="hidden md:flex md:w-1/2 bg-cover bg-center relative">
      <img src="/home.jpg" alt="Home" class="object-cover h-full w-full" />
    </div>
  </div>