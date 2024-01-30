import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ChatBar from './components/ChatBar';
import Container from '@mui/material/Container'

function App() {
  return (
    <Container >
        <ChatBar></ChatBar>
    </Container>
  );
}

export default App;
