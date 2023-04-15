import { Head, usePage } from "@inertiajs/inertia-react";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../Components/Dashboard/Navbar";
import Sidebar from "../Components/Dashboard/Sidebar";
import Footer from "../Components/Dashboard/Footer";
import { Box, Container } from "@mui/material";

export default function Base({ children, title }) {
  const { flash } = usePage().props;

  flash.type && toast[flash.type](flash.message);

  return (
    // <div className="g-sidenav-show bg-gray-100">
    //   <div className="min-height-300 bg-primary position-absolute w-100"></div>
    <Container maxWidth="lg">
      <Head title={title} />
      <Sidebar />
      <main className="main-content position-relative border-radius-lg d-flex flex-column min-vh-100 ">
        <Box sx={{ justifyContent: "flex-end" }}>
          <Navbar pageName={title} />
        </Box>

        <Toaster position="top-center" duration="4000" />
        {children}
        <Footer />
      </main>
    </Container>
    // </div>
  );
}
