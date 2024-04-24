import { useState } from "react";

import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SideBar from "./components/SideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectID: undefined,
    projects: []
  })

  function handleStartAddProject() {
    setProjectState(prev => {
      return {
        ...prev,
        selectedProjectID: null,
      }
    })
  }

  function handleCancelAddProject() {
    setProjectState(prev => {
      return {
        ...prev,
        selectedProjectID: undefined,
      }
    })
  }

  function handleSelectProject(id) {
    setProjectState((prev) => { 
      return { 
        ...prev, 
        selectedProjectID: id
      }
    })
  }


  function handleAddProject(projectData) {
    setProjectState(prev => {
      const projectID = Math.random()
      const newProject = {
        ...projectData,
        id: projectID
      }
      return {
        ...prev,
        selectedProjectID: projectID,
        projects: [...prev.projects, newProject]
      }
    })
  }

  function handleDeleteProject(){ 
    setProjectState((prev) => { 
      return { 
        ...prev, 
        selectedProjectID: undefined, 
        projects: prev.projects.filter((project) => project.id !== prev.selectedProjectID )
      }
    })
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectID)

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} />

  if (projectState.selectedProjectID === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  } else if (projectState.selectedProjectID === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
