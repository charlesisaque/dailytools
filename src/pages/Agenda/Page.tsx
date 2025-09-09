import React from "react";

interface PageProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ title, description, children }) => {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-r from-gray-100 to-gray-50 min-h-screen mt-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
      {description && <p className="text-gray-600 mb-6">{description}</p>}
      <div>{children}</div>
    </div>
  );
};

export default Page;
