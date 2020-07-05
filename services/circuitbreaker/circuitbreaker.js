const express = require('express');
const router = express.Router();
const axios = require('axios')

router.get('/:id', breaker2);

//http://Localhost:3ßßß/books/<id> zb id=3  schützen <<< clients dürfen nicht mehr auf diese url zugraufen
// sondern auf GET http://localhost:3000/circuitbreaker/<id>

//globale variable für zähler
let requestCount = 0

async function breaker(req, res) {
    requestCount++
    if (requestCount>3){
        res.status(429)
        res.end(); //heißt: es kommen keine Daten mehr  - sonst wartet empfänger zB Browser ewig...
    }
    else {
        let response
        try{ //wenn status nicht 200: axios wirft exception (zB wenn id nicht vorhanden) - exception abfangen mit try-catch
            response = await axios.get('http://Localhost:3000/books/' + req.params.id) //req.paramx.id: aus request-url /:id
            //in reality müssten wir circuitbreaker unter url ../books/ machen, dann würden alle clients auf den breaker zugreifen.
            //der einfachheit halber setzen wir aber clients auf url /circuitbreaker/..

        }catch (exception) {
            console.log("Books-Fehler: "+exception.toString())
            response = exception.response //original  response vom books service ist da (Book not available)
        }
        res.status(response.status)
        await res.json(response.data)
    }
}
async function breaker2(req, res) {
    requestCount++
    if (requestCount>3){
        res.status(429)
        res.end(); //heißt: es kommen keine Daten mehr  - sonst wartet empfänger zB Browser ewig...
    }
    else {
        const axiosOptions = { validateStatus: null} //macht, dass axios jetzt jeden Status akzeptiert und die response nimmt)

       //wenn status nicht 200: axios wirft exception (zB wenn id nicht vorhanden) - exception abfangen mit try-catch
            const response = await axios.get('http://Localhost:3000/books/' + req.params.id, axiosOptions) //axiosOptions mitgegeben

       res.status(response.status)
        await res.json(response.data)
    }
}

//setzt alle 10s requestCount auf 0:
function resetCount(){
    requestCount = 0;
    setTimeout(resetCount, 10000) //10000ms = 10s
}
resetCount()


module.exports = router;
