package com.example.hotel.controller.admin;

import com.example.hotel.bl.admin.AdminService;
import com.example.hotel.vo.ResponseVO;
import com.example.hotel.vo.UserForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @Author: chenyizong
 * @Date: 2020-03-04
 */
@RestController()
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    AdminService adminService;

    @PostMapping("/addManager")
    public ResponseVO addManager(@RequestBody UserForm userForm){
        return adminService.addManager(userForm);
    }
    @PostMapping("/addSalesman")
    public ResponseVO addSalesman(@RequestBody UserForm userForm) {
        return adminService.addSalesman(userForm);
    }

    @PostMapping("/getAllManagers")
    public ResponseVO getAllManagers(){
        return ResponseVO.buildSuccess(adminService.getAllManagers());
    }

    @PostMapping("getAllClients")
    public ResponseVO getAllClients(){
        return ResponseVO.buildSuccess(adminService.getAllClients());
    }

    @PostMapping("getAllSalesman")
    public ResponseVO getAllSalesman() {
        return ResponseVO.buildSuccess(adminService.getAllSalesman());
    }
    @PostMapping("/{userId}/deleteUser")
    public ResponseVO deleteUser(@PathVariable Integer userId){
        return ResponseVO.buildSuccess(adminService.deleteUser(userId));
    }
}
