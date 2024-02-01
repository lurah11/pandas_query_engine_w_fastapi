import TextField from '@mui/material/TextField';
import {useState} from 'react'

export default function ChatBar({keydown}){
    const [query,setQuery] = useState("")

    return (
        <>
        <TextField onKeyDown={keydown} sx={{width:"100%"}} label="Ask your dataframe here" variant="outlined" ></TextField>
        </>
    )
}
