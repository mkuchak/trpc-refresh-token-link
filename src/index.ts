import type { Operation, TRPCLink } from "@trpc/client";
import type { AnyRouter } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import PQueue from "p-queue";

const queue = new PQueue({ concurrency: 1 });

export type RefreshTokenLinkOptions = {
  shouldRefresh: (op: Operation) => boolean;
  refreshToken: (op: Operation) => Promise<void>;
};

export const refreshTokenLink =
  <AppRouter extends AnyRouter>({
    shouldRefresh,
    refreshToken,
  }: RefreshTokenLinkOptions): TRPCLink<AppRouter> =>
  () => {
    return ({ next, op }) => {
      return observable((observer) => {
        void queue.add(async () => {
          if (shouldRefresh(op)) {
            await refreshToken(op);
          }
          next(op).subscribe({
            next(value) {
              observer.next(value);
            },
            error(error) {
              observer.error(error);
            },
            complete() {
              observer.complete();
            },
          });
        });
      });
    };
  };
