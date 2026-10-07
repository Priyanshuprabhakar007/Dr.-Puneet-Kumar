import React from 'react';
import { useSite } from '../context/SiteContext';
import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminLayout } from '../components/admin/AdminLayout';

export const AdminPage: React.FC = () => {
  const { isAdminAuthenticated } = useSite();

  if (!isAdminAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminLayout />;
};
