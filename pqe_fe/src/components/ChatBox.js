import  Paper  from "@mui/material/Paper";
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"

export default function ChatBox({dataobj}) {
    const result = <Paper elevation={1} sx={{'backgroundColor':'aquamarine'}}><Typography component="h6">1. Result : {dataobj.result}</Typography></Paper>
    const pandasCode = <Paper elevation={1} sx={{'backgroundColor':'lightgreen','marginBottom':'10px'}}><Typography component="h6">2. Code : {dataobj.pandas_code}</Typography></Paper>
    let image = null

    if (dataobj.img) {
        image = <img style={{'height':'85vh','width':'80%'}} src={`data:image/png;base64,${dataobj.img}`}></img>
    }


    return (
        <Paper sx={{'border':'2px solid blue', 'width':'100%', 'height':'100vh'}} elevation={20}>
            <Grid container>
                <Grid xs={12} item>
                    {result}
                </Grid>
                <Grid xs={12} item>
                    {pandasCode}
                </Grid>
                <Grid xs={12} item>
                    {image}
                </Grid>
            </Grid>
        </Paper>
    )
}