import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import HomeScreen from './screens/Home/HomeScreen';
import AboutScreen from './screens/About/AboutScreen';
import CategoriesScreen from './screens/Categories/CategoriesScreen';
import ContactScreen from './screens/Contact/ContactScreen';
import ArticlesScreen from './screens/Articles/ArticlesScreen';
import ArticleDetailScreen from './screens/Articles/ArticleDetailScreen';
import SavedBlogsScreen from './screens/SavedBlogs/SavedBlogsScreen';
import AdminDashboard from './screens/admindashboard/AdminDashboard';
import ScrollToTop, { RouteScrollManager } from './components/ScrollToTop';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

function App() {
  return (
    <Router>                              
      <RouteScrollManager />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/categories" element={<CategoriesScreen />} />
        <Route path="/articles" element={<ArticlesScreen />} />
        <Route path="/articles/:id" element={<ArticleDetailScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path="/saved-blogs" element={<SavedBlogsScreen />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
      <ScrollToTop />
    </Router>
  );
}

export default App;
