package com.example.hotel.vo;

/**
 * @Author: chenyizong
 * @Date: 2020-03-03
 */
public class UserInfoVO {

    private String email;
    private String password;
    private String userName;
    private String phoneNumber;
    private String avatarUrl;


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public String getAvatarUrl() { return avatarUrl; }

    public void setAvatarUrl(String url) {
        this.avatarUrl = url;
    }
}
