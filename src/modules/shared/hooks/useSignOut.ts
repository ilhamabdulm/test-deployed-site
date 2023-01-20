import { userStore } from '../store/userStore';

export function useSignOut() {
  function signOut() {
    userStore.setState({});
    userStore.persist.clearStorage();
  }

  return signOut;
}
