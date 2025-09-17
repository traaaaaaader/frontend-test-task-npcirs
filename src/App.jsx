import { AppRouter } from "./app/router"
import { Navbar } from "./widgets/navbar"
import { CitizensProvider } from "@/widgets/citizens-table";

function App() {

  return (
    <CitizensProvider pageSize={50}>
      <Navbar/>
      <AppRouter/>
    </CitizensProvider>
  )
}

export default App
