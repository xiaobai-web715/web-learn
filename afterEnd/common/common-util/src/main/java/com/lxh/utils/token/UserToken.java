package com.lxh.utils.token;

public class UserToken {
    @Override
    public String toString() {
        return "UserToken{" +
                "id=" + id +
                ", username='" + username + '\'' +
                '}';
    }

    private int id;
    private String username;
    public UserToken setUserInfo(int uid, String username) {
        this.id = uid;
        this.username = username;
        return this;
    }
    public String getUsername() {
        return username;
    }
    public int getId() {
        return id;
    }
}
