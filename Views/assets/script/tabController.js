let donneeChargee = false;
let isFirstLoad = true;

/**
 * Fonction qui permet de changer le contenu affiché a l'écran en fonction de l'onglet cliqué
 * @param event
 */
function changerOnglet(event) {
    let ongletDonnee = document.getElementById('donnee');
    let boutonDonnee = document.getElementById('bouton-donnee');

    let ongletHistorique = document.getElementById('historique');
    let boutonHistorique = document.getElementById('bouton-historique');

    if (donneeChargee) {
        if (event.target.innerText === "Données") {
            ongletDonnee.style.display = "block"
            ongletDonnee.ariaDisabled = "false"
            boutonDonnee.style.backgroundColor = "#97B2EC"

            ongletHistorique.style.display = "none"
            ongletHistorique.ariaDisabled = "true"
            boutonHistorique.style.backgroundColor = "#D3E0EF"

            localStorage.setItem("ongletCourant", "data");
        } else {
            ongletDonnee.style.display = "none"
            ongletDonnee.ariaDisabled = "true"
            boutonDonnee.style.backgroundColor = "#D3E0EF"

            ongletHistorique.style.display = "block"
            ongletHistorique.ariaDisabled = "false"
            boutonHistorique.style.backgroundColor = "#97B2EC"

            localStorage.setItem("ongletCourant", "history");
        }
    } else {
        alert("Les données ne sont pas encore chargées, veuillez patienter");
    }
}

/**
 * Fonction permetant de rendre visible la partie donnée et de cacher la partie historique et chargement des données
 */
function afficherDonnee() {
    if (isFirstLoad) {
        isFirstLoad = false;
        donneeChargee = true;

        let chargement = document.getElementById('chargement');

        let ongletDonnee = document.getElementById('donnee');
        let boutonDonnee = document.getElementById('bouton-donnee');

        let ongletHistorique = document.getElementById('historique');
        let boutonHistorique = document.getElementById('bouton-historique');

        ongletDonnee.style.display = "block";
        ongletDonnee.ariaDisabled = "false";
        boutonDonnee.style.backgroundColor = "#97B2EC";

        ongletHistorique.style.display = "none";
        ongletHistorique.ariaDisabled = "true";
        boutonHistorique.style.backgroundColor = "#D3E0EF";

        chargement.style.display = "none";
        chargement.ariaDisabled = "true";

        localStorage.setItem("ongletCourant", "data");
    }
}