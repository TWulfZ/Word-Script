import Header from "@components/App/Header";
import Main from "@components/App/Main";
import Footer from "@components/App/Footer";

export default function App() {
  return (
    <div className="h-full w-full">
      <div className="h-full min-h-screen w-full space-y-4 p-8">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}
