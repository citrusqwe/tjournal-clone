import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { WriteForm } from '../../components/WriteForm';
import { NextPage } from 'next';

const WritePage: NextPage = () => {
  return (
    <MainLayout className="main-layout-white" hideComments hideMenu>
      <WriteForm />
    </MainLayout>
  );
};

export default WritePage;
