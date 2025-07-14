import type { ResourcesConfig } from "@aws-amplify/core";

const amplifyConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_AWS_USER_POOLS_ID,
      userPoolClientId: import.meta.env.VITE_AWS_USER_POOLS_WEB_CLIENT_ID,
      loginWith: {
        oauth: {
          domain: import.meta.env.VITE_OAUTH_DOMAIN,
          scopes: [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin",
          ],
          redirectSignIn: [import.meta.env.VITE_OAUTH_REDIRECT_SIGN_IN],
          redirectSignOut: [import.meta.env.VITE_OAUTH_REDIRECT_SIGN_OUT],
          responseType: "code",
        },
      },
    },
  },
};

export default amplifyConfig;
