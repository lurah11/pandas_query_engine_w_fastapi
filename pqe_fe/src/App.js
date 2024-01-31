import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ChatBar from './components/ChatBar';
import Container from '@mui/material/Container'
import Grid  from '@mui/material/Grid';
import UploadBox from './components/UploadBox'
import Typography  from '@mui/material/Typography';
import ChatBox from './components/ChatBox';


function App() {
  return (
    <Container >
      <Typography fontFamily='Open Sans' sx={{'textAlign':'center','marginBottom':5, 'color':'cadetblue'}} component='h1' fontSize={40}>
          QUERY YOUR DATAFRAME :D
      </Typography>
      <Grid container spacing={2}>
          <Grid item xs={7}>
            <ChatBar></ChatBar>
          </Grid>
          <Grid item xs={5}>
            <UploadBox></UploadBox>
          </Grid> 
      </Grid>
      <Grid container >
        <Grid item xs={12}>
            <Typography component="h5">
                QUERY RESULT
            </Typography>
            <ChatBox />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
