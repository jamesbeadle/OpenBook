<script lang="ts">
  import { userStore } from '$lib/stores/user-store';
  import { toastsError, toastsShow } from '$lib/stores/toasts-store';
  import { Modal, busyStore } from '@dfinity/gix-components';
  import type { ProfileDTO, UpdateProfileDTO } from '../../../../../declarations/backend/backend.did';

  export let visible: boolean;
  export let closeModal: () => void;
  export let cancelModal: () => void;
  export let profile: ProfileDTO | null;

  function isDisplayNameValid(displayName: string): boolean {
    if (!displayName) {
      return false;
    }

    if (displayName.length < 3 || displayName.length > 30) {
      return false;
    }

    return /^[a-zA-Z0-9 ]+$/.test(displayName);
  }

  $: isSubmitDisabled = !isDisplayNameValid(newDisplayName);
  $: newUsername = profile ? profile.username : ""; 
  $: newDisplayName = profile ? profile.displayName : ""; 
  $: newFirstName = profile ? profile.firstName : ""; 
  $: newLastName = profile ? profile.lastName : ""; 
  $: newOpenChatUsername = profile ? profile.openChatUsername : ""; 
  $: newEmailAddress = profile ? profile.emailAddress : ""; 
  $: newPhoneNumber = profile ? profile.phoneNumber : ""; 

  async function updateProfileDetail() {
    busyStore.startBusy({
      initiator: 'update-profile',
      text: 'Updating profile detail...',
    });
    try {
      
      if(!profile){
        return;
      }
      
      let updateProfileDTO: UpdateProfileDTO = {
        username: newUsername,
        displayName: newDisplayName,
        firstName: newFirstName,
        lastName: newLastName,
        openChatUsername: newOpenChatUsername,
        emailAddress: newEmailAddress,
        phoneNumber: newPhoneNumber,
        termsAccepted: profile.termsAccepted,
        userDefinedWallet: profile.userDefinedWallet,
        preferredPaymentCurrency: profile.preferredPaymentCurrency
      };

      await userStore.updateProfile(updateProfileDTO);
      userStore.sync();
      await closeModal();
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
      cancelModal();
    } finally {
      busyStore.stopBusy('update-profile');
    }
  }
</script>

<Modal {visible} on:nnsClose={cancelModal}>
  <div class="p-4">
    <div class="flex justify-between items-center my-2">
      <h3 class="default-header">Update Profile Detail</h3>
      <button class="times-button" on:click={cancelModal}>&times;</button>
    </div>
    <form on:submit|preventDefault={updateProfileDetail}>
      <div class="mt-4">
        <input
          type="text"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="New Display Name"
          bind:value={newDisplayName}
        />
      </div>
      <div class="items-center py-3 flex space-x-4">
        <button
          class="px-4 py-2 book-cancel-btn text-white rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          on:click={cancelModal}
        >
          Cancel
        </button>
        <button
          class={`px-4 py-2 ${isSubmitDisabled ? 'bg-gray-500' : 'book-btn'}`}
          type="submit"
          disabled={isSubmitDisabled}
        >
          Update
        </button>
      </div>
    </form>
  </div>
</Modal>
