"use strict"

var App = App || {};



(function() {
  App.models = {};
  App.controllers = {};
  App.views ={};

  App.demographicAttributes = ["Age at Diagnosis (Calculated)",
                                "Gender",
                                "Aspiration rate Pre-therapy",
                                "Smoking status at Diagnosis (Never/Former/Current)",
                                "Race",
                                "HPV/P16 status",
                                //"ecog",
                                "Smoking status (Packs/Year)",
                                "Neck boost (Y/N)",
                                "Neck Disssection after IMRT (Y/N)"
                                ];
  App.kiviatDiagramAttributes = ["Gender", "Ethnicity", "Tcategory", "Site",
                                  "Nodal_Disease", 
                                  "Chemotherapy", "Local_Therapy"];

  App.cancerAttributes = ["Site",
                          "AJCC 7th edition",
                          "AJCC 8th edition",
                          "T-category",
                          "N-category",
                          "Pathological Grade",
                          "Tumor subsite (BOT/Tonsil/Soft Palate/Pharyngeal wall/GPS/NOS)",
                          "Affected Lymph node cleaned"
                          ];

  App.treatmentAttributes = ["Therapeutic combination",
                              "Local_Therapy",
                              "Treatment duration (Days)",
                              "Total dose",
                              "Total fractions",
                              "Dose/fraction (Gy)",
                              "Neck Dissection after IMRT (Y / levels)",
                              "Neck boost (Y/N)"];

  App.nomogramAxes =[         {
                                name:"Age at Diagnosis (Calculated)",
                                rangeShrink: [0,1],
                                domain: [25,90],
                                label: "AgeAtTx"
                              },
                              {
                                name:"Gender",
                                domain: ["Male","Female"],
                                rangeShrink: [0,0.058],
                                label: "Gender"
                              },
                              {
                                name:"HPV/P16 status",
                                rangeShrink: [0,0.386],
                                domain: ["Negative","Positive","Unknown"],
                                label: "HPV/P16"
                              },
                              {
                                name:"N-category",
                                rangeShrink: [0,0.386],
                                domain: ["N0","N3","N1","N2"],
                                label: "N-category"
                              },
                              {
                                name:"Neck boost (Y/N)",
                                rangeShrink: [0.08,0],
                                domain: ["N","Y"],
                                label: "Neck boost"
                              },
                              {
                                name:"Neck Disssection after IMRT (Y/N)",
                                rangeShrink: [0,0.1499],
                                domain: ["N","Y"],
                                label: "Neck dissection"
                              },
                              {
                                name:"Smoking status (Packs/Year)",
                                rangeShrink: [0,0.285],
                                tickValues: [0,30,60,90,120],
                                label: "Packs/Year"
                              },
                              {
                                name:"Smoking status at Diagnosis (Never/Former/Current)",
                                rangeShrink: [0,0.093],
                                domain: ["Former","Never","Current"],
                                label: "Smoking Status"
                              },
                              {
                                name:"T-category",
                                rangeShrink: [0,0.7484],
                                domain: ["Tis","T1","T2","T3","T4","Tx"],
                                label: "T-category"
                              },
                              {
                                name:"Tumor subsite (BOT/Tonsil/Soft Palate/Pharyngeal wall/GPS/NOS)",
                                rangeShrink: [0,0.1715],
                                domain:["Tonsil","BOT","Other"],
                                label: "Tumor Subsite"
                              },
                              {
                                name:"Race",
                                rangeShrink: [0,0.14],
                                domain:["White/Caucasion","Other"],
                                label: "Race"
                              },
                              {
                                name: "feeding_tube_prob",
                                label: "Predictive Probability",
                                tickValues:[0,1],
                                rangeShrink: [0,1]
                                //domain: [0,200]
                              }
                            ];


  App.aspirationAxes = [      {
                                name:"Age at Diagnosis (Calculated)",
                                rangeShrink: [0,0.49227],
                                domain: [25,90],
                                label: "AgeAtTx"
                              },
                              {
                                name:"Gender",
                                domain: ["Male","Female"],
                                rangeShrink: [0,0.2259],
                                label: "Gender"
                              },
                              {
                                name:"HPV/P16 status",
                                rangeShrink: [0,0.431],
                                domain: ["Negative","Positive","Unknown"],
                                label: "HPV/P16"
                              },
                              {
                                name:"N-category",
                                rangeShrink: [0,0.477],
                                domain: ["N0","N2","N1","N3"],
                                label: "N-category"
                              },
                              {
                                name:"Neck boost (Y/N)",
                                rangeShrink: [0.281,0],
                                domain: ["N","Y"],
                                label: "Neck boost"
                              },
                              {
                                name:"Neck Disssection after IMRT (Y/N)",
                                rangeShrink: [0,0.281],
                                domain: ["N","Y"],
                                label: "Neck dissection"
                              },
                              {
                                name:"Smoking status (Packs/Year)",
                                rangeShrink: [0,0.269],
                                tickValues: [0,30,60,90,120],
                                label: "Packs/Year"
                              },
                              {
                                name:"Smoking status at Diagnosis (Never/Former/Current)",
                                rangeShrink: [0,0.087],
                                domain: ["Former","Current","Never"],
                                label: "Smoking Status"
                              },
                              {
                                name:"T-category",
                                rangeShrink: [0,1],
                                domain: ["Tis","T1","T2","T3","T4","Tx"],
                                label: "T-category"
                              },
                              {
                                name:"Tumor subsite (BOT/Tonsil/Soft Palate/Pharyngeal wall/GPS/NOS)",
                                rangeShrink: [0,0.3],
                                domain:["Tonsil","BOT","Other"],
                                label: "Tumor Subsite"
                              },
                              {
                                name:"Race",
                                rangeShrink: [0.128,0],
                                domain:["White/Caucasion","Other"],
                                label: "Race"
                              },
                              {
                                name: "feeding_tube_prob",
                                label: "Predictive Probability",
                                tickValues:[0,1],
                                rangeShrink: [0,1]
                                //domain: [0,200]
                              }];
  App.progressionAxis = [       {
                                name:"Age at Diagnosis (Calculated)",
                                rangeShrink: [0,1],
                                domain: [25,90],
                                label: "AgeAtTx"
                              },
                              {
                                name:"Gender",
                                domain: ["Male","Female"],
                                rangeShrink: [0,0.101],
                                label: "Gender"
                              },
                              {
                                name:"HPV/P16 status",
                                rangeShrink: [0,0.45],
                                domain: ["Unknown","Positive","Negative"],
                                label: "HPV/P16"
                              },
                              {
                                name:"N-category",
                                rangeShrink: [0,0.1708],
                                domain: ["N0","N2","N3","N1"],
                                label: "N-category"
                              },
                              {
                                name:"Neck boost (Y/N)",
                                rangeShrink: [0.152,0],
                                domain: ["N","Y"],
                                label: "Neck boost"
                              },
                              {
                                name:"Neck Disssection after IMRT (Y/N)",
                                rangeShrink: [0,0.5267],
                                domain: ["N","Y"],
                                label: "Neck dissection"
                              },
                              {
                                name:"Smoking status (Packs/Year)",
                                rangeShrink: [0.4592,0],
                                tickValues: [0,60,120],
                                label: "Packs/Year"
                              },
                              {
                                name:"Smoking status at Diagnosis (Never/Former/Current)",
                                rangeShrink: [0,0.53],
                                domain: ["Never","Former","Current"],
                                label: "Smoking Status"
                              },
                              {
                                name:"T-category",
                                rangeShrink: [0,0.44],
                                domain: ["Tis","T4","T3","T1","T2","Tx"],
                                label: "T-category"
                              },
                              {
                                name:"Tumor subsite (BOT/Tonsil/Soft Palate/Pharyngeal wall/GPS/NOS)",
                                rangeShrink: [0,0.11],
                                domain:["Other","BOT","Tonsil"],
                                label: "Tumor Subsite"
                              },
                              {
                                name:"Race",
                                rangeShrink: [0,0.27],
                                domain:["White/Caucasion","Other"],
                                label: "Race"
                              },
                              {
                                name: "feeding_tube_prob",
                                label: "Predictive Probability",
                                tickValues:[0,1],
                                rangeShrink: [0,1]
                                //domain: [0,200]
                              }];

  App.overallAxis = [       {
                                name:"Age at Diagnosis (Calculated)",
                                rangeShrink: [0,1],
                                domain: [25,90],
                                label: "AgeAtTx"
                              },
                              {
                                name:"Gender",
                                domain: ["Male","Female"],
                                rangeShrink: [0.301,0],
                                label: "Gender"
                              },
                              {
                                name:"HPV/P16 status",
                                rangeShrink: [0,0.163],
                                domain: ["Unknown","Positive","Negative"],
                                label: "HPV/P16"
                              },
                              {
                                name:"N-category",
                                rangeShrink: [0,0.288],
                                domain: ["N2","N1","N0","N3"],
                                label: "N-category"
                              },
                              {
                                name:"Neck boost (Y/N)",
                                rangeShrink: [0.102,0],
                                domain: ["N","Y"],
                                label: "Neck boost"
                              },
                              {
                                name:"Neck Disssection after IMRT (Y/N)",
                                rangeShrink: [0,0.0935],
                                domain: ["N","Y"],
                                label: "Neck dissection"
                              },
                              {
                                name:"Smoking status (Packs/Year)",
                                rangeShrink: [0,0.1564],
                                tickValues: [0,30,60,90,120],
                                label: "Packs/Year"
                              },
                              {
                                name:"Smoking status at Diagnosis (Never/Former/Current)",
                                rangeShrink: [0,0.3439],
                                domain: ["Never","Former","Current"],
                                label: "Smoking Status"
                              },
                              {
                                name:"T-category",
                                rangeShrink: [0,0.6725],
                                domain: ["Tis","T1","T2","T3","T4","Tx"],
                                label: "T-category"
                              },
                              {
                                name:"Tumor subsite (BOT/Tonsil/Soft Palate/Pharyngeal wall/GPS/NOS)",
                                rangeShrink: [0,0.0877],
                                domain:["BOT","Other","Tonsil"],
                                label: "Tumor Subsite"
                              },
                              {
                                name:"Race",
                                rangeShrink: [0,0.2159],
                                domain:["White/Caucasion","Other"],
                                label: "Race"
                              },
                              {
                                name: "feeding_tube_prob",
                                label: "Predictive Probability",
                                tickValues:[0,1],
                                rangeShrink: [0,1]
                                //domain: [0,200]
                              }];
App.category10colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
"#393b79", "#637939", "#7f7f7f", "#bcbd22", "#843c39"];

App.attributeColors = d3.scaleOrdinal(App.category10colors);
App.cohortVariables = ["Dummy ID","Tm Laterality (R/L)","Affected Lymph nodes","Treatment duration (Days)","Dose/fraction (Gy)","ROI"];


  App.init=function() {

    App.models.patient=new PatientModel();
    App.models.applicationState = new ApplicationStateModel();
    //App.models.kaplanMeierPatient = new KaplanMeierPatientModel();

    App.controllers.patientSelector = new InputFillController();
    App.controllers.nomogramSelector = new NomogramSelector();

    App.models.patient.loadPatients().then(function(){

      App.controllers.patientSelector.populatePatientDropdown();
      App.controllers.patientSelector.selectPatient(".idSelect");
      if(!(window.location.pathname==='/'))
      {
        App.models.applicationState.setSelectedPatientID(localStorage.getItem("Select"));
        console.log(App.models.applicationState.getSelectedPatientID());
      }
      App.views.nomogram = new NomogramView("#demoNomogram");

      App.controllers.nomogram = new NomogramOptions("#nomogramOptions");
      App.controllers.axisControl = new AxisSlider();
      App.controllers.nomogramSelector.init();
      /*App.controllers.kaplanOptions = new KaplanMeierOptions("#kaplanOptions");
      App.controllers.kaplanOptions.selectOption("#kaplanOptions");

      App.views.kaplanMeier = new KaplanMeierView("#kaplanMeier");

      App.models.kaplanMeierPatient.initPatients(App.models.patient.getPatients(),App.demographicAttributes[1]);
      let maxOS = App.models.kaplanMeierPatient.getMaxOS();
      App.views.kaplanMeier.setMaxOS(maxOS);
      let x=App.models.kaplanMeierPatient.getKaplanMeierPatients();
      let a = App.views.kaplanMeier.update(x);
      */
      App.views.cohort = new CohortView();

      //App.views.kiviat = new KiviatDiagramView("#kiviatDiagramSection");
    })
    .catch(function(err) {
              console.log("Promise Error", err);
          });

  };

})();
function changeNomogram(d)
{
  console.log($(this).val());
}
window.addEventListener("load",App.init,false);