<script lang="ts">
  import { onMount } from 'svelte';
  import { debounce } from 'lodash-es';
  import { userStore } from '$lib/stores/user-store';
  import { toastsError, toastsShow } from '$lib/stores/toasts-store';
  import { busyStore } from '@dfinity/gix-components';
  import type {
    ProfileDTO,
    UpdateProfileDTO,
  } from '../../../../../declarations/backend/backend.did';
  import { isDisplayNameValid, isNameValid, isUsernameValid, isProfessionValid } from '$lib/utils/helpers';
  import { writable, type Writable } from 'svelte/store';

  export let profile: Writable<ProfileDTO | null> = writable(null);
  export let profileCreated: () => void;
  export let profileUpdated: () => void;

  let usernameCheckStatus: string | null = null;
  let usernameInputValue = '';
  let displayNameInputValue = '';
  let firstNameInputValue = '';
  let lastNameInputValue = '';
  let professionInputValue = '';
  let usernameChecking = false; 

  const debouncedCheck = debounce(checkUsernameAvailability, 300);

  onMount(async () => {
    console.log("here")
    console.log($profile)
    usernameInputValue = $profile?.username ?? '';
    displayNameInputValue = $profile?.displayName ?? '';
    firstNameInputValue = $profile?.firstName ?? '';
    lastNameInputValue = $profile?.lastName ?? '';
    professionInputValue = $profile?.profession ?? '';
  });

  function handleUsernameInput(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    if (target) {
      updateProfileField('username', target.value);
      usernameInputValue = target.value;
      usernameCheckStatus = 'checking'; 
      usernameChecking = true;
      debouncedCheck(target.value);
    }
  }

  function handleDisplayNameInput(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    if (target) {
      updateProfileField('displayName', target.value);
      displayNameInputValue = target.value;
    }
  }

  function handleFirstNameInput(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    if (target) {
      updateProfileField('firstName', target.value);
      firstNameInputValue = target.value;
    }
  }

  function handleLastNameInput(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    if (target) {
      updateProfileField('lastName', target.value);
      lastNameInputValue = target.value;
    }
  }

  function handleProfessionInput(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    if (target) {
      updateProfileField('profession', target.value);
      professionInputValue = target.value;
    }
  }

  async function checkUsernameAvailability(username: string) {
    if(username.length == 0){
      usernameCheckStatus = '';
      usernameChecking = false;
      return;
    }
    usernameCheckStatus = 'checking';
    usernameChecking = true;
    try {
      const isAvailable = await userStore.checkUsernameAvailability(username);
      if(usernameInputValue.length == 0){
        usernameCheckStatus = '';
        usernameChecking = false;
        return;
      }
      usernameCheckStatus = isAvailable ? 'available' : 'unavailable';
      usernameChecking = false;
    } catch (error) {
      console.error('Error checking username:', error);
      usernameCheckStatus = 'unavailable';
      usernameChecking = false;
    }
  }


  $: newUsername = $profile?.username ?? '';
  $: newDisplayName = $profile?.displayName ?? '';
  $: newFirstName = $profile?.firstName ?? '';
  $: newLastName = $profile?.lastName ?? '';
  $: newProfession = $profile?.profession ?? '';
  
  $: isSubmitDisabled =
    $profile === null ||
    !isUsernameValid(newUsername) ||
    !isDisplayNameValid(newDisplayName) ||
    !isNameValid(newFirstName) ||
    !isNameValid(newLastName) ||
    !isProfessionValid(newProfession) ||
    usernameChecking ||
    usernameCheckStatus === 'unavailable';



  async function updateProfileDetail() {
    busyStore.startBusy({
      initiator: 'update-profile',
      text: 'Updating profile detail...',
    });
    try {
      if (!$profile) {
        return;
      }

      let updateProfileDTO: UpdateProfileDTO = {
        username: usernameInputValue,
        displayName: displayNameInputValue,
        firstName: newFirstName,
        lastName: newLastName,
        openChatUsername: $profile.openChatUsername,
        profession: newProfession,
        emailAddress: $profile.emailAddress,
        phoneNumber: $profile.phoneNumber,
        otherContact: $profile.otherContact,
        termsAccepted: $profile.termsAccepted,
        userDefinedWallet: $profile.userDefinedWallet,
        preferredPaymentCurrency: $profile.preferredPaymentCurrency,
      };

      let result = null;
      if($profile.principal.length == 0){
        result = await userStore.createProfile(updateProfileDTO);
        profileCreated();
      }
      else{
        result = await userStore.updateProfile(updateProfileDTO);
        profileUpdated();
      }
      console.log(result)
      userStore.sync();
      toastsShow({
        text: 'Profile updated.',
        level: 'success',
        duration: 2000,
      });


    } catch (error) {
      toastsError({
        msg: { text: 'Error updating profile.' },
        err: error,
      });
      console.error('Error updating profile:', error);
    } finally {
      busyStore.stopBusy('update-profile');
    }
  }

  function updateProfileField(field: keyof ProfileDTO, value: string | null | undefined) {
    if (field === 'username') {
      newUsername = value ?? '';
    } else if (field === 'displayName') {
      newDisplayName = value ?? '';
    } else if (field === 'firstName') {
      newFirstName = value ?? '';
    } else if (field === 'lastName') {
      newLastName = value ?? '';
    } else if (field === 'profession') {
      newProfession = value ?? '';
    }
  }

