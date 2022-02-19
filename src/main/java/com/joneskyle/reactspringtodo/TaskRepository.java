package com.joneskyle.reactspringtodo;

import org.springframework.data.repository.CrudRepository;

import com.joneskyle.reactspringtodo.Task;

public interface TaskRepository extends CrudRepository<Task, Integer> {

}
