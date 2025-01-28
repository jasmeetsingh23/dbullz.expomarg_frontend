// import React from "react";
// import { FaCloudDownloadAlt } from "react-icons/fa"; // React Icons
// import { useState } from "react";
// // import "./css/bootstrap.min.css";
// import "./css/bootstrap-icons.css";
// import "./css/templatemo-ebook-landing.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./js/click-scroll.js";
// import "./js/custom.js";
// // import "./jquery.min.js";
// import "./js/jquery.sticky.js";
// import educaion from "./images/e.png";
// import a1 from "./images/avatar/a1.jpg";
// import a2 from "./images/avatar/a2.jpg";
// import a3 from "./images/avatar/a3.jpg";
// import a4 from "./images/avatar/a4.jpg";
// import t from "./images/t.jpg";
// import p from "./images/p.jpg";
// import b from "./images/b.jpg";
// import t2 from "./images/t2.png";
// import t3 from "./images/t3.png";
// import t4 from "./images/t4.png";
// import d1 from "./images/1.jpg";
// import d2 from "./images/3.jpg";
// import t5 from "./images/t6.jpg";
// import t7 from "./images/t7.jpg";

// const Landing = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   return (
//     <div>
//       <div>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <meta name="description" content />
//         <meta name="author" content />
//         <title>ebook landing page template</title>
//         {/* CSS FILES */}
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;600;700&display=swap"
//           rel="stylesheet"
//         />
//         <link href="css/bootstrap.min.css" rel="stylesheet" />
//         <link href="css/bootstrap-icons.css" rel="stylesheet" />
//         <link href="css/templatemo-ebook-landing.css" rel="stylesheet" />
//         {/*

// TemplateMo 588 ebook landing

// https://templatemo.com/tm-588-ebook-landing

// */}
//         <main>
//           <nav className="bg-black text-white py-4">
//             <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
//               {/* Logo */}
//               <a
//                 href="#"
//                 className="flex items-center text-2xl font-bold no-underline"
//               >
//                 <div className="flex items-center">
//                   <img
//                     src="https://expomarg.com/assets/ex-1qrSHV8e.png"
//                     alt="Expo Marg Logo"
//                     className="w-w-12 h-12  mr-2"
//                   />
//                   {/* <span className="text-white font-extrabold">EXPO MARG</span> */}
//                 </div>
//               </a>

//               {/* Desktop Navbar Menu */}
//               <div className="lg:flex hidden space-x-8">
//                 <a
//                   href="#section_1"
//                   className=" no-underline font-bold"
//                   style={{ color: "#91c848" }}
//                 >
//                   Home
//                 </a>
//                 <a
//                   href="#section_2"
//                   className=" no-underline font-bold"
//                   style={{ color: "#91c848" }}
//                 >
//                   3D Design
//                 </a>
//                 <a
//                   href="#section_3"
//                   className=" no-underline font-bold"
//                   style={{ color: "#91c848" }}
//                 >
//                   Upcoming Events
//                 </a>
//                 <a
//                   href="#section_4"
//                   className=" no-underline font-bold"
//                   style={{ color: "#91c848" }}
//                 >
//                   Business Inquiries
//                 </a>
//                 <a
//                   href="#section_5"
//                   className=" no-underline font-bold"
//                   style={{ color: "#91c848" }}
//                 >
//                   Cost Calculation
//                 </a>
//               </div>

//               {/* Download Button */}
//               <a
//                 href="#"
//                 className="border-2  py-2 px-4 rounded-full no-underline font-bold"
//                 style={{ borderColor: "#91c848", color: "#91c848" }}
//               >
//                 Demo
//               </a>

//               {/* Mobile Menu Button */}
//               <button
//                 className="lg:hidden text-white"
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h16M4 18h16"
//                   ></path>
//                 </svg>
//               </button>
//             </div>

