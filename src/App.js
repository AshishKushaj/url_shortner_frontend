import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import StatsPage from "./pages/StatsPage";
import HealthPage from "./pages/HealthPage";

export default function App() {

  return (
    
	<Routes>
		<Route path="/" element={<DashboardPage />} />

		<Route path="/code/:code" element={<StatsPage />} />

		<Route path="/healthz" element={<HealthPage />} />

		<Route
			path="*"
			element={
			<div style={{ padding: "1rem" }}>
				<h2>Not found</h2>
				<p>Route does not exist.</p>
			</div>
			}
		/>

    </Routes>
  );
}
