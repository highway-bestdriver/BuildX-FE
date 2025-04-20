"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectItem from "./_components/ProjectItem";
import { projectsData } from "./mock";

const ProjectsPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateNew = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/new/step/1");
    }, 1000);
  };

  return (
    <div className="relative flex flex-col w-full justify-center">
      <div className="triangle_48_SB pt-10 pb-10">DashBoard</div>

      <article className="flex-1 flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-x-3 gap-y-6">
          <div
            onClick={handleCreateNew}
            className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg h-48 cursor-pointer hover:bg-gray-100"
          >
            <span className="square_16_SB text-xl text-gray-600">
              Create New
            </span>
          </div>
          {projectsData.map((data) => (
            <ProjectItem key={data.id} {...data} />
          ))}
        </div>
      </article>

      {/* 로딩 UI */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-main_orange rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-3 h-3 bg-main_orange rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-3 h-3 bg-main_orange rounded-full animate-bounce" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