//             {/* Mobile Navbar Menu */}
//             <div
//               className={`${
//                 isMenuOpen ? "block" : "hidden"
//               } lg:hidden bg-black text-white flex flex-col space-y-4 px-4 py-6`}
//             >
//               <a
//                 href="#section_1"
//                 className=" no-underline font-bold"
//                 style={{ color: "#91c848" }}
//               >
//                 Home
//               </a>
//               <a
//                 href="#section_2"
//                 className=" no-underline font-bold"
//                 style={{ color: "#91c848" }}
//               >
//                 3D Design
//               </a>
//               <a
//                 href="#section_3"
//                 className=" no-underline font-bold"
//                 style={{ color: "#91c848" }}
//               >
//                 Upcoming Events
//               </a>
//               <a
//                 href="#section_4"
//                 className=" no-underline font-bold"
//                 style={{ color: "#91c848" }}
//               >
//                 Business Inquiries
//               </a>
//               <a
//                 href="#section_5"
//                 className=" no-underline font-bold"
//                 style={{ color: "#91c848" }}
//               >
//                 Cost Calculation
//               </a>
//             </div>
//           </nav>

//           {/* HOME PAGE */}

//           <section
//             className="hero-section d-flex justify-content-center align-items-center"
//             id="section_1"
//             style={{
//               backgroundImage: `url('https://capexil.org/wp-content/uploads/2024/10/coverings-2025.jpg')`,
//             }}
//           >
//             {/* Adding a stronger blur overlay */}
//             <div className="absolute inset-0 bg-black opacity-50 blur-lg"></div>
//             <div className="container">
//               <div className="row">
//                 <div className="col-lg-6 col-12 mb-5 pb-5 pb-lg-0 mb-lg-0">
//                   <h1 className="font-extrabold" style={{ color: "#91c848" }}>
//                     Welcome to EXPOMARG
//                   </h1>
//                   <h1 className="text-white mb-4 font-bold">
//                     The Ultimate Expo Platform for 3D Designs, Events, and More
//                   </h1>
//                   <a
//                     href="#section_2"
//                     className="btn custom-btn smoothscroll me-3"
//                     style={{ fontWeight: "bold", color: "#91c848" }}
//                   >
//                     Explore 3D Designs
//                   </a>
//                   <a
//                     href="#section_3"
//                     className="link link--kale smoothscroll"
//                     style={{ fontWeight: "bold" }}
//                   >
//                     View Upcoming Events
//                   </a>
//                 </div>
//                 <div className="hero-image-wrap col-lg-6 col-12 mt-3 mt-lg-0">
//                   <img
//                     src={t2}
//                     className="hero-image img-fluid"
//                     alt="education online books"
//                   />
//                 </div>
//               </div>
//             </div>
//           </section>
//           <section className="featured-section">
//             <div className="container">
//               <div className="row">
//                 <div className="col-lg-8 col-12"></div>
//               </div>
//             </div>
//           </section>

