import { useState } from "react";

import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SideBar from "./components/SideBar";

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

  function handleAddProject(projectData) {
    setProjectState(prev => {
      const projectID = Math.random()
      const newProject = {
        ...projectData,
        id: projectID
      }
      return {
        ...prev,
        selectedProjectID: undefined,
        projects: [...prev.projects, newProject]
      }
    })
  }

  console.log('saved state:', projectState)

  let content

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
      />
      {content}
    </main>
  );
}

export default App;
