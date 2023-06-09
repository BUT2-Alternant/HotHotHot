/**
 * Fonction qui permet de changer le contenu affiché a l'écran en fonction de l'onglet cliqué
 * @param event
 */
function changerOnglet(event) {
    let ongletDonnee = document.getElementById('donnee');
    let boutonDonnee = document.getElementById('bouton-donnee');

    let ongletHistorique = document.getElementById('historique');
    let boutonHistorique = document.getElementById('bouton-historique');


    if (event.target.innerText === "Données") {
        ongletDonnee.style.display = "block"
        ongletDonnee.ariaDisabled = "false"
        boutonDonnee.style.backgroundColor = "powderblue"

        ongletHistorique.style.display = "none"
        ongletHistorique.ariaDisabled = "true"
        boutonHistorique.style.backgroundColor = "lightskyblue"

    } else {
        ongletDonnee.style.display = "none"
        ongletDonnee.ariaDisabled = "true"
        boutonDonnee.style.backgroundColor = "lightskyblue"

        ongletHistorique.style.display = "block"
        ongletHistorique.ariaDisabled = "false"
        boutonHistorique.style.backgroundColor = "powderblue"

    }
}