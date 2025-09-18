import { AppRouter } from "./app/router"
import { Navbar } from "./widgets/navbar"
import { CitizensProvider } from "@/widgets/citizens-table";

function App() {

  return (
    <CitizensProvider pageSize={50}>
      <div className="flex flex-col h-screen">
        <Navbar/>
        <AppRouter/>
      </div>
    </CitizensProvider>
  )
}

export default App
