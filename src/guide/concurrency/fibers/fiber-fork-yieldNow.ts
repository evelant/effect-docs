import { Effect, SubscriptionRef, Stream } from "effect"

const program = Effect.gen(function* (_) {
  const ref = yield* _(SubscriptionRef.make(0))
  yield* _(
    ref.changes,
    Stream.tap((n) => Effect.logInfo(`SubscriptionRef changed to ${n}`)),
    Stream.runDrain,
    Effect.fork
  )
  yield* _(Effect.yieldNow())
  yield* _(SubscriptionRef.set(ref, 1))
  yield* _(SubscriptionRef.set(ref, 2))
})

Effect.runPromise(program)
/*
SubscriptionRef changed to 0
SubscriptionRef changed to 1
SubscriptionRef changed to 2
*/
