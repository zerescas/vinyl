import type { UserSignUp } from "~/libs/shared-types";

const apiPath = "http://localhost:9000/api";

export function useAuth() {
  const router = useRouter();
  const userStore = useUserStore();

  async function signUp(userData: UserSignUp) {
    const result = await useFetch<string>(`${apiPath}/auth/sign-up`, {
      body: {
        ...userData,
      },
      method: "POST",
      credentials: "include",
    });

    if (!result.error.value) {
      userStore.set(result.data.value);
      router.replace("/");
    }

    return { ...result };
  }

  async function signIn(username: string, password: string) {
    const result = await useFetch<string>(`${apiPath}/auth/sign-in`, {
      body: {
        username,
        password,
      },
      method: "POST",
      credentials: "include",
    });

    if (!result.error.value) {
      userStore.set(result.data.value);
      router.replace("/");
    }

    return { ...result };
  }

  async function logout() {
    await $fetch<string>(`${apiPath}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    userStore.clear();
  }

  /**
   * Refresh JWT token pair (access_token, refresh_token)
   * @param forceRefresh - forceRefresh without checking expiration of access_token
   * @returns
   */
  async function refresh(forceRefresh: boolean = false) {
    const { user, set } = userStore;

    if (!user.decodedToken) return;

    if (!forceRefresh) {
      const isAccessTokenExpired = user.decodedToken.exp! * 1000;
      if (!isAccessTokenExpired) return;
    }

    const newAccessToken = await $fetch<string | null>(
      `${apiPath}/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      },
    );
    await set(newAccessToken);
  }

  return { signUp, signIn, logout, refresh };
}
