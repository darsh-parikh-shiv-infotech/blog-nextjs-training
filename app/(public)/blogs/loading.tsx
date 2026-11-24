
export default function Loading() {
  return (
    <section className="container mx-auto animate-pulse space-y-8 px-4 py-12">
      <div className="h-9 w-48 rounded-md bg-muted" />
      <div className="h-5 w-72 rounded-md bg-muted" />
      <div className="h-10 w-full max-w-md rounded-md bg-muted" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <div className="aspect-video rounded-xl bg-muted" />
            <div className="h-5 w-3/4 rounded-md bg-muted" />
            <div className="h-4 w-full rounded-md bg-muted" />
          </div>
        ))}
      </div>
    </section>
  );
}
