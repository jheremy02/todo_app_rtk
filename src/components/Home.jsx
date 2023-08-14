import ModalEditTask from "./ModalEditTask"
import NavBar from "./NavBar"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"


function Home() {
  return ( <section className="bg-white dark:bg-gray-900">
    <NavBar></NavBar>
  <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
  
      <TaskForm></TaskForm>
        <ModalEditTask></ModalEditTask>
      <TaskList></TaskList>
      
  </div>
</section>
  )
}

export default Home