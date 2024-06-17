import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LandingPage />
        {/* <Routes>
          <Route path="/galleryPage" element={<GalleryPage />} />
        </Routes> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
