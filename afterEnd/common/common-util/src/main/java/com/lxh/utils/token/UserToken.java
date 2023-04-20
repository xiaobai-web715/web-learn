package com.lxh.utils.token;

public class UserToken {
    @Override
    public String toString() {
        return "UserToken{" +
                "id=" + id +
                ", username='" + username + '\'' +
                '}';
    }

    private Long id;
    private String username;
    public UserToken setUserInfo(Long uid, String username) {
        this.id = uid;
        this.username = username;
        return this;
    }
    public String getUsername() {
        return username;
    }
    public Long getId() {
        return id;
    }
}
