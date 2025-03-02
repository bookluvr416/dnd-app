export default function CharactersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <div className="mr-4 ml-4 min-w-screen pt-6 pb-20 px-6">
        {children}
      </div>
    </main>
  )
}
