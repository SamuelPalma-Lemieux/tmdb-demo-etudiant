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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8vIGZ1bmN0aW9uIGNsaWNrTWVudSgpIHtcclxuICAgIC8vICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInVsLm1lbnUgbGlcIikuc3R5bGUuZGlzcGxheSA9PT0gXCJub25lXCIpIHtcclxuICAgIC8vICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInVsLm1lbnUgbGlcIikuZm9yRWFjaChlID0+IGUuc3RndWxweWxlLmRpc3BsYXkgPSBcImJsb2NrXCIpO1xyXG4gICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ1bC5tZW51IGxpXCIpLmZvckVhY2goZSA9PiBlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIik7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuLy8gICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVudS1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrTWVudSk7XHJcbi8vXHJcbi8vXHJcbi8vIH0pO1xyXG5cclxuXHJcbiAgICBsZXQgY29ubmV4aW9uID0gbmV3IE1vdmllREIoKTtcclxuXHJcbiAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuc2VhcmNoKFwiZmljaGUtZmlsbS5odG1sXCIpID4gMCkge1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSAobmV3IFVSTChkb2N1bWVudC5sb2NhdGlvbikpLnNlYXJjaFBhcmFtcztcclxuICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xyXG4gICAgICAgIGNvbm5leGlvbi5yZXF1ZXRlSW5mb0ZpbG0ocGFyYW1zLmdldChcImlkXCIpKTtcclxuICAgICAgICBjb25uZXhpb24ucmVxdWV0ZUFjdGV1ckZpbG0ocGFyYW1zLmdldChcImlkXCIpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVEZXJuaWVyRmlsbSgpO1xyXG4gICAgICAgIGNvbm5leGlvbi5yZXF1ZXRlUG9wdWxhaXJlRmlsbSgpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG59KVxyXG5cclxuY2xhc3MgTW92aWVEQiB7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJuZXcgTW92aWVEQigpXCIpXHJcbiAgICAgICAgdGhpcy5hcGlLZXkgPSBcIjM0MThhMzY1MTg2ODNlMWE2NjBlMGRkZTQ1NzM5OWVjXCI7XHJcbiAgICAgICAgdGhpcy5sYW5nID0gXCJmci1DQVwiO1xyXG4gICAgICAgIHRoaXMuYmFzZVVybCA9IFwiaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9cIjtcclxuICAgICAgICB0aGlzLmltZ1BhdGggPSBcImh0dHBzOi8vaW1hZ2UudG1kYi5vcmcvdC9wL1wiO1xyXG4gICAgICAgIHRoaXMubGFyZ2V1ckFmZmljaGUgPSBbXCI5MlwiLCBcIjE1NFwiLCBcIjE4NVwiLCBcIjM0MlwiLCBcIjUwMFwiLCBcIjc4MFwiXVxyXG4gICAgICAgIHRoaXMubmJGaWxtID0gNjtcclxuICAgICAgICB0aGlzLm5iUG9wdWxhaXJlID0gOTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVldGVEZXJuaWVyRmlsbSgpIHtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJEZXJuaWVyRmlsbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXF1ZXRlLm9wZW4oJ0dFVCcsIHRoaXMuYmFzZVVybCArICdtb3ZpZS90b3BfcmF0ZWQ/YXBpX2tleT0nICsgdGhpcy5hcGlLZXkgKyAnJmxhbmd1YWdlPScgKyB0aGlzLmxhbmcgKyAnJnBhZ2U9MScpXHJcbiAgICAgICAgcmVxdWV0ZS5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0b3VyRGVybmllckZpbG0oZXZlbnQpIHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JldG91ckRlcm5pZXJGaWxtJyk7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpLnJlc3VsdHM7XHJcbiAgICAgICAgdGhpcy5hZmZpY2hlckRlcm5pZXJGaWxtKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGFmZmljaGVyRGVybmllckZpbG0oZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhZmZpY2hlckRlcm5pZXJGaWxtJyk7XHJcbiAgICAgICAgbGV0IHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWlldXhfbm90ZScpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHNlY3Rpb24pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5uYkZpbG07IGkrKykge1xyXG5cclxuICAgICAgICAgICAgbGV0IGFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcGxhdGUgLmZpbG0nKS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignaDInKS5pbm5lckhUTUwgPSBkYXRhW2ldLnRpdGxlO1xyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAvLyBpZiAoZGF0YVtpXS5vdmVydmlldyAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5kZXNjcmlwdGlvbicpLmlubmVySFRNTCA9IGRhdGFbaV0ub3ZlcnZpZXc7XHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5kZXNjcmlwdGlvbicpLmlubmVySFRNTCA9IFwiQXVjdW5lIGRlc2NyaXB0aW9uIGRpc3BvbmlibGVcIjtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5kZXNjcmlwdGlvbicpLmlubmVySFRNTCA9IGRhdGFbaV0ub3ZlcnZpZXcgfHwgXCJBdWNuZSBkZXNjcmlwdGlvbiBkaXNwb25pYmxlXCI7XHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcihcIi5hbm5lZWRlc29ydGllXCIpLmlubmVySFRNTCA9IFwiU29ydGllIGxlIFwiICsgZGF0YVtpXS5yZWxlYXNlX2RhdGU7XHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcihcIi5ub3RlXCIpLmlubmVySFRNTCA9IFwiQ2UgZmlsbSBlc3Qgbm90w6kgXCIgKyBkYXRhW2ldLnZvdGVfYXZlcmFnZSArIFwiIC8xMC5cIjtcclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiYVwiKS5ocmVmICs9IFwiZmljaGUtZmlsbS5odG1sP2lkPVwiICsgZGF0YVtpXS5pZDtcclxuICAgICAgICAgICAgLy8gYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCcuY290ZScpLmlubmVySFRNTCA9IGRhdGFbaV0uY290ZTtcclxuICAgICAgICAgICAgbGV0IGltYWdlID0gYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcclxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5pbWdQYXRoICsgXCJ3MzAwXCIgKyBkYXRhW2ldLnBvc3Rlcl9wYXRoO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcnRpY2xlKVxyXG4gICAgICAgICAgICBzZWN0aW9uLmFwcGVuZENoaWxkKGFydGljbGUpXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlcXVldGVJbmZvRmlsbShtb3ZpZUlkKSB7XHJcbiAgICAgICAgbGV0IHJlcXVldGUgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VySW5mb0ZpbG0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgcmVxdWV0ZS5vcGVuKCdHRVQnLCB0aGlzLmJhc2VVcmwgKyAnbW92aWUvJyArIG1vdmllSWQgKyAnP2FwaV9rZXk9JyArIHRoaXMuYXBpS2V5ICsgJyZsYW5ndWFnZT0nICsgdGhpcy5sYW5nICsgJyZwYWdlPTEnKVxyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldG91ckluZm9GaWxtKGV2ZW50KSB7XHJcblxyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICBjb25zb2xlLmxvZyh0YXJnZXQucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgdGhpcy5hZmZpY2hlckluZm9GaWxtKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGFmZmljaGVySW5mb0ZpbG0oZGF0YSkge1xyXG4gICAgICAgIHZhciB1bmVJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmljaGUtZmlsbT5pbWdcIik7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoMlwiKS5pbm5lckhUTUwgPSBkYXRhLnRpdGxlO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzY3JpcHRpb25cIikuaW5uZXJIVE1MID0gZGF0YS5vdmVydmlldztcclxuICAgICAgICBpZiAoZGF0YS5vdmVydmlldyA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzY3JpcHRpb25cIikuaW5uZXJIVE1MID0gXCJBdWNuZSBkZXNjcmlwdGlvbiBkaXNwb25pYmxlLlwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzY3JpcHRpb25cIikuaW5uZXJIVE1MID0gZGF0YS5vdmVydmlldztcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRlZGVzb3J0aWVcIikuaW5uZXJIVE1MID0gXCJDZSBmaWxtIGVzdCBzb3J0aSBsZSBcIiArIGRhdGEucmVsZWFzZV9kYXRlO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudm90ZVwiKS5pbm5lckhUTUwgPSBcIkNlIGZpbG0gZXN0IG5vdMOpIFwiICsgZGF0YS52b3RlX2F2ZXJhZ2UgKyBcIiAvMTAuXCI7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGFuZ3VhZ2Utb3JpZ2luYWxcIikuaW5uZXJIVE1MID0gXCJMYSBsYW5ndWUgb3JpZ2luYWwgZGUgY2UgZmlsbSBlc3QgXCIgKyBcIntcIiArIGRhdGEub3JpZ2luYWxfbGFuZ3VhZ2UgKyBcIn0uXCI7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kdXJlZVwiKS5pbm5lckhUTUwgPSBcIkxhIGR1csOpZSBkdSBmaWxtIGVzdCBkZSBcIiArIGRhdGEucnVudGltZSArIFwiIG1pbnV0ZXMuXCI7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idWRnZXRcIikuaW5uZXJIVE1MID0gXCJMZSBidWRnZXQgZHUgZmlsbSBlc3QgZGUgXCIgKyBkYXRhLmJ1ZGdldCArIFwiJC5cIjtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJldmVudVwiKS5pbm5lckhUTUwgPSBcIkxlcyByZXZlbnVzIGR1IGZpbG0gc29udCBkZSBcIiArIGRhdGEucmV2ZW51ZSArIFwiJC5cIjtcclxuXHJcblxyXG4gICAgICAgIHVuZUltYWdlLnNldEF0dHJpYnV0ZShcInNyY1wiLCB0aGlzLmltZ1BhdGggKyBcIndcIiArIHRoaXMubGFyZ2V1ckFmZmljaGVbM10gKyBkYXRhLmJhY2tkcm9wX3BhdGgpO1xyXG4gICAgICAgIHRoaXMucmVxdWV0ZUFjdGV1ckZpbG0oZGF0YS5pZCk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVxdWV0ZVBvcHVsYWlyZUZpbG0oKSB7XHJcbiAgICAgICAgbGV0IHJlcXVldGUgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VyUG9wdWxhaXJlRmlsbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXF1ZXRlLm9wZW4oJ0dFVCcsIHRoaXMuYmFzZVVybCArICdtb3ZpZS9wb3B1bGFyP2FwaV9rZXk9JyArIHRoaXMuYXBpS2V5ICsgJyZsYW5ndWFnZT0nICsgdGhpcy5sYW5nICsgJyZwYWdlPTEnKVxyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldG91clBvcHVsYWlyZUZpbG0oZXZlbnQpIHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JldG91ckRlcm5pZXJGaWxtJyk7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpLnJlc3VsdHM7XHJcbiAgICAgICAgdGhpcy5hZmZpY2hlclBvcHVsYWlyZUZpbG0oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZXJQb3B1bGFpcmVGaWxtKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnYWZmaWNoZXJEZXJuaWVyRmlsbScpO1xyXG4gICAgICAgIGxldCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN3aXBlci13cmFwcGVyJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2VjdGlvbik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5iUG9wdWxhaXJlOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBhcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXBsYXRlIC5zd2lwZXItc2xpZGUnKS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignaDMnKS5pbm5lckhUTUwgPSBkYXRhW2ldLnRpdGxlO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgKGRhdGFbaV0ub3ZlcnZpZXcgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAvLyAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCcuZGVzY3JpcHRpb24nKS5pbm5lckhUTUwgPSBkYXRhW2ldLm92ZXJ2aWV3O1xyXG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCcuZGVzY3JpcHRpb24nKS5pbm5lckhUTUwgPSBcIkF1Y3VuZSBkZXNjcmlwdGlvbiBkaXNwb25pYmxlXCI7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCcuZGVzY3JpcHRpb24nKS5pbm5lckhUTUwgPSBkYXRhW2ldLm92ZXJ2aWV3IHx8IFwiQXVjbmUgZGVzY3JpcHRpb24gZGlzcG9uaWJsZVwiO1xyXG4gICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiYVwiKS5ocmVmICs9IFwiZmljaGUtZmlsbS5odG1sP2lkPVwiICsgZGF0YVtpXS5pZDtcclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCcuY290ZScpLmlubmVySFRNTCA9IFwiQ2UgZmlsbSBlc3Qgbm90w6kgXCIgKyBkYXRhW2ldLnZvdGVfYXZlcmFnZSArIFwiIC8xMC5cIjtcclxuICAgICAgICAgICAgbGV0IGltYWdlID0gYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcclxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5pbWdQYXRoICsgXCJ3MzAwXCIgKyBkYXRhW2ldLnBvc3Rlcl9wYXRoO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcnRpY2xlKVxyXG4gICAgICAgICAgICBzZWN0aW9uLmFwcGVuZENoaWxkKGFydGljbGUpXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3dpcGVyID0gbmV3IFN3aXBlcignLnN3aXBlci1jb250YWluZXInLCB7XHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMzAsXHJcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAvLyB3aGVuIHdpbmRvdyB3aWR0aCBpcyA8PSAzNzZweFxyXG4gICAgICAgICAgICAgICAgMzc2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW5TbGlkZXM6IDMwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gd2hlbiB3aW5kb3cgd2lkdGggaXMgPD0gNzY5cHhcclxuICAgICAgICAgICAgICAgIDc2OToge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuU2xpZGVzOiA0MFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDE0NDA6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA1LFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlblNsaWRlczogNDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVxdWV0ZUFjdGV1ckZpbG0obW92aWVJZCkge1xyXG4gICAgICAgIGxldCByZXF1ZXRlID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWV0ZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCB0aGlzLnJldG91ckFjdGV1ckZpbG0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgcmVxdWV0ZS5vcGVuKCdHRVQnLCB0aGlzLmJhc2VVcmwgKyAnbW92aWUvJyArIG1vdmllSWQgKyAnL2NyZWRpdHM/YXBpX2tleT0nICsgdGhpcy5hcGlLZXkgKyAnJmxhbmd1YWdlPScgKyB0aGlzLmxhbmcpXHJcbiAgICAgICAgcmVxdWV0ZS5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0b3VyQWN0ZXVyRmlsbShldmVudCkge1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpLmNhc3Q7XHJcbiAgICAgICAgdGhpcy5hZmZpY2hlckFjdGV1ckZpbG0oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZXJBY3RldXJGaWxtKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnYWZmaWNoZXJBY3RldXJGaWxtJyk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgbGV0IGFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcGxhdGU+LnN3aXBlci1zbGlkZScpLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdoNCcpLmlubmVySFRNTCA9IGRhdGFbaV0udGl0bGU7XHJcblxyXG4gICAgICAgICAgICAvLyBpZiAoZGF0YVtpXS5vdmVydmlldyAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5kZXNjcmlwdGlvbicpLmlubmVySFRNTCA9IGRhdGFbaV0ub3ZlcnZpZXc7XHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5kZXNjcmlwdGlvbicpLmlubmVySFRNTCA9IFwiQXVjdW5lIGRlc2NyaXB0aW9uIGRpc3BvbmlibGVcIjtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5kZXNjcmlwdGlvbicpLmlubmVySFRNTCA9IGRhdGFbaV0ub3ZlcnZpZXcgfHwgXCJBdWNuZSBkZXNjcmlwdGlvbiBkaXNwb25pYmxlXCI7XHJcbiAgICAgICAgICAgIC8vIGFydGljbGUucXVlcnlTZWxlY3RvcihcImFcIikuaHJlZiArPSBcImZpY2hlLWZpbG0uaHRtbD9pZD1cIiArIGRhdGFbaV0uaWQ7XHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignLmFjdGV1cicpLmlubmVySFRNTCA9IGRhdGFbaV0ubmFtZTtcclxuICAgICAgICAgICAgbGV0IGltYWdlID0gYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcclxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5pbWdQYXRoICsgXCJ3MzQyXCIgKyBkYXRhW2ldLnByb2ZpbGVfcGF0aDtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zd2lwZXItd3JhcHBlclwiKS5hcHBlbmRDaGlsZChhcnRpY2xlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN3aXBlciA9IG5ldyBTd2lwZXIoJy5zd2lwZXItY29udGFpbmVyJywge1xyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDMwLFxyXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgLy8gd2hlbiB3aW5kb3cgd2lkdGggaXMgPD0gMzc2cHhcclxuICAgICAgICAgICAgICAgIDM3Njoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuU2xpZGVzOiAzMFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vIHdoZW4gd2luZG93IHdpZHRoIGlzIDw9IDc2OXB4XHJcbiAgICAgICAgICAgICAgICA3Njk6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlblNsaWRlczogNDBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxNDQwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNSxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW5TbGlkZXM6IDQwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogJy5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuIl0sImZpbGUiOiJzY3JpcHQuanMifQ==
