
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
import DashboardLayout from "./layouts/DashboardLayout";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Regular pages with Navbar */}
            <Route path="/" element={<><Navbar /><Index /></>} />
            <Route path="/login" element={<><Navbar /><Login /></>} />
            <Route path="/email-demo" element={<><Navbar /><EmailServiceDemo /></>} />
            <Route path="/theme-docs" element={<><Navbar /><ThemeDocumentation /></>} />
            <Route path="/color-guide" element={<><Navbar /><ComponentColorGuide /></>} />
            <Route path="/chakra-theme" element={<><Navbar /><ChakraThemeGuide /></>} />
            <Route path="/chakra-theme-export" element={<><Navbar /><ChakraThemeExport /></>} />
            
            {/* Dashboard related pages with Dashboard Layout */}
            <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
            <Route path="/dashboard/home" element={<DashboardLayout><DashboardHome /></DashboardLayout>} />
            <Route path="/dashboard/:dashboardId" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
            <Route path="/dashboards" element={<DashboardLayout><DashboardsPage /></DashboardLayout>} />
            <Route path="/devices" element={<DashboardLayout><DevicesPage /></DashboardLayout>} />
            <Route path="/devices/:deviceId" element={<DashboardLayout><DeviceDetailsPage /></DashboardLayout>} />
            <Route path="/analytics" element={<DashboardLayout><AnalyticsPage /></DashboardLayout>} />
            <Route path="/analytics/historical" element={<DashboardLayout><HistoricalDataPage /></DashboardLayout>} />
            <Route path="/analytics/reports" element={<DashboardLayout><ReportsPage /></DashboardLayout>} />
            <Route path="/profile" element={<DashboardLayout><ProfilePage /></DashboardLayout>} />
            <Route path="/admin" element={<DashboardLayout><AdminPanel /></DashboardLayout>} />
            
            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
