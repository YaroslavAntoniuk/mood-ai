const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      {children}
    </div>
  )
}

export default AuthWrapper;
