import { WalletDialog } from "./components/Wallet/WalletDialog";
import { Header } from "./components/Header";
import Dashboard from "./components/Dashboard/Dashboard.tsx";

export default function App() {
  return (
    <>
      <WalletDialog />
      <Header />
      <Dashboard />
    </>
  );
}
