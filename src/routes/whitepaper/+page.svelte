<script>
  import "./page.css";
  import Tab1 from "./Tab1.svelte";
  import Tab2 from "./Tab2.svelte";
  import Tab3 from "./Tab3.svelte";
  import Tabs from "./Tabs.svelte";
  import LineLayout from "../../lib/components/LineLayout.svelte";

  // List of tab items with labels, values and assigned components
  let items = [
    { label: "Content", value: 1, component: Tab1 },
    // { label: "Interactions", value: 2, component: Tab2 },
    // { label: "Tab 3", value: 3, component: Tab3 },
  ];
</script>

<main class="h-screen">
  <div
    class="whitepaper-body min-h-screen flex flex-col justify-between w-full p-0 m-0 text-white"
  >
    <div class="flex flex-col">
      <header
        class="py-2 px-6 text-white flex justify-between gap-1"
        style="background-color: #292c33"
      >
        <div class="flex">
          <a href="/" class="hover:text-gray-400 flex items-center">     
            <div class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="32"
                viewBox="0 0 28 32"
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
            <p class="text-xl">OpenBook</p>
          </a>
        </div>
        <div class="flex">
          <!-- <button class="hover:text-green-300 active:border-2 px-3 rounded-md">
            <p class="text-md">Connect</p>
          </button> -->
        </div>
        <!-- </p> -->
      </header>
      <!-- svelte-ignore missing-declaration -->
      <div class="m-6 h-3/4">
        <LineLayout backgroundColor="#292c33" border="true">
          <p
            class="whitepaper-title shadow appearance-none py-4 px-6 mb-6 text-xl"
          >
            OpenBook White Paper
          </p>
        </LineLayout>
        <Tabs {items} />
      </div>
    </div>
    <footer
      class="w-full py-2 px-6 text-white flex justify-center gap-1"
      style="background-color: #292c33"
    >
      <!-- <p class="whitepaper-title shadow appearance-none py-2 px-3 mb-6 text-xl"> -->
      <div class="h-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="32"
          viewBox="0 0 28 32"
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
      <h1 class="text-xl">OpenBook</h1>
      <!-- </p> -->
    </footer>
  </div>
</main>
