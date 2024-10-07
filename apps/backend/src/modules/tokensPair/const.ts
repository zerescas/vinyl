export const tokensSettings = {
  accessToken: {
    expiresIn: "10m",
  },
  refreshToken: {
    expiresIn: "30d",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
} as const;
