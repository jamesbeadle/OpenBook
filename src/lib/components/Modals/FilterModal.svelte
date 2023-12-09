<script>
  import LineLayout from "../LineLayout.svelte";
  import SDateRangePicker from "s-date-range-picker";
  import DateTimePicker from "../DateTimePicker.svelte";

  let isShowPicker = false;

  let isOpen = false;
  function closeModal() {
    isOpen = false;
  }
  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  let selected = "10";
  function onChange(event) {
    selected = event.currentTarget.value;
  }

  let typeSelected = "1";
  function onTypeChange(event) {
    typeSelected = event.currentTarget.value;
  }

  // Manage start and end props from main app component
  let startDate = new Date();
  let endDate = new Date();
  function onApply({ detail }) {
    startDate = detail.startDate;
    endDate = detail.endDate;
  }
</script>

<button
  type="button"
  class="flex w-1/2 md:w-24 mx-0 py-2 px-2 justify-center gap-2 rounded hover:bg-zinc-700"
  style="border-color: #2E323A; border-width: 1px;"
  on:click={() => (isOpen = true)}
>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M12.6668 1.33331H3.3335C2.80306 1.33331 2.29436 1.54403 1.91928 1.9191C1.54421 2.29417 1.3335 2.80288 1.3335 3.33331V4.11331C1.3334 4.38861 1.39014 4.66096 1.50016 4.91331V4.95331C1.59435 5.16729 1.72776 5.36175 1.8935 5.52665L6.00016 9.60665V14C5.99994 14.1133 6.02859 14.2248 6.08341 14.3239C6.13823 14.4231 6.21742 14.5066 6.3135 14.5666C6.41959 14.6324 6.54201 14.667 6.66683 14.6666C6.77119 14.666 6.87395 14.6409 6.96683 14.5933L9.6335 13.26C9.74344 13.2046 9.83589 13.1198 9.90061 13.0151C9.96533 12.9104 9.99979 12.7898 10.0002 12.6666V9.60665L14.0802 5.52665C14.2459 5.36175 14.3793 5.16729 14.4735 4.95331V4.91331C14.5927 4.66293 14.6585 4.3905 14.6668 4.11331V3.33331C14.6668 2.80288 14.4561 2.29417 14.081 1.9191C13.706 1.54403 13.1973 1.33331 12.6668 1.33331ZM8.86016 8.85998C8.79837 8.92227 8.74949 8.99615 8.71632 9.07738C8.68314 9.1586 8.66632 9.24558 8.66683 9.33331V12.2533L7.3335 12.92V9.33331C7.334 9.24558 7.31719 9.1586 7.28401 9.07738C7.25083 8.99615 7.20195 8.92227 7.14016 8.85998L3.60683 5.33331H12.3935L8.86016 8.85998ZM13.3335 3.99998H2.66683V3.33331C2.66683 3.1565 2.73707 2.98693 2.86209 2.86191C2.98712 2.73688 3.15669 2.66665 3.3335 2.66665H12.6668C12.8436 2.66665 13.0132 2.73688 13.1382 2.86191C13.2633 2.98693 13.3335 3.1565 13.3335 3.33331V3.99998Z"
        fill="white"
      />
    </svg>
  </div>
  <p class="text-xs">Filters</p>
</button>

