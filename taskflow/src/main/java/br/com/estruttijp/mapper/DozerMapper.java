package br.com.estruttijp.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.github.dozermapper.core.DozerBeanMapperBuilder;
import com.github.dozermapper.core.Mapper;

import br.com.estruttijp.data.vo.v1.TaskVO;
import br.com.estruttijp.data.vo.v1.UserVO;
import br.com.estruttijp.model.Permission;
import br.com.estruttijp.model.Task;
import br.com.estruttijp.model.User;

public class DozerMapper {

    private static Mapper mapper = DozerBeanMapperBuilder.buildDefault();

    public static <O, D> D parseObject(O origin, Class<D> destination) {
        return mapper.map(origin, destination);
    }

    public static <O, D> List<D> parseListObjects(List<O> origin, Class<D> destination) {
        List<D> destinationObjects = new ArrayList<D>();
        for (O o : origin) {
            destinationObjects.add(mapper.map(o, destination));
        }
        return destinationObjects;
    }
    
    // Método para mapear especificamente Task para TaskVO
    public static TaskVO mapTaskToTaskVO(Task task) {
        TaskVO taskVO = new TaskVO();
        taskVO.setKey(task.getId());
        taskVO.setStatus(task.getStatus().getStatus());
        taskVO.setCreator(task.getCreator());
        taskVO.setDescription(task.getDescription());
        taskVO.setLaunchDate(task.getLaunchDate());        
        taskVO.setDeadline(task.getDeadline());
        taskVO.setName(task.getName());
        if (task.getProject() != null) {
            taskVO.setProjectId(task.getProject().getId());
        }
        taskVO.setMemberIds(task.getMembers()
        		.stream().map(User::getId)
        		.collect(Collectors.toList()));
        return taskVO;
    }
    
    // Método para mapear lista de Task para TaskVO
    public static List<TaskVO> mapTaskListToTaskVOList(List<Task> tasks) {
        return tasks.stream().map(DozerMapper::mapTaskToTaskVO).collect(Collectors.toList());
    }
    
    public static UserVO mapUserToUserVO(User user) { 
    	UserVO userVO = new UserVO(); 
    	userVO.setKey(user.getId()); 
    	userVO.setUsername(user.getUsername()); 
    	userVO.setFullName(user.getFullName()); 
    	userVO.setPassword(user.getPassword()); 
    	userVO.setPermissions(user.getPermissions()
    			.stream().map(Permission::getDescription)
    			.collect(Collectors.toList())); 
    	return userVO; 
    	} // Método para mapear lista de User para UserDTO 
    
    public static List<UserVO> mapUserListToUserVOList(List<User> users) { 
    	return users.stream().map(DozerMapper::mapUserToUserVO).collect(Collectors.toList()); 
    }
}


