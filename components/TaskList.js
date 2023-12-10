import { 
    FlatList, 
    TouchableOpacity,
    View,
    Text,
    Divider,
} from "react-native"

export const TaskList = ({ tasks, completeTask, removeTask, timeRemaining, formatTime }) => {
    return (
        <FlatList
            data={tasks}
            renderItem={({ item }) => (
                <View style={[
                    styles.taskItem,
                    {backgroundColor: item.isCompleted ? '#cccbc1' : '#fff',}
                ]}>
                    <TouchableOpacity onPress={() => completeTask(item.id)}>
                        <Text style={[
                            styles.taskText,
                            {
                                color: item.isCompleted ? '#000' : '#000',
                                fontWeight: item.isCompleted ? 'normal' : 'bold',
                                textDecorationLine: item.isCompleted ? 'line-through' : 'none',
                            }
                        ]}>{item.text}</Text>
                        {timeRemaining > 0 && item.isCompleted && (
                            <Text style={styles.taskTime}>
                                {formatTime(timeRemaining)}
                            </Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => removeTask(item.id)}
                    >
                        <Text style={styles.deleteText}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    )
}

const styles = {
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingLeft: 10,
        marginBottom: 8,
        borderRadius: 15,
        height: 50,

    },
    deleteButton: {
        color: 'red',
        backgroundColor: 'red',
        height: 50,
        padding: 5,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    },
    taskTime: {
        color: 'red',
    }
}