//           {/* Other content */}
//           <section className="py-lg-5" />
//           <section className="book-section section-padding" id="section_2">
//             <div className="container">
//               <div className="row">
//                 <div className="col-lg-6 col-12">
//                   <img src={t4} className="img-fluid" alt />
//                 </div>
//                 <div className="col-lg-6 col-12">
//                   <div className="book-section-info">
//                     <h6
//                       className=" font-extrabold text-2xl"
//                       style={{ color: "#91c848" }}
//                     >
//                       Innovative &amp; Cutting-Edge
//                     </h6>
//                     <h2 className="text-5xl font-extrabold mb-4">
//                       About the 3D Expo
//                     </h2>
//                     <p className="text-xl ">
//                       Created by{" "}
//                       <a
//                         href="https://expomarg.com"
//                         target="_blank"
//                         className="  text-md font-extrabold no-underline"
//                         style={{ color: "#91c848" }}
//                       >
//                         EXPO MARG
//                       </a>
//                       , our 3D Expo offers immersive 3D models and images of
//                       expo spaces, booths, and designs. Explore, download, and
//                       customize high-quality 3D files for your projects.
//                       Experience the future of expos with interactive, dynamic
//                       3D content.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//           <section>
//             <div className="container">
//               <div className="row">
//                 <div className="col-lg-12 col-12 text-center">
//                   <h6
//                     className="font-extrabold text-2xl"
//                     style={{ color: "#91c848" }}
//                   >
//                     What's inside?
//                   </h6>
//                   <h2 className="mb-5 text-5xl font-extrabold">
//                     Preview at glance
//                   </h2>
//                 </div>
//                 <div className="col-lg-4 col-12">
//                   <nav
//                     id="navbar-example3"
//                     className="h-100 flex-column align-items-stretch"
//                   >
//                     <nav className="nav nav-pills flex-column font-medium">
//                       <a className="nav-link smoothscroll " href="#item-1">
//                         Introduction
//                       </a>
//                       <a className="nav-link smoothscroll" href="#item-2">
//                         Chapter 1: <strong>View 3D Design</strong>
//                       </a>
//                       <a className="nav-link smoothscroll" href="#item-3">
//                         Chapter 2:{" "}
//                         <strong>Upload Your Personal 3D Design</strong>
//                       </a>
//                       <a className="nav-link smoothscroll" href="#item-4">
//                         Chapter 3: <strong> Edit and Delete 3D Design </strong>
//                       </a>
//                       <a className="nav-link smoothscroll" href="#item-5">
//                         Chapter 4: <strong>Download the 3D Files</strong>
//                       </a>
//                     </nav>
//                   </nav>
//                 </div>
//                 <div className="col-lg-8 col-12">
//                   <div
//                     data-bs-spy="scroll"
//                     data-bs-target="#navbar-example3"
//                     data-bs-smooth-scroll="true"
//                     className="scrollspy-example-2"
//                     tabIndex={0}
//                   >
//                     <div className="scrollspy-example-item" id="item-1">
//                       <h5 className="text-4xl font-bold">
//                         Introducing 3D Expo
//                       </h5>
//                       <p className="text-xl">
//                         This 3D Expo landing page is perfect for showcasing
//                         innovative 3D designs and interactive experiences. The
//                         layout is built on a responsive, user-friendly design to
//                         ensure a seamless browsing experience.
//                       </p>
//                       <p className="text-xl">
//                         <strong>What is 3D Design Expo?</strong> If you're
//                         curious about the latest in 3D design, this is the place
//                         to explore and discover cutting-edge 3D models,
//                         interactive images, and immersive virtual spaces.
//                       </p>
//                       <blockquote className="blockquote ">
//                         "Explore the future of design through interactive 3D
//                         visuals and discover new possibilities for your
//                         projects."
//                       </blockquote>
//                       <p className="text-xl">
//                         Whether you're a designer, artist, or enthusiast, the 3D
//                         Expo offers a range of tools to view, download, and even
//                         edit 3D files for your own projects. Dive into a world
//                         of creativity with EXPO MARG.
//                       </p>
//                     </div>
//                     <div className="scrollspy-example-item" id="item-2">
//                       <h5 className="text-4xl font-bold">View 3D Design</h5>
//                       <p className="text-xl">
//                         Explore stunning 3D designs created specifically for our
//                         expo. With immersive 3D models, you can interact with
//                         the designs and get a closer look at booth layouts,
//                         event spaces, and more.
//                       </p>
//                       <p className="text-xl">
//                         Whether you're a designer looking for inspiration or an
//                         enthusiast eager to dive into the world of 3D design,
//                         this section allows you to view and interact with
//                         cutting-edge 3D visualizations. Zoom in, rotate, and
//                         explore every detail of our curated expo designs.
//                       </p>
//                       <p className="text-xl">
//                         All designs are available for download, so you can use
//                         them in your own projects or explore the potential of 3D
//                         modeling for expos and events.
//                       </p>
//                       <div className="row">
//                         <div className="col-lg-6 col-12 mb-3">
//                           <img
//                             src={d1}
//                             className="scrollspy-example-item-image img-fluid"
//                             alt
//                           />
//                         </div>
//                         <div className="col-lg-6 col-12 mb-3">
//                           <img
//                             src={d2}
//                             className="scrollspy-example-item-image img-fluid"
//                             alt
//                           />
//                         </div>
//                       </div>
//                       <p className="text-xl">
//                         Ready to see more? Explore the entire 3D expo collection
//                         to view interactive designs and download files for your
//                         personal or professional use.
//                       </p>
//                     </div>
//                     <div className="scrollspy-example-item" id="item-3">
//                       <h5 className="text-4xl font-bold">
//                         Upload Your Personal 3D Design
//                       </h5>
//                       <p className="text-xl">
//                         Share your own 3D designs with the expo community!
//                         Upload your files and showcase your creative work to a
//                         global audience. Whether it's a booth design, product
//                         model, or event space, your contribution can inspire
//                         others in the world of 3D design.
//                       </p>
//                       <p className="text-xl">
//                         Uploading your 3D designs is simple and fast. Just
//                         follow the instructions to submit your files, and your
//                         designs will be showcased in our interactive expo. Join
//                         us in bringing creativity and innovation to life.
//                       </p>
//                       <p className="text-xl">
//                         Once uploaded, your designs will be available for others
//                         to explore, download, and customize. Start sharing your
//                         3D creations today and be part of an exciting digital
//                         expo experience!
//                       </p>
//                       <div className="row align-items-center">
//                         <div className="col-lg-6 col-12">
//                           <img src={t5} className="img-fluid" alt />
//                         </div>
//                         <div className="col-lg-6 col-12">
//                           <p className="text-xl">Upload Your Design Today</p>
//                           <p className="text-xl">
//                             <strong>
//                               Make your 3D designs accessible to a wider
//                               audience by uploading them to our platform. Help
//                               others explore your work and inspire the next big
//                               thing in 3D design!
//                             </strong>
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="scrollspy-example-item" id="item-4">
//                       <h5 className="text-4xl font-bold">
//                         Edit And Delete Your 3D Design
//                       </h5>
//                       <p className="text-xl">
//                         Easily manage your uploaded 3D designs by editing or
//                         deleting them whenever necessary. You can update your
//                         designs to keep them up-to-date with the latest changes
//                         or remove them if they are no longer needed.
//                       </p>
//                       <p className="text-xl">
//                         Whether you're refining your 3D models or clearing out
//                         outdated designs, our platform makes it simple to update
//                         your submissions with just a few clicks. Just go to your
//                         design dashboard to make changes.
//                       </p>
//                       <p className="text-xl">
//                         Deleting a design is just as easy. Once deleted, your 3D
//                         design will be removed from the expo, ensuring that only
//                         the most relevant content is available for viewing and
//                         download.
//                       </p>
//                       <img
//                         src={t7}
//                         className="scrollspy-example-item-image img-fluid mb-3"
//                         alt
//                       />
//                       <p className="text-xl">
//                         Need help with managing your designs? Contact us for
//                         more information on how to edit, update, or delete your
//                         3D models.
//                       </p>
//                     </div>
//                     <div className="scrollspy-example-item" id="item-5">
//                       <h5 className="text-4xl font-bold">
//                         Download the 3D Files
//                       </h5>
//                       <p className="text-xl">
//                         Download high-quality 3D files of expo designs, booth
//                         layouts, event spaces, and more. Our platform offers a
//                         wide variety of interactive 3D models that you can use
//                         in your projects or explore for inspiration.
//                       </p>
//                       <p className="text-xl">
//                         All 3D files are available in popular formats, ensuring
//                         compatibility with major 3D software. Simply select the
//                         file you want to download, and start integrating it into
//                         your designs or presentations.
//                       </p>
//                       <p className="text-xl">
//                         <strong>What are 3D Expo Files?</strong> 3D Expo files
//                         are interactive models and designs that showcase various
//                         elements of expos, including booths, event spaces, and
//                         product displays. Download these files to view, modify,
//                         or incorporate them into your own projects.
//                       </p>
//                       <blockquote className="blockquote">
//                         Download and customize 3D models for your projects, or
//                         explore innovative expo designs in 3D format.
//                       </blockquote>
//                       <p className="text-xl">
//                         Browse our collection of 3D expo files today and take
//                         your expo design experience to the next level. Thank you
//                         for exploring our virtual expo!
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//           <section className="author-section section-padding" id="section_3">
//             <div className="container">
//               <div className="row">
//                 <div className="col-lg-6 col-12">
//                   <img src={p} className="author-image img-fluid" alt />
//                 </div>
//                 <div className="col-lg-6 col-12 mt-5 mt-lg-0">
//                   <h6>Meet Author</h6>
//                   <h2 className="mb-4">Prof. Sophia</h2>
//                   <p>
//                     This is an ebook landing page template with Bootstrap 5 CSS
//                     framework. It is easy to customize with the use of Bootstrap
//                     CSS classes.
//                   </p>
//                   <p>
//                     Lorem ipsum dolor sit amet, consive adipisicing elit, sed do
//                     eiusmod. tempor incididunt ut labore.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </section>
//           <section className="reviews-section section-padding" id="section_4">
//             <div className="container">
//               <div className="row">
//                 <div className="col-lg-12 col-12 text-center mb-5">
//                   <h6>Reviews</h6>
//                   <h2>What people saying...</h2>
//                 </div>
//                 <div className="col-lg-4 col-12">
//                   <div className="custom-block d-flex flex-wrap">
//                     <div className="custom-block-image-wrap d-flex flex-column">
//                       <img src={a1} className="img-fluid avatar-image" alt />
//                       <div className="text-center mt-3">
//                         <span className="text-white">Sandy</span>
//                         <strong className="d-block text-white">Artist</strong>
//                       </div>
//                     </div>
//                     <div className="custom-block-info">
//                       <div className="reviews-group mb-3">
//                         <strong>4.5</strong>
//                         <i className="bi-star-fill" />
//                         <i className="bi-star-fill" />
//                         <i className="bi-star-fill" />
//                         <i className="bi-star-fill" />
//                         <i className="bi-star" />
//                       </div>
//                       <p className="mb-0">
//                         Lorem ipsum dolor sit amet, consectetur adipisicing
//                         elit, sed do eiusmod tempor incididunt ut labore et
//                         dolore magna aliqua.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-lg-4 col-12 my-5 my-lg-0">
//                   <div className="custom-block d-flex flex-wrap">
//                     <div className="custom-block-image-wrap d-flex flex-column">
//                       <img
//                         src={a2}
//                         className="img-fluid avatar-image avatar-image-left"
//                         alt
//                       />
//                       <div className="text-center mt-3">
//                         <span className="text-white">John</span>
//                         <strong className="d-block text-white">Producer</strong>
//                       </div>
//                     </div>
//                     <div className="custom-block-info">
//                       <div className="reviews-group mb-3">
//                         <strong>3.5</strong>
//                         <i className="bi-star-fill" />
//                         <i className="bi-star-fill" />
//                         <i className="bi-star-fill" />
//                         <i className="bi-star" />
//                         <i className="bi-star" />
//                       </div>
//                       <p className="mb-0">
//                         If you need some specific CSS templates, you can Google
//                         with keywords such as templatemo one-page, templatemo
//                         portfolio, etc.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-lg-4 col-12">
//                   <div className="custom-block d-flex flex-wrap">
//                     <div className="custom-block-image-wrap d-flex flex-column">
//                       <img src={a3} className="img-fluid avatar-image" alt />
//                       <div className="text-center mt-3">
//                         <span className="text-white">Candy</span>
//                         <strong className="d-block text-white">
//                           VP, Design
//                         </strong>
//                       </div>
//                     </div>
//                     <div className="custom-block-info">
//                       <div className="reviews-group mb-3">
//                         <strong>5</strong>
//                         <i className="bi-star-fill" />
//                         <i className="bi-star-fill" />
//                         <i className="bi-star-fill" />
//                         <i className="bi-star-fill" />
//                         <i className="bi-star-fill" />
//                       </div>
//                       <p className="mb-0">
//                         Please tell your friends about our website that we
//                         provide 100% free CSS templates for everyone. Thank you
//                         for using our templates.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//           <section className="contact-section section-padding" id="section_5">
//             <div className="container">
//               <div className="row">
//                 <div className="col-lg-5 col-12 mx-auto">
//                   <form
//                     className="custom-form ebook-download-form bg-white shadow"
//                     action="#"
//                     method="post"
//                     role="form"
//                   >
//                     <div className="text-center mb-5">
//                       <h2 className="mb-1">Get your free ebook</h2>
//                     </div>
//                     <div className="ebook-download-form-body">
//                       <div className="input-group mb-4">
//                         <input
//                           type="text"
//                           name="ebook-form-name"
//                           id="ebook-form-name"
//                           className="form-control"
//                           aria-label="ebook-form-name"
//                           aria-describedby="basic-addon1"
//                           placeholder="Your Name"
//                           required
//                         />
//                         <span className="input-group-text" id="basic-addon1">
//                           <i className="custom-form-icon bi-person" />
//                         </span>
//                       </div>
//                       <div className="input-group mb-4">
//                         <input
//                           type="email"
//                           name="ebook-email"
//                           id="ebook-email"
//                           pattern="[^ @]*@[^ @]*"
//                           className="form-control"
//                           placeholder="your@company.com"
//                           aria-label="ebook-form-email"
//                           aria-describedby="basic-addon2"
//                           required
//                         />
//                         <span className="input-group-text" id="basic-addon2">
//                           <i className="custom-form-icon bi-envelope" />
//                         </span>
//                       </div>
//                       <div className="col-lg-8 col-md-10 col-8 mx-auto">
//                         <button type="submit" className="form-control">
//                           Download ebook
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//                 <div className="col-lg-6 col-12">
//                   <h6 className="mt-5">Say hi and talk to us</h6>
//                   <h2 className="mb-4">Contact</h2>
//                   <p className="mb-3">
//                     <i className="bi-geo-alt me-2" />
//                     London, United Kingdom
//                   </p>
//                   <p className="mb-2">
//                     <a href="tel: 010-020-0340" className="contact-link">
//                       010-020-0340
//                     </a>
//                   </p>
//                   <p>
//                     <a href="mailto:info@company.com" className="contact-link">
//                       info@company.com
//                     </a>
//                   </p>
//                   <h6 className="site-footer-title mt-5 mb-3">Social</h6>
//                   <ul className="social-icon mb-4">
//                     <li className="social-icon-item">
//                       <a href="#" className="social-icon-link bi-instagram" />
//                     </li>
//                     <li className="social-icon-item">
//                       <a href="#" className="social-icon-link bi-twitter" />
//                     </li>
//                     <li className="social-icon-item">
//                       <a href="#" className="social-icon-link bi-facebook" />
//                     </li>
//                     <li className="social-icon-item">
//                       <a href="#" className="social-icon-link bi-whatsapp" />
//                     </li>
//                   </ul>
//                   <p className="copyright-text">
//                     Copyright © 2048 ebook company
//                     <br />
//                     <br />
//                     <a
//                       rel="nofollow"
//                       href="https://templatemo.com"
//                       target="_blank"
//                     >
//                       designed by templatemo
//                     </a>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </main>
//         {/* JAVASCRIPT FILES */}
//       </div>
//     </div>
//   );
// };

// export default Landing;

import React from "react";

const Landing = () => {
  return <div></div>;
};

export default Landing;
