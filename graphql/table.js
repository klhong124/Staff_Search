// NWC staff skill table
var col = [
    "Material",
    "Testing",
    "Management",
    "Supervision",
    "Hand On",
    "New Skill",
];

var row =
[
      {
          Location:"New Location",
          trades:[
              {   Trade:"New Trade",
                  specialities:[
                      { Speciality: "Speciality 1" },
                      { Speciality: "Speciality 2" },
                      { Speciality: "Speciality 3" },
                      { Speciality: "Speciality 4" },
                      ]
              },{
                  Trade:"New Trade 2",
                  specialities:[
                      { Speciality: "Speciality 5" },
                      { Speciality: "Speciality 6" },
                  ]
              }
          ]
      },{
          Location:"Site Formation",
          trades:[
              {   Trade:"Demolition",
                  specialities:[
                      { Speciality: "Scaffold" },
                      { Speciality: "Demolish" },
                      { Speciality: "Shoring" },
                      { Speciality: "Plant Operation" },
                      { Speciality: "Material Disposal" },
                      { Speciality: "Safety Control" },
                      { Speciality: "Environmental Contral" },
                      { Speciality: "Utility Co-ordination" },
                      ]
              },{
                  Trade:"Excavation",
                  specialities:[
                      { Speciality: "Excavating" },
                      { Speciality: "Backfilling" },
                      { Speciality: "Tree Felling" },
                      { Speciality: "Slope Treatment" },
                      { Speciality: "Plank Operation" },
                      { Speciality: "Material Disposal" },
                      { Speciality: "Safety Control" },
                      { Speciality: "Environmental Contral" },
                      { Speciality: "Utility Co-ordination" }
                  ]
              }
          ]
      },{
        Location:"Preliminaries",
        trades:[
            {   Trade:"Plant & Equipment",
                specialities:[
                    { Speciality: "Supply" },
                    { Speciality: "Erect" },
                    { Speciality: "Maintainence" },
                    { Speciality: "Compliance" }
                    ]
            },{
                Trade:"Survey",
                specialities:[
                    { Speciality: "Boundary Survey" },
                    { Speciality: "Building Verticality" },
                    { Speciality: "Setting Out" }
                    ]
            },{
                Trade:"Safety",
                specialities:[
                    { Speciality: "Control" },
                    { Speciality: "Compliance" }
                    ]
            },{
                Trade:"Environmental",
                specialities:[
                    { Speciality: "Control" },
                    { Speciality: "Compliance" }
                    ]
            },{
                Trade:"Contract",
                specialities:[
                    { Speciality: "Taking Off" },
                    { Speciality: "Estimating" },
                    { Speciality: "Subletting" },
                    { Speciality: "Insurance & Bonds" },
                    { Speciality: "Final Accounts" }
                    ]
            },{
                Trade:"Hoarding",
                specialities:[
                    { Speciality: "Erect & Dismantle" },
                    { Speciality: "Graphic" },
                    { Speciality: "Electrical Lighting" },
                    ]
            }
        ]
    },{
        Location:"Substructure",
        trades:[
            {
                Trade:"Piling",
                specialities:[
                    { Speciality: "Driven Pile" },
                    { Speciality: "Bored Pile" }
                    ]
            }
        ]
    },{
        Location:"Superstucture",
        trades:[
            {
                Trade:"Concretor",
                specialities:[
                    { Speciality: "Concrete" },
                    { Speciality: "Reinforcement" },
                    { Speciality: "Coupler" },
                    { Speciality: "Formwork" },
                    { Speciality: "Precast" },
                    { Speciality: "Prestressed" }
                    ]
            },{
                Trade:"Bricklayer",
                specialities:[
                    { Speciality: "Laying" }
                    ]
            },{
                Trade:"Drainlayer",
                specialities:[
                    { Speciality: " " }
                    ]
            },{
                Trade:"Asphalter",
                specialities:[
                    { Speciality: " " }
                    ]
            },{
                Trade:"Stone Mason",
                specialities:[
                    { Speciality: "Structural" },
                    { Speciality: "Cladding" }
                    ]
            },{
                Trade:"Roofer",
                specialities:[
                    { Speciality: "Waterproofing" },
                    { Speciality: "Inulstion" },
                    { Speciality: "Tiling" }
                    ]
            },{
                Trade:"Carpenter, Joiner & Ironmonger",
                specialities:[
                    { Speciality: "Timber Flooring" },
                    { Speciality: "Ceiling" },
                    { Speciality: "Linings" },
                    { Speciality: "Decoration" },
                    { Speciality: "Doors" },
                    { Speciality: "Kitchen Cabinets" },
                    { Speciality: "Windows" },
                    { Speciality: "Stuctural" }
                    ]
            },{
                Trade:"Steel & Metal",
                specialities:[
                    { Speciality: "Stuctural" },
                    { Speciality: "Fittings" },
                    { Speciality: "Windows & Doors" },
                    { Speciality: "Welding" },
                    { Speciality: "Metal Ceiling" }
                    ]
            },{
                Trade:"Plasterer",
                specialities:[
                    { Speciality: "Internal Plastering" },
                    { Speciality: "External Plastering" },
                    { Speciality: "Tiling" },
                    { Speciality: "Metal Lathing" },
                    { Speciality: "Mastic Pointing" },
                    { Speciality: "Raise Floor" }
                    ]
            },{
                Trade:"Glazier",
                specialities:[
                    { Speciality: "Sheet Glass" },
                    { Speciality: "Mirror" },
                    { Speciality: "Glass Block" }
                    ]
            },{
                Trade:"Painter",
                specialities:[
                    { Speciality: "Painting" },
                    { Speciality: "Wall Paper" }
                    ]
            }
        ]
    },{
        Location:"Specialist",
        trades:[
            {
                Trade:"Plumber & Drainlayer",
                specialities:[
                    { Speciality: "Pressure Pipe" }
                    ]
            },{
                Trade:"Fire Services",
                specialities:[
                    { Speciality: "Non-pressure Pipe Installation" },
                    { Speciality: "Fittings Installation" },
                    { Speciality: "Pumps Installaion" },
                    { Speciality: "Electricity Wiring" },
                    { Speciality: "Design" },
                    { Speciality: "Connection Application" }
                    ]
            },{
                Trade:"Curtain Walls",
                specialities:[
                    { Speciality: "Design" },
                    { Speciality: "Production" },
                    { Speciality: "Logistic" },
                    { Speciality: "Installation" }
                    ]
            }
        ]
    },
]
module.exports.col = col;
module.exports.row = row;
