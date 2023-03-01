import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

import Layout from './Layout';
import BlogPage from './routes/BlogPage';
import LoginPage from './routes/LoginPage';
import StudyContentPage from './routes/StudyContentPage';
import ViewBlogPage from './routes/ViewBlogPage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/blog" replace />} />
        <Route path="blog">
          <Route index element={<BlogPage />} />
          <Route path=":blog" element={<ViewBlogPage />} />
        </Route>

        <Route path="study" element={<StudyContentPage />} />
        <Route path="login" element={<LoginPage />} />

        <Route path="*" element={404} />
      </Route>
    </Routes>
  </BrowserRouter>
);
