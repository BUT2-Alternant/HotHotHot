/**
 * Fonction qui permet de changer le contenu affiché a l'écran en fonction de l'onglet cliqué
 * @param event
 */
function changerOnglet(event) {
    let donneeChargee = localStorage.getItem("donneeChargee");

    let ongletDonnee = document.getElementById('donnee');
    let boutonDonnee = document.getElementById('bouton-donnee');

    let ongletHistorique = document.getElementById('historique');
    let boutonHistorique = document.getElementById('bouton-historique');

    if (!donneeChargee) {
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