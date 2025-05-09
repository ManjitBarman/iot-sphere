
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import DevicesPage from "./pages/DevicesPage";
import NotFound from "./pages/NotFound";
import EmailServiceDemo from "./components/EmailServiceDemo";
import DeviceDetailsPage from "./pages/DeviceDetailsPage";
import DashboardsPage from "./pages/DashboardsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import HistoricalDataPage from "./pages/HistoricalDataPage";
import ReportsPage from "./pages/ReportsPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPanel from "./pages/AdminPanel";
import ThemeDocumentation from "./docs/ThemeDocumentation";
import ComponentColorGuide from "./docs/ComponentColorGuide";
import ChakraThemeGuide from "./docs/ChakraThemeGuide";
import ChakraThemeExport from "./pages/ChakraThemeExport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/home" element={<DashboardHome />} />
            <Route path="/dashboards" element={<DashboardsPage />} />
            <Route path="/dashboard/:dashboardId" element={<Dashboard />} />
            <Route path="/devices" element={<DevicesPage />} />
            <Route path="/devices/:deviceId" element={<DeviceDetailsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/analytics/historical" element={<HistoricalDataPage />} />
            <Route path="/analytics/reports" element={<ReportsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/theme-docs" element={<ThemeDocumentation />} />
            <Route path="/color-guide" element={<ComponentColorGuide />} />
            <Route path="/chakra-theme" element={<ChakraThemeGuide />} />
            <Route path="/chakra-theme-export" element={<ChakraThemeExport />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
