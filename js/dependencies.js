treatments = {
  "doctor1" : {
    name : "Visit your usual doctor",
    length : 19,
    benefit: 0,
    symptoms : [],
    chanceOfFailure: 0,
    message: "Doctor is concerned about your symptoms, but results are inclusive. More tests are needed. Make appointments for blood tests and an x-ray."
  },
  "bloodTest1" : {
    name : "Basic blood tests",
    length : 7,
    benefit: 0,
    symptoms : [],
    chanceOfFailure :0
  },
  "xray1" : {
    name : "Chest x-ray appointment",
    length : 7,
    benefit: 0,
    symptoms : [],
    chanceOfFailure: 0
  },
  "doctor2" : {
    name : "Appointment to review tests with your doctor",
    length : 19,
    benefit: 0,
    symptoms : [],
    chanceOfFailure: 0,
  },
  "oncologist1" : {
    name : "Appointment with oncologist",
    length : 7,
    benefit: 0,
    symptoms : [],
    chanceOfFailure: 0,
    prognosis: 365*2 // two years
  },
  "bloodTest2" : {
    name : "Blood taken for full work-up",
    length : 14,
    benefit: 0,
    symptoms : [],
    chanceOfFailure: 0
  },
  "mri" : {
    name : "MRI appointment",
    length : 14,
    benefit: 0,
    symptoms : [],
    chanceOfFailure: 0
  },
  "biopsy" : {
    name : "Biopsy procedure",
    length : 7,
    benefit: 0,
    symptoms : [],
    chanceOfFailure: 0
  },
  "oncologist2" : {
    name : "Oncologist to review test resutls",
    length : 10,
    benefit: 0,
    symptoms : [],
    chanceOfFailure: 0
  },
  "chemo1" : {
    name : "First chemotherapy appointment",
    length : 30,
    benefit: 0,
    symptoms : ["nausea", "lethargy"],
    chanceOfFailure: 0.2
  },
  "chemo2" : {
    name : "Second chemotherapy appointment",
    length : 30,
    benefit: 0,
    symptoms : ["extreme nausea", "lethary", "hair loss"],
    chanceOfFailure: 0.2
  },
  "surgery1" : {
    name : "Surgery to remove carcinoma and surrounding tissue",
    length : 14,
    benefit: 180,
    symptoms : ["pain", "hospitalized", "lack of mobility"],
    chanceOfFailure: 0.4
  }

}

treatmentGraph = {
  "doctor1" : [],
  "bloodTest1" : ["doctor1"],
  "xray1" : ["doctor1"],
  "doctor2": ["bloodTest1", "xray1"],
  "oncologist1" : ["doctor2"],
  "mri" : ["oncologist1"],
  "bloodTest2" : ["oncologist1"],
  "biopsy" : ["oncologist1"],
  "oncologist2" : ["mri", "bloodTest2", "biopsy"],
  "chemo1" : ["oncologist2"],
  "surgery1" : ["oncologist2"],
  "chemo2" : ["chemo1"],
}