</script>

{#if $profile}
  <div class="flex flex-col">
   <p class="text-sm text-amber-600 my-2">
      The information your provide in this form will be public.
    </p>
  </div>
  <form on:submit|preventDefault={updateProfileDetail}>
    <div class="flex flex-row space-x-4 mt-4">
      <p>Required Information:</p>
    </div>
    <div class="flex flex-row space-x-4 mt-4">
      <div class="form-group w-1/2">
        <label for="username" class="block text-sm">Username</label>
        <input
          type="text"
          class={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2 ${
            usernameCheckStatus === 'available'
              ? 'border-green-500'
              : usernameCheckStatus === 'unavailable'
              ? 'border-red-500'
              : 'border-gray-300'
          }`}
          placeholder="Choose a username"
          on:input={handleUsernameInput}
          bind:value={usernameInputValue}
          maxlength="16"
        />
        {#if usernameChecking}
          <div class="text-sm text-gray-500 animate-pulse mt-2">Checking...</div>
        {:else if usernameCheckStatus === 'available'}
          <div class="text-sm text-green-500 mt-2">Available</div>
        {:else if usernameCheckStatus === 'unavailable'}
          <div class="text-sm text-red-500 mt-2">Unavailable</div>
        {/if}
      </div>
      <div class="form-group w-1/2">
        <label for="displayName" class="block text-sm">Display Name</label>
        <input
          type="text"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2"
          placeholder="Enter a display name"
          on:input={handleDisplayNameInput}
          bind:value={displayNameInputValue}
          maxlength="30"
        />
      </div>
    </div>
    <div class="flex flex-row space-x-4 mt-6">
      <p>Optional Information:</p>
    </div>
    <div class="mt-4 flex flex-row space-x-4">
      <div class="form-group w-1/2">
        <label for="firstName" class="block text-sm">First Name</label>
        <input
          type="text"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2"
          placeholder="Enter your first name"
          on:input={handleFirstNameInput}
          bind:value={firstNameInputValue}
          maxlength="30"
        />
      </div>
      <div class="form-group w-1/2">
        <label for="lastName" class="block text-sm">Last Name</label>
        <input
          type="text"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2"
          placeholder="Enter your last name"
          on:input={handleLastNameInput}
          bind:value={lastNameInputValue}
          maxlength="30"
        />
      </div>
    </div>
    <div class="mt-4 flex flex-row space-x-4">
      <div class="form-group w-1/2">
        <label for="profession" class="block text-sm">Profession</label>
        <input
          type="text"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2"
          placeholder="Enter your profession"
          on:input={handleProfessionInput}
          bind:value={professionInputValue}
          maxlength="50"
        />
      </div>
      <div class="form-group w-1/2" />
    </div>
    <div class="items-center flex space-x-4 mt-6 mb-4">

      
      {#if !$profile || $profile.principal.length == 0}
        <button
          class={`book-btn ${isSubmitDisabled ? 'disabled' : ''}`}
          type="submit"
          disabled={isSubmitDisabled}
        >
          Create Profile
        </button>
      {/if}

      {#if profile && $profile.principal.length > 0}
        <button
          class={`book-btn ${isSubmitDisabled ? 'disabled' : ''}`}
          type="submit"
          disabled={isSubmitDisabled}
        >
          Update Profile
        </button>
      {/if}
      
    </div>
  </form>
{/if}
