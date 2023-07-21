// User data array
const userData = [

{ date: "12/02/2023", time:"14:35", rentpoint: "Aberdeen University Hire Point",caloriesburned:"137 Kcal" ,usedminutes:"60 min",fee:"£35" },
{ date: "14/02/2023", time:"01:41", rentpoint: "Robert Gordon University Hire Point",caloriesburned:"194 Kcal" ,usedminutes:"85 min",fee:"£46" },
{ date: "18/02/2023", time:"09:03", rentpoint: "Aberdeen City Council Point",caloriesburned:"137 Kcal" ,usedminutes:"120 min",fee:"£65" },
{ date: "02/03/2023", time:"11:42", rentpoint: "Aberdeen University Hire Point",caloriesburned:"137 Kcal" ,usedminutes:"60 min",fee:"£35" },
{ date: "11/03/2023", time:"10:22", rentpoint: "Aberdeen City Council Hire Point",caloriesburned:"194 Kcal" ,usedminutes:"95 min",fee:"£45" },
{ date: "12/03/2023", time:"09:38", rentpoint: "Aberdeen University Hire Point",caloriesburned:"137 Kcal" ,usedminutes:"140 min",fee:"£70" },
{ date: "10/04/2023", time:"11:09", rentpoint: "Robert Gordon University Hire Point",caloriesburned:"137 Kcal" ,usedminutes:"60 min",fee:"£35" },
{ date: "22/04/2023", time:"15:35", rentpoint: "Aberdeen City Council Hire Point",caloriesburned:"194 Kcal" ,usedminutes:"190 min",fee:"£92" },
{ date: "26/04/2023", time:"16:05", rentpoint: "Aberdeen University Hire Point",caloriesburned:"137 Kcal" ,usedminutes:"60 min",fee:"£35" },
{ date: "01/05/2023", time:"08:35", rentpoint: "Aberdeen City Council Hire Point",caloriesburned:"137 Kcal" ,usedminutes:"35 min",fee:"£25" },
{ date: "08/05/2023", time:"11:12", rentpoint: "Robert Gordon University Hire Point",caloriesburned:"194 Kcal" ,usedminutes:"75 min",fee:"£39" },
{ date: "15/05/2023", time:"13:06", rentpoint: "Aberdeen University Hire Point",caloriesburned:"137 Kcal" ,usedminutes:"60 min",fee:"£35" }
];


// Map Data array
var rentPointData = [
    /* Aberdeen City Center */
    L.marker([57.149651, -2.09907]).bindPopup('Aberdeen City Center'),

    /* Robert Gordon University Bike Hire Point */
    L.marker([57.1189, -2.1379]).bindPopup('Robert Gordon University Bike Hire Point'),

     /* Aberdeen city council bike hire point position */
    L.marker([57.13143, -2.117009]).bindPopup('Aberdeen City Council Bike Hire Point'),

    /* Aberdeen University bike hire point position */
    L.marker([57.1648, -2.1015]).bindPopup('Aberdeen University Bike Hire Point')
];
