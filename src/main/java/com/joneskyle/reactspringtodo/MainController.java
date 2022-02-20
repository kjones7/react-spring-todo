package com.joneskyle.reactspringtodo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="/demo")
public class MainController {
    @Autowired
    private TaskRepository taskRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/add")
    public @ResponseBody String addNewTask (@RequestBody Task task) {
        taskRepository.save(task);

        return "{\"error\": null}";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/all")
    public @ResponseBody Iterable<Task> getAllTasks() {
        return taskRepository.findAll();
    }
}
