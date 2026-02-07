import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WeatherAlert from "@/components/WeatherAlert";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Industries from "./pages/Industries";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import ApplyJob from "./pages/ApplyJob";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import WeatherAlertManager from "./pages/admin/WeatherAlertManager";
import JobListingsManager from "./pages/admin/JobListingsManager";
import ApplicationsViewer from "./pages/admin/ApplicationsViewer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Admin routes — no Header/Footer */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard>
                    <WeatherAlertManager />
                  </AdminDashboard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/jobs"
              element={
                <ProtectedRoute>
                  <AdminDashboard>
                    <JobListingsManager />
                  </AdminDashboard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/applications"
              element={
                <ProtectedRoute>
                  <AdminDashboard>
                    <ApplicationsViewer />
                  </AdminDashboard>
                </ProtectedRoute>
              }
            />

            {/* Public routes */}
            <Route
              path="*"
              element={
                <>
                  <WeatherAlert />
                  <Header />
                  <main className="min-h-screen">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/industries" element={<Industries />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/careers" element={<Careers />} />
                      <Route path="/careers/apply/:id" element={<ApplyJob />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
