import Paper from '@mui/material/Paper';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid  from '@mui/material/Grid';
import { useState,useEffect } from 'react';


export default function UploadBox({filename}) {
    const [selectedFile, setSelectedFile] = useState("");
    const [uploadedFile,SetUploadedFile] = useState("");

    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/checkupload",{
            method:'GET'
        }).then(response=>response.json())
        .then(data=>{
            console.log(data)
            SetUploadedFile(data["filename"])
        })
    },[])



    function handleChange(event){
        const file = event.target.files[0]
        setSelectedFile(file)
    }
    function handleUpload(event){
        if (selectedFile==="") {
            alert("select File First!")
        }
        else {
            if(uploadedFile==="none") {
                const formData = new FormData();
                formData.append('file', selectedFile);
                console.log(formData)
                fetch("http://127.0.0.1:8000/api/upload",{
                    method:'POST',
                    body:formData
                }
                ).then((response)=>response.json())
                .then(data => {
                    SetUploadedFile(data["filename"])
                    setSelectedFile("")
                }).catch(error=>{
                    console.log(error)
                })
            }
            else {

            }
        }
    }

    function handleDelete() {

    }
    
    
    return (
        <>
            <Paper elevation={2} sx={{border:'1px solid',padding:'10px'}}>
                <Grid container spacing={1} >
                    <Grid item >
                        <Typography>
                            Choose your CSV File
                        </Typography>
                    </Grid>
                    <Grid item container spacing={1}>
                        <Grid item>
                            <Button  component="label" variant="contained">
                                <input onChange={handleChange} type="file" name="browseCSV" hidden>
                                </input>
                                Browse
                            </Button>
                        </Grid>
                        <Grid item >
                        <Button onClick={handleUpload}  component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload
                        </Button>
                        </Grid>
                        <Grid item >
                        <Button onClick={handleDelete}  component="label" variant="contained" color='warning'>
                            Delete File From Server
                        </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container >
                    <Typography>
                        selected file : 
                    </Typography>
                    <Typography>
                       {selectedFile.name}
                    </Typography>
                </Grid>
                <Grid container >
                    <Typography>
                        uploaded file : 
                    </Typography>
                    <Typography>
                       {uploadedFile}
                    </Typography>
                </Grid>
            </Paper>
        </>
    )
}