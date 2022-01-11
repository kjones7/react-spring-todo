package com.joneskyle.reactspringtodo;

import org.springframework.data.repository.CrudRepository;

import com.joneskyle.reactspringtodo.Task;

// This will be AUTO IMPLEMENTED by Spring into a Bean called taskRepository
// CRUD refers Create, Read, Update, Delete

public interface TaskRepository extends CrudRepository<Task, Integer> {

}
