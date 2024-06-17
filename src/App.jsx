import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LandingPage from "./pages/LandingPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true
    }
  }
});

function App() {
  return (
    <>
      <LandingPage />
      <QueryClientProvider client={queryClient}>
          <GalleryPage />
      </QueryClientProvider>
    </>
  );
}

export default App;
