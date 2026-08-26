import { Route, Routes } from "react-router";
import { AppLayout } from "./components/AppLayout";
import { DiscoverPage } from "./pages/DiscoverPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ProductsPage } from "./pages/ProductsPage";
import { SolutionPage } from "./pages/SolutionPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:slug" element={<ProductDetailPage />} />
        <Route path="discover" element={<DiscoverPage />} />
        <Route path="solutions/:scenarioSlug" element={<SolutionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

