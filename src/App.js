import { useState } from 'react';
import './App.css';
import Game from './components/Game';
import { Toast, ToastContainer } from 'react-bootstrap';

function WrongButtonToast({ showToast, toastMsg, setShowToast }) {
  return (
    <ToastContainer position="top-end" style={{ padding: "1%" }}>
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Header >
          <strong className="me-auto">Matrix Game</strong>
        </Toast.Header>
        <Toast.Body>{toastMsg}</Toast.Body>
      </Toast>
    </ToastContainer >);
};
function App() {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const showToastMsg = (msg) => { setToastMsg(msg); setShowToast(true); };
  return (
    <div>
      <WrongButtonToast showToast={showToast} toastMsg={toastMsg} setShowToast={setShowToast} />
      <Game showToastMsg={showToastMsg} matrixSize={5} numRounds={6} />
    </div>
  );
}

export default App;
