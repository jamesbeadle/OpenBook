<script lang="ts">
  import { userStore } from '$lib/stores/user-store';
  import { toastsError, toastsShow } from '$lib/stores/toasts-store';
  import { busyStore } from '@dfinity/gix-components';
  import type {
    ProfileDTO,
    UpdateProfileDTO,
  } from '../../../../../declarations/backend/backend.did';
  import { isDisplayNameValid, isUsernameValid } from '$lib/utils/helpers';
  import { writable, type Writable } from 'svelte/store';

  export let profile: Writable<ProfileDTO | null> = writable(null);
  export let profileCreated: () => void;

  $: newUsername = $profile?.username ?? '';
  $: newDisplayName = $profile?.displayName ?? '';
  $: newFirstName = $profile?.firstName ?? '';
  $: newLastName = $profile?.lastName ?? '';

  $: isSubmitDisabled =
    $profile === null ||
    !isUsernameValid(newUsername) ||
    !isDisplayNameValid(newDisplayName);

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
        username: $profile.username,
        displayName: $profile.displayName,
        firstName: $profile.firstName,
        lastName: $profile.lastName,
        openChatUsername: $profile.openChatUsername,
        profession: $profile.profession,
        emailAddress: $profile.emailAddress,
        phoneNumber: $profile.phoneNumber,
        otherContact: $profile.otherContact,
        termsAccepted: $profile.termsAccepted,
        userDefinedWallet: $profile.userDefinedWallet,
        preferredPaymentCurrency: $profile.preferredPaymentCurrency,
      };

      await userStore.createProfile(updateProfileDTO);
      userStore.sync();
      toastsShow({
        text: 'Profile updated.',
        level: 'success',
        duration: 2000,
      });
      profileCreated();
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

  function updateProfileField(
    field: keyof ProfileDTO,
    value: string | null | undefined,
  ) {
    newUsername = value ?? '';
    console.log(field);
    console.log(value);
  }
</script>

{#if $profile}
  <div class="flex flex-col">
    <h3 class="text-2xl">Create Your OpenBook Profile</h3>
    <p class="text-sm text-red-600 my-2">
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
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2"
          placeholder="Choose a username"
          on:input={(e) =>
            updateProfileField('username', e.currentTarget.value)}
          bind:value={$profile.username}
        />
      </div>
      <div class="form-group w-1/2">
        <label for="displayName" class="block text-sm">Display Name</label>
        <input
          type="text"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2"
          placeholder="Enter a display name"
          bind:value={$profile.displayName}
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
          bind:value={$profile.firstName}
        />
      </div>
      <div class="form-group w-1/2">
        <label for="lastName" class="block text-sm">Last Name</label>
        <input
          type="text"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2"
          placeholder="Enter your last name"
          bind:value={$profile.lastName}
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
          bind:value={$profile.profession}
        />
      </div>
      <div class="form-group w-1/2">
        
      </div>
    </div>
    <div class="items-center flex space-x-4 mt-6 mb-4">
      <button
        class={`book-btn ${isSubmitDisabled ? 'disabled' : ''}`}
        type="submit"
        disabled={isSubmitDisabled}
      >
        Create Profile
      </button>
    </div>
  </form>
{/if}
