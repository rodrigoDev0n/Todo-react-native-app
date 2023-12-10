import { useEffect, useRef, useState } from "react";

export const useAddAndRemoveTask = () => {

    const timeoutRef = useRef(null);

    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [isFocus, setisFocus] = useState(false);
    const [isCompleted, setisCompleted] = useState(false);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [timeRemaining, setTimeremaining] = useState(0);

    const addTask = () => {
        if (task.trim() !== '') {
            setTasks([...tasks, { id: tasks.length.toString(), text: task, isCompleted: false }]);
            setTask('');

            console.log(tasks);
        }
    };

    const completeTask = (taskId) => {
        const updatedTasks = tasks.map((t) => {
            if (t.id === taskId) {
                const isPreviouslyCompleted = t.isCompleted;

                const updatedTask = { ...t, isCompleted: !t.isCompleted };

                if (isPreviouslyCompleted && !updatedTask.isCompleted) {

                    clearTimeout(timeoutRef.current);
                    setTimeremaining(0);
                } else if (!isPreviouslyCompleted && updatedTask.isCompleted) {

                    timeoutRef.current = setTimeout(() => {
                        removeTask(taskId);
                    }, 60 * 2000);
                    setTimeremaining(60 * 2000);
                }

                return updatedTask;
            }

            return t;
        });

        setTasks(updatedTasks);
    };

    const removeTask = (taskId) => {
        const updatedTasks = tasks.filter((t) => t.id !== taskId);
        setTasks(updatedTasks);
    };

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${minutes} minutos y ${seconds} segundos`;
    };

    useEffect(() => {
        if (timeRemaining > 0) {
            timeoutRef.current = setTimeout(() => {
                setTimeremaining((prevTime) => Math.max(0, prevTime - 1000));
            }, 1000);
        }
    }, [timeRemaining]);

    return {
        task,
        setTask,
        tasks,
        setTasks,
        isFocus,
        setisFocus,
        isCompleted,
        setisCompleted,
        addTask,
        completeTask,
        removeTask,
        formatTime,
        timeRemaining
    }
} 