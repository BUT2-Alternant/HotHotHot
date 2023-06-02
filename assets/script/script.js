// Récupération de l'élément HTML dans lequel sera ajouté progressivement les températures
let zoneTemperature = document.getElementById('temperature');

// Récupération de l'élément HTML dans lequel sera stocké l'historique des températures
let zoneHistorique = document.getElementById('liste-temperature');

/**
 * Classe qui permet de stocker une température et de récupérer des informations sur celle-ci
 */
class Temperature {
    constructor(temperatureActuelle) {
        this.temperatureActuelle = temperatureActuelle;
    }

    /**
     * Méthode qui permet de récupérer la température actuelle
     * @returns {number}
     */
    getTemperatureActuelle() {
        return this.temperatureActuelle;
    }

    /**
     * Méthode qui permet de récupérer la classe CSS à appliquer à la température associé
     * @returns {string}
     */
    getClassTemperature() {
        if (this.temperatureActuelle < 0) {
            return 'froid';
        } else if (this.temperatureActuelle < 20) {
            return 'normal';
        } else if (this.temperatureActuelle < 30) {
            return 'chaud';
        } else{
            return 'tres-chaud';
        }
    }

    /**
     * Méthode qui permet de récupérer un message en fonction de la température actuelle
     * @returns {string}
     */
    getMessageTemperature() {
        if (this.temperatureActuelle < 0) {
            return 'Brrrrrrr, un peu froid ce matin, mets ta cagoule !';
        } else if (this.temperatureActuelle >= 30) {
            return 'Caliente ! Vamos a la playa, ho hoho hoho !!';
        } else {
            return 'La température est normale, tu peux sortir sans problème !';
        }
    }
}

/**
 * Récupération de la température actuelle depuis l'API hothothot exterieur avec Ajax/ Fetch
 */
function recupererTemperature(estLaPremiereRecuperation = false) {
    // Création d'une requête Ajax
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://hothothot.dog/api/capteurs/exterieur', true);
    xhr.responseType = 'json';

    // Envoi de la requête
    xhr.send();

    // Traitement de la réponse
    xhr.onload = function () {
        if (xhr.status === 200) {
            if (estLaPremiereRecuperation) {
                document.getElementById('donnee').style.display = "block";
                document.getElementById('donnee').ariaDisabled = "false";

                document.getElementById('chargement').style.display = "none";
                document.getElementById('chargement').ariaDisabled = "true";
            }

            // Récupération de la température
            let temperature = new Temperature(parseFloat(xhr.response["capteurs"][0]["Valeur"]));

            // Affichage de la température
            afficherTemperature(temperature.getTemperatureActuelle(), temperature.getClassTemperature(), temperature.getMessageTemperature());

            // Ajout de la température dans l'historique
            historiserTemperature(temperature.getTemperatureActuelle());

            // Envoi d'une notification
            notifier(temperature.getTemperatureActuelle());
        }
    }
}

/**
 * Fonction qui permet d'envoyer une notification informant de l'ajout d'une nouvelle température
 */
function notifier(temperature) {
    if (temperature < 0 || temperature > 30) {
        // Vérifions si le navigateur prend en charge les notifications
        if (!('Notification' in window)) {
            alert('Ce navigateur ne prend pas en charge la notification de bureau')
        }

        // Vérifions si les autorisations de notification ont déjà été accordées
        else if (Notification.permission === 'granted') {
            // Si tout va bien, créons une notification
            const notification = new Notification("La météo change !");
        }

        // Sinon, nous devons demander la permission à l'utilisateur
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
                // Si l'utilisateur accepte, créons une notification
                if (permission === 'granted') {
                    const notification = new Notification("La météo change !");
                }
            })
        }
    }
}

/**
 * Fonction qui ajoute une ligne dans l'historique des températures
 * @param temperature
 */
function historiserTemperature(temperature) {
    // Création d'un élément HTML de type li contenant la température et l'heure actuelle
    let ligne = document.createElement('li');
    ligne.innerHTML = temperature + '°C à ' + new Date().toLocaleTimeString();
    zoneHistorique.innerHTML += ligne.outerHTML;
}

/**
 * Fonction qui affiche la température dans l'élément HTML donnée
 * @param temperature
 * @param classTemperature
 * @param message
 */
function afficherTemperature(temperature, classTemperature, message) {
    zoneTemperature.innerHTML = temperature + '°C'
    zoneTemperature.classList.remove('froid', 'normal', 'chaud', 'tres-chaud');

    // ajoute a la div contenant la température une class permettant d'obtenir la bonne couleur de bordure
    zoneTemperature.classList.add(classTemperature);

    // suppression ou ajout d'un message si les températures sont extrêmes
    let zoneMessage = document.getElementById('message');
    zoneMessage.innerHTML = message;
}

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

// Récupération initiale des données
recupererTemperature(true);

// Appel de la fonction recupererTemperature toutes 5 minutes
setInterval(recupererTemperature, 300000);
