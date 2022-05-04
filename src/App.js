import React, { useState, useEffect } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { styled } from "@mui/system";

const SingleCard = styled('div')(({theme})=>({
  display: 'flex', flexDirection: 'column', width: '300px', height: 500, margin: '10px 5px',
  borderRadius: '25px', background: '#474747', boxShadow: `6px 6px 15px #2d2d2d, -6px -6px 15px #616161`, color: '#fff', '&:hover': {
    borderRadius: '18px', background: `#ddd`, boxShadow:  `10px 10px 20px #808080, -10px -10px 20px #ffffff`, transition:'0.9s',color:'#010101'
  },
}))

function App() {

  const [API , setAPI ] = useState('https://yts.torrentbay.to/api/v2/list_movies.json?sorty_by=rating')


  const [movieList, setmovieList] = useState([])


  const getMovieData = () => {
    console.log(API);
    axios.get(API).then(res => {
      setmovieList(res.data.data.movies)
    })

    console.log(movieList);
  }

  useEffect(() => {
    getMovieData()
  }, [API])

  return (

    <>


    <AppBar position="sticky">
      <Toolbar>
          <Typography variant="h4" sx={{flex:1}}>  MovieZilla </Typography>

          <Typography variant="h5" sx={{margin:'5px 10px'}}>  SortBy :  </Typography>

          <Button variant="contained" sx={{margin:'5px 10px' , backgroundColor:'#393E46'}} onClick={()=>{
            setAPI('https://yts.torrentbay.to/api/v2/list_movies.json?sorty_by=like_count')
            alert(API)
            getMovieData()

          }} >  Rating </Button>

          <Button variant="contained" sx={{margin:'5px 10px' , backgroundColor:'#393E46'}} onClick={()=>{
            setAPI('https://yts.torrentbay.to/api/v2/list_movies.json?sorty_by=title')
            getMovieData()
            alert(API)
          }} >  Title </Button>
      </Toolbar>
    </AppBar>

      <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>

        {
          movieList.map((obj, i) => (
            <SingleCard key={i} >

              <img src={obj?.background_image_original} alt='loading' style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: '18px', background: '#474747', boxShadow: `inset 11px 11px 16px #323232, inset -11px -11px 16px #5c5c5c`, }} />



              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 15px' }}>
                <Typography variant='h6'>
                  {obj.title}
                </Typography>

                <Typography variant="subtitle1" sx={{borderRadius: '150px', background: '#c21414', boxShadow:  `13px 13px 27px #740c0c, -13px -13px 27px #ff1c1c`, padding:'5px' , height:'30px' , width:'30px', textAlign:'center'}}>
                  {obj.rating}
                </Typography>
              </div>

              <Typography sx={{ textAlign: 'justify', padding: '5px', height: 70, overflow: 'hidden', }} variant="body1" > {obj.summary} </Typography>


              <div style={{display:'flex' , justifyContent:'space-evenly' , marginTop:'20px'}}>
                <Typography variant="subtitle1">
                  Upload Date
                </Typography>

                <Typography variant='subtitle2' >
                  2022-05-03
                </Typography>
              </div>

            </SingleCard>
          ))
        }

      </div>

    </>

  );
}

export default App;
