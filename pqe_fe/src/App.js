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
import {useState} from 'react'
import CircularProgress from '@mui/material/CircularProgress' 







function App() {
  
  const [dataObj,setdataObj] = useState("")
  const [progress,setProgress] = useState(false)

  function handleKeyDown(event) {
      if (event.key==="Enter") {
          setProgress(true)
          const value = event.target.value 
          const message = {
            'msg':value
          }
          fetch('http://127.0.0.1:8000/api',{
            method:'POST',
            body:JSON.stringify(message),
            headers: {
              'Content-Type':'application/json'
            }
        }).then(response=>response.json())
        .then(data=>{
            if (data["exception"]) {
              alert("Error , maybe you forgot to add the csv file?")
            }
            console.log(data)
            setProgress(false)
            setdataObj(data)
        })  

      }
  }





  return (
    <Container >
      <Typography fontFamily='Open Sans' sx={{'textAlign':'center','marginBottom':5, 'color':'cadetblue'}} component='h1' fontSize={40}>
          QUERY YOUR DATAFRAME :D
      </Typography>
      <Grid container spacing={2}>
          <Grid item xs={7}>
            <ChatBar keydown={handleKeyDown}></ChatBar>
          </Grid>
          <Grid item xs={5}>
            <UploadBox></UploadBox>
          </Grid> 
      </Grid>
      <Grid container >
        <Grid item xs={12}>
            <Typography component="h5">
                QUERY RESULT {progress ? <CircularProgress></CircularProgress> : <p></p>}
            </Typography>
            <ChatBox  dataobj={dataObj} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
