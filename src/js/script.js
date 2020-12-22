document.addEventListener("DOMContentLoaded", function () {

    // function clickMenu() {
    //     if (document.querySelector("ul.menu li").style.display === "none") {
    //         document.querySelectorAll("ul.menu li").forEach(e => e.stgulpyle.display = "block");
    //     } else {
    //         document.querySelectorAll("ul.menu li").forEach(e => e.style.display = "none");
    //     }
    // }

//     document.getElementById("menu-btn").addEventListener("click", clickMenu);
//
//
// });


    let connexion = new MovieDB();

    if (document.location.pathname.search("fiche-film.html") > 0) {
        let params = (new URL(document.location)).searchParams;
        console.log(params);
        connexion.requeteInfoFilm(params.get("id"));
        connexion.requeteActeurFilm(params.get("id"));
    } else {
        connexion.requeteDernierFilm();
        connexion.requetePopulaireFilm();

    }


})

class MovieDB {


    constructor() {


        console.log("new MovieDB()")
        this.apiKey = "3418a36518683e1a660e0dde457399ec";
        this.lang = "fr-CA";
        this.baseUrl = "https://api.themoviedb.org/3/";
        this.imgPath = "https://image.tmdb.org/t/p/";
        this.largeurAffiche = ["92", "154", "185", "342", "500", "780"]
        this.nbFilm = 6;
        this.nbPopulaire = 9;


    }

