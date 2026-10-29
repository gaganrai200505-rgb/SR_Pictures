import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import CaseStudies from './pages/CaseStudies';
import Changelog from './pages/Changelog';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Licenses from './pages/Licenses';
import NotFound from './pages/NotFound';
import Pricing from './pages/Pricing';
import Project from './pages/Project';
import Protected from './pages/Protected';
import Services from './pages/Services';
import StyleGuide from './pages/StyleGuide';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/template-info/style-guide" element={<div className="style-guide-body"><StyleGuide /></div>} />
        <Route path="/401" element={<Protected />} />
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/project/:slug" element={<Project />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-post/:slug" element={<BlogPost />} />
          <Route path="/template-info/licenses" element={<Licenses />} />
          <Route path="/template-info/changelog" element={<Changelog />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
