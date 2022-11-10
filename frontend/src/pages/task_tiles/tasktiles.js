import SideNav from "../../components/sideNav/sideNav"
import './tasks.css'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faList } from "@fortawesome/free-solid-svg-icons";
import TasksList from "../../components/tasks_components/tasks_list/tasks_list";
import SpaceList from "../../components/spaces_components/spaces_list";
import "./spaces.css"

const Profile = ({ user, tasksArray }) => {
    const [view, setView] = useState("grid")
    const [filter, setFilter] = useState("all")
    const [selected] = useState("")
    const [spaces, setSpaces] = useState([])
    const [tasks, setTasks] = useState([])
    const [active, setActive] = useState("")

    useEffect(() => {
      fetch('/api/spaces/getSpaces')
      .then(res => res.json())
      .then(data => setSpaces(data))
      .catch(err => console.log(err));

      setTasks(tasksArray.filter(task => task.space === active))

  }, [setSpaces, active, tasksArray])


    
    useEffect(() => {
      fetch('/api/spaces/getSpaces')
      .then(res => res.json())
      .then(data => setSpaces(data))
      .catch(err => console.log(err));

      setTasks(tasksArray.filter(task => task.space === active))

  }, [setSpaces, active, tasksArray])

    useEffect(() => {
      //filter the tasks
      if(filter === "all") {
          setTasks(tasksArray)
      }
      else if(filter === "completed") {
          setTasks(tasksArray.filter(task => task.status === 'completed'))
      }
      else if(filter === "remaining") {
          setTasks(tasksArray.filter(task => task.status !== 'completed'))
      }
      else if(filter === "important") {
          setTasks(tasksArray.filter(task => task.priority === 'High'))
      }
      else if(filter === "recurring") {
          setTasks(tasksArray.filter(task => task.recurring === 'Yes'))
      }
      else {
          setTasks(tasksArray)
      }

  }, [filter, tasksArray, setTasks])


    return (
      <>
        <div className="tasks">
            <SideNav />
            <section>
            <div className="top-board">
                        <h2 onClick={() => setFilter("all")} className={(filter === "all")? "active" : ""}>All <span>{tasksArray && tasksArray.filter(task => task.createdBy === user).length}</span></h2>
                        <h2 onClick={() => setFilter("completed")} className={(filter === "completed")? "active" : ""}>Completed <span>{tasksArray && tasksArray.filter(task => task.status === 'completed' && task.createdBy === user).length}</span></h2>
                        <h2 onClick={() => setFilter("important")} className={(filter === "important")? "active" : ""}>Important <span>{tasksArray && tasksArray.filter(task => task.priority === 'High' && task.createdBy === user).length}</span></h2>
                        <h2 onClick={() => setFilter("remaining")} className={(filter === "remaining")? "active" : ""}>Remaining <span>{tasksArray && tasksArray.filter(task => task.status !== 'completed' && task.createdBy === user).length}</span></h2>
                        <h2 onClick={() => setFilter("recurring")} className={(filter === "recurring")? "active" : ""}>Recurring <span>{tasksArray && tasksArray.filter(task => task.recurring === 'Yes' && task.createdBy === user).length}</span></h2>
                        <h2 className="change-view">
                                <FontAwesomeIcon icon={faTh} onClick={() => setView("grid")} className={(view === "grid")? "active" : ""} title="grid view"/>
                                <FontAwesomeIcon icon={faList} onClick={() => setView("list")} className={(view === "list")? "active" : ""}  title="list view" />
                        </h2>
                    <TasksList view={view} tasksArray={tasks} user={user}/>
                    </div>
            </section>
        </div>
        <div className="spaces">
                <section>
                <h1>spaces the tasks are assigned to :</h1>
                <TasksList selected={selected} user={user} tasksArray={tasks} view={"list"}/>
            </section>
        </div>
</>
    )
}







export default Profile