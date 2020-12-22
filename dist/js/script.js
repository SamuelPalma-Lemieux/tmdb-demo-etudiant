document.addEventListener("DOMContentLoaded", function () {

    const btnScrollTOTop = document.querySelector("#btnScrolltoTop");
    btnScrollTOTop.addEventListener("click",function () {
        //$("html,body").animate({scrollTop:0}, "slow");
        window.scrollTo({
            top: 0,
            left:0,
            behavior:"smooth"
        });
    })

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGNvbnN0IGJ0blNjcm9sbFRPVG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG5TY3JvbGx0b1RvcFwiKTtcclxuICAgIGJ0blNjcm9sbFRPVG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyQoXCJodG1sLGJvZHlcIikuYW5pbWF0ZSh7c2Nyb2xsVG9wOjB9LCBcInNsb3dcIik7XHJcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcclxuICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICBsZWZ0OjAsXHJcbiAgICAgICAgICAgIGJlaGF2aW9yOlwic21vb3RoXCJcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcblxyXG4gICAgLy8gZnVuY3Rpb24gY2xpY2tNZW51KCkge1xyXG4gICAgLy8gICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidWwubWVudSBsaVwiKS5zdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIikge1xyXG4gICAgLy8gICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidWwubWVudSBsaVwiKS5mb3JFYWNoKGUgPT4gZS5zdGd1bHB5bGUuZGlzcGxheSA9IFwiYmxvY2tcIik7XHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInVsLm1lbnUgbGlcIikuZm9yRWFjaChlID0+IGUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4vLyAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW51LWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2tNZW51KTtcclxuLy9cclxuLy9cclxuLy8gfSk7XHJcblxyXG5cclxuICAgIGxldCBjb25uZXhpb24gPSBuZXcgTW92aWVEQigpO1xyXG5cclxuICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zZWFyY2goXCJmaWNoZS1maWxtLmh0bWxcIikgPiAwKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IChuZXcgVVJMKGRvY3VtZW50LmxvY2F0aW9uKSkuc2VhcmNoUGFyYW1zO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVJbmZvRmlsbShwYXJhbXMuZ2V0KFwiaWRcIikpO1xyXG4gICAgICAgIGNvbm5leGlvbi5yZXF1ZXRlQWN0ZXVyRmlsbShwYXJhbXMuZ2V0KFwiaWRcIikpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25uZXhpb24ucmVxdWV0ZURlcm5pZXJGaWxtKCk7XHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVQb3B1bGFpcmVGaWxtKCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn0pXHJcblxyXG5jbGFzcyBNb3ZpZURCIHtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIm5ldyBNb3ZpZURCKClcIilcclxuICAgICAgICB0aGlzLmFwaUtleSA9IFwiMzQxOGEzNjUxODY4M2UxYTY2MGUwZGRlNDU3Mzk5ZWNcIjtcclxuICAgICAgICB0aGlzLmxhbmcgPSBcImZyLUNBXCI7XHJcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gXCJodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL1wiO1xyXG4gICAgICAgIHRoaXMuaW1nUGF0aCA9IFwiaHR0cHM6Ly9pbWFnZS50bWRiLm9yZy90L3AvXCI7XHJcbiAgICAgICAgdGhpcy5sYXJnZXVyQWZmaWNoZSA9IFtcIjkyXCIsIFwiMTU0XCIsIFwiMTg1XCIsIFwiMzQyXCIsIFwiNTAwXCIsIFwiNzgwXCJdXHJcbiAgICAgICAgdGhpcy5uYkZpbG0gPSA2O1xyXG4gICAgICAgIHRoaXMubmJQb3B1bGFpcmUgPSA5O1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWV0ZURlcm5pZXJGaWxtKCkge1xyXG4gICAgICAgIGxldCByZXF1ZXRlID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWV0ZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCB0aGlzLnJldG91ckRlcm5pZXJGaWxtLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbignR0VUJywgdGhpcy5iYXNlVXJsICsgJ21vdmllL3RvcF9yYXRlZD9hcGlfa2V5PScgKyB0aGlzLmFwaUtleSArICcmbGFuZ3VhZ2U9JyArIHRoaXMubGFuZyArICcmcGFnZT0xJylcclxuICAgICAgICByZXF1ZXRlLnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXRvdXJEZXJuaWVyRmlsbShldmVudCkge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygncmV0b3VyRGVybmllckZpbG0nKTtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dCkucmVzdWx0cztcclxuICAgICAgICB0aGlzLmFmZmljaGVyRGVybmllckZpbG0oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZXJEZXJuaWVyRmlsbShkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2FmZmljaGVyRGVybmllckZpbG0nKTtcclxuICAgICAgICBsZXQgc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5taWV1eF9ub3RlJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2VjdGlvbik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5iRmlsbTsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgYXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wbGF0ZSAuZmlsbScpLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdoMicpLmlubmVySFRNTCA9IGRhdGFbaV0udGl0bGU7XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIC8vIGlmIChkYXRhW2ldLm92ZXJ2aWV3ICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgLy8gICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uJykuaW5uZXJIVE1MID0gZGF0YVtpXS5vdmVydmlldztcclxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uJykuaW5uZXJIVE1MID0gXCJBdWN1bmUgZGVzY3JpcHRpb24gZGlzcG9uaWJsZVwiO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGFydGljbGUucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uJykuaW5uZXJIVE1MID0gZGF0YVtpXS5vdmVydmlldyB8fCBcIkF1Y25lIGRlc2NyaXB0aW9uIGRpc3BvbmlibGVcIjtcclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiLmFubmVlZGVzb3J0aWVcIikuaW5uZXJIVE1MID0gXCJTb3J0aWUgbGUgXCIgKyBkYXRhW2ldLnJlbGVhc2VfZGF0ZTtcclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiLm5vdGVcIikuaW5uZXJIVE1MID0gXCJDZSBmaWxtIGVzdCBub3TDqSBcIiArIGRhdGFbaV0udm90ZV9hdmVyYWdlICsgXCIgLzEwLlwiO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJhXCIpLmhyZWYgKz0gXCJmaWNoZS1maWxtLmh0bWw/aWQ9XCIgKyBkYXRhW2ldLmlkO1xyXG4gICAgICAgICAgICAvLyBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5jb3RlJykuaW5uZXJIVE1MID0gZGF0YVtpXS5jb3RlO1xyXG4gICAgICAgICAgICBsZXQgaW1hZ2UgPSBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xyXG4gICAgICAgICAgICBpbWFnZS5zcmMgPSB0aGlzLmltZ1BhdGggKyBcInczMDBcIiArIGRhdGFbaV0ucG9zdGVyX3BhdGg7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFydGljbGUpXHJcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYXJ0aWNsZSlcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVxdWV0ZUluZm9GaWxtKG1vdmllSWQpIHtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJJbmZvRmlsbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXF1ZXRlLm9wZW4oJ0dFVCcsIHRoaXMuYmFzZVVybCArICdtb3ZpZS8nICsgbW92aWVJZCArICc/YXBpX2tleT0nICsgdGhpcy5hcGlLZXkgKyAnJmxhbmd1YWdlPScgKyB0aGlzLmxhbmcgKyAnJnBhZ2U9MScpXHJcbiAgICAgICAgcmVxdWV0ZS5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0b3VySW5mb0ZpbG0oZXZlbnQpIHtcclxuXHJcblxyXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRhcmdldC5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICB0aGlzLmFmZmljaGVySW5mb0ZpbG0oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZXJJbmZvRmlsbShkYXRhKSB7XHJcbiAgICAgICAgdmFyIHVuZUltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWNoZS1maWxtPmltZ1wiKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImgyXCIpLmlubmVySFRNTCA9IGRhdGEudGl0bGU7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXNjcmlwdGlvblwiKS5pbm5lckhUTUwgPSBkYXRhLm92ZXJ2aWV3O1xyXG4gICAgICAgIGlmIChkYXRhLm92ZXJ2aWV3ID09IFwiXCIpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXNjcmlwdGlvblwiKS5pbm5lckhUTUwgPSBcIkF1Y25lIGRlc2NyaXB0aW9uIGRpc3BvbmlibGUuXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXNjcmlwdGlvblwiKS5pbm5lckhUTUwgPSBkYXRhLm92ZXJ2aWV3O1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGVkZXNvcnRpZVwiKS5pbm5lckhUTUwgPSBcIkNlIGZpbG0gZXN0IHNvcnRpIGxlIFwiICsgZGF0YS5yZWxlYXNlX2RhdGU7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi52b3RlXCIpLmlubmVySFRNTCA9IFwiQ2UgZmlsbSBlc3Qgbm90w6kgXCIgKyBkYXRhLnZvdGVfYXZlcmFnZSArIFwiIC8xMC5cIjtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sYW5ndWFnZS1vcmlnaW5hbFwiKS5pbm5lckhUTUwgPSBcIkxhIGxhbmd1ZSBvcmlnaW5hbCBkZSBjZSBmaWxtIGVzdCBcIiArIFwie1wiICsgZGF0YS5vcmlnaW5hbF9sYW5ndWFnZSArIFwifS5cIjtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmR1cmVlXCIpLmlubmVySFRNTCA9IFwiTGEgZHVyw6llIGR1IGZpbG0gZXN0IGRlIFwiICsgZGF0YS5ydW50aW1lICsgXCIgbWludXRlcy5cIjtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1ZGdldFwiKS5pbm5lckhUTUwgPSBcIkxlIGJ1ZGdldCBkdSBmaWxtIGVzdCBkZSBcIiArIGRhdGEuYnVkZ2V0ICsgXCIkLlwiO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmV2ZW51XCIpLmlubmVySFRNTCA9IFwiTGVzIHJldmVudXMgZHUgZmlsbSBzb250IGRlIFwiICsgZGF0YS5yZXZlbnVlICsgXCIkLlwiO1xyXG5cclxuXHJcbiAgICAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwic3JjXCIsIHRoaXMuaW1nUGF0aCArIFwid1wiICsgdGhpcy5sYXJnZXVyQWZmaWNoZVszXSArIGRhdGEuYmFja2Ryb3BfcGF0aCk7XHJcbiAgICAgICAgdGhpcy5yZXF1ZXRlQWN0ZXVyRmlsbShkYXRhLmlkKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXF1ZXRlUG9wdWxhaXJlRmlsbSgpIHtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJQb3B1bGFpcmVGaWxtLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbignR0VUJywgdGhpcy5iYXNlVXJsICsgJ21vdmllL3BvcHVsYXI/YXBpX2tleT0nICsgdGhpcy5hcGlLZXkgKyAnJmxhbmd1YWdlPScgKyB0aGlzLmxhbmcgKyAnJnBhZ2U9MScpXHJcbiAgICAgICAgcmVxdWV0ZS5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0b3VyUG9wdWxhaXJlRmlsbShldmVudCkge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygncmV0b3VyRGVybmllckZpbG0nKTtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dCkucmVzdWx0cztcclxuICAgICAgICB0aGlzLmFmZmljaGVyUG9wdWxhaXJlRmlsbShkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBhZmZpY2hlclBvcHVsYWlyZUZpbG0oZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhZmZpY2hlckRlcm5pZXJGaWxtJyk7XHJcbiAgICAgICAgbGV0IHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXdyYXBwZXInKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzZWN0aW9uKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubmJQb3B1bGFpcmU7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgbGV0IGFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcGxhdGUgLnN3aXBlci1zbGlkZScpLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdoMycpLmlubmVySFRNTCA9IGRhdGFbaV0udGl0bGU7XHJcblxyXG4gICAgICAgICAgICAvLyBpZiAoZGF0YVtpXS5vdmVydmlldyAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5kZXNjcmlwdGlvbicpLmlubmVySFRNTCA9IGRhdGFbaV0ub3ZlcnZpZXc7XHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5kZXNjcmlwdGlvbicpLmlubmVySFRNTCA9IFwiQXVjdW5lIGRlc2NyaXB0aW9uIGRpc3BvbmlibGVcIjtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5kZXNjcmlwdGlvbicpLmlubmVySFRNTCA9IGRhdGFbaV0ub3ZlcnZpZXcgfHwgXCJBdWNuZSBkZXNjcmlwdGlvbiBkaXNwb25pYmxlXCI7XHJcbiAgICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJhXCIpLmhyZWYgKz0gXCJmaWNoZS1maWxtLmh0bWw/aWQ9XCIgKyBkYXRhW2ldLmlkO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5jb3RlJykuaW5uZXJIVE1MID0gXCJDZSBmaWxtIGVzdCBub3TDqSBcIiArIGRhdGFbaV0udm90ZV9hdmVyYWdlICsgXCIgLzEwLlwiO1xyXG4gICAgICAgICAgICBsZXQgaW1hZ2UgPSBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xyXG4gICAgICAgICAgICBpbWFnZS5zcmMgPSB0aGlzLmltZ1BhdGggKyBcInczMDBcIiArIGRhdGFbaV0ucG9zdGVyX3BhdGg7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFydGljbGUpXHJcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYXJ0aWNsZSlcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzd2lwZXIgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLWNvbnRhaW5lcicsIHtcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMCxcclxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIC8vIHdoZW4gd2luZG93IHdpZHRoIGlzIDw9IDM3NnB4XHJcbiAgICAgICAgICAgICAgICAzNzY6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlblNsaWRlczogMzBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyB3aGVuIHdpbmRvdyB3aWR0aCBpcyA8PSA3NjlweFxyXG4gICAgICAgICAgICAgICAgNzY5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW5TbGlkZXM6IDQwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTQ0MDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuU2xpZGVzOiA0MFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXF1ZXRlQWN0ZXVyRmlsbShtb3ZpZUlkKSB7XHJcbiAgICAgICAgbGV0IHJlcXVldGUgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VyQWN0ZXVyRmlsbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXF1ZXRlLm9wZW4oJ0dFVCcsIHRoaXMuYmFzZVVybCArICdtb3ZpZS8nICsgbW92aWVJZCArICcvY3JlZGl0cz9hcGlfa2V5PScgKyB0aGlzLmFwaUtleSArICcmbGFuZ3VhZ2U9JyArIHRoaXMubGFuZylcclxuICAgICAgICByZXF1ZXRlLnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXRvdXJBY3RldXJGaWxtKGV2ZW50KSB7XHJcblxyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dCkuY2FzdDtcclxuICAgICAgICB0aGlzLmFmZmljaGVyQWN0ZXVyRmlsbShkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBhZmZpY2hlckFjdGV1ckZpbG0oZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhZmZpY2hlckFjdGV1ckZpbG0nKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgYXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wbGF0ZT4uc3dpcGVyLXNsaWRlJykuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJ2g0JykuaW5uZXJIVE1MID0gZGF0YVtpXS50aXRsZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmIChkYXRhW2ldLm92ZXJ2aWV3ICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgLy8gICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uJykuaW5uZXJIVE1MID0gZGF0YVtpXS5vdmVydmlldztcclxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uJykuaW5uZXJIVE1MID0gXCJBdWN1bmUgZGVzY3JpcHRpb24gZGlzcG9uaWJsZVwiO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGFydGljbGUucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uJykuaW5uZXJIVE1MID0gZGF0YVtpXS5vdmVydmlldyB8fCBcIkF1Y25lIGRlc2NyaXB0aW9uIGRpc3BvbmlibGVcIjtcclxuICAgICAgICAgICAgLy8gYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiYVwiKS5ocmVmICs9IFwiZmljaGUtZmlsbS5odG1sP2lkPVwiICsgZGF0YVtpXS5pZDtcclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCcuYWN0ZXVyJykuaW5uZXJIVE1MID0gZGF0YVtpXS5uYW1lO1xyXG4gICAgICAgICAgICBsZXQgaW1hZ2UgPSBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xyXG4gICAgICAgICAgICBpbWFnZS5zcmMgPSB0aGlzLmltZ1BhdGggKyBcInczNDJcIiArIGRhdGFbaV0ucHJvZmlsZV9wYXRoO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN3aXBlci13cmFwcGVyXCIpLmFwcGVuZENoaWxkKGFydGljbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3dpcGVyID0gbmV3IFN3aXBlcignLnN3aXBlci1jb250YWluZXInLCB7XHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMzAsXHJcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAvLyB3aGVuIHdpbmRvdyB3aWR0aCBpcyA8PSAzNzZweFxyXG4gICAgICAgICAgICAgICAgMzc2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW5TbGlkZXM6IDMwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gd2hlbiB3aW5kb3cgd2lkdGggaXMgPD0gNzY5cHhcclxuICAgICAgICAgICAgICAgIDc2OToge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuU2xpZGVzOiA0MFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDE0NDA6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA1LFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlblNsaWRlczogNDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcbiJdLCJmaWxlIjoic2NyaXB0LmpzIn0=
