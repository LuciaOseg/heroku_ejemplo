
const express = require('express')
const omdb = require('/Users/luciaoseguera/Desktop/miniserver/movies.js')

const app = express()

app.get('', function (req, res){
  res.send({
    greeting: 'Hola Mundo!'
  })
})

app.get('/omdb', function(req, res){
  if (!req.query.serch){
    res.send({error: 'Debes enviar un titulo de una pelicula o serie'
  })
  }
  omdb.omdbMovie(req.query.serch, function(error, response){
    if (error){
      return res.send({
        error : error
      })
    }
    if (response.seasons){
      var tittle = response.title
      omdb.omdbSeason(response.title, response.seasons, function(error, response){
        if (error){
          return res.send({
            error: error
          })
        }
        res.send({
          title: tittle,
          season: response.season,
          episodes: response.episodes
        })
      })
    } else {
      res.send(response)
    }
  })
})

app.get('*', function(req, res){
  res.send({
    error: 'Ruta no valida'
  })
})

app.listen(300, function(){
  console.log('Up and running!')
})
