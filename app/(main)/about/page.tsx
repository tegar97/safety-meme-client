import React from "react";

function page() {
  return (
    <main className="xl:col-span-2 sm-col-span-1 md:col-span-3 border px-4 py-4    justify-center w-full">
      <div className="w-full flex items-center">
        <img
          src="/logo-hack.png"
          alt="Logo-Kelompok-4"
          className="w-64 h-64 justify-items-center"
        />
      </div>
      <h1 className="text-xl font-semibold mb-4">Created by Kelompok 4 </h1>
      <span className="text-md text-muted-foreground">
        Safety Meme is a website project created as our final project, focusing
        on implementing a hate speech classifier.{" "}
      </span>
      <ul className="text-md text-muted-foreground mt-2 mb-2">
        <li>
          1. Muhammad Tegar Akmal - Institut Teknologi Nasional Bandung -
          Informatika - Batch 6
        </li>
        <li>
          2. Muhammad Bagas Satrio Wibowo - UPN Veteran Jatim - Sains Data -
          Batch 6
        </li>
        <li>
          3. Muhammad Yusuf Hamdani - Universitas Gunadarma - Sistem Komputer -
          Batch 6
        </li>
        <li>
          4. Muhammad Fatkhur Rozi - Universitas Airlangga - Ekonomi Islam -
          Batch 6
        </li>
        <li>
          5. ⁠Muhammad Ravi Himawan - Universitas Lambung Mangkurat - Teknologi
          Informasi - Batch 6
        </li>
        <li>
          6. Muhammad Dimas Vadithya - Universitas Sriwijaya - Sistem Komputer -
          Batch 6
        </li>
        <li>
          7. Muhammad Izza Nur Hakima - Universitas Ahmad Dahlan - Informatika -
          Batch 6
        </li>
      </ul>
      <h2>Special thanks to our mentor, Daniel Satria 🙌 . </h2>
    </main>
  );
}

export default page;
