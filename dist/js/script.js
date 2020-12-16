document.addEventListener("DOMContentLoaded", function () {


    let connexion = new MovieDB();

    if (document.location.pathname.search("fiche-film.html") > 0) {
        let params = (new URL(document.location)).searchParams;
        console.log(params);
        connexion.requeteInfoFilm(params.get("id"));
    } else {
        connexion.requeteDernierFilm();
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

            if (data[i].overview != "") {
                article.querySelector('.description').innerHTML = data[i].overview;
            } else {
                article.querySelector('.description').innerHTML = "Aucune description disponible";
            }
            article.querySelector('.description').innerHTML = data[i].overview || "Aucne description disponible";
            article.querySelector("a").href += "fiche-film.html?id=" + data[i].id;
            article.querySelector('.cote').innerHTML = data[i].cote;
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
        document.querySelector(".revenu").innerHTML = "Les revenues du film sont de " + data.revenue + "$.";



        uneImage.setAttribute("src", this.imgPath + "w" + this.largeurAffiche[3] + data.poster_path);


    }




}

// var mySwiper = new Swiper('.swiper-container', {
//     // Optional parameters
//     direction: 'vertical',
//     loop: true,
//
//     // If we need pagination
//     pagination: {
//         el: '.swiper-pagination',
//     },
//
//     // Navigation arrows
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
//
//     // And if we need scrollbar
//     scrollbar: {
//         el: '.swiper-scrollbar',
//     },
// })
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuXHJcbiAgICBsZXQgY29ubmV4aW9uID0gbmV3IE1vdmllREIoKTtcclxuXHJcbiAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuc2VhcmNoKFwiZmljaGUtZmlsbS5odG1sXCIpID4gMCkge1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSAobmV3IFVSTChkb2N1bWVudC5sb2NhdGlvbikpLnNlYXJjaFBhcmFtcztcclxuICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xyXG4gICAgICAgIGNvbm5leGlvbi5yZXF1ZXRlSW5mb0ZpbG0ocGFyYW1zLmdldChcImlkXCIpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVEZXJuaWVyRmlsbSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbn0pXHJcblxyXG5jbGFzcyBNb3ZpZURCIHtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIm5ldyBNb3ZpZURCKClcIilcclxuICAgICAgICB0aGlzLmFwaUtleSA9IFwiMzQxOGEzNjUxODY4M2UxYTY2MGUwZGRlNDU3Mzk5ZWNcIjtcclxuICAgICAgICB0aGlzLmxhbmcgPSBcImZyLUNBXCI7XHJcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gXCJodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL1wiO1xyXG4gICAgICAgIHRoaXMuaW1nUGF0aCA9IFwiaHR0cHM6Ly9pbWFnZS50bWRiLm9yZy90L3AvXCI7XHJcbiAgICAgICAgdGhpcy5sYXJnZXVyQWZmaWNoZSA9IFtcIjkyXCIsIFwiMTU0XCIsIFwiMTg1XCIsIFwiMzQyXCIsIFwiNTAwXCIsIFwiNzgwXCJdXHJcbiAgICAgICAgdGhpcy5uYkZpbG0gPSA2O1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWV0ZURlcm5pZXJGaWxtKCkge1xyXG4gICAgICAgIGxldCByZXF1ZXRlID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWV0ZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCB0aGlzLnJldG91ckRlcm5pZXJGaWxtLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbignR0VUJywgdGhpcy5iYXNlVXJsICsgJ21vdmllL3RvcF9yYXRlZD9hcGlfa2V5PScgKyB0aGlzLmFwaUtleSArICcmbGFuZ3VhZ2U9JyArIHRoaXMubGFuZyArICcmcGFnZT0xJylcclxuICAgICAgICByZXF1ZXRlLnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXRvdXJEZXJuaWVyRmlsbShldmVudCkge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygncmV0b3VyRGVybmllckZpbG0nKTtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dCkucmVzdWx0cztcclxuICAgICAgICB0aGlzLmFmZmljaGVyRGVybmllckZpbG0oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZXJEZXJuaWVyRmlsbShkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2FmZmljaGVyRGVybmllckZpbG0nKTtcclxuICAgICAgICBsZXQgc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5taWV1eF9ub3RlJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2VjdGlvbik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5iRmlsbTsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgYXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wbGF0ZSAuZmlsbScpLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdoMicpLmlubmVySFRNTCA9IGRhdGFbaV0udGl0bGU7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YVtpXS5vdmVydmlldyAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5kZXNjcmlwdGlvbicpLmlubmVySFRNTCA9IGRhdGFbaV0ub3ZlcnZpZXc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5kZXNjcmlwdGlvbicpLmlubmVySFRNTCA9IFwiQXVjdW5lIGRlc2NyaXB0aW9uIGRpc3BvbmlibGVcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5kZXNjcmlwdGlvbicpLmlubmVySFRNTCA9IGRhdGFbaV0ub3ZlcnZpZXcgfHwgXCJBdWNuZSBkZXNjcmlwdGlvbiBkaXNwb25pYmxlXCI7XHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcihcImFcIikuaHJlZiArPSBcImZpY2hlLWZpbG0uaHRtbD9pZD1cIiArIGRhdGFbaV0uaWQ7XHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignLmNvdGUnKS5pbm5lckhUTUwgPSBkYXRhW2ldLmNvdGU7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZSA9IGFydGljbGUucXVlcnlTZWxlY3RvcignaW1nJyk7XHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHRoaXMuaW1nUGF0aCArIFwidzMwMFwiICsgZGF0YVtpXS5wb3N0ZXJfcGF0aDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYXJ0aWNsZSlcclxuICAgICAgICAgICAgc2VjdGlvbi5hcHBlbmRDaGlsZChhcnRpY2xlKVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXF1ZXRlSW5mb0ZpbG0obW92aWVJZCkge1xyXG4gICAgICAgIGxldCByZXF1ZXRlID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWV0ZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCB0aGlzLnJldG91ckluZm9GaWxtLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbignR0VUJywgdGhpcy5iYXNlVXJsICsgJ21vdmllLycgKyBtb3ZpZUlkICsgJz9hcGlfa2V5PScgKyB0aGlzLmFwaUtleSArICcmbGFuZ3VhZ2U9JyArIHRoaXMubGFuZyArICcmcGFnZT0xJylcclxuICAgICAgICByZXF1ZXRlLnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXRvdXJJbmZvRmlsbShldmVudCkge1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgY29uc29sZS5sb2codGFyZ2V0LnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIHRoaXMuYWZmaWNoZXJJbmZvRmlsbShkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBhZmZpY2hlckluZm9GaWxtKGRhdGEpIHtcclxuICAgICAgICB2YXIgdW5lSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpY2hlLWZpbG0+aW1nXCIpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaDJcIikuaW5uZXJIVE1MID0gZGF0YS50aXRsZTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlc2NyaXB0aW9uXCIpLmlubmVySFRNTCA9IGRhdGEub3ZlcnZpZXc7XHJcbiAgICAgICAgaWYgKGRhdGEub3ZlcnZpZXcgPT0gXCJcIikge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlc2NyaXB0aW9uXCIpLmlubmVySFRNTCA9IFwiQXVjbmUgZGVzY3JpcHRpb24gZGlzcG9uaWJsZS5cIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlc2NyaXB0aW9uXCIpLmlubmVySFRNTCA9IGRhdGEub3ZlcnZpZXc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZWRlc29ydGllXCIpLmlubmVySFRNTCA9IFwiQ2UgZmlsbSBlc3Qgc29ydGkgbGUgXCIgKyBkYXRhLnJlbGVhc2VfZGF0ZTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnZvdGVcIikuaW5uZXJIVE1MID0gXCJDZSBmaWxtIGVzdCBub3TDqSBcIiArIGRhdGEudm90ZV9hdmVyYWdlICsgXCIgLzEwLlwiO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxhbmd1YWdlLW9yaWdpbmFsXCIpLmlubmVySFRNTCA9IFwiTGEgbGFuZ3VlIG9yaWdpbmFsIGRlIGNlIGZpbG0gZXN0IFwiICsgXCJ7XCIgKyBkYXRhLm9yaWdpbmFsX2xhbmd1YWdlICsgXCJ9LlwiO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHVyZWVcIikuaW5uZXJIVE1MID0gXCJMYSBkdXLDqWUgZHUgZmlsbSBlc3QgZGUgXCIgKyBkYXRhLnJ1bnRpbWUgKyBcIiBtaW51dGVzLlwiO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnVkZ2V0XCIpLmlubmVySFRNTCA9IFwiTGUgYnVkZ2V0IGR1IGZpbG0gZXN0IGRlIFwiICsgZGF0YS5idWRnZXQgKyBcIiQuXCI7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXZlbnVcIikuaW5uZXJIVE1MID0gXCJMZXMgcmV2ZW51ZXMgZHUgZmlsbSBzb250IGRlIFwiICsgZGF0YS5yZXZlbnVlICsgXCIkLlwiO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHVuZUltYWdlLnNldEF0dHJpYnV0ZShcInNyY1wiLCB0aGlzLmltZ1BhdGggKyBcIndcIiArIHRoaXMubGFyZ2V1ckFmZmljaGVbM10gKyBkYXRhLnBvc3Rlcl9wYXRoKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxufVxyXG5cclxuLy8gdmFyIG15U3dpcGVyID0gbmV3IFN3aXBlcignLnN3aXBlci1jb250YWluZXInLCB7XHJcbi8vICAgICAvLyBPcHRpb25hbCBwYXJhbWV0ZXJzXHJcbi8vICAgICBkaXJlY3Rpb246ICd2ZXJ0aWNhbCcsXHJcbi8vICAgICBsb29wOiB0cnVlLFxyXG4vL1xyXG4vLyAgICAgLy8gSWYgd2UgbmVlZCBwYWdpbmF0aW9uXHJcbi8vICAgICBwYWdpbmF0aW9uOiB7XHJcbi8vICAgICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4vLyAgICAgfSxcclxuLy9cclxuLy8gICAgIC8vIE5hdmlnYXRpb24gYXJyb3dzXHJcbi8vICAgICBuYXZpZ2F0aW9uOiB7XHJcbi8vICAgICAgICAgbmV4dEVsOiAnLnN3aXBlci1idXR0b24tbmV4dCcsXHJcbi8vICAgICAgICAgcHJldkVsOiAnLnN3aXBlci1idXR0b24tcHJldicsXHJcbi8vICAgICB9LFxyXG4vL1xyXG4vLyAgICAgLy8gQW5kIGlmIHdlIG5lZWQgc2Nyb2xsYmFyXHJcbi8vICAgICBzY3JvbGxiYXI6IHtcclxuLy8gICAgICAgICBlbDogJy5zd2lwZXItc2Nyb2xsYmFyJyxcclxuLy8gICAgIH0sXHJcbi8vIH0pIl0sImZpbGUiOiJzY3JpcHQuanMifQ==
