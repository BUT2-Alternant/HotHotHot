export const O_TEMPERATURE_VALUES = {
    O_EXTERIOR: {
        O_COLD : {max: 0, message: "Banquise en vue !"},
        O_HOT : {min: 35, message: "Hot Hot Hot !"}
    },
    O_INTERIOR : {
        O_VERY_COLD : {max: 0, message: "Canalisations gelées, appelez SOS plombier et mettez un bonnet !"},
        O_COLD : {min: 0, max: 12, message: "Montez le chauffage ou mettez un gros pull !"},
        O_HOT : {min: 22, max: 50, message: "Baissez le chauffage !"},
        O_VERY_HOT : {min: 50, message: "Appelez les pompiers ou arrêtez votre barbecue !"}
    }
}

export const O_TEMPERATURE_LOCATION = {
    O_EXTERIOR : 0,
    O_INTERIOR: 1,
}