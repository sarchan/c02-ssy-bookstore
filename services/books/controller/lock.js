let locked = false;

function lock(req,res){
    if (locked==false) {
        locked = true;
        res.json("success");
    }
    //wenn schon gelockt
     else {
        res.json("failed");
    }
}

function unlock(req,res) {
    locked = false;
    res.json("success");
}

module.exports = {
    lock: lock,   //attribut lock enthält lock-funktion
    unlock: unlock
}