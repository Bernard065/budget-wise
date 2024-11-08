export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="min-w-full px-4 py-10 sm:min-w-[520px] sm:px-8">
        <div className="flex items-center justify-between gap-2 pb-8">
          <div className="space-y-2.5">
            <h1 className="h2-bold text-dark-100 ">Welcome to BugdetWise</h1>
            <p className="paragraph-regular text-dark-500">
              Manage your personal finances
            </p>
          </div>
        </div>
        {children}
      </section>
    </main>
  );
}
