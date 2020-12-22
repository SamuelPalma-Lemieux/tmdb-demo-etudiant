
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


        uneImage.setAttribute("src", this.imgPath + "w" + this.largeurAffiche[3] + data.poster_path);


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




    requeteActeurFilm() {
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourActeurFilm.bind(this));
        requete.open('GET', this.baseUrl + '/credits?api_key=' + this.apiKey + '&language=' + this.lang + '&page=1')
        requete.send();
    }

    retourActeurFilm(event) {


        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).results;
        this.afficherActeurFilm(data);
    }

    afficherActeurFilm(data) {
        console.log('afficherActeurFilm');
        let section = document.querySelector('.swiper-wrapper');
        console.log(section);
        for (let i = 0; i < data.length; i++) {

            let article = document.querySelector('.template>.swiper-slide').cloneNode(true);
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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyBmdW5jdGlvbiBjbGlja01lbnUoKSB7XHJcbiAgICAvLyAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bC5tZW51IGxpXCIpLnN0eWxlLmRpc3BsYXkgPT09IFwibm9uZVwiKSB7XHJcbiAgICAvLyAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ1bC5tZW51IGxpXCIpLmZvckVhY2goZSA9PiBlLnN0Z3VscHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiKTtcclxuICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidWwubWVudSBsaVwiKS5mb3JFYWNoKGUgPT4gZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbi8vICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbnUtYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja01lbnUpO1xyXG4vL1xyXG4vL1xyXG4vLyB9KTtcclxuXHJcblxyXG4gICAgbGV0IGNvbm5leGlvbiA9IG5ldyBNb3ZpZURCKCk7XHJcblxyXG4gICAgaWYgKGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLnNlYXJjaChcImZpY2hlLWZpbG0uaHRtbFwiKSA+IDApIHtcclxuICAgICAgICBsZXQgcGFyYW1zID0gKG5ldyBVUkwoZG9jdW1lbnQubG9jYXRpb24pKS5zZWFyY2hQYXJhbXM7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGFyYW1zKTtcclxuICAgICAgICBjb25uZXhpb24ucmVxdWV0ZUluZm9GaWxtKHBhcmFtcy5nZXQoXCJpZFwiKSk7XHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVBY3RldXJGaWxtKHBhcmFtcy5nZXQoXCJpZFwiKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbm5leGlvbi5yZXF1ZXRlRGVybmllckZpbG0oKTtcclxuICAgICAgICBjb25uZXhpb24ucmVxdWV0ZVBvcHVsYWlyZUZpbG0oKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxufSlcclxuXHJcbmNsYXNzIE1vdmllREIge1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibmV3IE1vdmllREIoKVwiKVxyXG4gICAgICAgIHRoaXMuYXBpS2V5ID0gXCIzNDE4YTM2NTE4NjgzZTFhNjYwZTBkZGU0NTczOTllY1wiO1xyXG4gICAgICAgIHRoaXMubGFuZyA9IFwiZnItQ0FcIjtcclxuICAgICAgICB0aGlzLmJhc2VVcmwgPSBcImh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvXCI7XHJcbiAgICAgICAgdGhpcy5pbWdQYXRoID0gXCJodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcC9cIjtcclxuICAgICAgICB0aGlzLmxhcmdldXJBZmZpY2hlID0gW1wiOTJcIiwgXCIxNTRcIiwgXCIxODVcIiwgXCIzNDJcIiwgXCI1MDBcIiwgXCI3ODBcIl1cclxuICAgICAgICB0aGlzLm5iRmlsbSA9IDY7XHJcbiAgICAgICAgdGhpcy5uYlBvcHVsYWlyZSA9IDk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXRlRGVybmllckZpbG0oKSB7XHJcbiAgICAgICAgbGV0IHJlcXVldGUgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VyRGVybmllckZpbG0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgcmVxdWV0ZS5vcGVuKCdHRVQnLCB0aGlzLmJhc2VVcmwgKyAnbW92aWUvdG9wX3JhdGVkP2FwaV9rZXk9JyArIHRoaXMuYXBpS2V5ICsgJyZsYW5ndWFnZT0nICsgdGhpcy5sYW5nICsgJyZwYWdlPTEnKVxyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldG91ckRlcm5pZXJGaWxtKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXRvdXJEZXJuaWVyRmlsbScpO1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KS5yZXN1bHRzO1xyXG4gICAgICAgIHRoaXMuYWZmaWNoZXJEZXJuaWVyRmlsbShkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBhZmZpY2hlckRlcm5pZXJGaWxtKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnYWZmaWNoZXJEZXJuaWVyRmlsbScpO1xyXG4gICAgICAgIGxldCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1pZXV4X25vdGUnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzZWN0aW9uKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubmJGaWxtOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBhcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXBsYXRlIC5maWxtJykuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJ2gyJykuaW5uZXJIVE1MID0gZGF0YVtpXS50aXRsZTtcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgLy8gaWYgKGRhdGFbaV0ub3ZlcnZpZXcgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAvLyAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCcuZGVzY3JpcHRpb24nKS5pbm5lckhUTUwgPSBkYXRhW2ldLm92ZXJ2aWV3O1xyXG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCcuZGVzY3JpcHRpb24nKS5pbm5lckhUTUwgPSBcIkF1Y3VuZSBkZXNjcmlwdGlvbiBkaXNwb25pYmxlXCI7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCcuZGVzY3JpcHRpb24nKS5pbm5lckhUTUwgPSBkYXRhW2ldLm92ZXJ2aWV3IHx8IFwiQXVjbmUgZGVzY3JpcHRpb24gZGlzcG9uaWJsZVwiO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCIuYW5uZWVkZXNvcnRpZVwiKS5pbm5lckhUTUwgPSBcIlNvcnRpZSBsZSBcIiArIGRhdGFbaV0ucmVsZWFzZV9kYXRlO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCIubm90ZVwiKS5pbm5lckhUTUwgPSBcIkNlIGZpbG0gZXN0IG5vdMOpIFwiICsgZGF0YVtpXS52b3RlX2F2ZXJhZ2UgKyBcIiAvMTAuXCI7XHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcihcImFcIikuaHJlZiArPSBcImZpY2hlLWZpbG0uaHRtbD9pZD1cIiArIGRhdGFbaV0uaWQ7XHJcbiAgICAgICAgICAgIC8vIGFydGljbGUucXVlcnlTZWxlY3RvcignLmNvdGUnKS5pbm5lckhUTUwgPSBkYXRhW2ldLmNvdGU7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZSA9IGFydGljbGUucXVlcnlTZWxlY3RvcignaW1nJyk7XHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHRoaXMuaW1nUGF0aCArIFwidzMwMFwiICsgZGF0YVtpXS5wb3N0ZXJfcGF0aDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYXJ0aWNsZSlcclxuICAgICAgICAgICAgc2VjdGlvbi5hcHBlbmRDaGlsZChhcnRpY2xlKVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXF1ZXRlSW5mb0ZpbG0obW92aWVJZCkge1xyXG4gICAgICAgIGxldCByZXF1ZXRlID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWV0ZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCB0aGlzLnJldG91ckluZm9GaWxtLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbignR0VUJywgdGhpcy5iYXNlVXJsICsgJ21vdmllLycgKyBtb3ZpZUlkICsgJz9hcGlfa2V5PScgKyB0aGlzLmFwaUtleSArICcmbGFuZ3VhZ2U9JyArIHRoaXMubGFuZyArICcmcGFnZT0xJylcclxuICAgICAgICByZXF1ZXRlLnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXRvdXJJbmZvRmlsbShldmVudCkge1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgY29uc29sZS5sb2codGFyZ2V0LnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIHRoaXMuYWZmaWNoZXJJbmZvRmlsbShkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBhZmZpY2hlckluZm9GaWxtKGRhdGEpIHtcclxuICAgICAgICB2YXIgdW5lSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpY2hlLWZpbG0+aW1nXCIpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaDJcIikuaW5uZXJIVE1MID0gZGF0YS50aXRsZTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlc2NyaXB0aW9uXCIpLmlubmVySFRNTCA9IGRhdGEub3ZlcnZpZXc7XHJcbiAgICAgICAgaWYgKGRhdGEub3ZlcnZpZXcgPT0gXCJcIikge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlc2NyaXB0aW9uXCIpLmlubmVySFRNTCA9IFwiQXVjbmUgZGVzY3JpcHRpb24gZGlzcG9uaWJsZS5cIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlc2NyaXB0aW9uXCIpLmlubmVySFRNTCA9IGRhdGEub3ZlcnZpZXc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZWRlc29ydGllXCIpLmlubmVySFRNTCA9IFwiQ2UgZmlsbSBlc3Qgc29ydGkgbGUgXCIgKyBkYXRhLnJlbGVhc2VfZGF0ZTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnZvdGVcIikuaW5uZXJIVE1MID0gXCJDZSBmaWxtIGVzdCBub3TDqSBcIiArIGRhdGEudm90ZV9hdmVyYWdlICsgXCIgLzEwLlwiO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxhbmd1YWdlLW9yaWdpbmFsXCIpLmlubmVySFRNTCA9IFwiTGEgbGFuZ3VlIG9yaWdpbmFsIGRlIGNlIGZpbG0gZXN0IFwiICsgXCJ7XCIgKyBkYXRhLm9yaWdpbmFsX2xhbmd1YWdlICsgXCJ9LlwiO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHVyZWVcIikuaW5uZXJIVE1MID0gXCJMYSBkdXLDqWUgZHUgZmlsbSBlc3QgZGUgXCIgKyBkYXRhLnJ1bnRpbWUgKyBcIiBtaW51dGVzLlwiO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnVkZ2V0XCIpLmlubmVySFRNTCA9IFwiTGUgYnVkZ2V0IGR1IGZpbG0gZXN0IGRlIFwiICsgZGF0YS5idWRnZXQgKyBcIiQuXCI7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXZlbnVcIikuaW5uZXJIVE1MID0gXCJMZXMgcmV2ZW51cyBkdSBmaWxtIHNvbnQgZGUgXCIgKyBkYXRhLnJldmVudWUgKyBcIiQuXCI7XHJcblxyXG5cclxuICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgdGhpcy5pbWdQYXRoICsgXCJ3XCIgKyB0aGlzLmxhcmdldXJBZmZpY2hlWzNdICsgZGF0YS5wb3N0ZXJfcGF0aCk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVxdWV0ZVBvcHVsYWlyZUZpbG0oKSB7XHJcbiAgICAgICAgbGV0IHJlcXVldGUgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VyUG9wdWxhaXJlRmlsbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXF1ZXRlLm9wZW4oJ0dFVCcsIHRoaXMuYmFzZVVybCArICdtb3ZpZS9wb3B1bGFyP2FwaV9rZXk9JyArIHRoaXMuYXBpS2V5ICsgJyZsYW5ndWFnZT0nICsgdGhpcy5sYW5nICsgJyZwYWdlPTEnKVxyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldG91clBvcHVsYWlyZUZpbG0oZXZlbnQpIHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JldG91ckRlcm5pZXJGaWxtJyk7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpLnJlc3VsdHM7XHJcbiAgICAgICAgdGhpcy5hZmZpY2hlclBvcHVsYWlyZUZpbG0oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZXJQb3B1bGFpcmVGaWxtKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnYWZmaWNoZXJEZXJuaWVyRmlsbScpO1xyXG4gICAgICAgIGxldCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN3aXBlci13cmFwcGVyJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2VjdGlvbik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5iUG9wdWxhaXJlOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBhcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXBsYXRlIC5zd2lwZXItc2xpZGUnKS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignaDMnKS5pbm5lckhUTUwgPSBkYXRhW2ldLnRpdGxlO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgKGRhdGFbaV0ub3ZlcnZpZXcgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAvLyAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCcuZGVzY3JpcHRpb24nKS5pbm5lckhUTUwgPSBkYXRhW2ldLm92ZXJ2aWV3O1xyXG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCcuZGVzY3JpcHRpb24nKS5pbm5lckhUTUwgPSBcIkF1Y3VuZSBkZXNjcmlwdGlvbiBkaXNwb25pYmxlXCI7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCcuZGVzY3JpcHRpb24nKS5pbm5lckhUTUwgPSBkYXRhW2ldLm92ZXJ2aWV3IHx8IFwiQXVjbmUgZGVzY3JpcHRpb24gZGlzcG9uaWJsZVwiO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJhXCIpLmhyZWYgKz0gXCJmaWNoZS1maWxtLmh0bWw/aWQ9XCIgKyBkYXRhW2ldLmlkO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5jb3RlJykuaW5uZXJIVE1MID0gXCJDZSBmaWxtIGVzdCBub3TDqSBcIiArIGRhdGFbaV0udm90ZV9hdmVyYWdlICsgXCIgLzEwLlwiO1xyXG4gICAgICAgICAgICBsZXQgaW1hZ2UgPSBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xyXG4gICAgICAgICAgICBpbWFnZS5zcmMgPSB0aGlzLmltZ1BhdGggKyBcInczMDBcIiArIGRhdGFbaV0ucG9zdGVyX3BhdGg7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFydGljbGUpXHJcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYXJ0aWNsZSlcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzd2lwZXIgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLWNvbnRhaW5lcicsIHtcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMCxcclxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiB3aW5kb3cgd2lkdGggaXMgPD0gMzc2cHhcclxuICAgICAgICAgICAgICAgICAgICAzNzY6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuU2xpZGVzOiAzMFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiB3aW5kb3cgd2lkdGggaXMgPD0gNzY5cHhcclxuICAgICAgICAgICAgICAgICAgICA3Njk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuU2xpZGVzOiA0MFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgMTQ0MDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW5TbGlkZXM6IDQwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICByZXF1ZXRlQWN0ZXVyRmlsbSgpIHtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJBY3RldXJGaWxtLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbignR0VUJywgdGhpcy5iYXNlVXJsICsgJy9jcmVkaXRzP2FwaV9rZXk9JyArIHRoaXMuYXBpS2V5ICsgJyZsYW5ndWFnZT0nICsgdGhpcy5sYW5nICsgJyZwYWdlPTEnKVxyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldG91ckFjdGV1ckZpbG0oZXZlbnQpIHtcclxuXHJcblxyXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KS5yZXN1bHRzO1xyXG4gICAgICAgIHRoaXMuYWZmaWNoZXJBY3RldXJGaWxtKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGFmZmljaGVyQWN0ZXVyRmlsbShkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2FmZmljaGVyQWN0ZXVyRmlsbScpO1xyXG4gICAgICAgIGxldCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN3aXBlci13cmFwcGVyJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2VjdGlvbik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgYXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wbGF0ZT4uc3dpcGVyLXNsaWRlJykuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJ2gzJykuaW5uZXJIVE1MID0gZGF0YVtpXS50aXRsZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmIChkYXRhW2ldLm92ZXJ2aWV3ICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgLy8gICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uJykuaW5uZXJIVE1MID0gZGF0YVtpXS5vdmVydmlldztcclxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uJykuaW5uZXJIVE1MID0gXCJBdWN1bmUgZGVzY3JpcHRpb24gZGlzcG9uaWJsZVwiO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGFydGljbGUucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uJykuaW5uZXJIVE1MID0gZGF0YVtpXS5vdmVydmlldyB8fCBcIkF1Y25lIGRlc2NyaXB0aW9uIGRpc3BvbmlibGVcIjtcclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiYVwiKS5ocmVmICs9IFwiZmljaGUtZmlsbS5odG1sP2lkPVwiICsgZGF0YVtpXS5pZDtcclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCcuY290ZScpLmlubmVySFRNTCA9IFwiQ2UgZmlsbSBlc3Qgbm90w6kgXCIgKyBkYXRhW2ldLnZvdGVfYXZlcmFnZSArIFwiIC8xMC5cIjtcclxuICAgICAgICAgICAgbGV0IGltYWdlID0gYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcclxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5pbWdQYXRoICsgXCJ3MzAwXCIgKyBkYXRhW2ldLnBvc3Rlcl9wYXRoO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcnRpY2xlKVxyXG4gICAgICAgICAgICBzZWN0aW9uLmFwcGVuZENoaWxkKGFydGljbGUpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3dpcGVyLXdyYXBwZXJcIikuYXBwZW5kQ2hpbGQoYXJ0aWNsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzd2lwZXIgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLWNvbnRhaW5lcicsIHtcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMCxcclxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIC8vIHdoZW4gd2luZG93IHdpZHRoIGlzIDw9IDM3NnB4XHJcbiAgICAgICAgICAgICAgICAzNzY6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlblNsaWRlczogMzBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyB3aGVuIHdpbmRvdyB3aWR0aCBpcyA8PSA3NjlweFxyXG4gICAgICAgICAgICAgICAgNzY5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW5TbGlkZXM6IDQwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTQ0MDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuU2xpZGVzOiA0MFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbiJdLCJmaWxlIjoic2NyaXB0LmpzIn0=
