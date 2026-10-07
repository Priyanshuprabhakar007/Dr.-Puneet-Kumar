import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import {
  Apple,
  FileText,
  AlertTriangle,
  Heart,
  CheckCircle2,
  Calendar,
  Phone,
  Droplet,
  Download,
  ShieldAlert
} from 'lucide-react';

export const PatientResourcesPage: React.FC = () => {
  const { data, openAppointmentModal } = useSite();

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-green-100 text-green-800 text-xs font-semibold">
            <Apple className="w-3.5 h-3.5 text-green-600" />
            <span>Doctor-Approved Guidance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Patient Education & Health Resources
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Practical lifestyle advice, daily diabetes meal recommendations, home tracking templates, and urgent red flag indicators prepared by Dr. Puneet Kumar.
          </p>
        </div>

        {/* 1. Indian Diabetes Meal Plate Method */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Nutrition Protocol</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                The Balanced North Indian Diabetes Plate
              </h2>
            </div>
            <span className="bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-3 py-1 rounded-2xl w-max">
              Low Glycemic Load
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1/2 Plate Vegetables */}
            <div className="p-5 rounded-2xl bg-green-50/50 border border-green-100 space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-green-600 text-white font-bold flex items-center justify-center text-sm">
                50%
              </div>
              <h3 className="font-bold text-slate-900 text-base">Non-Starchy Vegetables</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fill half your plate with sautéed or steamed vegetables and raw salads: cucumber, bhindi, louki, palak, methi, cabbage, cauliflower.
              </p>
              <p className="text-[11px] font-semibold text-green-800">
                Benefit: Rich fiber slows glucose absorption.
              </p>
            </div>

            {/* 1/4 Plate Protein */}
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                25%
              </div>
              <h3 className="font-bold text-slate-900 text-base">Lean Protein</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Quarter of plate: Yellow moong dal, chana, paneer (unsalted/low-fat), boiled eggs, grilled fish, or sprouts.
              </p>
              <p className="text-[11px] font-semibold text-blue-800">
                Benefit: Stabilizes satiety and prevents muscle wasting.
              </p>
            </div>

            {/* 1/4 Plate Complex Carbs */}
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                25%
              </div>
              <h3 className="font-bold text-slate-900 text-base">Complex Whole Grains</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Remaining quarter: Whole wheat + multigrain chapatis (jowar, bajra, ragi mix) or brown/parboiled basmati rice in moderate portions.
              </p>
              <p className="text-[11px] font-semibold text-blue-800">
                Rule: Avoid refined maida, naans, and sweetened desserts.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Self-Monitoring: Blood Sugar & Blood Pressure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Droplet className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              When to Check Your Blood Sugar (SMBG)
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Fasting (Morning):</strong> Target 80–130 mg/dL immediately after waking up before breakfast.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Post-Prandial (2 Hours after major meal):</strong> Target &lt; 180 mg/dL (or &lt; 140 mg/dL for younger patients).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Before Bedtime:</strong> Target 100–140 mg/dL to prevent nighttime hypoglycemia.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Accurate Home Blood Pressure Rules
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Rest quietly for 5 minutes prior without talking or looking at phone screens.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Sit with back supported, feet flat on the floor, and arm supported at heart level.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Take 2 readings 1 minute apart and record the average in your log.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Red Flag Warning Signs */}
        <div className="bg-red-50/80 rounded-2xl p-6 sm:p-8 border border-red-200 space-y-4">
          <div className="flex items-center gap-2.5 text-red-900">
            <ShieldAlert className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-bold">When to Seek Urgent Emergency Care</h3>
          </div>
          <p className="text-xs sm:text-sm text-red-950">
            Certain medical symptoms warrant immediate emergency hospital attention rather than waiting for an outpatient appointment:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            <div className="bg-white p-3.5 rounded-2xl border border-red-100 text-xs text-slate-800 font-medium space-y-1">
              <span className="font-bold text-red-700 block">Chest Pain / Heaviness</span>
              <span>Radiating pain to jaw, shoulder, or arm accompanied by cold sweating.</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-red-100 text-xs text-slate-800 font-medium space-y-1">
              <span className="font-bold text-red-700 block">Severe Hypoglycemia</span>
              <span>Blood sugar &lt; 60 mg/dL with confusion, trembling, or loss of consciousness.</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-red-100 text-xs text-slate-800 font-medium space-y-1">
              <span className="font-bold text-red-700 block">Neurological Deficit</span>
              <span>Sudden facial droop, slurred speech, or weakness on one side of body.</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-red-100 text-xs text-slate-800 font-medium space-y-1">
              <span className="font-bold text-red-700 block">High Fever with Rigors</span>
              <span>Fever above 103°F with altered sensorium or persistent vomiting.</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-red-100 text-xs text-slate-800 font-medium space-y-1">
              <span className="font-bold text-red-700 block">Severe Breathlessness</span>
              <span>Oxygen saturation (SpO2) dropping below 93% or blue lips.</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-red-100 text-xs text-slate-800 font-medium space-y-1">
              <span className="font-bold text-red-700 block">Diabetic Foot Wound</span>
              <span>Sudden black discoloration, foul discharge, or rapidly spreading redness.</span>
            </div>
          </div>
        </div>

        {/* Action Banner */}
        <div className="p-8 rounded-2xl bg-blue-900 text-white text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold">Have Questions About Your Health Reports?</h3>
          <p className="text-sm text-blue-200 max-w-xl mx-auto">
            Schedule a comprehensive outpatient consultation with Dr. Puneet Kumar at Sector 71, Mohali.
          </p>
          <button
            onClick={() => openAppointmentModal('Health Report Evaluation')}
            className="px-6 py-3 bg-white text-blue-900 font-bold text-xs rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Book Consultation Slot
          </button>
        </div>
      </div>
    </div>
  );
};
