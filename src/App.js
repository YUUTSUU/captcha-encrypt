import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Main} from './Main'
import {Test} from './Test'

function App() {
  return (
    <>
      < BrowserRouter>
        <Routes>
          <Route path="/verify" element={<Main />} />
          <Route path="/verify/document/:params" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;