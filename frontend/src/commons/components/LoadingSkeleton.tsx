import { Skeleton } from "@mui/material";

export default function LoadingRender () {
  return (
    <div>
      <Skeleton variant="rectangular" height={200} width="100%" sx={{mb: 6}}/>
      <div style={{display: "flex"}}>
        <Skeleton variant="rectangular" height={180} width={180} sx={{mr: 5}}/>
        <Skeleton variant="rectangular" height={180} width={180} sx={{mr: 5}}/>
        <Skeleton variant="rectangular" height={180} width={180} sx={{mr: 5}}/>
        <Skeleton variant="rectangular" height={180} width={180} sx={{mr: 5}}/>
      </div>
    </div>
  )
}
