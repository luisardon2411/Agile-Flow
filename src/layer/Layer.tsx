

const Layer: React.FC<{ children: JSX.Element | React.ReactNode }> = ({ children }) => {
  return (
    <main className="h-screen w-full">
        { children }
    </main>
  )
}

export default Layer