{#if isOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-90"
    on:click={handleOutsideClick}
  >
    <div
      class="w-11/12 md:w-96 h-11/12 p-6 mb:p-8 rounded shadow-lg border-2"
      style="background-color: #101111; border-color: #454b56;"
    >
      <div class="flex flex-col gap-10">
        <div class="flex flex-row justify-between gap-10">
          <p class="text-white text-2xl">Filters</p>
          <button on:click={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M13.4099 12L19.7099 5.71C19.8982 5.5217 20.004 5.2663 20.004 5C20.004 4.7337 19.8982 4.47831 19.7099 4.29C19.5216 4.1017 19.2662 3.99591 18.9999 3.99591C18.7336 3.99591 18.4782 4.1017 18.2899 4.29L11.9999 10.59L5.70994 4.29C5.52164 4.1017 5.26624 3.99591 4.99994 3.99591C4.73364 3.99591 4.47824 4.1017 4.28994 4.29C4.10164 4.47831 3.99585 4.7337 3.99585 5C3.99585 5.2663 4.10164 5.5217 4.28994 5.71L10.5899 12L4.28994 18.29C4.19621 18.383 4.12182 18.4936 4.07105 18.6154C4.02028 18.7373 3.99414 18.868 3.99414 19C3.99414 19.132 4.02028 19.2627 4.07105 19.3846C4.12182 19.5064 4.19621 19.617 4.28994 19.71C4.3829 19.8037 4.4935 19.8781 4.61536 19.9289C4.73722 19.9797 4.86793 20.0058 4.99994 20.0058C5.13195 20.0058 5.26266 19.9797 5.38452 19.9289C5.50638 19.8781 5.61698 19.8037 5.70994 19.71L11.9999 13.41L18.2899 19.71C18.3829 19.8037 18.4935 19.8781 18.6154 19.9289C18.7372 19.9797 18.8679 20.0058 18.9999 20.0058C19.132 20.0058 19.2627 19.9797 19.3845 19.9289C19.5064 19.8781 19.617 19.8037 19.7099 19.71C19.8037 19.617 19.8781 19.5064 19.9288 19.3846C19.9796 19.2627 20.0057 19.132 20.0057 19C20.0057 18.868 19.9796 18.7373 19.9288 18.6154C19.8781 18.4936 19.8037 18.383 19.7099 18.29L13.4099 12Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
        <div class="flex flex-col gap-4">
          <p class="text-white text-xl">By Date</p>
          <div class="flex flex-col gap-2">
            <label>
              <input
                checked={selected === 10}
                on:change={onChange}
                type="radio"
                name="amount"
                value="10"
              /> Last 10 Days
            </label>
            <label>
              <input
                checked={selected === 30}
                on:change={onChange}
                type="radio"
                name="amount"
                value="30"
              /> Last 30 Days
            </label>
            <label>
              <input
                checked={selected === 60}
                on:change={onChange}
                type="radio"
                name="amount"
                value="60"
              /> Last 60 Days
            </label>
          </div>
        </div>
        <div class="flex flex-col gap-10">
          <p class="text-white text-xl">Custom Date</p>
          <div class="flex flex-col md:flex-row gap-2">
            <div class="flex flex-col md:w-1/2 w-screen gap-0">
              <p class="text-white text-sm">From</p>
              <DateTimePicker />
            </div>
            <div class="flex flex-col md:w-1/2 w-screen gap-0">
              <p class="text-white text-sm">To</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <p class="text-white text-xl">Transaction Type</p>
          <div class="flex flex-col gap-2">
            <label>
              <input
                checked={typeSelected === 1}
                on:change={onTypeChange}
                type="radio"
                name="amount"
                value="1"
              /> Deposit
            </label>
            <label>
              <input
                checked={typeSelected === 2}
                on:change={onTypeChange}
                type="radio"
                name="amount"
                value="2"
              /> Withdrawal
            </label>
            <label>
              <input
                checked={typeSelected === 3}
                on:change={onTypeChange}
                type="radio"
                name="amount"
                value="3"
              /> Transfer
            </label>
          </div>
        </div>
        <div class="flex flex-col md:flex-row justify-end gap-3">
          <button
            class="border-2 md:px-8 py-2 text-sm rounded-sm"
            style="border-color: #454b56;"
            on:click={closeModal}
          >
            Cancel
          </button>
          <button
            class="border-2 md:px-8 py-2 text-sm rounded-sm"
            style="border-color: #454b56; color: #454b56;"
            on:click={closeModal}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
