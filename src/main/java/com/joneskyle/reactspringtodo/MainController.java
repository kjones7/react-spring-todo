package com.joneskyle.reactspringtodo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="/demo")
public class MainController {
    @Autowired
    private TaskRepository taskRepository;

    @PostMapping(path="/add")
    public @ResponseBody String addNewUser (@RequestParam String desc) {
        Task task = new Task();
        task.setDescription(desc);
        taskRepository.save(task);

        return "Saved";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/all")
    public @ResponseBody Iterable<Task> getAllUsers() {
        return taskRepository.findAll();
    }
}
