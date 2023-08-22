import DetailsPage from "./Pages/DetailsPage/DetailsPage";
import ListPage from "./Pages/ListPage/ListPage";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/GSIV23_Mayank_Awasthi">
      <div className="App">
        <Routes>
          <Route exact path="/" element={<ListPage />} />
          <Route path="/:id" element={<DetailsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
