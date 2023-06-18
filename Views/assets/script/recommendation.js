class RecommandationsManager {
    static afficherRecommandations(temp) {
        temp = Math.round(temp);

        let recommendationsSidebar = document.getElementById("recommendations-sidebar");

        if (recommendationsSidebar.style.display === "none")
            recommendationsSidebar.style.display = "block";

        let outfitIconsDiv = document.getElementById("outfit-icons");

        let previousRecommendation = outfitIconsDiv.dataset.recommendation;
        let newRecommendation = "";

        let recommendations = [
            {
                temperature: -10, items: [
                    {image: "../assets/images/manteau.png", text: "Manteau chaud"},
                    {image: "../assets/images/echarpe.png", text: "Écharpe"},
                    {image: "../assets/images/gants.png", text: "Gants"}
                ]
            },
            {
                temperature: 0, items: [
                    {image: "../assets/images/manteau.png", text: "Manteau chaud"},
                    {image: "../assets/images/echarpe.png", text: "Écharpe"},
                    {image: "../assets/images/gants.png", text: "Gants"}
                ]
            },
            {
                temperature: 10, items: [
                    {image: "../assets/images/veste.png", text: "Veste légère"},
                    {image: "../assets/images/t-shirt.png", text: "T-shirt"},
                    {image: "../assets/images/pantalon.png", text: "Pantalon"}
                ]
            },
            {
                temperature: 20, items: [
                    {image: "../assets/images/t-shirt.png", text: "T-shirt"},
                    {image: "../assets/images/pantalon.png", text: "Pantalon"}
                ]
            },
            {
                temperature: 30, items: [
                    {image: "../assets/images/short.png", text: "Short"},
                    {image: "../assets/images/t-shirt.png", text: "T-shirt"}
                ]
            },
            {
                temperature: 40, items: [
                    {image: "../assets/images/maillots-de-bain.png", text: "Tenue légère"},
                    {image: "../assets/images/hydratation.png", text: "Hydratation"}
                ]
            }
        ];

        let nearestRecommendation = recommendations.reduce(function (prev, curr) {
            return Math.abs(curr.temperature - temp) < Math.abs(prev.temperature - temp) ? curr : prev;
        });

        if (nearestRecommendation) {
            newRecommendation = JSON.stringify(nearestRecommendation);
            if (newRecommendation !== previousRecommendation) {
                outfitIconsDiv.innerHTML = "";

                nearestRecommendation.items.forEach(function (item) {
                    let outfitIcon = document.createElement("div");
                    outfitIcon.classList.add("outfit-icon");
                    outfitIcon.innerHTML = "<img src='" + item.image + "' class='cloth' alt=''/>";

                    let outfitText = document.createElement("div");
                    outfitText.classList.add("outfit-text");
                    outfitText.textContent = item.text;

                    outfitIconsDiv.appendChild(outfitIcon);
                    outfitIconsDiv.appendChild(outfitText);
                });

                outfitIconsDiv.dataset.recommendation = newRecommendation;

                outfitIconsDiv.style.display = "none";
                setTimeout(function () {
                    outfitIconsDiv.style.display = "flex";
                }, 100);
            }
        }
    }
}

export default RecommandationsManager;
