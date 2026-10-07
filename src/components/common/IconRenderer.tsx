import React from 'react';
import {
  Activity,
  HeartPulse,
  ShieldAlert,
  Thermometer,
  Wind,
  Flame,
  Droplet,
  Zap,
  ZapOff,
  ShieldCheck,
  Coffee,
  CheckCircle2,
  AlertTriangle,
  TrendingDown,
  Shield,
  Bell,
  HeartHandshake,
  Search,
  Apple,
  Stethoscope,
  Pill,
  Award,
  Building,
  User,
  Clock,
  Sparkles
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Activity,
  HeartPulse,
  ShieldAlert,
  Thermometer,
  Wind,
  Flame,
  Droplet,
  Zap,
  ZapOff,
  ShieldCheck,
  Coffee,
  CheckCircle2,
  AlertTriangle,
  TrendingDown,
  Shield,
  Bell,
  HeartHandshake,
  Search,
  Apple,
  Stethoscope,
  Pill,
  Award,
  Building,
  User,
  Clock,
  Sparkles
};

export const IconRenderer: React.FC<{ name: string; className?: string }> = ({ name, className = 'w-5 h-5' }) => {
  const IconComponent = iconMap[name] || Activity;
  return <IconComponent className={className} />;
};