    requeteDernierFilm() {
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourDernierFilm.bind(this));
        requete.open('GET', this.baseUrl + 'movie/top_rated?api_key=' + this.apiKey + '&language=' + this.lang + '&page=1')
        requete.send();
    }

    retourDernierFilm(event) {

        console.log('retourDernierFilm');
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).results;
        this.afficherDernierFilm(data);
    }

    afficherDernierFilm(data) {
        console.log('afficherDernierFilm');
        let section = document.querySelector('.mieux_note');
        console.log(section);
        for (let i = 0; i < this.nbFilm; i++) {

            let article = document.querySelector('.template .film').cloneNode(true);
            article.querySelector('h2').innerHTML = data[i].title;
            //
            // if (data[i].overview != "") {
            //     article.querySelector('.description').innerHTML = data[i].overview;
            // } else {
            //     article.querySelector('.description').innerHTML = "Aucune description disponible";
            // }
            // article.querySelector('.description').innerHTML = data[i].overview || "Aucne description disponible";
            article.querySelector(".anneedesortie").innerHTML = "Sortie le " + data[i].release_date;
            article.querySelector(".note").innerHTML = "Ce film est noté " + data[i].vote_average + " /10.";
            article.querySelector("a").href += "fiche-film.html?id=" + data[i].id;
            // article.querySelector('.cote').innerHTML = data[i].cote;
            let image = article.querySelector('img');
            image.src = this.imgPath + "w300" + data[i].poster_path;
            console.log(article)
            section.appendChild(article)

        }

    }


    requeteInfoFilm(movieId) {
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourInfoFilm.bind(this));
        requete.open('GET', this.baseUrl + 'movie/' + movieId + '?api_key=' + this.apiKey + '&language=' + this.lang + '&page=1')
        requete.send();
    }

    retourInfoFilm(event) {


        let target = event.currentTarget;
        console.log(target.responseText);
        let data = JSON.parse(target.responseText);
        this.afficherInfoFilm(data);
    }

    afficherInfoFilm(data) {
        var uneImage = document.querySelector(".fiche-film>img");

        document.querySelector("h2").innerHTML = data.title;
        document.querySelector(".description").innerHTML = data.overview;
        if (data.overview == "") {
            document.querySelector(".description").innerHTML = "Aucne description disponible.";
        } else {
            document.querySelector(".description").innerHTML = data.overview;
        }
        document.querySelector(".datedesortie").innerHTML = "Ce film est sorti le " + data.release_date;
        document.querySelector(".vote").innerHTML = "Ce film est noté " + data.vote_average + " /10.";

        document.querySelector(".language-original").innerHTML = "La langue original de ce film est " + "{" + data.original_language + "}.";
        document.querySelector(".duree").innerHTML = "La durée du film est de " + data.runtime + " minutes.";
        document.querySelector(".budget").innerHTML = "Le budget du film est de " + data.budget + "$.";
        document.querySelector(".revenu").innerHTML = "Les revenus du film sont de " + data.revenue + "$.";


        uneImage.setAttribute("src", this.imgPath + "w" + this.largeurAffiche[3] + data.backdrop_path);
        this.requeteActeurFilm(data.id);


    }


    requetePopulaireFilm() {
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourPopulaireFilm.bind(this));
        requete.open('GET', this.baseUrl + 'movie/popular?api_key=' + this.apiKey + '&language=' + this.lang + '&page=1')
        requete.send();
    }

    retourPopulaireFilm(event) {

        console.log('retourDernierFilm');
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).results;
        this.afficherPopulaireFilm(data);
    }

    afficherPopulaireFilm(data) {
        console.log('afficherDernierFilm');
        let section = document.querySelector('.swiper-wrapper');
        console.log(section);
        for (let i = 0; i < this.nbPopulaire; i++) {

            let article = document.querySelector('.template .swiper-slide').cloneNode(true);
            article.querySelector('h3').innerHTML = data[i].title;

            // if (data[i].overview != "") {
            //     article.querySelector('.description').innerHTML = data[i].overview;
            // } else {
            //     article.querySelector('.description').innerHTML = "Aucune description disponible";
            // }
            // article.querySelector('.description').innerHTML = data[i].overview || "Aucne description disponible";
             article.querySelector("a").href += "fiche-film.html?id=" + data[i].id;
            article.querySelector('.cote').innerHTML = "Ce film est noté " + data[i].vote_average + " /10.";
            let image = article.querySelector('img');
            image.src = this.imgPath + "w300" + data[i].poster_path;
            console.log(article)
            section.appendChild(article)

        }
        var swiper = new Swiper('.swiper-container', {
            spaceBetween: 30,
            loop: true,
            breakpoints: {
                // when window width is <= 376px
                376: {
                    slidesPerView: 1,
                    spaceBetweenSlides: 30
                },
                // when window width is <= 769px
                769: {
                    slidesPerView: 3,
                    spaceBetweenSlides: 40
                },
                1440: {
                    slidesPerView: 5,
                    spaceBetweenSlides: 40
                }
            },

            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }


    requeteActeurFilm(movieId) {
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourActeurFilm.bind(this));
        requete.open('GET', this.baseUrl + 'movie/' + movieId + '/credits?api_key=' + this.apiKey + '&language=' + this.lang)
        requete.send();
    }

    retourActeurFilm(event) {


        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).cast;
        this.afficherActeurFilm(data);
    }

    afficherActeurFilm(data) {
        console.log('afficherActeurFilm');

        for (let i = 0; i < data.length; i++) {

            let article = document.querySelector('.template>.swiper-slide').cloneNode(true);
            article.querySelector('h4').innerHTML = data[i].title;

            // if (data[i].overview != "") {
            //     article.querySelector('.description').innerHTML = data[i].overview;
            // } else {
            //     article.querySelector('.description').innerHTML = "Aucune description disponible";
            // }
            // article.querySelector('.description').innerHTML = data[i].overview || "Aucne description disponible";
            // article.querySelector("a").href += "fiche-film.html?id=" + data[i].id;
            article.querySelector('.acteur').innerHTML = data[i].name;
            let image = article.querySelector('img');
            image.src = this.imgPath + "w342" + data[i].profile_path;
            document.querySelector(".swiper-wrapper").appendChild(article);
        }
        var swiper = new Swiper('.swiper-container', {
            spaceBetween: 30,
            loop: true,
            breakpoints: {
                // when window width is <= 376px
                376: {
                    slidesPerView: 1,
                    spaceBetweenSlides: 30
                },
                // when window width is <= 769px
                769: {
                    slidesPerView: 3,
                    spaceBetweenSlides: 40
                },
                1440: {
                    slidesPerView: 5,
                    spaceBetweenSlides: 40
                }
            },

            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }


}

