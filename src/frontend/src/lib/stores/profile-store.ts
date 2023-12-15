import { ActorFactory } from '$lib/utils/actor-factory';
import { idlFactory } from '../../../../declarations/backend';
import type { DirectoryDTO } from '../../../../declarations/backend/backend.did';

function createProfileStore() {
  let actor: any = ActorFactory.createActor(
    idlFactory,
    process.env.BACKEND_CANISTER_ID,
  );

  async function getProfiles(
    usernameFilter: string,
    firstNameFilter: string,
    lastNameFilter: string,
    professionFilter: string,
    currentPage: number,
  ) {
    let updatedPlayersData = await actor.getProfiles(
      usernameFilter,
      firstNameFilter,
      lastNameFilter,
      professionFilter,
      currentPage,
    );
    console.log(updatedPlayersData);
    return updatedPlayersData as DirectoryDTO;
  }

  return {
    getProfiles,
  };
}

export const profilesStore = createProfileStore();
