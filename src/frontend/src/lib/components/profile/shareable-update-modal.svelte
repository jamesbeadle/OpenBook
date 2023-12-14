<script lang="ts">
    import { onMount } from 'svelte';
    import { userStore } from '$lib/stores/user-store';
    import { toastsError, toastsShow } from '$lib/stores/toasts-store';
    import { Modal, busyStore } from '@dfinity/gix-components';
    import type {
      ProfileDTO,
      UpdateProfileDTO,
    } from '../../../../../declarations/backend/backend.did';
    import { writable, type Writable } from 'svelte/store';
  
    export let profile: Writable<ProfileDTO | null> = writable(null);
    export let shareableInfoUpdated: () => void;
    export let toggleShareableUpdateModal: () => void;
    export let showShareableUpdateModal: boolean;
    
    let openChatUsernameInputValue = '';
    let emailAddressInputValue = '';
    let phoneNumberInputValue = '';
    let otherContactInputValue = '';
    
    onMount(async () => {
        openChatUsernameInputValue = $profile?.openChatUsername ?? '';
        emailAddressInputValue = $profile?.emailAddress ?? '';
        phoneNumberInputValue = $profile?.phoneNumber ?? '';
        otherContactInputValue = $profile?.otherContact ?? '';
    });
  
    function handleOpenChatInput(event: Event) {
      const target = event.currentTarget as HTMLInputElement;
      if (target) {
        updateProfileField('openChatUsername', target.value);
        openChatUsernameInputValue = target.value;
      }
    }
  
    function handleEmailAddressInput(event: Event) {
      const target = event.currentTarget as HTMLInputElement;
      if (target) {
        updateProfileField('emailAddress', target.value);
        emailAddressInputValue = target.value;
      }
    }
    
    function handlePhoneNumberInput(event: Event) {
        const target = event.currentTarget as HTMLInputElement;
        if (target) {
            updateProfileField('phoneNumber', target.value);
            phoneNumberInputValue = target.value;
        }
    }
    
    function handleOtherContactInput(event: Event) {
        const target = event.currentTarget as HTMLInputElement;
        if (target) {
            updateProfileField('otherContact', target.value);
            otherContactInputValue = target.value;
        }
    }
  
  
    $: newOpenChatUsername = $profile?.openChatUsername ?? '';
    $: newEmailAddress = $profile?.emailAddress ?? '';
    $: newPhoneNumber = $profile?.phoneNumber ?? '';
    $: newOtherContact = $profile?.otherContact ?? '';
  
    $: isSubmitDisabled = false;

    async function updateProfileInfo() {
      busyStore.startBusy({
        initiator: 'update-profile-info',
        text: 'Updating profile info...',
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
          openChatUsername: newOpenChatUsername,
          profession: $profile.profession,
          emailAddress: emailAddressInputValue,
          phoneNumber: phoneNumberInputValue,
          otherContact: otherContactInputValue,
          termsAccepted: $profile.termsAccepted,
          userDefinedWallet: $profile.userDefinedWallet,
          preferredPaymentCurrency: $profile.preferredPaymentCurrency,
        };
  
        let result = await userStore.updateShareableProfileInfo(updateProfileDTO);
        console.log(result)
        shareableInfoUpdated();
        userStore.sync();
        toastsShow({
          text: 'Profile info updated.',
          level: 'success',
          duration: 2000,
        });
  
  
      } catch (error) {
        toastsError({
          msg: { text: 'Error updating profile info.' },
          err: error,
        });
        console.error('Error updating profile info:', error);
      } finally {
        busyStore.stopBusy('update-profile-info');
      }
    }
  
    function updateProfileField(field: keyof ProfileDTO, value: string | null | undefined) {
      if (field === 'openChatUsername') {
        newOpenChatUsername = value ?? '';
      } else if (field === 'emailAddress') {
        newEmailAddress = value ?? '';
      } else if (field === 'phoneNumber') {
        newPhoneNumber = value ?? '';
      } else if (field === 'otherContact') {
        newOtherContact = value ?? '';
      }
    }
  
  </script>
<Modal visible={showShareableUpdateModal} on:nnsClose={toggleShareableUpdateModal}>
    {#if $profile}
        <div class="p-4">
            <div class="flex justify-between items-center my-2">
                <h3 class="default-header">Update Public Profile Information</h3>
                <button class="times-button" on:click={toggleShareableUpdateModal}>&times;</button>
            </div>
        
            
            <div class="flex flex-col">
                <p class="text-sm text-amber-600 my-2">
                    The information your provide in this form will be public.
                </p>
            </div>
            <form on:submit|preventDefault={updateProfileInfo}>
                <div class="flex flex-row space-x-4 mt-4">
                    <p>Shareable Information:</p>
                </div>
                <div class="flex flex-row space-x-4 mt-4">
                    <div class="form-group w-1/2">
                        <label for="openChatUsername" class="block text-sm">OpenChat Username</label>
                        <input
                        type="text"
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2"
                        placeholder="Enter your OpenChat username"
                        on:input={handleOpenChatInput}
                        bind:value={openChatUsernameInputValue}
                        />
                    </div>
                    <div class="form-group w-1/2">
                        <label for="emailAddress" class="block text-sm">Email Address</label>
                        <input
                        type="text"
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2"
                        placeholder="Enter your email address"
                        on:input={handleEmailAddressInput}
                        bind:value={emailAddressInputValue}
                        />
                    </div>
                </div>
                
                <div class="flex flex-row space-x-4 mt-4">
                    <div class="form-group w-1/2">
                        <label for="phoneNumber" class="block text-sm">Phone Number</label>
                        <input
                        type="text"
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2"
                        placeholder="Enter your phone number"
                        on:input={handlePhoneNumberInput}
                        bind:value={phoneNumberInputValue}
                        />
                    </div>
                    <div class="form-group w-1/2">
                        <label for="emailAddress" class="block text-sm">Other Contact</label>
                        <input
                        type="text"
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2"
                        placeholder="Enter any other contact info"
                        on:input={handleOtherContactInput}
                        bind:value={otherContactInputValue}
                        />
                    </div>
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
        </div>
    {/if}
</Modal>
