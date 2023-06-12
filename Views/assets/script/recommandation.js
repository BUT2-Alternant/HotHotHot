function afficherRecommandations(temp) {
    var recommendationsSidebar = document.getElementById("recommendations-sidebar");
    recommendationsSidebar.style.display = "block";

    var outfitIconsDiv = document.getElementById("outfit-icons");

    outfitIconsDiv.innerHTML = "";

    var recommendations = [
        { temperature: -10, items: [
                { image: "../assets/images/manteau.png", text: "Manteau chaud" },
                { image: "../assets/images/echarpe.png", text: "Écharpe" },
                { image: "../assets/images/gants.png", text: "Gants" }
            ] },
        { temperature: 0, items: [
                { image: "../assets/images/manteau.png", text: "Manteau chaud" },
                { image: "../assets/images/echarpe.png", text: "Écharpe" },
                { image: "../assets/images/gants.png", text: "Gants" }
            ] },
        { temperature: 10, items: [
                { image: "../assets/images/veste.png", text: "Veste légère" },
                { image: "../assets/images/t-shirt.png", text: "T-shirt" },
                { image: "../assets/images/pantalon.png", text: "Pantalon" }
            ] },
        { temperature: 20, items: [
                { image: "", text: "T-shirt" },
                { image: "../assets/images/pantalon.png", text: "Pantalon" }
            ] },
        { temperature: 30, items: [
                { image: "../assets/images/short.png", text: "Short" },
                { image: "../assets/images/t-shirt.png", text: "T-shirt" }
            ] },
        { temperature: 40, items: [
                { image: "../assets/images/tenue.png", text: "Tenue légère" },
                { image: "../assets/images/hydratation.png", text: "Hydratation" }
            ] }
    ];

    var nearestRecommendation = recommendations.reduce(function(prev, curr) {
        return Math.abs(curr.temperature - temp) < Math.abs(prev.temperature - temp) ? curr : prev;
    });

    if (nearestRecommendation) {
        nearestRecommendation.items.forEach(function(item) {
            var outfitIcon = document.createElement("div");
            outfitIcon.classList.add("outfit-icon");
            outfitIcon.innerHTML = "<img src='" + item.image + "' class='cloth'  alt=''/>";

            var outfitText = document.createElement("div");
            outfitText.classList.add("outfit-text");
            outfitText.textContent = item.text;

            outfitIconsDiv.appendChild(outfitIcon);
            outfitIconsDiv.appendChild(outfitText);
        });

        outfitIconsDiv.style.display = "none";
        setTimeout(function() {
            outfitIconsDiv.style.display = "flex";
        }, 100);
    }
}

afficherRecommandations(-6);
