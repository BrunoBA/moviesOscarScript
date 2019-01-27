const download = require('download-file');
const Jimp = require('jimp');
const fs = require('fs');

const indicatedFolder = './indicated/';
const indicatedResizedFolder = './resized/';

var urls = [{
    "path": "https://m.media-amazon.com/images/M/MV5BNmE5ZmE3OGItNTdlNC00YmMxLWEzNjctYzAwOGQ5ODg0OTI0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    "imageName": "a_star_is_born"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMjUyOTE1NjI0OF5BMl5BanBnXkFtZTgwMTM4ODQ5NTM@._V1_.jpg",
    "imageName": "blackkklansman"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_.jpg",
    "imageName": "black_panther"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BNDg2NjIxMDUyNF5BMl5BanBnXkFtZTgwMzEzNTE1NTM@._V1_.jpg",
    "imageName": "bohemian_rhapsody"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMjMyNzExNzQ5OV5BMl5BanBnXkFtZTgwNjM2MjIxNjM@._V1_.jpg",
    "imageName": "green_book"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTU0OTc3ODk4Ml5BMl5BanBnXkFtZTgwMzM4NzI5NjM@._V1_.jpg",
    "imageName": "roma"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTg1NzQwMDQxNV5BMl5BanBnXkFtZTgwNDg2NDYyNjM@._V1_.jpg",
    "imageName": "the_favourite"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTY1NjM0MzgxMV5BMl5BanBnXkFtZTgwNDc4NTY0NjM@._V1_.jpg",
    "imageName": "vice"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTcyNjU2MTYyM15BMl5BanBnXkFtZTgwMjY5MDY4NDE@._V1_.jpg",
    "imageName": "at_eternitys_gate"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTEwNDk5MTU2NTNeQTJeQWpwZ15BbWU3MDczNjEzMTM@._V1_.jpg",
    "imageName": "the_wife"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTg5NjA3ODkyMl5BMl5BanBnXkFtZTgwNTU4Mzg5NjE@._V1_.jpg",
    "imageName": "can_you_ever_forgive_me"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTc4MTU4MDc5NF5BMl5BanBnXkFtZTcwNDk5NTE2MQ@@._V1_.jpg",
    "imageName": "if_beale_street_could_talk"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BZmQ2ZDNkMGYtOWUzNi00N2Q3LTk1MDItODFlNDJkMTZkMjFmXkEyXkFqcGdeQXVyMjMxNzg4Mjk@._V1_.jpg",
    "imageName": "adam_mckay"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMjA0ODY4OTk4Nl5BMl5BanBnXkFtZTcwNTkxMzYyMg@@._V1_.jpg",
    "imageName": "alfonso_cuaron"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTU5OTQ1NDEzNV5BMl5BanBnXkFtZTgwMDk1OTk4MDE@._V1_.jpg",
    "imageName": "pawel_pawlikowski"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTgyMTEyNDgxOF5BMl5BanBnXkFtZTcwNTkzMTA3Nw@@._V1_.jpg",
    "imageName": "spike_lee"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMjA3NzAwNjMxN15BMl5BanBnXkFtZTcwMDkyMDQ1NA@@._V1_.jpg",
    "imageName": "yorgos_lanthimos"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BZDI1MGIyZDMtYjAyMy00ZWE1LTgzYjctYzM5MzczNjFjZWQwXkEyXkFqcGdeQXVyODQyNzE3MDg@._V1_.jpg",
    "imageName": "first_reformed"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BYjRkYTI3M2EtZWQ4Ny00OTA2LWFmMTMtY2E4MTEyZmNjOTMxXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_.jpg",
    "imageName": "the_ballad_of_buster_scruggs"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BNTJmNzExOGItZTQyMi00YzBlLTk0ZTQtNzAxYmUwZDQwZjU4XkEyXkFqcGdeQXVyODE1MjMyNzI@._V1_.jpg",
    "imageName": "cold_war"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMzQ5MTI3MDc5MF5BMl5BanBnXkFtZTgwNTY2NjQ3NjM@._V1_.jpg",
    "imageName": "nunca_deixes_de_olhar"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMDBhOTMxN2UtYjllYS00NWNiLWE1MzAtZjg3NmExODliMDQ0XkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_.jpg",
    "imageName": "first_man"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTk0NDIzMTA1MF5BMl5BanBnXkFtZTgwMzM0MTUzNjM@._V1_.jpg",
    "imageName": "mary_poppins_returns"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BNDVmOGI4MTMtYmNmNC00MTliLTlkYjQtYmU2N2EyNDk2YTAwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg",
    "imageName": "mary_queen_of_scots"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BZjhkNzVkYjAtMGMzMi00Y2JjLWFkMzgtNjQ3Mzk2YThhZWExXkEyXkFqcGdeQXVyNjc5Mjg0NjU@._V1_.jpg",
    "imageName": "border"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTYyOTUwNjAxM15BMl5BanBnXkFtZTgwODcyMzE0NDM@._V1_.jpg",
    "imageName": "isle_of_dogs"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BNTE4Nzc0NDU3Nl5BMl5BanBnXkFtZTgwODIzMTQzNTM@._V1_.jpg",
    "imageName": "rbg"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_.jpg",
    "imageName": "a_quiet_place"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_.jpg",
    "imageName": "avengers_infinity_war"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMjAzOTM2OTAyNF5BMl5BanBnXkFtZTgwNTg5ODg1NTM@._V1_.jpg",
    "imageName": "christopher_robin"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BY2JiYTNmZTctYTQ1OC00YjU4LWEwMjYtZjkwY2Y5MDI0OTU3XkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_.jpg",
    "imageName": "ready_player_one"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BOTM2NTI3NTc3Nl5BMl5BanBnXkFtZTgwNzM1OTQyNTM@._V1_.jpg",
    "imageName": "solo_a_star_wars_story"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMjMwYjcwNWQtNTQ5YS00MzVlLTkxYzMtNDIwZWIxZTE4Zjg2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    "imageName": "free_solo"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BNjY4ZWM5YTMtYTE3MC00MDVjLWI4ODUtZTc3NjYyZDVjNGJjXkEyXkFqcGdeQXVyMTg5MDEyNw@@._V1_.jpg",
    "imageName": "hale_county_this_morning_this_evening"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTA0MDk4MzMwOTBeQTJeQWpwZ15BbWU4MDE3MzYxOTUz._V1_.jpg",
    "imageName": "minding_the_gap"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BNWM5NjkwMzgtNTczYi00YzQ2LWFjYmQtYzYwZjcyYWFmMWZmXkEyXkFqcGdeQXVyMjI3NDAyNg@@._V1_.jpg",
    "imageName": "of_fathers_and_sons"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMThmZjZmZjctZmY3OS00MmY5LWI2ODYtNTAwMDg5YTk4MGNkXkEyXkFqcGdeQXVyOTgwNzIyOTU@._V1_.jpg",
    "imageName": "a_night_at_the_garden"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BM2RiY2I4NzYtNWE0OS00MmZlLThlOWQtNmY5NDFkY2YzYTYxXkEyXkFqcGdeQXVyMjIwOTQzNjU@._V1_.jpg",
    "imageName": "black_sheep"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMjZiYmMxZjctZjRhZi00ZGY1LTk4YzYtOTY3MTdhMTE2OTU4XkEyXkFqcGdeQXVyNTAyMjE2Njc@._V1_.jpg",
    "imageName": "end_game"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BYWE2MGU3MmUtYTM1ZS00NTg4LWIwNjctNGQ3MTFkZWExY2VkXkEyXkFqcGdeQXVyNzMxMTE1NA@@._V1_.jpg",
    "imageName": "lifeboat"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BNzZhNDlkYjUtNzRlMy00ZmYxLWE0ZWYtODVkYTFkZDU3NmUxXkEyXkFqcGdeQXVyNzY0MTMwMDk@._V1_.jpg",
    "imageName": "period_end_of_sentence"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTEzNzY0OTg0NTdeQTJeQWpwZ15BbWU4MDU3OTg3MjUz._V1_.jpg",
    "imageName": "incredibles_2"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BZDhkMmJhZWQtNTA5Ny00NDYxLTg3NDctNzE2ZThmOGFjYmE3XkEyXkFqcGdeQXVyNDQxNjcxNQ@@._V1_.jpg",
    "imageName": "mirai"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTYyNzEyNDAzOV5BMl5BanBnXkFtZTgwNTk3NDczNjM@._V1_.jpg",
    "imageName": "ralph_breaks_the_internet"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_.jpg",
    "imageName": "spider_man_into_the_spider_verse"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMjI2NTBkOTQtZTNlNy00MzcxLTk5Y2MtZDgyZWEyYmMwMDY1XkEyXkFqcGdeQXVyMjk1NzAxNg@@._V1_.jpg",
    "imageName": "animal_behaviour"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BY2FjOGUyNDUtYmQ0Ni00ODNiLThhMzQtYzE3NmI4NzFjNjczXkEyXkFqcGdeQXVyMzYxOTQ3MDg@._V1_.jpg",
    "imageName": "bao"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BOTM3ZmU3YWItZjk0Ny00NDkwLTliOTQtN2M5Y2U1MWQyOWI4XkEyXkFqcGdeQXVyNzYzODI2NDM@._V1_.jpg",
    "imageName": "late_afternoon"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BYjgyOTM2NzYtODM2MS00ZTYzLWI2NmUtNWQ3NzdlOGUzY2I2XkEyXkFqcGdeQXVyMjI1MzcwMTM@._V1_.jpg",
    "imageName": "one_small_step"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BY2FlNmNjMmMtYWRkMi00NzU4LThhMDAtMmFiZjJkNGRlYmQ5XkEyXkFqcGdeQXVyMTc3NjUzNzU@._V1_.jpg",
    "imageName": "weekends"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BZWI1OTgxYjUtYWI4NC00NGM5LWE1MDctZTU4YzdkMzdjZWNjXkEyXkFqcGdeQXVyNjIyNjQyMzU@._V1_.jpg",
    "imageName": "detainment"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMGYwYmEzZjAtMjg1ZC00ZDg4LWJhZWUtMjRiYTk2ODU1YmM4XkEyXkFqcGdeQXVyMTEzNzI5MzU@._V1_.jpg",
    "imageName": "fauve"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BOGE3OGM4OWEtYjc3OS00OTNjLTlkY2YtY2M4Yjc0NDY1MDFiXkEyXkFqcGdeQXVyNTA3MDI3MA@@._V1_.jpg",
    "imageName": "marguerite"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BYTgyOTc1YjMtMTEwNC00OWU2LWI3ODMtYzIwMzA5N2VmYjQ0XkEyXkFqcGdeQXVyNzM2ODI1NjY@._V1_.jpg",
    "imageName": "mother"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BNTU5MzEyZTMtMzQ0Zi00MDZkLWI0OTYtMGU0MjhjZjQ4NjJjXkEyXkFqcGdeQXVyNDQ5MjYzNzE@._V1_.jpg",
    "imageName": "skin"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BZTI4NTE3ODMtYzBhNi00NmE2LWJjY2QtNTUwY2EzYTAzOWUzXkEyXkFqcGdeQXVyODcyODY1Mzg@._V1_.jpg",
    "imageName": "cafarnaum"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BYWZmOTY0MDAtMGRlMS00YjFlLWFkZTUtYmJhYWNlN2JjMmZkXkEyXkFqcGdeQXVyODAzODU1NDQ@._V1_.jpg",
    "imageName": "shoplifters"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMjM0OTIyMzY1M15BMl5BanBnXkFtZTgwMTg0OTE0NzE@._V1_.jpg",
    "imageName": "bradley_cooper"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTkxMzk4MjQ4MF5BMl5BanBnXkFtZTcwMzExODQxOA@@._V1_.jpg",
    "imageName": "christian_bale"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BODEwMjkzNDIzOV5BMl5BanBnXkFtZTgwOTQ4NTU0NzE@._V1_.jpg",
    "imageName": "rami_malek"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BNDQzOTg4NzA2Nl5BMl5BanBnXkFtZTcwMzkwNjkxMg@@._V1_.jpg",
    "imageName": "viggo_mortensen"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTcyNjU2MTYyM15BMl5BanBnXkFtZTgwMjY5MDY4NDE@._V1_.jpg",
    "imageName": "willem_dafoe"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTEwNDk5MTU2NTNeQTJeQWpwZ15BbWU3MDczNjEzMTM@._V1_.jpg",
    "imageName": "glenn_close"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTg1NjQwMzU4MF5BMl5BanBnXkFtZTgwNTk5NjQ4NjE@._V1_.jpg",
    "imageName": "lady_gaga"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTg5NjA3ODkyMl5BMl5BanBnXkFtZTgwNTU4Mzg5NjE@._V1_.jpg",
    "imageName": "melissa_mccarthy"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTk0MDMxOTgzM15BMl5BanBnXkFtZTcwNzAwMDQ0NA@@._V1_.jpg",
    "imageName": "olivia_colman"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMjA2NDY2MTg0N15BMl5BanBnXkFtZTgwNzA5ODkyNjM@._V1_.jpg",
    "imageName": "yalitza_aparicio"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BOWViYjUzOWMtMzRkZi00MjNkLTk4M2ItMTVkMDg5MzE2ZDYyXkEyXkFqcGdeQXVyODQwNjM3NDA@._V1_.jpg",
    "imageName": "adam_driver"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BNDg4OTczODE5Nl5BMl5BanBnXkFtZTcwMjgwMjA0Mg@@._V1_.jpg",
    "imageName": "mahershala_ali"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTc2NzA1NDk1Ml5BMl5BanBnXkFtZTgwMjk2NTA0NjM@._V1_.jpg",
    "imageName": "richard_e_grant"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTU0NTk4NDgzMl5BMl5BanBnXkFtZTYwNjU5Nzc1._V1_.jpg",
    "imageName": "sam_elliott"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTc2NTM3MzE5NF5BMl5BanBnXkFtZTcwMjg4NDMwNA@@._V1_.jpg",
    "imageName": "sam_rockwell"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTg2NTk2MTgxMV5BMl5BanBnXkFtZTgwNjcxMjAzMTI@._V1_.jpg",
    "imageName": "amy_adams"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMjI4NjM1NDkyN15BMl5BanBnXkFtZTgwODgyNTY1MjE@._V1..jpg",
    "imageName": "emma_stone"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BZTRmY2I4NzUtZTU0NS00ZjlmLThkYTMtOTk2YjE2MjA5MzQyXkEyXkFqcGdeQXVyMjA0MDAwNDY@._V1_.jpg",
    "imageName": "marina_de_tavira"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTQ4MzM1MDAwMV5BMl5BanBnXkFtZTcwNTU4NzQwMw@@._V1_.jpg",
    "imageName": "rachel_weisz"
}, {
    "path": "https://m.media-amazon.com/images/M/MV5BMTc4MTU4MDc5NF5BMl5BanBnXkFtZTcwNDk5NTE2MQ@@._V1_.jpg",
    "imageName": "regina_king"
}];


let seedDataPictures = [];

// urls.map((movie, index) => {
//     let i = index + 1;
    
//     var options = {
//         directory: indicatedFolder,
//         filename: `${movie.imageName}.jpg`
//     };

//     download(movie.path, options, function(err){
//         if (err) throw err
//         console.log(`${i}) - ${movie.imageName}`)
//     });
// });


fs.readdir(indicatedFolder, (err, files) => {
    files.forEach(file => {
        compressImg(file, indicatedFolder, indicatedResizedFolder);
    });
})
function compressImg (fileName, path, output) {

    Jimp.read(`${path}${fileName}`)
        .then(img => {
            return img
                .resize(182, 268) // resize
                .quality(80) // set JPEG quality
                .write(`${output}${fileName}`); // save
        })
        .catch(err => {
            console.error(err);
        });

    // Jimp.read(`${path}${fileName}`, (err, img) => {
    //     if (err) {
    //         console.log(err);
    //         throw err;
    //     }
    //     img.resize(182, 268).quality(80).write(`${output}${fileName}`); // save
    // });
}