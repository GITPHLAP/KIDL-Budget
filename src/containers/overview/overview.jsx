import { CircularProgress, Typography } from "@mui/material";
import { useGetHealthQuery } from "../../redux/api/apiSlice";

export default function Overview() {
    const { data: post, isFetching, isSuccess } = useGetHealthQuery()
    return (
        <>
        {isFetching ?
            <CircularProgress /> 
            : isSuccess ? <Typography> Overview</Typography> : <Typography> ERROR</Typography>
        }
        
        </>
    )
}