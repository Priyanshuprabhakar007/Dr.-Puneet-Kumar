import { AppData } from '../types';

export const initialData: AppData = {
  settings: {
    siteName: 'Dr. Puneet Kumar Pulmonology',
    doctorName: 'Dr. Puneet Kumar',
    title: 'Consultant – Pulmonary Medicine',
    tagline: 'Breathe Better. Sleep Better. Live Better.',
    primaryPhone: '+91 98765 43210',
    secondaryPhone: '+91 172 4567890',
    whatsappNumber: '+919876543210',
    email: 'contact@drpuneetkumar.com',
    primaryAddress: 'Livasa Hospital, Sector 71, Sahibzada Ajit Singh Nagar, Punjab 160071',
    city: 'Mohali',
    state: 'Punjab',
    consultationTimings: 'Mon - Sat: 10:00 AM - 2:00 PM & 5:00 PM - 8:00 PM | Sun: By Appointment',
    emergencyNotice: 'For acute emergencies (chest pain, stroke, severe breathlessness), please visit the nearest hospital emergency room immediately.',
    registrationNumber: 'PMC-42890'
  },
  hero: {
    smallHeading: 'Senior Physician & Diabetes Specialist',
    mainHeadline: 'Helping You Live Better, Beyond Diabetes.',
    supportingCopy: 'Personalised care for diabetes, obesity, hypertension, thyroid disorders, infections, respiratory conditions, and a wide range of general medical concerns with a patient-first ethos.',
    primaryButtonLabel: 'Book Appointment',
    primaryButtonUrl: '/book-appointment',
    secondaryButtonLabel: 'Call Now',
    secondaryButtonUrl: 'tel:+919876543210',
    doctorPhotoUrl: '41f7ab1c-6d57-4048-b31a-9ccd54ac484f.png',
    experienceYears: '12+ Years Experience',
    specializationBadge: 'Pulmonology Specialist',
    internalMedicineBadge: 'Chest Physician (MD)',
    patientCareBadge: 'Comprehensive Lung Care'
  },
  doctorProfile: {
    name: 'Dr. Puneet Kumar',
    designation: 'Consultant – Pulmonary Medicine',
    shortBio: 'Dr. Puneet Kumar is a leading Chest Physician and Pulmonology Specialist dedicated to managing complex respiratory conditions and sleep disorders.',
    fullBio: [
      'Dr. Puneet Kumar has over 12 years of clinical excellence in Pulmonary Medicine and Critical Care. Having treated thousands of patients across leading tertiary-care hospital networks in the Tricity (including SGHS Sohana, Indus Super Specialty Hospital, MAX Super Specialty Hospital Mohali, and Fortis Hospital Mohali), Dr. Puneet is renowned for his expertise in complex lung diseases.',
      'He believes in evidence-based respiratory care combined with thorough patient education. Conditions such as Asthma, COPD, and Interstitial Lung Disease require more than just prescriptions—they require a sustained therapeutic partnership focusing on lung function maintenance and lifestyle optimization.',
      'Dr. Puneet regularly participates in national and international pulmonary colloquiums, ensuring his patients receive the latest guideline-directed therapeutics, advanced interventional protocols, and comprehensive sleep medicine solutions.'
    ],
    photoUrl: '41f7ab1c-6d57-4048-b31a-9ccd54ac484f.png',
    secondaryPhotoUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=900&auto=format&fit=crop',
    degrees: 'MBBS, MD (Medicine), DM (Pulmonology)',
    experienceYears: 12,
    patientsTreated: '25,000+',
    clinicalFocus: [
      'Asthma & COPD Management',
      'Interstitial Lung Disease (ILD)',
      'Sleep-Related Breathing Disorders',
      'Advanced Interventional Pulmonology',
      'Tuberculosis & Infectious Lung Diseases',
      'Pleural Diseases & Effusions',
      'Critical Care Medicine'
    ],
    philosophy: 'Breathing is the foundation of life. My goal is to ensure every patient can breathe easily and live a full, active life through precision medicine.'
  },
  qualifications: [
    {
      id: 'q-1',
      degree: 'MD (Doctor of Medicine) - Internal Medicine',
      institution: 'Renowned Government Medical College & Hospital',
      year: '2014',
      description: 'Comprehensive 3-year post-graduate residency focusing on acute emergency medicine, intensive care, complex diagnostics, and multi-system chronic disease management.',
      order: 1
    },
    {
      id: 'q-2',
      degree: 'Fellowship in Diabetes Mellitus (FIDM)',
      institution: 'Premier Diabetes Education & Research Academy',
      year: '2016',
      description: 'Advanced clinical fellowship addressing clinical diabetology, insulin pump therapy, CGMS, gestational diabetes, and diabetic micro/macro-vascular complication mitigation.',
      order: 2
    },
    {
      id: 'q-3',
      degree: 'MBBS (Bachelor of Medicine & Bachelor of Surgery)',
      institution: 'Prestigious Medical University',
      year: '2010',
      description: 'Rigorous foundational medical and surgical training followed by a comprehensive rotating clinical internship across all core medical specialties.',
      order: 3
    },
    {
      id: 'q-4',
      degree: 'Postgraduate Certificate in Hypertension & Cardio-Metabolic Health',
      institution: 'National Medical Council & Specialty Board',
      year: '2018',
      description: 'Specialized clinical certification in ambulatory blood pressure monitoring, resistant hypertension protocols, and cardiac risk assessment in diabetic patients.',
      order: 4
    },
    {
      id: 'q-5',
      degree: 'Advanced Certification in Thyroid & Endocrine Disorders',
      institution: 'Endocrine Society of Clinical Practitioners',
      year: '2020',
      description: 'In-depth protocols for subclinical hypothyroidism, Hashimoto’s thyroiditis, nodular thyroid diseases, and pregnancy-associated thyroid abnormalities.',
      order: 5
    }
  ],
  experience: [
    {
      id: 'exp-1',
      hospital: 'Dr. Puneet Kumar Clinic & Diabetes Care Center',
      designation: 'Senior Consultant Physician & Diabetologist',
      duration: '2021 - Present',
      description: 'Head of clinic delivering comprehensive outpatient consultations, advanced diabetic foot evaluations, ambulatory glucose monitoring, and personalized wellness plans.',
      order: 1,
      active: true
    },
    {
      id: 'exp-2',
      hospital: 'SGHS Super Specialty Hospital, Sohana',
      designation: 'Senior Consultant - Internal Medicine',
      duration: '2018 - 2021',
      description: 'Led in-patient internal medicine wards and acute medical emergencies, managed complex multi-morbid diabetic cases and infectious disease outbreaks.',
      order: 2,
      active: true
    },
    {
      id: 'exp-3',
      hospital: 'Indus Super Specialty Hospital, Mohali',
      designation: 'Consultant Physician & Diabetologist',
      duration: '2016 - 2018',
      description: 'Spearheaded the dedicated diabetic outpatient clinic, gestational diabetes screening camps, and critical care medical consultations.',
      order: 3,
      active: true
    },
    {
      id: 'exp-4',
      hospital: 'MAX Super Specialty Hospital, Mohali',
      designation: 'Associate Consultant - Department of Internal Medicine',
      duration: '2014 - 2016',
      description: 'Provided tertiary level inpatient management, preoperative medical clearances, post-operative diabetic glycemic control, and intensive ICU step-down care.',
      order: 4,
      active: true
    },
    {
      id: 'exp-5',
      hospital: 'Fortis Hospital, Mohali',
      designation: 'Senior Resident - Internal Medicine & Critical Care',
      duration: '2013 - 2014',
      description: 'Handled high-acuity medical intensive care unit (MICU), acute respiratory distress, severe septicemia, and emergency cardio-metabolic resuscitation.',
      order: 5,
      active: true
    }
  ],
  treatmentCategories: [
    { id: 'cat-1', name: 'Diabetes & Metabolic Care', order: 1 },
    { id: 'cat-2', name: 'Blood Pressure & Cardiovascular Risk', order: 2 },
    { id: 'cat-3', name: 'Thyroid Disorders', order: 3 },
    { id: 'cat-4', name: 'Respiratory Conditions', order: 4 },
    { id: 'cat-5', name: 'Fever & Infectious Conditions', order: 5 },
    { id: 'cat-6', name: 'General Medicine', order: 6 },
    { id: 'cat-7', name: 'Liver & Digestive Conditions', order: 7 },
    { id: 'cat-8', name: 'Joint & Musculoskeletal Conditions', order: 8 }
  ],
  treatments: [
    {
      id: 't-1',
      slug: 'diabetes-management',
      title: 'Diabetes Mellitus (Type 1 & Type 2)',
      categoryId: 'cat-1',
      iconName: 'Activity',
      shortDescription: 'Comprehensive management of blood glucose, HbA1c reduction, insulin adjustment, and chronic complication prevention.',
      fullOverview: 'Diabetes Mellitus is a metabolic condition characterized by elevated blood glucose levels due to insulin deficiency or insulin resistance. Dr. Puneet Kumar specializes in precise glycemic control using personalized pharmacological regimens, continuous glucose sensors (CGM), lifestyle redesign, and early organ-protective therapies (kidneys, eyes, heart, and nerves).',
      symptoms: [
        'Frequent urination (polyuria), especially at night',
        'Excessive thirst (polydipsia) and unquenchable dry mouth',
        'Unexplained weight loss despite constant hunger',
        'Chronic fatigue, daytime drowsiness, and low stamina',
        'Blurred vision or fluctuating eyesight',
        'Slow-healing cuts, recurrent skin boils or fungal infections',
        'Tingling, numbness, or burning sensation in feet and hands'
      ],
      causes: [
        'Insulin resistance aggravated by visceral adiposity and physical inactivity',
        'Genetic predisposition and family history of metabolic syndromes',
        'Beta-cell dysfunction in the pancreas',
        'Sedentary lifestyle and diets high in refined carbohydrates and sugars',
        'Chronic mental and physical stress elevating cortisol levels'
      ],
      diagnosticApproach: [
        'Fasting Blood Glucose (FBG) and Post-Prandial Blood Glucose (PPBG)',
        'Glycated Hemoglobin (HbA1c) to assess 3-month average glucose',
        'Serum Fasting Insulin and HOMA-IR for insulin resistance evaluation',
        'Urine Microalbumin/Creatinine Ratio to detect early diabetic nephropathy',
        'Comprehensive Lipid Profile and Liver Function Tests',
        'Diabetic Peripheral Neuropathy screening via monofilament and vibration perception tests'
      ],
      treatmentProtocol: [
        'Guideline-directed oral hypoglycemic agents (Metformin, SGLT2 inhibitors, DPP4 inhibitors, GLP-1 receptor agonists)',
        'Physiological basal-bolus or premix insulin titration for patients with advanced deficiency',
        'Structured medical nutrition therapy (MNT) tailored to North Indian and South Asian dietary habits',
        'Guidance on Continuous Glucose Monitoring (CGM) sensors for real-time glycemic insights',
        'Annual screening for diabetic retinopathy, nephropathy, and peripheral vascular disease'
      ],
      whenToConsult: [
        'HbA1c is persistently above 7.0% despite regular medications',
        'Experiencing frequent episodes of shakiness, sweating, or dizziness (hypoglycemia)',
        'Persistent burning, pins-and-needles sensation, or numbness in the feet',
        'A newly diagnosed case seeking an accurate, non-confusing treatment plan'
      ],
      isFeaturedCondition: true,
      published: true,
      order: 1
    },
    {
      id: 't-2',
      slug: 'high-blood-pressure',
      title: 'High Blood Pressure (Hypertension)',
      categoryId: 'cat-2',
      iconName: 'HeartPulse',
      shortDescription: 'Early detection, 24-hour ambulatory monitoring, and targeted cardio-protective therapy for essential & secondary hypertension.',
      fullOverview: 'Hypertension is often called the "silent killer" because it damages arteries and vital organs for years without causing noticeable symptoms. Dr. Puneet Kumar provides structured evaluation to stabilize systolic and diastolic pressures, screen for secondary causes, and protect against stroke, heart failure, and renal decline.',
      symptoms: [
        'Often completely asymptomatic in early and moderate stages',
        'Morning occipital headaches or throbbing sensation at the back of the head',
        'Lightheadedness, episodic dizziness, or unsteadiness',
        'Shortness of breath during routine exertion',
        'Nosebleeds (epistaxis) during sudden hypertensive spikes',
        'Visual blurring or seeing dark spots'
      ],
      causes: [
        'Essential hypertension: age-related arterial stiffness and genetic traits',
        'Excess dietary sodium intake and low dietary potassium',
        'High stress levels, obesity, and obstructive sleep apnea (OSA)',
        'Secondary causes: Renal artery stenosis, hyperaldosteronism, thyroid dysfunction',
        'Excessive alcohol consumption and smoking'
      ],
      diagnosticApproach: [
        'Standardized in-clinic blood pressure mapping with validated instruments',
        'Ambulatory Blood Pressure Monitoring (ABPM) to detect nocturnal non-dipping and white-coat hypertension',
        '12-Lead Electrocardiogram (ECG) and 2D Echocardiography',
        'Renal function tests (serum creatinine, electrolytes, eGFR)',
        'Fasting lipid profile and urine albumin test'
      ],
      treatmentProtocol: [
        'Individualized anti-hypertensive therapy (ACE inhibitors, ARBs, CCBs, Diuretics)',
        'DASH (Dietary Approaches to Stop Hypertension) dietary protocol',
        'Salt restriction (<5g per day) and weight optimization guidance',
        'Management of concomitant diabetes and hyperlipidemia'
      ],
      whenToConsult: [
        'Blood pressure readings consistently above 130/85 mmHg at home',
        'Frequent morning headaches or chest tightness',
        'Existing medications failing to control erratic spikes'
      ],
      isFeaturedCondition: true,
      published: true,
      order: 2
    },
    {
      id: 't-3',
      slug: 'thyroid-disorders',
      title: 'Thyroid Disorders (Hypo & Hyperthyroidism)',
      categoryId: 'cat-3',
      iconName: 'ShieldAlert',
      shortDescription: 'Accurate hormonal evaluation, levothyroxine dose optimization, and antibody screening for Hashimoto’s and thyroid nodules.',
      fullOverview: 'The thyroid gland regulates the metabolic rate of virtually every organ. Imbalances can cause unexplained weight fluctuations, mood changes, extreme lethargy, hair loss, and menstrual irregularities. Dr. Puneet Kumar performs nuanced hormonal titration to restore physiological vitality.',
      symptoms: [
        'Hypothyroidism: Unexplained weight gain, extreme cold intolerance, dry skin, constipation, puffy face, hair loss, depression, and sluggishness',
        'Hyperthyroidism: Rapid weight loss despite hearty appetite, heat intolerance, hand tremors, rapid heartbeats (palpitations), anxiety, insomnia',
        'Visible neck swelling (goiter) or discomfort upon swallowing'
      ],
      causes: [
        'Hashimoto’s Thyroiditis (autoimmune destruction of thyroid tissue)',
        'Graves’ Disease (autoimmune overstimulation)',
        'Post-viral subacute thyroiditis',
        'Dietary iodine imbalance or micronutrient deficiencies (selenium, zinc)',
        'Postpartum thyroid dysfunction'
      ],
      diagnosticApproach: [
        'High-sensitivity Serum TSH, Free T3, and Free T4',
        'Anti-TPO and Anti-Thyroglobulin antibody titers',
        'High-resolution Ultrasonography (USG) of the thyroid gland with TIRADS grading',
        'Lipid profile and Complete Blood Count (to check associated anemia)'
      ],
      treatmentProtocol: [
        'Precise weight-based Levothyroxine therapy with empty-stomach dosing rules',
        'Anti-thyroid medications (Methimazole/Carbimazole) and beta-blockers for hyperthyroid state',
        'Correction of co-existing Vitamin D3, B12, and ferritin deficiencies',
        'Regular 6-8 week TSH monitoring until complete biochemical euthyroidism'
      ],
      whenToConsult: [
        'Persistent lethargy and weight gain despite diet control',
        'Palpitations, shaky hands, or bulging eyes',
        'Family history of thyroid diseases or abnormal pregnancy screening'
      ],
      isFeaturedCondition: true,
      published: true,
      order: 3
    },
    {
      id: 't-4',
      slug: 'fever-and-infections',
      title: 'Fever & Infectious Diseases',
      categoryId: 'cat-5',
      iconName: 'Thermometer',
      shortDescription: 'Rapid diagnosis and rational management of Dengue, Typhoid, Malaria, Scrub Typhus, viral syndromes, and seasonal fevers.',
      fullOverview: 'Fever is the immune system’s response to infection, but acute tropical fevers require prompt clinical differentiation to avoid critical complications such as thrombocytopenia, shock, or hepatic involvement. Dr. Puneet Kumar focuses on rational antibiotic stewardship and evidence-based supportive care.',
      symptoms: [
        'High body temperature above 101°F with chills or rigors',
        'Severe retro-orbital (behind the eye) headache and joint/muscle aching ("breakbone fever")',
        'Skin rashes, petechiae, or unusual bruising',
        'Abdominal cramping, persistent nausea, and vomiting',
        'Profuse sweating followed by sudden weakness'
      ],
      causes: [
        'Mosquito-borne viral infections (Dengue, Chikungunya)',
        'Enteric fever (Typhoid / Salmonella infection) via contaminated water/food',
        'Vector-borne bacterial diseases (Scrub Typhus, Leptospirosis)',
        'Upper and lower viral respiratory tract infections (Influenza, RSV, Adenovirus)',
        'Urinary tract infections spreading to the kidneys'
      ],
      diagnosticApproach: [
        'Complete Blood Count (CBC) with peripheral blood smear and platelet tracking',
        'Dengue NS1 Antigen, IgM/IgG serology',
        'Typhidot & Blood cultures for Enteric fever',
        'Rapid Malaria Antigen and microscopic blood smear examination',
        'Liver Function Tests (LFT) and C-Reactive Protein (CRP)'
      ],
      treatmentProtocol: [
        'Meticulous oral and intravenous hydration therapy for Dengue',
        'Targeted antimicrobial therapy based on culture sensitivity (rational antibiotic use)',
        'Safe antipyretic administration avoiding NSAIDs in suspected platelet drop',
        'Close daily monitoring of vital signs and laboratory markers'
      ],
      whenToConsult: [
        'Fever persisting beyond 48 hours or spiking above 102°F',
        'Platelet count showing a declining trend',
        'Warning signs: severe abdominal pain, persistent vomiting, bleeding gums, or extreme lethargy'
      ],
      isFeaturedCondition: true,
      published: true,
      order: 4
    },
    {
      id: 't-5',
      slug: 'asthma-and-copd',
      title: 'Asthma & COPD (Respiratory Disorders)',
      categoryId: 'cat-4',
      iconName: 'Wind',
      shortDescription: 'Spirometry interpretation, metered dose inhaler technique correction, and personalized allergy action plans.',
      fullOverview: 'Chronic airway inflammation in Bronchial Asthma and Chronic Obstructive Pulmonary Disease (COPD) causes distressing breathlessness, nocturnal coughing, and wheezing. Dr. Puneet Kumar employs international GINA and GOLD guidelines to ensure patients achieve unrestricted daily living without frequent emergency nebulizations.',
      symptoms: [
        'Intermittent or chronic wheezing (whistling sound during exhalation)',
        'Persistent dry or productive cough, especially early morning or night',
        'Chest tightness and inability to take a deep, satisfying breath',
        'Breathlessness triggered by dust, pollen, seasonal changes, smoke, or cold air'
      ],
      causes: [
        'Hyper-reactive airways and allergic atopic diathesis',
        'Long-term active or passive exposure to cigarette/bidi smoke',
        'Biomass fuel smoke exposure and urban air pollution',
        'Occupational chemical dust inhalation'
      ],
      diagnosticApproach: [
        'Pulmonary Function Test (PFT) / Spirometry with pre-and-post bronchodilator reversibility',
        'Chest X-Ray (PA view) to rule out structural lung pathology',
        'Complete blood count with Absolute Eosinophil Count (AEC) and total Serum IgE',
        'Pulse Oximetry mapping'
      ],
      treatmentProtocol: [
        'Inhaled Corticosteroids (ICS) paired with Long-Acting Beta Agonists (LABA)',
        'Hands-on demonstration of proper inhaler and spacer usage technique',
        'Short-Acting bronchodilators for acute symptom relief',
        'Annual Influenza and Pneumococcal vaccination to prevent exacerbations'
      ],
      whenToConsult: [
        'Using emergency rescue inhalers more than twice a week',
        'Awakening at night with coughing or gasping for air',
        'Difficulty walking short distances without stopping to catch your breath'
      ],
      isFeaturedCondition: true,
      published: true,
      order: 5
    },
    {
      id: 't-6',
      slug: 'arthritis-and-gout',
      title: 'Arthritis & Gout (Joint & Musculoskeletal)',
      categoryId: 'cat-8',
      iconName: 'Flame',
      shortDescription: 'Uric acid reduction, anti-inflammatory management, and differential diagnosis between Osteoarthritis and Rheumatoid Arthritis.',
      fullOverview: 'Joint pain can arise from mechanical wear (osteoarthritis), crystalline deposit (gout), or autoimmune inflammation (rheumatoid arthritis). Dr. Puneet Kumar provides systematic blood and radiological workups to arrest joint degradation and eliminate pain.',
      symptoms: [
        'Sudden, excruciating pain, redness, and swelling in the big toe or ankle (classic Gout flare)',
        'Morning stiffness in fingers, wrists, or knees lasting longer than 30-45 minutes',
        'Creaking sounds, swelling, and deep aching in knees upon climbing stairs'
      ],
      causes: [
        'Hyperuricemia from high-purine diets, impaired renal uric acid excretion, or genetics',
        'Cartilage breakdown linked to age, weight, and joint stress',
        'Autoimmune inflammatory antibodies attacking synovial membranes'
      ],
      diagnosticApproach: [
        'Serum Uric Acid level testing during and between acute flares',
        'Rheumatoid Factor (RF) and Anti-CCP antibody titers',
        'Erythrocyte Sedimentation Rate (ESR) and C-Reactive Protein (CRP)',
        'Digital X-rays of affected joints and serum calcium/Vitamin D3 levels'
      ],
      treatmentProtocol: [
        'Acute gout flare suppression with Colchicine and short-term safe anti-inflammatories',
        'Long-term uric-acid lowering therapy (Febuxostat/Allopurinol) titrated to target <6.0 mg/dL',
        'Low-purine dietary counseling and hydration protocols',
        'Joint preservation plans including muscle strengthening physiotherapy'
      ],
      whenToConsult: [
        'Acute painful joint swelling with redness that makes touching or walking unbearable',
        'Persistent morning joint stiffness interfering with routine tasks',
        'Serum uric acid reports showing elevated levels (>7.5 mg/dL)'
      ],
      isFeaturedCondition: true,
      published: true,
      order: 6
    },
    {
      id: 't-7',
      slug: 'anaemia-evaluation',
      title: 'Anaemia & Nutritional Deficiencies',
      categoryId: 'cat-6',
      iconName: 'Droplet',
      shortDescription: 'Comprehensive investigation of low hemoglobin, iron-deficiency, Vitamin B12, and folate deficiency.',
      fullOverview: 'Anaemia is extraordinarily prevalent and frequently overlooked as mere "tiredness". Dr. Puneet Kumar conducts root-cause investigations to determine whether low hemoglobin is caused by dietary insufficiency, occult GI bleeding, or malabsorption, prescribing tailored therapies that restore stamina.',
      symptoms: [
        'Unrelenting fatigue, lethargy, and lack of mental focus',
        'Pale skin, pale conjunctiva inside the lower eyelids, brittle spoon-shaped nails',
        'Palpitations and shortness of breath during routine walking',
        'Peculiar cravings for non-food items like ice, chalk, or clay (Pica)',
        'Tingling in toes and fingers (specific to B12 deficiency)'
      ],
      causes: [
        'Dietary iron deficiency and poor bioavailability',
        'Chronic blood loss (heavy menstrual cycles, silent hemorrhoids, or peptic ulcers)',
        'Strict vegetarian diets lacking adequate Vitamin B12',
        'Gastric malabsorption (Celiac disease or chronic gastritis)'
      ],
      diagnosticApproach: [
        'Complete Blood Count (CBC) with Red Blood Cell indices (MCV, MCH, MCHC)',
        'Serum Ferritin, Total Iron Binding Capacity (TIBC), and Transferrin Saturation',
        'Serum Vitamin B12 and Folate levels',
        'Stool Occult Blood test (FOBT) to screen for silent gastrointestinal bleeding'
      ],
      treatmentProtocol: [
        'Targeted oral iron formulations with high tolerability and Vitamin C co-administration',
        'Intravenous ferric carboxymaltose infusions for severe symptomatic anaemia',
        'Sublingual or intramuscular Vitamin B12 replenishment protocols',
        'Dietary consultation on iron-rich whole foods and iron absorption enhancers'
      ],
      whenToConsult: [
        'Hemoglobin below 11 g/dL in women or 12 g/dL in men',
        'Extreme exhaustion, dizziness, or dark circles unresponsive to rest',
        'Numbness or pins-and-needles sensation in hands and feet'
      ],
      isFeaturedCondition: true,
      published: true,
      order: 7
    },
    {
      id: 't-8',
      slug: 'migraine-and-headache',
      title: 'Migraine & Chronic Headache',
      categoryId: 'cat-6',
      iconName: 'Zap',
      shortDescription: 'Accurate differentiation between tension headaches, migraines, and secondary neural causes with prophylactic treatment.',
      fullOverview: 'Recurrent headaches can severely impair quality of life, productivity, and sleep. Dr. Puneet Kumar specializes in identifying migraine triggers, prescribing targeted abortive therapies for acute attacks, and establishing prophylactic protocols to reduce headache frequency and intensity.',
      symptoms: [
        'Unilateral (one-sided) throbbing or pulsating pain',
        'Sensitivity to light (photophobia) and sound (phonophobia)',
        'Visual aura (flashing lights, zigzag patterns) preceding the headache',
        'Nausea, vomiting, and dizziness accompanying severe pain'
      ],
      causes: [
        'Neurovascular hypersensitivity and trigeminal nerve pathway activation',
        'Hormonal fluctuations, irregular sleep patterns, or missed meals',
        'Sensory triggers: bright lights, loud noises, strong fragrances, or screen fatigue',
        'Cervical spine strain and posture issues (cervicogenic headache)'
      ],
      diagnosticApproach: [
        'Comprehensive neurological examination and funduscopy',
        'Headache diary tracking frequency, intensity, and potential food/lifestyle triggers',
        'Blood pressure mapping to rule out hypertensive headaches',
        'Neuroimaging referral (MRI/CT Brain) only when red flag signs are present'
      ],
      treatmentProtocol: [
        'Specific abortive therapy: Triptans, tailored NSAID combinations, and anti-emetics',
        'Evidence-based prophylactic medications (Beta-blockers, Amitriptyline, Topiramate, Flunarizine)',
        'Sleep hygiene education and trigger avoidance strategies',
        'Screen time management and stress-reduction protocols'
      ],
      whenToConsult: [
        'Headaches occurring more than 3 to 4 times a month',
        'Over-the-counter painkillers losing effectiveness or causing rebound headaches',
        'Sudden severe "thunderclap" headache or headache accompanied by fever and stiff neck'
      ],
      isFeaturedCondition: true,
      published: true,
      order: 8
    },
    {
      id: 't-9',
      slug: 'liver-problems',
      title: 'Fatty Liver & Hepatic Disorders',
      categoryId: 'cat-7',
      iconName: 'Activity',
      shortDescription: 'Metabolic dysfunction-associated steatotic liver disease (MASLD), liver enzyme derangements, and hepatic protection.',
      fullOverview: 'Fatty liver disease (MASLD / NAFLD) has reached epidemic proportions alongside diabetes and obesity. Left unchecked, simple steatosis can progress to steatohepatitis (NASH), fibrosis, and cirrhosis. Dr. Puneet Kumar helps patients reverse early liver damage through targeted metabolic intervention.',
      symptoms: [
        'Usually silent and asymptomatic in early stages',
        'Vague fullness or dull ache in the right upper abdomen',
        'Persistent fatigue and sluggish digestion',
        'Jaundice (yellowing of eyes/skin) and dark urine in advanced or acute liver dysfunction'
      ],
      causes: [
        'Insulin resistance, visceral obesity, and metabolic syndrome',
        'High dietary intake of fructose, ultra-processed foods, and trans-fats',
        'Alcohol consumption exceeding safe hepatic thresholds',
        'Viral hepatitis (Hepatitis B & C) and hepatotoxic medications'
      ],
      diagnosticApproach: [
        'Liver Function Tests (SGOT, SGPT, Alkaline Phosphatase, Bilirubin, Albumin)',
        'Ultrasonography (USG) of the abdomen with fatty liver grading (Grade 1 to 3)',
        'Viral Hepatitis Serology (HBsAg, Anti-HCV)',
        'Non-invasive fibrosis score calculation (FIB-4 Index)'
      ],
      treatmentProtocol: [
        'Targeted 7-10% body weight reduction protocol proven to mobilize liver fat',
        'Insulin-sensitizing medications and hepatoprotective antioxidant therapy',
        'Strict elimination of refined sugar, sugary beverages, and alcohol',
        'Active management of co-existing dyslipidemia and diabetes'
      ],
      whenToConsult: [
        'Abdominal ultrasound showing Grade 1, 2, or 3 Fatty Liver',
        'Blood test indicating elevated SGOT / SGPT levels',
        'Yellow discoloration of the sclera (eyes) or dark tea-colored urine'
      ],
      isFeaturedCondition: true,
      published: true,
      order: 9
    },
    {
      id: 't-10',
      slug: 'urinary-tract-infections',
      title: 'Urinary Tract Infections (UTI)',
      categoryId: 'cat-5',
      iconName: 'ShieldCheck',
      shortDescription: 'Culture-proven antibiotic therapy, recurrent UTI prevention, and glycemic control in diabetic urinary complications.',
      fullOverview: 'Urinary Tract Infections cause significant distress and can ascend to the kidneys (pyelonephritis) if not treated appropriately. Patients with diabetes are especially susceptible to recurrent and atypical UTIs. Dr. Puneet Kumar provides culture-guided treatments that prevent recurrence.',
      symptoms: [
        'Burning sensation or sharp pain during urination (dysuria)',
        'Persistent urge to urinate with small amounts of urine passed',
        'Cloudy, foul-smelling, or pinkish/bloody urine',
        'Lower abdominal pressure, pelvic cramping, or flank pain',
        'Fever with chills when the infection reaches the upper urinary tract'
      ],
      causes: [
        'Bacterial colonization (predominantly E. coli) ascending via the urethra',
        'Glycosuria (sugar in urine) creating a rich bacterial growth medium in diabetics',
        'Dehydration and inadequate fluid intake',
        'Urinary retention, kidney stones, or prostate enlargement in men'
      ],
      diagnosticApproach: [
        'Routine and Microscopic Urine Analysis (pus cells, red blood cells, bacteria)',
        'Urine Culture and Antibiotic Sensitivity Testing (crucial before starting high-potency antibiotics)',
        'Ultrasound of Kidney, Ureters, and Bladder (USG KUB) for recurrent infections',
        'Fasting blood sugar to assess diabetic predisposition'
      ],
      treatmentProtocol: [
        'Culture-directed targeted antimicrobial therapy for the exact required duration',
        'Urine alkalinizers and urinary analgesics for rapid burning relief',
        'Aggressive hydration guidelines (2.5 - 3 liters daily)',
        'Prophylactic guidelines for post-menopausal women and diabetic patients'
      ],
      whenToConsult: [
        'Severe burning or blood noted in the urine',
        'Fever, back pain, or nausea accompanying urinary symptoms',
        'Recurrent UTIs returning multiple times a year'
      ],
      isFeaturedCondition: true,
      published: true,
      order: 10
    },
    {
      id: 't-11',
      slug: 'digestive-problems',
      title: 'Digestive & Gastrointestinal Disorders',
      categoryId: 'cat-7',
      iconName: 'Coffee',
      shortDescription: 'Management of GERD (Acid Reflux), Gastritis, Irritable Bowel Syndrome (IBS), and chronic bloating.',
      fullOverview: 'Gastrointestinal complaints are among the most common reasons patients seek clinical care. Dr. Puneet Kumar assesses the interplay between diet, gut motility, stomach acid, and emotional stress, formulating comprehensive medical plans that restore gut comfort and normal bowel rhythms.',
      symptoms: [
        'Heartburn, chest burning behind the breastbone, and sour acid regurgitation (GERD)',
        'Persistent upper abdominal bloating, belching, and early satiety',
        'Alternating episodes of diarrhea and constipation (IBS)',
        'Nausea, loss of appetite, or stomach fullness after modest meals'
      ],
      causes: [
        'Relaxation of the lower esophageal sphincter (LES) due to obesity or spicy meals',
        'Helicobacter pylori bacterial stomach infection',
        'Irregular meal times, late-night dining, and high stress levels',
        'Overuse of NSAID pain medications irritating the gastric mucosa'
      ],
      diagnosticApproach: [
        'Clinical evaluation and screening for warning signs (unintentional weight loss, vomiting blood)',
        'H. Pylori antigen or serology testing',
        'Stool routine and microscopic testing for parasites or occult blood',
        'Ultrasonography of the abdomen to evaluate gallbladder stones'
      ],
      treatmentProtocol: [
        'Rational short-term proton pump inhibitors (PPIs) and mucosal protectants',
        'Prokinetic and antispasmodic agents for altered gut motility and cramping',
        'Dietary modification (low-FODMAP guidance, avoidance of triggers)',
        'Correction of gut microbiome balance with targeted probiotics'
      ],
      whenToConsult: [
        'Heartburn occurring more than 2-3 times a week',
        'Difficulty or pain when swallowing food',
        'Black tarry stools or unexplained weight reduction'
      ],
      isFeaturedCondition: true,
      published: true,
      order: 11
    },
    {
      id: 't-12',
      slug: 'general-weakness',
      title: 'Chronic Fatigue & General Weakness',
      categoryId: 'cat-6',
      iconName: 'ZapOff',
      shortDescription: 'Systematic diagnostic workup for persistent lethargy, unexplained exhaustion, and post-viral fatigue syndromes.',
      fullOverview: 'General weakness is a symptom, not a final diagnosis. Far too often patients are handed generic multivitamin syrups without investigating the underlying medical cause. Dr. Puneet Kumar performs rigorous multi-system screening to uncover hidden metabolic, endocrine, or occult chronic conditions.',
      symptoms: [
        'Waking up tired even after 8 hours of sleep (unrefreshing sleep)',
        'Brain fog, sluggish thinking, and poor work productivity',
        'Muscle weakness, trembling upon climbing stairs, or joint aches',
        'Loss of motivation and feeling physically drained by afternoon'
      ],
      causes: [
        'Occult diabetes or fluctuating blood glucose levels',
        'Subclinical hypothyroidism or endocrine imbalances',
        'Severe Vitamin D3, B12, or iron deficiency anemia',
        'Chronic hidden low-grade infections or post-viral recovery phases',
        'Obstructive Sleep Apnea (OSA) causing nocturnal oxygen drops'
      ],
      diagnosticApproach: [
        'Comprehensive metabolic panel (CBC, ESR, Fasting Blood Sugar, HbA1c)',
        'Thyroid Stimulating Hormone (TSH)',
        'Serum Vitamin D3 and Vitamin B12 levels',
        'Serum electrolytes, creatinine, and liver enzymes'
      ],
      treatmentProtocol: [
        'Correcting specific diagnosed micronutrient and biochemical deficits',
        'Regulating blood glucose and thyroid hormone concentrations',
        'Personalized sleep hygiene optimization and structured pacing strategies',
        'Evidence-backed lifestyle pacing without excessive over-medication'
      ],
      whenToConsult: [
        'Weakness persisting for more than 3-4 weeks with no clear reason',
        'Fatigue impairing your ability to perform routine daily activities',
        'Accompanied by unexpected weight loss, low-grade fevers, or swollen lymph glands'
      ],
      isFeaturedCondition: true,
      published: true,
      order: 12
    }
  ],
  diabetesServices: [
    {
      id: 'ds-1',
      title: 'Type 1 Diabetes Care',
      description: 'Comprehensive basal-bolus insulin regimens, carbohydrate counting guidance, and proactive hypoglycemia avoidance plans for young adults and children.',
      iconName: 'Activity',
      keyHighlights: ['Basal-bolus insulin titration', 'Carb counting education', 'Hypoglycemia safety protocols', 'Growth and puberty monitoring'],
      order: 1
    },
    {
      id: 'ds-2',
      title: 'Type 2 Diabetes Management',
      description: 'Evidence-based individualized oral and injectable therapies designed to lower HbA1c, reverse insulin resistance, and protect cardiovascular and renal health.',
      iconName: 'CheckCircle2',
      keyHighlights: ['Newer SGLT2 & GLP-1 therapies', 'Weight loss guidance', 'Metabolic syndrome reversal', 'Routine organ screening'],
      order: 2
    },
    {
      id: 'ds-3',
      title: 'Uncontrolled & Brittle Diabetes',
      description: 'Specialized stabilization protocols for patients experiencing dangerous blood sugar swings, stubborn spikes over 250 mg/dL, or frequent ketones.',
      iconName: 'AlertTriangle',
      keyHighlights: ['Rapid stabilization protocols', 'Insulin resistance overcoming', 'Ketone monitoring', '24-hour medical access'],
      order: 3
    },
    {
      id: 'ds-4',
      title: 'HbA1c Reduction & Target Control',
      description: 'Structured 90-day roadmaps to bring elevated HbA1c down safely to sub-7.0% without triggering traumatic hypoglycemic crashes.',
      iconName: 'TrendingDown',
      keyHighlights: ['3-month target roadmaps', 'Glycemic variability reduction', 'Lab correlation analysis', 'Sustained lifestyle integration'],
      order: 4
    },
    {
      id: 'ds-5',
      title: 'Diabetic Neuropathy & Foot Care',
      description: 'Advanced monofilament testing, biothesiometry, burning feet relief, and preventive diabetic foot care to eliminate ulcer and amputation risks.',
      iconName: 'Shield',
      keyHighlights: ['Peripheral nerve vibration test', 'Burning and tingling relief', 'Diabetic footwear guidance', 'Early ulcer prevention'],
      order: 5
    },
    {
      id: 'ds-6',
      title: 'Hypoglycaemia Prevention & Alert',
      description: 'Education on recognizing subtle early warning signs of low blood sugar, emergency glucagon/dextrose management, and safe sleep safety rules.',
      iconName: 'Bell',
      keyHighlights: ['Night-time low sugar screening', 'Immediate rescue protocol', 'Rule of 15 education', 'Medication reassessment'],
      order: 6
    },
    {
      id: 'ds-7',
      title: 'Diabetes & Hypertension Co-Care',
      description: 'Dual-target management of both blood pressure and blood glucose to shield coronary arteries, kidneys, and brain from vascular strain.',
      iconName: 'HeartHandshake',
      keyHighlights: ['Strict BP targets (<130/80)', 'Renal-protective ACE/ARB therapy', 'Microalbuminuria screening', 'Statin lipid optimization'],
      order: 7
    },
    {
      id: 'ds-8',
      title: 'Complication Screening (Kidney, Eye, Heart)',
      description: 'Comprehensive annual screening packages including urinary microalbumin, fundus examination guidance, ECG, and carotid/peripheral arterial pulse checks.',
      iconName: 'Search',
      keyHighlights: ['Urine microalbumin/creatinine ratio', 'Retinopathy coordination', 'Cardiac risk stratification', 'Arterial doppler referral'],
      order: 8
    },
    {
      id: 'ds-9',
      title: 'Diabetes Lifestyle & Nutrition Coaching',
      description: 'Practical, culturally tailored North Indian dietary modifications, portion controls, low glycemic index swaps, and safe exercise guidelines.',
      iconName: 'Apple',
      keyHighlights: ['North Indian meal redesign', 'Low-GI food substitutions', 'Safe aerobic & strength exercise', 'Continuous glucose sensor coaching'],
      order: 9
    }
  ],
  appointments: [
    {
      id: 'apt-101',
      patientName: 'Gurpreet Singh',
      phone: '+91 98140 11223',
      age: '52',
      gender: 'Male',
      concern: 'Uncontrolled Diabetes (HbA1c 9.4%) with tingling in both feet',
      preferredDate: '2026-09-18',
      preferredTime: '11:00 AM - 12:00 PM',
      message: 'Taking metformin for 5 years but fasting sugar remains above 190. Need complete re-evaluation.',
      submittedAt: '2026-09-13T10:15:00Z',
      status: 'Confirmed',
      notes: 'Advised to bring previous lab reports, fasting lipid profile, and current medication strips.'
    },
    {
      id: 'apt-102',
      patientName: 'Sunita Sharma',
      phone: '+91 94172 33445',
      age: '44',
      gender: 'Female',
      concern: 'Thyroid disorder & persistent lethargy',
      preferredDate: '2026-09-19',
      preferredTime: '05:30 PM - 06:30 PM',
      message: 'Diagnosed with hypothyroidism 6 months ago. Taking Thyronorm 50mcg but still feeling exhausted and gaining weight.',
      submittedAt: '2026-09-13T11:40:00Z',
      status: 'New',
      notes: ''
    },
    {
      id: 'apt-103',
      patientName: 'Harinder Verma',
      phone: '+91 98881 77889',
      age: '61',
      gender: 'Male',
      concern: 'High Blood Pressure & Diabetes review',
      preferredDate: '2026-09-16',
      preferredTime: '10:30 AM - 11:30 AM',
      message: 'Recent home BP check was 155/95 mmHg. Want Dr. Puneet to review current medications.',
      submittedAt: '2026-09-12T16:20:00Z',
      status: 'Contacted',
      notes: 'Reception called; patient requested morning slot on Wednesday.'
    },
    {
      id: 'apt-104',
      patientName: 'Pooja Rani',
      phone: '+91 97790 55667',
      age: '29',
      gender: 'Female',
      concern: 'High grade fever for 3 days with body aches',
      preferredDate: '2026-09-14',
      preferredTime: '06:00 PM - 07:00 PM',
      message: 'Suspecting viral or dengue. Temperature reaching 102F.',
      submittedAt: '2026-09-13T15:00:00Z',
      status: 'Confirmed',
      notes: 'Immediate CBC and dengue NS1 ordered.'
    }
  ],
  contactLeads: [
    {
      id: 'lead-1',
      name: 'Raman Deep',
      phone: '+91 99150 78901',
      email: 'raman.deep@example.com',
      subject: 'Continuous Glucose Monitoring (CGM) sensor inquiry',
      message: 'Does Dr. Puneet provide and fit continuous glucose monitoring patches like FreeStyle Libre at his Mohali clinic?',
      submittedAt: '2026-09-13T09:30:00Z',
      status: 'New',
      notes: ''
    },
    {
      id: 'lead-2',
      name: 'Dr. Anita Joshi',
      phone: '+91 98722 45678',
      email: 'anita.joshi@example.com',
      subject: 'Second opinion for gestational diabetes',
      message: 'Currently 26 weeks pregnant with fasting sugar 108 mg/dL. Seeking expert clinical guidance.',
      submittedAt: '2026-09-12T14:10:00Z',
      status: 'Replied',
      notes: 'Sent clinic timing and direct WhatsApp booking link.'
    }
  ],
  blogs: [
    {
      id: 'b-1',
      slug: 'understanding-hba1c-what-your-number-really-means',
      title: 'Understanding HbA1c: What Your Number Really Means for Long-Term Health',
      category: 'Diabetes',
      author: 'Dr. Puneet Kumar',
      publishDate: 'September 08, 2026',
      readTime: '6 min read',
      featuredImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=900&auto=format&fit=crop',
      excerpt: 'Most people know an HbA1c below 5.7% is normal, but what happens when it rises to 7.5% or 9%? Learn how this 90-day marker predicts your heart, kidney, and eye health.',
      content: `### What Exactly is Glycated Hemoglobin (HbA1c)?

When red blood cells circulate through your bloodstream, glucose molecules naturally bind to hemoglobin, the protein that carries oxygen. The higher your blood sugar over weeks, the more glucose gets attached. Because red blood cells live for approximately 100 to 120 days, measuring your **HbA1c** gives doctors an uncheatable 3-month average of your blood glucose levels.

### Deciphering the Numbers

* **Normal / Non-Diabetic:** Below 5.7%
* **Prediabetes (Impaired Glucose Tolerance):** 5.7% to 6.4%
* **Diabetes Diagnosis:** 6.5% or higher on two separate occasions
* **General Clinical Target for Most Adults with Diabetes:** Below 7.0%

### Why Daily Finger-Prick Tests Aren't Enough

Many patients fast strictly the night before an appointment to get a "good" fasting blood sugar report. However, fasting glucose only reflects the last 8 to 10 hours. It fails to capture significant afternoon spikes after heavy lunches, festive sweets, or nocturnal glucose dips. HbA1c reveals the complete story.

### The Real Risk of Every 1% Increase

Extensive medical trials (such as the UKPDS) have established that for every **1% reduction in HbA1c**, your risk of:
1. Microvascular complications (diabetic eye disease and kidney damage) drops by **37%**.
2. Heart attacks drops by **14%**.
3. Amputations or peripheral arterial disease drops by **43%**.

### Dr. Puneet's Strategy for Safe Reduction

Lowering your HbA1c requires a balanced approach. Dropping glucose too abruptly with excessive medication can cause dangerous hypoglycemic crashes (low sugar), which can trigger cardiac arrhythmias or fainting. We advocate:
- Personalized pharmacological therapy utilizing organ-protective medications (such as SGLT2 inhibitors or GLP-1 analogues where appropriate).
- Low-glycemic carbohydrate substitution rather than extreme starvation diets.
- Post-meal brisk walks (15-20 minutes) to clear circulating glucose naturally through muscular uptake.`,
      seoTitle: 'Understanding HbA1c: Guide by Diabetes Specialist Dr. Puneet Kumar Mohali',
      metaDescription: 'Learn what HbA1c means, target numbers for diabetes, and evidence-based tips to safely lower your 3-month sugar level from Dr. Puneet Kumar.',
      keywords: ['HbA1c meaning', 'Diabetes Specialist Mohali', 'Normal HbA1c level', 'Lower blood sugar'],
      isFeatured: true,
      isPublished: true
    },
    {
      id: 'b-2',
      slug: 'silent-killer-why-hypertension-has-no-symptoms',
      title: 'The Silent Killer: Why High Blood Pressure Often Has Zero Warning Symptoms',
      category: 'Hypertension',
      author: 'Dr. Puneet Kumar',
      publishDate: 'August 28, 2026',
      readTime: '5 min read',
      featuredImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=900&auto=format&fit=crop',
      excerpt: 'Over 60% of people with dangerous blood pressure feel completely fine. Learn why waiting for a headache before checking your BP is a dangerous gamble.',
      content: `### The Myth of the "Hypertension Headache"

A common myth among patients in our clinic is: *"Doctor, I don’t have a headache or dizziness, so my blood pressure must be fine."*

In reality, **essential hypertension is almost always completely symptom-free** until severe target organ damage has already occurred. You can easily have a blood pressure of 160/100 mmHg while feeling completely energetic. The blood vessels inside your brain, kidneys, and retina quietly absorb excessive hydrostatic pressure every second your heart beats.

### What Constitutes High Blood Pressure?

Under international clinical cardiology consensus:
- **Normal:** Systolic < 120 mmHg AND Diastolic < 80 mmHg
- **Elevated:** Systolic 120-129 mmHg AND Diastolic < 80 mmHg
- **Stage 1 Hypertension:** Systolic 130-139 mmHg OR Diastolic 80-89 mmHg
- **Stage 2 Hypertension:** Systolic ≥ 140 mmHg OR Diastolic ≥ 90 mmHg

### When Blood Pressure Meets Diabetes

When a patient has both diabetes and hypertension, the cardiovascular risk doesn't merely double—it multiplies exponentially. High glucose damages the delicate endothelial lining of blood vessels, while high pressure forces cholesterol into these damaged walls, rapidly accelerating atherosclerosis.

### Proper Method for Measuring BP at Home

1. Rest quietly for at least 5 minutes before pressing the button on your digital monitor.
2. Avoid caffeine, smoking, or exercise for 30 minutes prior.
3. Sit with your back supported, feet flat on the floor (do not cross your legs).
4. Keep your arm supported at heart level.
5. Take 2 readings spaced 2 minutes apart and note down the average.`,
      seoTitle: 'High Blood Pressure Symptoms & Management | Dr. Puneet Kumar Mohali',
      metaDescription: 'Understand why high blood pressure is called a silent killer, correct home BP measurement steps, and treatment by Dr. Puneet Kumar.',
      keywords: ['Hypertension doctor Mohali', 'High BP treatment', 'Blood pressure targets'],
      isFeatured: true,
      isPublished: true
    },
    {
      id: 'b-3',
      slug: 'thyroid-symptoms-weight-gain-fatigue',
      title: 'Tired All the Time? Why Your Thyroid Might Be the Missing Clue',
      category: 'Thyroid',
      author: 'Dr. Puneet Kumar',
      publishDate: 'August 14, 2026',
      readTime: '7 min read',
      featuredImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=900&auto=format&fit=crop',
      excerpt: 'Struggling with unexplained weight gain, brittle hair, brain fog, and chronic fatigue? Explore the clinical difference between normal tiredness and hypothyroidism.',
      content: `### The Master Conductor of Metabolism

The butterfly-shaped thyroid gland nestled at the base of your neck secretes hormones (primarily Thyroxine or T4, and Triiodothyronine or T3) that control how efficiently your cells convert nutrients into usable energy. 

When your thyroid underproduces these hormones—a condition known as **Hypothyroidism**—every system in your body slows down.

### Common Signs of Hypothyroidism

- **Unexplained Weight Gain:** Gaining 4-8 kg despite no change in diet or physical exercise.
- **Cold Intolerance:** Feeling shivering or needing sweaters while others are comfortable.
- **Cognitive Sluggishness:** Forgetting simple names, difficulty concentrating, or feeling a persistent "mental cloud".
- **Physical Changes:** Dry, rough skin, increased hair fall, brittle nails, and puffy eyes in the morning.
- **Gastrointestinal Sluggishness:** Stubborn constipation unresponsive to dietary fiber.

### Why Taking Your Thyroid Tablet Incorrectly Ruins Results

Many patients are prescribed Levothyroxine (e.g., Thyronorm or Eltroxin) but fail to achieve normal TSH levels because of simple administration mistakes:
1. **Always take it on an empty stomach** immediately upon waking with a full glass of plain water.
2. **Wait at least 45 to 60 minutes** before drinking tea, coffee, milk, or having breakfast. Calcium and caffeine significantly inhibit absorption.
3. **Never take iron or calcium supplements within 4 hours** of your thyroid tablet.`,
      seoTitle: 'Hypothyroidism Symptoms, Diagnosis & Treatment | Dr. Puneet Kumar',
      metaDescription: 'Dr. Puneet Kumar explains thyroid symptoms, Hashimoto’s, correct levothyroxine rules, and when to test TSH.',
      keywords: ['Thyroid doctor Mohali', 'Hypothyroidism treatment', 'TSH test Mohali'],
      isFeatured: false,
      isPublished: true
    },
    {
      id: 'b-4',
      slug: 'fever-warning-signs-dengue-vs-viral',
      title: 'High Fever Warning Signs: How to Differentiate Viral Illness from Dengue & Typhoid',
      category: 'General Medicine',
      author: 'Dr. Puneet Kumar',
      publishDate: 'July 25, 2026',
      readTime: '5 min read',
      featuredImage: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=900&auto=format&fit=crop',
      excerpt: 'Seasonal fevers can escalate quickly. Learn the critical "red flag" symptoms that demand immediate medical attention and hospital evaluation.',
      content: `### The Seasonal Fever Landscape

During post-monsoon and seasonal shifts in North India, clinics witness an influx of acute febrile illnesses. While many are self-limiting viral infections that resolve with hydration and rest, vector-borne infections such as **Dengue** and food/water-borne infections such as **Typhoid** require careful medical surveillance.

### Red Flag Warning Signs in High Fevers

If you or a family member has a fever accompanied by any of the following, do not attempt self-medication:
- **Severe Abdominal Pain or Persistent Vomiting:** Cannot keep liquids down.
- **Bleeding Tendencies:** Bleeding from gums when brushing, blood in vomit, black stool, or red pin-prick spots on skin (petechiae).
- **Extreme Lethargy or Restlessness:** Confusion, drowsiness, or difficulty waking up.
- **High Fever Refusing to Break:** Temperature staying above 102°F despite paracetamol.
- **Shortness of Breath or Chest Heaviness.**

### The Critical Phase of Dengue

A unique and dangerous characteristic of Dengue is that the **critical phase begins precisely when the fever starts subsiding (around Day 3 to Day 5)**. This is when capillary leakage, blood concentration (rising hematocrit), and sharp platelet drops most frequently occur.`,
      seoTitle: 'Fever Warning Signs & Dengue vs Typhoid | Dr. Puneet Kumar',
      metaDescription: 'Learn critical fever warning signs, when to check platelets, and emergency indicators explained by physician Dr. Puneet Kumar.',
      keywords: ['Fever specialist Mohali', 'Dengue fever warning signs', 'Physician in Mohali'],
      isFeatured: false,
      isPublished: true
    }
  ],
  videos: [
    {
      id: 'v-1',
      title: '5 Practical Tips to Control Blood Sugar Without Drastic Starvation',
      description: 'Dr. Puneet Kumar explains how subtle shifts in meal timing, portion sequencing (eating vegetables and protein before carbs), and hydration can lower post-meal spikes.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=900&auto=format&fit=crop',
      category: 'Diabetes Control Tips',
      duration: '4:35',
      order: 1
    },
    {
      id: 'v-2',
      title: 'High Blood Pressure Awareness: What Really Happens Inside Your Arteries',
      description: 'A visual breakdown of how sustained hypertension causes vascular stiffening and why normal home monitoring prevents sudden cardiovascular surprises.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=900&auto=format&fit=crop',
      category: 'High BP Awareness',
      duration: '5:12',
      order: 2
    },
    {
      id: 'v-3',
      title: 'Thyroid Symptoms Most People Overlook in Daily Life',
      description: 'Are you blaming aging or stress for symptoms caused by subclinical thyroid disorders? Dr. Puneet outlines key laboratory markers to investigate.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=900&auto=format&fit=crop',
      category: 'Thyroid Symptoms',
      duration: '3:50',
      order: 3
    },
    {
      id: 'v-4',
      title: 'Fever Warning Signs: When You Must Go to the Clinic Immediately',
      description: 'Dr. Puneet covers acute tropical fevers (Dengue, Typhoid, Scrub Typhus) and explains why platelet monitoring is critical during seasonal outbreaks.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=900&auto=format&fit=crop',
      category: 'Fever Warning Signs',
      duration: '6:15',
      order: 4
    },
    {
      id: 'v-5',
      title: 'HbA1c Explained: How to Interpret Your Laboratory Test',
      description: 'Clear, patient-friendly explanation of hemoglobin glycation, target ranges for different age groups, and realistic timelines for improvement.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=900&auto=format&fit=crop',
      category: 'HbA1c Explained',
      duration: '4:40',
      order: 5
    }
  ],
  testimonials: [
    {
      id: 'test-1',
      patientName: 'Kulwinder Singh Dhillon',
      rating: 5,
      review: 'My HbA1c was stuck at 10.2% for over three years despite taking four different tablets. Dr. Puneet Kumar took the time to explain my insulin resistance and revised my medicines with modern therapy. In four months, my HbA1c dropped to 6.8% without a single episode of low sugar. Truly an outstanding physician in Mohali.',
      treatmentCategory: 'Diabetes Care',
      location: 'Sector 68, Mohali',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      isPublished: true,
      order: 1
    },
    {
      id: 'test-2',
      patientName: 'Manpreet Kaur',
      rating: 5,
      review: 'I had been suffering from severe fatigue, body aches, and erratic blood pressure. Other places kept giving pain syrups. Dr. Puneet immediately recognized my subclinical hypothyroidism along with high BP. Within three weeks of targeted treatment, I felt like myself again. His patient-first approach is rare and deeply appreciated.',
      treatmentCategory: 'Thyroid & BP Care',
      location: 'Phase 7, Mohali',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      isPublished: true,
      order: 2
    },
    {
      id: 'test-3',
      patientName: 'Rajesh Khanna',
      rating: 5,
      review: 'Dr. Puneet treated my mother when she developed severe dengue with high fever and falling platelets. His calm reassurance and daily phone follow-ups prevented panic and unnecessary hospital admission. We are blessed to have such a dedicated senior physician in the Tricity.',
      treatmentCategory: 'Fever & Infections',
      location: 'Aerocity, Mohali',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      isPublished: true,
      order: 3
    },
    {
      id: 'test-4',
      patientName: 'Paramjit Chopra',
      rating: 5,
      review: 'The best doctor for diabetes and hypertension in Mohali. Unlike commercial clinics that rush you out in 2 minutes, Dr. Puneet listens patiently, checks your feet, reviews your diet, and gives clear, logical medical reasons for every prescription.',
      treatmentCategory: 'Chronic Disease Management',
      location: 'Sector 71, Mohali',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      isPublished: true,
      order: 4
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'When should I consult a general physician instead of waiting it out?',
      answer: 'You should consult a physician if you experience high fever lasting over 48 hours, unexplained fatigue, persistent headaches, sudden changes in weight or appetite, difficulty breathing, or symptoms of metabolic conditions such as excessive thirst, frequent urination, or joint stiffness. Early clinical intervention consistently prevents severe complications.',
      category: 'General',
      order: 1
    },
    {
      id: 'faq-2',
      question: 'What is HbA1c and how is it different from daily blood glucose tests?',
      answer: 'HbA1c measures the percentage of your red blood cell hemoglobin coated with sugar over the past 2 to 3 months. Unlike fasting or post-meal finger-prick tests that capture a single moment in time, HbA1c gives an accurate, uncheatable picture of your overall glycemic control.',
      category: 'Diabetes',
      order: 2
    },
    {
      id: 'faq-3',
      question: 'When should someone with diabetes see a specialist rather than relying on over-the-counter medicines?',
      answer: 'You should immediately consult a diabetes specialist if your HbA1c is above 7.0%, if you experience frequent shaky episodes (hypoglycemia), notice tingling or burning in your feet (neuropathy), have persistent high fasting numbers above 140 mg/dL, or have co-existing high blood pressure and kidney abnormalities.',
      category: 'Diabetes',
      order: 3
    },
    {
      id: 'faq-4',
      question: 'Can high blood pressure exist without any noticeable symptoms?',
      answer: 'Yes, absolutely. Hypertension is widely termed the "silent killer" because most people with stage 1 or stage 2 high blood pressure have no headaches, dizziness, or outward symptoms. Regular checkups using a calibrated monitor are the only reliable way to detect it before it strains your heart or kidneys.',
      category: 'Hypertension',
      order: 4
    },
    {
      id: 'faq-5',
      question: 'What documents or reports should I bring for my consultation?',
      answer: 'Please bring any recent blood test reports (CBC, HbA1c, lipid profile, kidney and liver function tests, thyroid profile), current prescription slips or actual medication packages, your home blood sugar and BP logs (if you maintain one), and any relevant discharge summaries from previous hospitalizations.',
      category: 'Appointments',
      order: 5
    },
    {
      id: 'faq-6',
      question: 'How often should patients with diabetes get tested?',
      answer: 'For patients with stable glycemic control, an HbA1c test is recommended every 3 to 6 months. Annual screenings should also include a complete urine microalbumin test, lipid profile, serum creatinine, dilated eye examination (retinopathy check), and professional foot examination.',
      category: 'Diabetes',
      order: 6
    }
  ],
  locations: [
    {
      id: 'loc-1',
      name: 'Dr. Puneet Kumar Clinic',
      address: 'SCO 42, Ground Floor, Main Market, Sector 70, Sahibzada Ajit Singh Nagar (Mohali), Punjab 160071, India',
      phone: '+91 98765 43210',
      whatsapp: '+919876543210',
      email: 'clinic@drpuneetkumar.com',
      timings: 'Monday to Saturday: 10:00 AM - 2:00 PM & 5:00 PM - 8:00 PM (Sunday Closed / Emergency on call)',
      mapEmbedUrl: '',
      googleMapsUrl: '',
      latitude: '',
      longitude: '',
      isPrimary: true,
      order: 1
    },
    {
      id: 'loc-2',
      name: 'Hospital OPD Consultations (By Appointment)',
      address: 'Super Specialty Hospital Network, Mohali & Tricity',
      phone: '+91 172 4567890',
      whatsapp: '+919876543210',
      email: 'hospital.opd@drpuneetkumar.com',
      timings: 'Consultant In-Patient Visits & Specialized OPD: By Prior Appointment',
      mapEmbedUrl: '',
      googleMapsUrl: '',
      latitude: '',
      longitude: '',
      isPrimary: false,
      order: 2
    }
  ],
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com'
  },
  media: [
    {
      id: 'med-1',
      name: 'Dr. Puneet Kumar Portrait',
      url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=900&auto=format&fit=crop',
      category: 'Doctor Photos',
      altText: 'Dr. Puneet Kumar Senior Physician & Diabetes Specialist',
      uploadedAt: '2026-09-01',
      size: '240 KB'
    },
    {
      id: 'med-2',
      name: 'Doctor In Consultation',
      url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=900&auto=format&fit=crop',
      category: 'Doctor Photos',
      altText: 'Doctor discussing diabetes treatment plan with patient',
      uploadedAt: '2026-09-01',
      size: '310 KB'
    },
    {
      id: 'med-3',
      name: 'Blood Glucose Testing Kit',
      url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=900&auto=format&fit=crop',
      category: 'Treatments',
      altText: 'Glucometer and testing strips for diabetes care',
      uploadedAt: '2026-09-02',
      size: '180 KB'
    },
    {
      id: 'med-4',
      name: 'Stethoscope & Medical Clipboard',
      url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=900&auto=format&fit=crop',
      category: 'Homepage',
      altText: 'Internal medicine examination equipment',
      uploadedAt: '2026-09-02',
      size: '220 KB'
    }
  ],
  seo: {
    siteTitle: 'Dr. Puneet Kumar | Senior Physician & Diabetes Specialist Mohali',
    metaDescription: 'Dr. Puneet Kumar is a Senior Physician and Diabetes Specialist in Mohali with 12+ years experience in diabetes care, hypertension, thyroid disorders, and internal medicine.',
    keywords: [
      'Physician in Mohali',
      'Diabetes Specialist in Mohali',
      'Diabetologist in Mohali',
      'General Physician in Mohali',
      'Diabetes Doctor in Mohali',
      'Thyroid Doctor in Mohali',
      'High BP Doctor in Mohali',
      'Fever Specialist in Mohali',
      'Internal Medicine Doctor Tricity',
      'Best Doctor for Diabetes in Mohali'
    ],
    canonicalUrl: 'https://drpuneetkumar.com',
    ogImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop',
    localKeywords: [
      'Physician in Mohali Sector 71',
      'Diabetes Clinic Phase 7 Mohali',
      'Tricity Diabetologist',
      'Internal medicine specialist near me'
    ],
    googleSiteVerification: 'dr-puneet-kumar-verification-code'
  }
};
