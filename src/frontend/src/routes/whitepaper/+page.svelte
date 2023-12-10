<script>
  import Balance from "$lib/icons/balance.svelte";
  import Creditors from "$lib/icons/creditors.svelte";
  import Debtors from "$lib/icons/debtors.svelte";
  import Financing from "$lib/icons/financing.svelte";
  import Icp from "$lib/icons/icp.svelte";
import Logo from "$lib/icons/logo.svelte";
  import Mvp from "$lib/icons/mvp.svelte";
  import Profit from "$lib/icons/profit.svelte";
  import Team from "$lib/icons/team.svelte";
import Layout from "../Layout.svelte";

</script>
<Layout>
    <div class="flex h-screen">
      <nav class="p-4 h-full side-nav flex flex-col">
        <Logo className='w-6' />
        <Icp className="w-6 mt-8" />
        <Team className="w-6 mt-4" />
        <Mvp className="w-6 mt-4" />
        <Financing className="w-6 mt-4" />
        <Debtors className="w-6 mt-4" />
        <Creditors className="w-6 mt-4" />
        <Profit className="w-6 mt-4" />
        <Balance className="w-6 mt-4" />
      </nav>
      <main class="flex-1 p-4">
        <h1>Whitepaper</h1> 
      </main>
    </div>
</Layout>

<style>
  .side-nav{
    background-color: #2E323A;
  }
</style>

