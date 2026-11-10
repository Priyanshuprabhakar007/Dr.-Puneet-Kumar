export interface CityFaq {
  question: string;
  answer: string;
}

export interface CityData {
  slug: string;
  cityName: string;
  metaTitle: string;
  metaDescription: string;
  breadcrumbLabel: string;
  eyebrow: string;
  h1: string;
  heroSubtitle: string;
  targetKeywords: string[];
  locationNotice: string;
  commuteInfo: {
    travelTime: string;
    routeDetails: string;
    parkingInfo: string;
  };
  introParagraphs: string[];
  careHighlights: {
    title: string;
    description: string;
    points: string[];
  }[];
  diabetesManagementFocus: {
    heading: string;
    body: string;
  }[];
  whyConsultPoints: {
    title: string;
    desc: string;
  }[];
  faqs: CityFaq[];
  relatedTreatments: {
    title: string;
    slug: string;
    description: string;
  }[];
}

export const CITIES_DATA: Record<string, CityData> = {
  mohali: {
    slug: 'diabetes-specialist-mohali',
    cityName: 'Mohali',
    metaTitle: 'Diabetes Specialist in Mohali | Dr. Puneet Kumar',
    metaDescription:
      'Consult Dr. Puneet Kumar, Senior Physician & Diabetes Specialist in Mohali with 15+ years clinical expertise. Evidence-based Type 2 diabetes and metabolic care.',
    breadcrumbLabel: 'Mohali Diabetes Specialist',
    eyebrow: 'Verified Clinical Practice in Mohali',
    h1: 'Diabetes Specialist in Mohali – Dr. Puneet Kumar',
    heroSubtitle:
      'Senior Physician & Diabetologist delivering guideline-directed, personalized diabetes management, HbA1c stabilization, and organ-protective care for patients across Mohali.',
    targetKeywords: [
      'Diabetes specialist in Mohali',
      'Best diabetes doctor in Mohali',
      'Physician in Mohali',
      'Internal medicine specialist in Mohali',
      'Diabetes treatment in Mohali'
    ],
    locationNotice:
      'Dr. Puneet Kumar consults directly at Livasa Hospital (Sector 71, Mohali) during daytime OPD hours and Aggarwal Clinic during evening sessions.',
    commuteInfo: {
      travelTime: '5 – 15 minutes',
      routeDetails:
        'Centrally located in Sector 71, easily accessible via Kumbra Chowk, Phase 7 market corridor, and Airport Road (PR7). Fast access from Sectors 68, 70, 76–82, and Aerocity.',
      parkingInfo: 'Dedicated hospital parking lot and elevator-accessible OPD consultation chambers.'
    },
    introParagraphs: [
      'Managing diabetes requires a sustained therapeutic partnership rather than rushed prescriptions. For patients in Mohali seeking structured, guideline-directed diabetes care, Dr. Puneet Kumar offers comprehensive clinical evaluations combining modern pharmacotherapy, continuous glucose monitoring (CGM), and patient education.',
      'With over 15 years of clinical practice in Internal Medicine and specialized credentials in Diabetology (Fellowship in Diabetes Mellitus from Medvarsity Apollo & Royal Liverpool Academy), Dr. Puneet focuses on preserving long-term cardiovascular, renal, and microvascular wellness. Each treatment regimen is individualized according to your lifestyle, metabolic profile, and glycemic variability.'
    ],
    careHighlights: [
      {
        title: 'Precision HbA1c Stabilization',
        description: 'Targeted Glycemic Control Without Debilitating Hypoglycemia',
        points: [
          'Rational adjustment of oral hypoglycemic agents and insulin titration',
          'Use of organ-protective SGLT-2 inhibitors and GLP-1 receptor agonists',
          'Continuous Glucose Monitoring (CGM) to uncover post-meal spikes and nocturnal drops',
          'Periodic 90-day surveillance protocols to safely lower average blood sugars'
        ]
      },
      {
        title: 'Comprehensive Complication Defense',
        description: 'Early Organ Screening & Proactive Risk Mitigation',
        points: [
          'Diabetic foot sensory examinations to prevent neuropathy and ulcers',
          'Urine microalbumin-to-creatinine ratio (ACR) for kidney preservation',
          'Cardiovascular risk stratification, lipid profiling, and blood pressure monitoring',
          'Timely referral partnerships for diabetic retinopathy retinal evaluations'
        ]
      },
      {
        title: 'Lifestyle & Metabolic Support',
        description: 'Sustainable Nutrition, Weight Optimization & Reversal Strategy',
        points: [
          'Practical North Indian dietary modifications focusing on low-glycemic index foods',
          'Structured physical exercise protocols adapted for age and joint health',
          'Support for newly diagnosed prediabetes and early-stage Type 2 reversal',
          'Patient-first counseling to build sustained health habits over decades'
        ]
      }
    ],
    diabetesManagementFocus: [
      {
        heading: 'Type 2 Diabetes Clinical Care in Mohali',
        body: 'Type 2 diabetes represents the majority of metabolic conditions seen in our Mohali outpatient department. Treatment is designed around overcoming insulin resistance, halting progressive beta-cell exhaustion, and protecting vital organs. Rather than escalating drug dosages indiscriminately, Dr. Puneet Kumar reviews your daily routine, meal timings, and stress markers to craft a sustainable therapeutic regimen.'
      },
      {
        heading: 'Prediabetes & Early Intervention',
        body: 'If your fasting blood sugar falls between 100–125 mg/dL or your HbA1c ranges from 5.7% to 6.4%, you are in the prediabetic stage. This critical window provides the highest probability of reversing impaired glucose tolerance before chronic vascular damage occurs. We formulate an evidence-backed lifestyle and medical plan to restore metabolic equilibrium.'
      },
      {
        heading: 'Complex Diabetes & Multi-System Comorbidities',
        body: 'Diabetes rarely exists in isolation; it frequently coexists with hypertension, dyslipidemia, fatty liver disease (NAFLD), and thyroid disorders. As an MD in Internal Medicine, Dr. Puneet coordinates multi-system care under one roof, eliminating conflicting prescriptions and fragmented medical guidance.'
      }
    ],
    whyConsultPoints: [
      {
        title: 'Senior Physician (MD Medicine)',
        desc: 'Advanced post-graduate training from DMCH Ludhiana (BFUHS) ensuring rigorous multi-system diagnostic acumen.'
      },
      {
        title: 'Fellowship in Diabetes Mellitus',
        desc: 'Specialized qualification from Medvarsity Apollo with accreditation from the Royal Liverpool Academy, UK.'
      },
      {
        title: '15+ Years Clinical Practice',
        desc: 'Trusted by over 25,000 patients across leading Tricity tertiary hospital networks including Max, Fortis, and SGHS Sohana.'
      },
      {
        title: 'Dual Accessible Mohali Centers',
        desc: 'Consult during daytime hours at Livasa Hospital (Sector 71) or evening sessions at Aggarwal Clinic.'
      }
    ],
    faqs: [
      {
        question: 'Where can I consult Dr. Puneet Kumar for diabetes in Mohali?',
        answer:
          'Dr. Puneet Kumar provides outpatient consultations at Livasa Hospital, Sector 71, Mohali from 10:00 AM to 5:00 PM, and at Aggarwal Clinic from 5:00 PM to 7:00 PM (Monday to Saturday).'
      },
      {
        question: 'What reports should I bring for my first diabetes consultation?',
        answer:
          'Please bring your recent blood test reports (Fasting Blood Sugar, Post-Prandial Blood Sugar, HbA1c within the last 3 months, Lipid Profile, Kidney Function Test), your current prescription slips, and a log of recent home glucometer readings if available.'
      },
      {
        question: 'How often should a diabetes patient visit for follow-up review?',
        answer:
          'For patients with stable HbA1c on maintenance therapy, quarterly (every 3 months) reviews are recommended alongside routine blood sugar surveillance. For patients requiring medication changes or insulin titration, follow-up visits may be scheduled every 2 to 4 weeks until glycemic targets are achieved.'
      },
      {
        question: 'Does Dr. Puneet Kumar provide continuous glucose monitoring (CGM)?',
        answer:
          'Yes. Sensor-based continuous glucose monitoring (CGMS) is routinely evaluated for patients with volatile blood sugar fluctuations, unexplainable hypoglycemia, or those wanting granular insights into glycemic variability.'
      },
      {
        question: 'Can diabetes be reversed if detected early?',
        answer:
          'For newly diagnosed patients with prediabetes or early-stage Type 2 diabetes, structured calorie regulation, weight reduction, and physical conditioning can result in significant metabolic remission (normal HbA1c without medications). Dr. Puneet guides patients step-by-step through medically supervised reversal protocols.'
      }
    ],
    relatedTreatments: [
      {
        title: 'Type 2 Diabetes Management',
        slug: 'diabetes-management',
        description: 'Comprehensive glycemic stabilization, medication reviews, and organ-protective therapy.'
      },
      {
        title: 'Hypertension & Cardiovascular Risk',
        slug: 'hypertension',
        description: 'Blood pressure control, cardiac screening, and stroke prevention protocols.'
      },
      {
        title: 'Thyroid & Endocrine Disorders',
        slug: 'thyroid-disorders',
        description: 'Accurate diagnosis and titration for Hypothyroidism, Hashimoto’s, and metabolic issues.'
      },
      {
        title: 'Metabolic Syndrome & Obesity',
        slug: 'metabolic-syndrome-obesity',
        description: 'Targeted medical management of visceral adiposity, lipid abnormalities, and insulin resistance.'
      }
    ]
  },

  chandigarh: {
    slug: 'diabetes-specialist-chandigarh',
    cityName: 'Chandigarh',
    metaTitle: 'Diabetes Specialist Near Chandigarh | Dr. Puneet Kumar',
    metaDescription:
      'Looking for a diabetes specialist near Chandigarh? Consult Senior Physician Dr. Puneet Kumar at his verified Mohali clinic. Advanced metabolic & HbA1c care.',
    breadcrumbLabel: 'Chandigarh Diabetes Care',
    eyebrow: 'Dedicated Consultation for Patients from Chandigarh',
    h1: 'Looking for a Diabetes Specialist in Chandigarh?',
    heroSubtitle:
      'Patients from Chandigarh can easily access experienced, patient-first diabetes care and internal medicine consultations with Dr. Puneet Kumar at his verified Mohali practice.',
    targetKeywords: [
      'Diabetes specialist Chandigarh',
      'Diabetes doctor near Chandigarh',
      'Physician near Chandigarh',
      'Internal medicine specialist Chandigarh',
      'Type 2 diabetes consultation Chandigarh'
    ],
    locationNotice:
      'Please note: Dr. Puneet Kumar does not operate a physical clinic in Chandigarh. Consultations are conducted at his verified clinical chambers at Livasa Hospital (Sector 71, Mohali) and Aggarwal Clinic, just minutes across the Chandigarh border.',
    commuteInfo: {
      travelTime: '10 – 20 minutes from most Chandigarh sectors',
      routeDetails:
        'Direct, signal-synchronized connectivity via Himalaya Marg, Dakshin Marg, Vikas Marg, or Jan Marg into Mohali Sector 71. Convenient commute from Sectors 34–47, Sector 35, Sector 43 ISBT, and Tribune Chowk.',
      parkingInfo: 'Spacious on-campus hospital parking with prompt wheelchair assistance and lift access.'
    },
    introParagraphs: [
      'Finding an experienced, empathetic diabetes doctor near Chandigarh who takes the time to thoroughly analyze your medical history can be challenging amidst crowded tertiary hospital departments. Dr. Puneet Kumar welcomes patients from across Chandigarh seeking attentive, evidence-based management for Type 1 and Type 2 diabetes, high blood pressure, and chronic metabolic disorders.',
      'Located just a short, convenient drive across the Chandigarh–Mohali boundary in Sector 71, Dr. Puneet Kumar’s practice provides in-depth outpatient consultations without the frustrating delays or hasty 3-minute appointments typical of massive commercial setups. With over 15 years of tertiary-care clinical experience in the Tricity, Dr. Puneet ensures each Chandigarh patient receives personalized treatment guided by international diabetology protocols.'
    ],
    careHighlights: [
      {
        title: 'Accessible Second Opinions',
        description: 'Thorough Prescription Reviews for Chandigarh Residents',
        points: [
          'Detailed assessment before initiating lifelong insulin therapy',
          'Elimination of redundant or conflicting medications across multiple specialists',
          'Evaluation of unexplained glycemic volatility or therapy failures',
          'Careful discussion of risk-benefit ratios for newly introduced diabetes drugs'
        ]
      },
      {
        title: 'Cardio-Metabolic Risk Prevention',
        description: 'Synchronized Care for Blood Sugar, Cholesterol & Blood Pressure',
        points: [
          'Integrated screening for silent coronary artery disease and microvascular risks',
          'Treatment of diabetic dyslipidemia with modern statins and non-statin therapies',
          'Ambulatory blood pressure monitoring and salt-sensitivity evaluations',
          'Renal protection protocols preventing diabetic nephropathy progression'
        ]
      },
      {
        title: 'Streamlined Appointment Coordination',
        description: 'Efficient Consultation Scheduling for Commuting Patients',
        points: [
          'Exact 15-minute scheduled appointment slots to respect your travel time',
          'Same-day basic on-site laboratory investigations at Livasa Hospital',
          'Telephonic and digital follow-up coordination between in-person visits',
          'Comfortable patient waiting lounge with priority senior citizen support'
        ]
      }
    ],
    diabetesManagementFocus: [
      {
        heading: 'Why Chandigarh Patients Travel to Dr. Puneet Kumar in Mohali',
        body: 'Residents of Chandigarh—including active professionals in IT Park, retired government officers in South Chandigarh, and families seeking compassionate geriatric care—often look for a senior consultant physician who listens patiently. Dr. Puneet Kumar devotes dedicated time to each patient, reviewing dietary habits, family background, and work stressors to find practical, non-punitive solutions for blood sugar management.'
      },
      {
        heading: 'Structured Transition from Tablets to Insulin',
        body: 'Many patients from Chandigarh seek a consultation when their oral medications no longer maintain target blood sugars. The prospect of starting insulin can cause anxiety. Dr. Puneet provides gentle, structured education on painless micro-fine pen needles, precise dosage titration, and nighttime glucose safety, ensuring a calm and confident transition.'
      },
      {
        heading: 'Comprehensive Internal Medicine Oversight',
        body: 'As a post-graduate Senior Physician (MD Medicine), Dr. Puneet does not treat diabetes as an isolated disease. He examines your thyroid status, liver function, cardiovascular metrics, and joint health together. This holistic internal medicine approach prevents fragmented medical advice and ensures your entire body is protected.'
      }
    ],
    whyConsultPoints: [
      {
        title: 'Close to Chandigarh Border',
        desc: 'Located in Sector 71, Mohali—just a 10–15 minute drive from South Chandigarh, Sector 43, 44, 45, and 35.'
      },
      {
        title: 'Senior Clinical Consultant',
        desc: 'Former consultant with prominent regional hospitals including Max Super Specialty, Indus, and SGHS Sohana.'
      },
      {
        title: 'Evidence-Based Care',
        desc: 'Adheres to American Diabetes Association (ADA) and RSSDI guidelines for safe, modern glycemic control.'
      },
      {
        title: 'Respect for Your Time',
        desc: 'Dedicated 15-minute pre-booked consultation slots prevent the exhausting delays of major city hospitals.'
      }
    ],
    faqs: [
      {
        question: 'Does Dr. Puneet Kumar have a clinic in Chandigarh?',
        answer:
          'No. To maintain clinical focus and diagnostic quality, Dr. Puneet Kumar practices in Mohali at Livasa Hospital (Sector 71) during the daytime and at Aggarwal Clinic during the evening. Both locations are just 10 to 15 minutes away from most Chandigarh sectors.'
      },
      {
        question: 'How far is the clinic from Chandigarh Sector 43 and Sector 17?',
        answer:
          'From Sector 43 (ISBT), the drive to Livasa Hospital in Sector 71 is approximately 8–10 minutes via Himalaya Marg / Vikas Marg. From Sector 17, it typically takes 15–18 minutes depending on traffic.'
      },
      {
        question: 'Can I book an appointment in advance so I do not have to wait after traveling from Chandigarh?',
        answer:
          'Yes. Our website offers pre-booked 15-minute consultation slots. Booking online or calling ahead guarantees your appointment window and minimizes clinic waiting time.'
      },
      {
        question: 'Are blood tests available at the Mohali clinic if I travel from Chandigarh?',
        answer:
          'Yes. Livasa Hospital offers full on-site accredited laboratory diagnostics, including Fasting Blood Sugar, HbA1c, Lipid Profile, Kidney Function Tests, and Liver Function Tests with fast turnaround times.'
      },
      {
        question: 'Can I consult Dr. Puneet for a second opinion on diabetes medicines?',
        answer:
          'Certainly. Many patients from Chandigarh visit Dr. Puneet Kumar specifically for a comprehensive second opinion on ongoing diabetes medications, insulin dosage reviews, or advice on newer injectable GLP-1 therapies.'
      }
    ],
    relatedTreatments: [
      {
        title: 'Type 2 Diabetes Management',
        slug: 'diabetes-management',
        description: 'Advanced protocols for glycemic stabilization, insulin titration, and lifestyle modification.'
      },
      {
        title: 'High Blood Pressure Care',
        slug: 'hypertension',
        description: 'Comprehensive hypertension evaluations to prevent stroke and cardiac complications.'
      },
      {
        title: 'Cardiovascular Risk Assessment',
        slug: 'chest-pain-cardiac-risk',
        description: 'Clinical evaluation of heart health, lipid profiles, and early warning signs.'
      },
      {
        title: 'Thyroid Care & Protocols',
        slug: 'thyroid-disorders',
        description: 'Detailed hormone evaluation for fatigue, weight gain, and metabolic sluggishness.'
      }
    ]
  },

  panchkula: {
    slug: 'diabetes-specialist-panchkula',
    cityName: 'Panchkula',
    metaTitle: 'Diabetes Specialist Near Panchkula | Dr. Puneet Kumar',
    metaDescription:
      'Specialized diabetes care for patients from Panchkula. Consult Dr. Puneet Kumar in Mohali for Type 2 diabetes management, insulin guidance, and metabolic health.',
    breadcrumbLabel: 'Panchkula Diabetes Care',
    eyebrow: 'Specialized Consultations for Panchkula Patients',
    h1: 'Diabetes Care for Patients from Panchkula',
    heroSubtitle:
      'Patients from Panchkula can consult Senior Physician Dr. Puneet Kumar at his verified Mohali medical center for structured, compassionate diabetes and internal medicine care.',
    targetKeywords: [
      'Diabetes specialist Panchkula',
      'Diabetes doctor near Panchkula',
      'Physician near Panchkula',
      'Diabetes management Panchkula',
      'Internal medicine consultation Panchkula'
    ],
    locationNotice:
      'Important note: Dr. Puneet Kumar does not have a clinic branch in Panchkula. Consultations are held exclusively at his verified Mohali clinical locations (Livasa Hospital, Sector 71 and Aggarwal Clinic).',
    commuteInfo: {
      travelTime: '20 – 35 minutes via PR7 Airport Expressway or Madhya Marg',
      routeDetails:
        'Direct commute from Panchkula Sectors 1–25, Mansa Devi Complex (MDC), and Pinjore/Kalka belt via the high-speed Airport Expressway (PR7) or through Madhya Marg / Dakshin Marg into Mohali Sector 71.',
      parkingInfo: 'Ample on-premises hospital parking with dedicated drop-off points for elderly patients.'
    },
    introParagraphs: [
      'For families and working professionals living in Panchkula, finding a trusted Senior Physician and Diabetologist with a calm, attentive bedside manner often means exploring doctors across the Tricity. Dr. Puneet Kumar regularly treats patients traveling from Panchkula, Mansa Devi Complex, and the surrounding Kalka–Pinjore foothills who value thorough, personalized clinical management.',
      'Located in Sector 71, Mohali—conveniently reached in under 30 minutes via the PR7 Airport Road corridor—Dr. Puneet Kumar provides comprehensive clinical care backed by over 15 years of medical experience. Whether you are dealing with newly discovered high blood sugar, resistant HbA1c levels, or diabetic nerve tingling, our practice focuses on long-term health preservation and honest, transparent medical guidance.'
    ],
    careHighlights: [
      {
        title: 'Holistic Diabetology Protocols',
        description: 'Targeted Glycemic Control Geared for Active Living',
        points: [
          'Detailed continuous monitoring of glycemic variability and morning fasting spikes',
          'Selection of weight-neutral or weight-loss favoring diabetes medications',
          'Guidance on safe physical activity, walking targets, and yoga for metabolic health',
          'Nutritional education aligned with traditional Punjabi and North Indian culinary habits'
        ]
      },
      {
        title: 'Geriatric & Complex Patient Care',
        description: 'Gentle, Respectful Medical Attention for Seniors',
        points: [
          'Careful prevention of hypoglycemia (dangerously low blood sugar) in elderly patients',
          'Streamlined medication regimens to reduce high pill burdens (deprescribing unnecessary drugs)',
          'Regular kidney function and electrolyte monitoring for long-term safety',
          'Family-involved counseling so caretakers understand warning signs and emergency steps'
        ]
      },
      {
        title: 'Coordinated Visit Scheduling',
        description: 'Single-Visit Comprehensive Evaluation for Outstation Commuters',
        points: [
          'Scheduled appointment slots so patients arriving from Panchkula are seen promptly',
          'Coordination of fasting and post-meal tests within the hospital diagnostic facility',
          'Thorough consultation time allowing all your questions to be answered completely',
          'Detailed printed treatment summaries and WhatsApp inquiry channel for interim follow-ups'
        ]
      }
    ],
    diabetesManagementFocus: [
      {
        heading: 'Why Patients Travel from Panchkula to Consult Dr. Puneet Kumar',
        body: 'Panchkula residents often prefer the peaceful, highly professional consultation environment of our Sector 71 Mohali center over commercial multi-chain clinics. Dr. Puneet Kumar takes personal responsibility for each patient’s clinical journey, tracking their progress over months and years rather than rotating them through junior duty doctors.'
      },
      {
        heading: 'Diabetic Neuropathy & Foot Care Screening',
        body: 'Numbness, burning sensations, or tingling in the feet are frequent early indicators of diabetic peripheral neuropathy. Dr. Puneet performs clinical vibration, monofilament, and temperature sensitivity evaluations to diagnose nerve involvement early and prescribe specialized neuro-protective protocols, preventing foot ulcers and chronic mobility limitations.'
      },
      {
        heading: 'Managing Diabetes with High Blood Pressure & High Cholesterol',
        body: 'Over 70% of diabetic patients also manage hypertension or high triglycerides. Treating these together requires an experienced internal medicine specialist who understands drug interactions and metabolic pathways. Dr. Puneet Kumar balances your regimen to safeguard cardiac and vascular health simultaneously.'
      }
    ],
    whyConsultPoints: [
      {
        title: '15+ Years Clinical Leadership',
        desc: 'Extensive tertiary-care experience in internal medicine across premier Tricity healthcare networks.'
      },
      {
        title: 'Fellowship in Diabetes Mellitus',
        desc: 'Specialized post-doctoral certification from Medvarsity Apollo and the Royal Liverpool Academy, UK.'
      },
      {
        title: 'Smooth Travel via Airport Road (PR7)',
        desc: 'Fast, bypass connectivity from Panchkula avoiding inner city congestion directly into Sector 71 Mohali.'
      },
      {
        title: 'Continuous Follow-Up Support',
        desc: 'Dedicated clinic phone line and WhatsApp channel for timely prescription inquiries between visits.'
      }
    ],
    faqs: [
      {
        question: 'Does Dr. Puneet Kumar practice in Panchkula?',
        answer:
          'No. Dr. Puneet Kumar does not have a physical clinic in Panchkula. Consultations are provided at Livasa Hospital (Sector 71, Mohali) during daytime hours and Aggarwal Clinic during the evening. Panchkula patients easily reach the clinic via Airport Road (PR7) or Madhya Marg.'
      },
      {
        question: 'What is the fastest driving route from Panchkula to Sector 71, Mohali?',
        answer:
          'From South Panchkula (Sectors 20, 21, 25), the fastest route is via the PR7 Airport Expressway, which bypasses city traffic and reaches Sector 71 in approximately 22–26 minutes. From MDC or Sector 5, you can also travel via Madhya Marg / Dakshin Marg.'
      },
      {
        question: 'How can I ensure minimal waiting time when visiting from Panchkula?',
        answer:
          'We strongly recommend booking your consultation slot online via our website or calling our reception ahead of your visit. Our 15-minute slot management system prioritizes pre-scheduled patients so you are seen on time.'
      },
      {
        question: 'Can I do regular blood sugar follow-ups if I live in Panchkula?',
        answer:
          'Yes. Many patients from Panchkula visit in person for initial comprehensive evaluations and quarterly reviews, while staying in touch via our designated clinic helpline and WhatsApp channel for routine blood sugar logs and minor dosage queries.'
      },
      {
        question: 'What symptoms indicate I should see a diabetes doctor immediately?',
        answer:
          'You should seek immediate medical consultation if you experience persistent excessive thirst, sudden unexplained weight loss, blurred vision, slow-healing cuts or foot sores, frequent night urination, or persistent exhaustion.'
      }
    ],
    relatedTreatments: [
      {
        title: 'Type 2 Diabetes Management',
        slug: 'diabetes-management',
        description: 'Comprehensive glycemic stabilization, medication reviews, and organ-protective therapy.'
      },
      {
        title: 'Hypertension & Cardiovascular Risk',
        slug: 'hypertension',
        description: 'Blood pressure control, cardiac screening, and stroke prevention protocols.'
      },
      {
        title: 'General Weakness & Fatigue Workup',
        slug: 'general-weakness',
        description: 'Systematic medical screening to uncover hidden metabolic or endocrine deficits.'
      },
      {
        title: 'Fatty Liver & Metabolic Health',
        slug: 'metabolic-syndrome-obesity',
        description: 'Evidence-based protocols to manage hepatic steatosis and insulin resistance.'
      }
    ]
  }
};
