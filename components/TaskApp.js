import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    Dimensions,
    Divider
} from 'react-native';
import { TaskList } from './TaskList';
import { useAddAndRemoveTask } from '../hooks/useAddAndRemoveTask';

export const TaskApp = () => {

    const { height, width } = Dimensions.get('window');

    const {
        task,
        setTask,
        tasks,
        isFocus,
        setisFocus,
        addTask,
        completeTask,
        removeTask,
        timeRemaining,
        formatTime
    } = useAddAndRemoveTask();

    return (
        <View style={[styles.container, { height, width }]}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        { borderColor: isFocus ? '#319cbc' : '#ccc' },
                    ]}
                    onFocus={() => setisFocus(true)}
                    placeholder="Nueva tarea"
                    value={task}
                    onChangeText={(text) => setTask(text)}
                />
                <TouchableOpacity style={styles.addButton} onPress={addTask}>
                    <Text style={styles.buttonText}>Agregar</Text>
                </TouchableOpacity>
            </View>
            <TaskList 
                tasks={tasks}
                completeTask={completeTask}
                removeTask={removeTask}
                timeRemaining={timeRemaining}
                formatTime={formatTime}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        marginRight: 8,
        paddingHorizontal: 8,
        borderRadius: 10,
    },
    addButton: {
        backgroundColor: '#319cbc',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 8,
        borderRadius: 5,
    },
    deleteButton: {
        color: 'red',
    },
});
