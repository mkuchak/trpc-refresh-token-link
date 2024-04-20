# TRPC Refresh Token Link

A link for [TRPC](https://trpc.io) that refreshes the token when it expires.

## Usage

Install the package with your package manager of choice.

```bash
npm install trpc-refresh-token-link
```

Then use it in your code.

```ts
import { refreshTokenLink } from "trpc-refresh-token-link";
import { createTRPCClient } from "@trpc/client";

const api = createTRPCClient({
  links: [
    /* other links */
    refreshTokenLink({
      /* options */
    }),
  ],
});
```

### Options

The `refreshTokenLink` function accepts an object with the following properties:

- `shouldRefresh: (op: Operation) => boolean`: A function that determines whether the token should be refreshed for a given operation. To call the refresh token function, return `true`.
- `refreshToken: (op: Operation) => Promise<void>`: A function that refreshes the token and saves it to the client.
